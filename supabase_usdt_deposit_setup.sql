-- ============================================================================
-- Supabase SQL Schema & Functions for USDT (BEP20) Auto-Approve Deposit Gateway
-- ============================================================================

-- 1. Profiles Table (Holds User Balances)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  balance NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
  lifetime_earnings NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Deposits Table with UNIQUE (tx_hash, log_index)
CREATE TABLE IF NOT EXISTS public.deposits (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tx_hash TEXT NOT NULL,
  log_index INTEGER NOT NULL,
  sender_address TEXT NOT NULL,
  amount_usdt NUMERIC(28, 8) NOT NULL,
  amount_bdt NUMERIC(18, 2) NOT NULL,
  rate NUMERIC(10, 2) NOT NULL DEFAULT 125.00,
  block_number BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Rule 4: UNIQUE constraint on (tx_hash, log_index) to prevent duplicate / replay claims
  CONSTRAINT unique_tx_hash_log_index UNIQUE (tx_hash, log_index)
);

-- Index for fast user history lookup
CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON public.deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_tx_hash ON public.deposits(tx_hash);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- 4. Profiles RLS Policies:
-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Rule 7: Prevent clients from updating balance directly!
-- Authenticated users can only update non-financial fields (balance cannot be altered)
DROP POLICY IF EXISTS "Users can update non-balance profile fields" ON public.profiles;
CREATE POLICY "Users can update non-balance profile fields"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    balance = (SELECT p.balance FROM public.profiles p WHERE p.id = auth.uid())
  );

-- 5. Deposits RLS Policies:
-- Users can only read their own deposits (NO direct client INSERT/UPDATE/DELETE allowed)
DROP POLICY IF EXISTS "Users can view own deposits" ON public.deposits;
CREATE POLICY "Users can view own deposits"
  ON public.deposits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. Atomic Database Function for USDT Deposit
-- Rule 5: Records the deposit and increments profiles.balance in a single atomic transaction
CREATE OR REPLACE FUNCTION public.credit_usdt_deposit(
  p_user_id UUID,
  p_tx_hash TEXT,
  p_log_index INTEGER,
  p_sender_address TEXT,
  p_amount_usdt NUMERIC,
  p_amount_bdt NUMERIC,
  p_rate NUMERIC,
  p_block_number BIGINT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated rights to bypass client RLS
SET search_path = public
AS $$
DECLARE
  v_new_balance NUMERIC;
  v_deposit_id BIGINT;
BEGIN
  -- 1. Ensure profile exists for the authenticated user
  INSERT INTO public.profiles (id, balance, lifetime_earnings, updated_at)
  VALUES (p_user_id, 0.0000, 0.0000, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- 2. Insert into deposits table.
  -- Will automatically throw a UNIQUE violation error if (tx_hash, log_index) is duplicate.
  INSERT INTO public.deposits (
    user_id,
    tx_hash,
    log_index,
    sender_address,
    amount_usdt,
    amount_bdt,
    rate,
    block_number,
    status,
    created_at
  ) VALUES (
    p_user_id,
    LOWER(TRIM(p_tx_hash)),
    p_log_index,
    LOWER(TRIM(p_sender_address)),
    p_amount_usdt,
    p_amount_bdt,
    p_rate,
    p_block_number,
    'approved',
    NOW()
  )
  RETURNING id INTO v_deposit_id;

  -- 3. Atomically increment profiles.balance and lifetime_earnings
  UPDATE public.profiles
  SET
    balance = public.profiles.balance + p_amount_bdt,
    lifetime_earnings = public.profiles.lifetime_earnings + p_amount_bdt,
    updated_at = NOW()
  WHERE id = p_user_id
  RETURNING balance INTO v_new_balance;

  -- 4. Return success result
  RETURN jsonb_build_object(
    'success', true,
    'deposit_id', v_deposit_id,
    'new_balance', v_new_balance,
    'amount_usdt', p_amount_usdt,
    'amount_bdt', p_amount_bdt
  );
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'এই ট্রানজেকশন (TxHash ও log_index) ইতিপূর্বে সিস্টেমে অনুমোদিত হয়ে গেছে।';
END;
$$;

-- 7. Restrict execution permissions: REVOKE from public/anon/authenticated, GRANT ONLY to service_role
REVOKE ALL ON FUNCTION public.credit_usdt_deposit(UUID, TEXT, INTEGER, TEXT, NUMERIC, NUMERIC, NUMERIC, BIGINT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.credit_usdt_deposit(UUID, TEXT, INTEGER, TEXT, NUMERIC, NUMERIC, NUMERIC, BIGINT) FROM anon;
REVOKE ALL ON FUNCTION public.credit_usdt_deposit(UUID, TEXT, INTEGER, TEXT, NUMERIC, NUMERIC, NUMERIC, BIGINT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.credit_usdt_deposit(UUID, TEXT, INTEGER, TEXT, NUMERIC, NUMERIC, NUMERIC, BIGINT) TO service_role;
