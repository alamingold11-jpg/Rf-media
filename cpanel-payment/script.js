/**
 * ========================================================
 * OKXPay / WPay Mobile-First Payment Script (Vanilla JS)
 * Static file for cPanel public_html deployment
 * ========================================================
 */

// 1. Backend Payment API Endpoint
// Change this URL if your endpoint path or domain changes
const API_URL = 'https://imcagro.top/api/create-payment';

// Configuration & Constraints
const MIN_AMOUNT = 300;
const MAX_AMOUNT = 50000;
const REQUEST_TIMEOUT_MS = 20000; // 20 Seconds Timeout

// DOM Element References
const form = document.getElementById('payment-form');
const amountInput = document.getElementById('amount-input');
const amountError = document.getElementById('amount-error');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.querySelector('.btn-spinner');
const btnLockIcon = document.querySelector('.btn-lock-icon');
const quickAmtBtns = document.querySelectorAll('.quick-amt-btn');
const methodCards = document.querySelectorAll('.method-card');
const statusContainer = document.getElementById('status-container');
const statusTitle = document.getElementById('status-title');
const statusMessage = document.getElementById('status-message');

// Double Submit Protection Flag
let isSubmitting = false;

/**
 * Update the submit button text with the current amount
 */
function updateButtonText(amount) {
  const cleanAmt = Math.round(Number(amount) || 0);
  if (cleanAmt > 0) {
    btnText.textContent = `Pay Now (৳${cleanAmt.toLocaleString('bn-BD')} পেমেন্ট করুন)`;
  } else {
    btnText.textContent = 'Pay Now (পেমেন্ট করুন)';
  }
}

/**
 * Validate the amount input
 * @returns {number|null} Valid integer amount, or null if invalid
 */
function validateAmount() {
  const rawValue = amountInput.value.trim();
  const numValue = Number(rawValue);

  // Check empty or not a number
  if (!rawValue || isNaN(numValue)) {
    showFieldError('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন। / Please enter a valid amount.');
    return null;
  }

  // Whole numbers only
  if (!Number.isInteger(numValue)) {
    showFieldError('টাকার পরিমাণ শুধুমাত্র পূর্ণসংখ্যা হতে হবে (দশমিক গ্রহণযোগ্য নয়)। / Amount must be a whole number.');
    return null;
  }

  // Minimum constraint (300 BDT)
  if (numValue < MIN_AMOUNT) {
    showFieldError(`সর্বনিম্ন পেমেন্ট পরিমাণ ৳${MIN_AMOUNT} টাকা। / Minimum payment amount is ৳${MIN_AMOUNT} BDT.`);
    return null;
  }

  // Maximum constraint (50,000 BDT)
  if (numValue > MAX_AMOUNT) {
    showFieldError(`সর্বোচ্চ পেমেন্ট পরিমাণ ৳${MAX_AMOUNT.toLocaleString('bn-BD')} টাকা। / Maximum payment amount is ৳${MAX_AMOUNT} BDT.`);
    return null;
  }

  clearFieldError();
  return numValue;
}

function showFieldError(msg) {
  amountError.textContent = msg;
  amountError.classList.remove('hidden');
  amountInput.classList.add('is-invalid');
}

function clearFieldError() {
  amountError.textContent = '';
  amountError.classList.add('hidden');
  amountInput.classList.remove('is-invalid');
}

/**
 * Show error or alert notification box
 */
function showErrorAlert(title, message) {
  statusContainer.className = 'status-box error';
  statusTitle.textContent = title;
  statusMessage.textContent = message;
  statusContainer.classList.remove('hidden');
}

function hideStatusAlert() {
  statusContainer.className = 'status-box hidden';
  statusTitle.textContent = '';
  statusMessage.textContent = '';
}

/**
 * Set submit button loading state
 */
function setLoadingState(loading, currentAmount) {
  isSubmitting = loading;
  submitBtn.disabled = loading;

  if (loading) {
    btnSpinner.classList.remove('hidden');
    btnLockIcon.classList.add('hidden');
    btnText.textContent = 'পেমেন্ট পেজে নিয়ে যাওয়া হচ্ছে... / Redirecting...';
  } else {
    btnSpinner.classList.add('hidden');
    btnLockIcon.classList.remove('hidden');
    updateButtonText(currentAmount || amountInput.value);
  }
}

/**
 * Generate unique Order ID: "ORD" + timestamp + 3 random digits
 */
