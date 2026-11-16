<?php
/**
 * PW Platform — Verify Bangladesh SMS OTP via cPanel
 * Endpoint: POST /otp/verify_otp.php
 * Body JSON: { "phone": "01712345678", "code": "123456", "otpToken": "..." }
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
$code = isset($input['code']) ? preg_replace('/\D+/', '', (string)$input['code']) : '';
$otpToken = isset($input['otpToken']) ? trim((string)$input['otpToken']) : '';

$phoneInfo = pw_otp_normalize_bd_phone($rawPhone);
if (empty($phoneInfo['valid'])) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'INVALID_BD_PHONE',
        'message' => 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন।'
    ]);
}

if (!preg_match('/^\d{6}$/', $code)) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'INVALID_OTP_FORMAT',
        'message' => 'সঠিক ৬ ডিজিটের OTP কোড লিখুন।'
    ]);
}

$tokenData = pw_otp_verify_token($otpToken);
if (!$tokenData || empty($tokenData['jti']) || empty($tokenData['phone']) || empty($tokenData['hash']) || empty($tokenData['exp'])) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'INVALID_OTP_TOKEN',
        'message' => 'OTP সেশন সঠিক নয়। নতুন কোড পাঠান।'
    ]);
}

$corePhone = $phoneInfo['core10'];
if (!hash_equals((string)$tokenData['phone'], $corePhone)) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'PHONE_MISMATCH',
        'message' => 'মোবাইল নম্বর ও OTP টোকেন মিলছে না।'
    ]);
}

$now = time();
if ((int)$tokenData['exp'] < $now) {
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'OTP_EXPIRED',
        'message' => 'OTP কোডের মেয়াদ শেষ হয়ে গেছে। নতুন কোড পাঠান।'
    ]);
}

$jti = (string)$tokenData['jti'];
$store = pw_otp_load_store();
$hasStoreEntry = isset($store['tokens'][$jti]) && is_array($store['tokens'][$jti]);

if ($hasStoreEntry) {
    $entry = $store['tokens'][$jti];
    if (!empty($entry['used'])) {
        pw_otp_json(400, [
            'success' => false,
            'code'    => 'OTP_ALREADY_USED',
            'message' => 'এই OTP কোডটি আগেই ব্যবহার হয়ে গেছে। নতুন কোড পাঠান।'
        ]);
    }
    $attempts = (int)($entry['attempts'] ?? 0);
    $maxAttempts = (int)($entry['maxAttempts'] ?? OTP_MAX_ATTEMPTS);
    if ($attempts >= $maxAttempts) {
        pw_otp_json(429, [
            'success' => false,
            'code'    => 'OTP_TOO_MANY_ATTEMPTS',
            'message' => 'অনেকবার ভুল কোড দেওয়া হয়েছে। নতুন OTP পাঠান।'
        ]);
    }
}

$secret = pw_otp_secret();
$expectedHash = (string)$tokenData['hash'];
$actualHash = hash_hmac('sha256', $corePhone . ':' . $code, $secret);

if (!hash_equals($expectedHash, $actualHash)) {
    if ($hasStoreEntry) {
        $store['tokens'][$jti]['attempts'] = (int)($store['tokens'][$jti]['attempts'] ?? 0) + 1;
        pw_otp_save_store($store);
    }
    pw_otp_json(400, [
        'success' => false,
        'code'    => 'OTP_INCORRECT',
        'message' => 'OTP কোডটি সঠিক নয়। আবার চেক করে লিখুন।'
    ]);
}

if ($hasStoreEntry) {
    $store['tokens'][$jti]['used'] = true;
    pw_otp_save_store($store);
}

$verifiedToken = pw_otp_sign_token([
    'verified' => true,
    'phone'    => $corePhone,
    'jti'      => $jti,
    'iat'      => $now,
    'exp'      => $now + 600
]);

pw_otp_json(200, [
    'success'       => true,
    'verified'      => true,
    'phone'         => $corePhone,
    'verifiedToken' => $verifiedToken,
    'message'       => 'মোবাইল নম্বর সফলভাবে যাচাই হয়েছে।'
]);
