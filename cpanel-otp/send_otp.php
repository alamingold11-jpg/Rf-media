<?php
/**
 * PW Platform — Send Real Bangladesh SMS OTP via cPanel
 * Endpoint: POST /otp/send_otp.php
 * Body JSON: { "phone": "01712345678" }
 */

require_once __DIR__ . '/config.php';

pw_otp_send_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    pw_otp_json(405, [
        'success' => false,
        'code'    => 'METHOD_NOT_ALLOWED',
        'message' => 'Only POST method is allowed.'
    ]);
}

$input = pw_otp_read_input();
$rawPhone = isset($input['phone']) ? trim((string)$input['phone']) : '';
$phoneInfo = pw_otp_normalize_bd_phone($rawPhone);

if (empty($phoneInfo['valid'])) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'INVALID_BD_PHONE',
        'message' => 'সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর (013–019) দিন।'
    ]);
}

if (!pw_otp_is_configured()) {
    pw_otp_json(503, [
        'success' => false,
        'code'    => 'SMS_GATEWAY_NOT_CONFIGURED',
        'message' => 'আপনার cPanel config.php ফাইলে SMS API Key সেট করা হয়নি।'
    ]);
}

$now = time();
$corePhone = $phoneInfo['core10'];
$store = pw_otp_load_store();
$rateEntry = isset($store['rate'][$corePhone]) && is_array($store['rate'][$corePhone])
    ? $store['rate'][$corePhone]
    : ['lastSent' => 0, 'hourly' => []];

$lastSent = (int)($rateEntry['lastSent'] ?? 0);
$elapsed = $now - $lastSent;
if ($lastSent > 0 && $elapsed < OTP_COOLDOWN_SECONDS) {
    $wait = OTP_COOLDOWN_SECONDS - $elapsed;
    pw_otp_json(429, [
        'success'    => false,
        'code'       => 'OTP_COOLDOWN',
        'retryAfter' => $wait,
        'message'    => 'অনুগ্রহ করে ' . $wait . ' সেকেন্ড পর আবার চেষ্টা করুন।'
    ]);
}

$hourly = isset($rateEntry['hourly']) && is_array($rateEntry['hourly']) ? $rateEntry['hourly'] : [];
if (count($hourly) >= OTP_MAX_PER_HOUR) {
    pw_otp_json(429, [
        'success'    => false,
        'code'       => 'OTP_HOURLY_LIMIT',
        'retryAfter' => 600,
        'message'    => 'এই নম্বরে ঘণ্টায় সর্বোচ্চ OTP সীমা পূর্ণ হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।'
    ]);
}

$otpCode = (string)random_int(100000, 999999);
$sendResult = pw_otp_dispatch_sms($phoneInfo, $otpCode);

if (empty($sendResult['sent'])) {
    pw_otp_json(502, [
        'success' => false,
        'code'    => 'SMS_SEND_FAILED',
        'message' => 'SMS পাঠানো যায়নি: ' . ($sendResult['error'] ?? 'গেটওয়ে সমস্যা।')
    ]);
}

$secret = pw_otp_secret();
$jti = bin2hex(random_bytes(12));
$exp = $now + OTP_EXPIRY_SECONDS;
$otpHash = hash_hmac('sha256', $corePhone . ':' . $otpCode, $secret);

$store['tokens'][$jti] = [
    'phone'       => $corePhone,
    'hash'        => $otpHash,
    'exp'         => $exp,
    'attempts'    => 0,
    'maxAttempts' => OTP_MAX_ATTEMPTS,
    'used'        => false
];

$hourly[] = $now;
$store['rate'][$corePhone] = [
    'lastSent' => $now,
    'hourly'   => $hourly
];
pw_otp_save_store($store);

$otpToken = pw_otp_sign_token([
    'jti'   => $jti,
    'phone' => $corePhone,
    'hash'  => $otpHash,
    'exp'   => $exp
]);

pw_otp_json(200, [
    'success'     => true,
    'otpToken'    => $otpToken,
    'expiresIn'   => OTP_EXPIRY_SECONDS,
    'cooldown'    => OTP_COOLDOWN_SECONDS,
    'maskedPhone' => $phoneInfo['masked'],
    'message'     => 'আপনার মোবাইলে OTP কোড পাঠানো হয়েছে।'
]);