function generateOrderId() {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(100 + Math.random() * 900); // 3 digits (100-999)
  return `ORD${timestamp}${randomSuffix}`;
}

/**
 * Get selected payment method (BKASH, NAGAD, ROCKET)
 */
function getSelectedPaymentMethod() {
  const checkedRadio = document.querySelector('input[name="payType"]:checked');
  return checkedRadio ? checkedRadio.value.toUpperCase() : 'BKASH';
}

// ----------------------------------------------------
// Event Listeners: Quick Amount Selection Buttons
// ----------------------------------------------------
quickAmtBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const amt = btn.getAttribute('data-amount');
    amountInput.value = amt;
    clearFieldError();
    hideStatusAlert();

    quickAmtBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    updateButtonText(amt);
  });
});

// Sync quick amount highlight when typing in the input
amountInput.addEventListener('input', () => {
  clearFieldError();
  hideStatusAlert();

  const currentVal = amountInput.value.trim();
  quickAmtBtns.forEach(btn => {
    if (btn.getAttribute('data-amount') === currentVal) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  updateButtonText(currentVal);
});

amountInput.addEventListener('blur', () => {
  if (amountInput.value) {
    validateAmount();
  }
});

// ----------------------------------------------------
// Event Listeners: Payment Method Card Selection
// ----------------------------------------------------
methodCards.forEach(card => {
  card.addEventListener('click', () => {
    methodCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    hideStatusAlert();
  });
});

// ----------------------------------------------------
// Form Submission & API Call
// ----------------------------------------------------
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // 1. Prevent Double Submit
  if (isSubmitting) return;

  hideStatusAlert();

  // 2. Offline check
  if (!navigator.onLine) {
    showErrorAlert(
      'ইন্টারনেট সংযোগ নেই / No Internet Connection',
      'আপনার ডিভাইসে ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন। / Please check your internet connection and try again.'
    );
    return;
  }

  // 3. Amount validation
  const amount = validateAmount();
  if (!amount) {
    amountInput.focus();
    return;
  }

  // 4. Payment method & Order ID
  const payType = getSelectedPaymentMethod();
  const orderId = generateOrderId();

  // 5. Enter Loading State
  setLoadingState(true, amount);

  // 6. Setup 20-second request timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const payload = {
      amount: amount,
      orderId: orderId,
      payType: payType
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Parse JSON safely
    let data;
    try {
      data = await response.json();
    } catch (parseErr) {
      throw new Error('সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি। / Invalid response from server.');
    }

    // 7. Check for success & payment URL
    const paymentUrl = data.paymentUrl || 
                       data?.gatewayResponse?.data?.url || 
                       data?.data?.url || 
                       data?.url;

    if (data.success === true && paymentUrl) {
      // Show redirecting message briefly before redirect
      btnText.textContent = 'ক্যাশিয়ারে রিডাইরেক্ট করা হচ্ছে... / Redirecting...';
      window.location.href = paymentUrl;
      return;
    }

    // 8. Handle Backend/Gateway Failure Response
    let failureMsg = 'পেমেন্ট গেটওয়েতে ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
    
    if (data?.gatewayResponse?.msg) {
      failureMsg = data.gatewayResponse.msg;
    } else if (data?.message) {
      failureMsg = data.message;
    } else if (data?.error) {
      failureMsg = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
    }

    showErrorAlert(
      'পেমেন্ট ব্যর্থ হয়েছে / Payment Failed',
      `${failureMsg} (কোড: ${data?.gatewayResponse?.code || 'ERR'})`
    );

  } catch (error) {
    clearTimeout(timeoutId);

    // Timeout Error
    if (error.name === 'AbortError') {
      showErrorAlert(
        'অনুরোধের সময় শেষ / Request Timed Out',
        '২০ সেকেন্ডের মধ্যে সার্ভার থেকে সাড়া পাওয়া যায়নি। অনুগ্রহ করে আপনার ইন্টারনেট চেক করে আবার চেষ্টা করুন। / Request timed out. Please try again.'
      );
    } else {
      // Network / Fetch Error
      showErrorAlert(
        'যোগাযোগ ব্যর্থ হয়েছে / Network Error',
        `${error.message || 'সার্ভারে সংযোগ করা সম্ভব হচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।'}`
      );
    }
  } finally {
    // 9. Re-enable button on failure so user can retry
    setLoadingState(false, amount);
  }
});

// Initialize button text on page load
updateButtonText(amountInput.value);
