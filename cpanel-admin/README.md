# cPanel Standalone Admin Panel

This folder (`cpanel-admin/`) is 100% standalone static HTML + JavaScript — zero Node.js or build steps required on cPanel.

## Upload Instructions for cPanel

1. Log in to **cPanel → File Manager**.
2. Open `public_html/` and create a folder (e.g., `admin` or `control-desk`), or open your admin subdomain folder.
3. Upload these **3 files** from `cpanel-admin/`:
   - `index.html`
   - `config.js`
   - `admin.js`
4. Open `https://yourdomain.com/admin/` in any browser.

## Changing Your Permanent Admin Password in cPanel

- Edit `config.js` inside cPanel File Manager to permanently set `ADMIN_USERNAME` and `ADMIN_PASSWORD` across all devices, **or** update credentials directly from **System & Settings** in the dashboard.

## Full Control Features

- **Overview Metrics:** Total Users, Today Users, Total Recharge, Today Recharge, Total Withdrawal, Today Withdrawal.
- **Recharges:** Automatic payments show **Approved · Auto**; incomplete/manual recharges stay **Pending** with **Approve**, **Pending**, and **Reject** controls, plus **+ Add Recharge**.
- **Withdrawals:** Full user profile & bound payout numbers (bKash / Nagad / USDT BEP20 with Copy button), **Approve / Pending / Reject** (Reject auto-refunds balance).
- **Users & Balances:** Edit balance, quick adjust (`+500`, `+1k`, `-500`), VIP package level (`LV0`–`LV6`), passwords, bound wallets, superior ID, or **Suspend / Ban** user accounts.
- **Platform Controls (Live Sync to Website):** Turn withdrawals On/Off, set minimum withdrawal, net payout %, minimum recharge, USDT rate, company USDT BEP20 deposit address, and customer support Telegram link.
- **System & CSV Export:** Export Users, Recharges, and Withdrawals to CSV anytime.
