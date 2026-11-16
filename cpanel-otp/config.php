<?php
/**
 * PW Platform — Bangladesh Real SMS OTP Configuration for cPanel (PHP 7.4+ / 8.x)
 * Upload this folder to your cPanel hosting, e.g. public_html/otp/
 */

// ---------------------------------------------------------------------------
// 1. BANGLADESH SMS GATEWAY SETTINGS (শুধুমাত্র আপনার cPanel সার্ভারে নিরাপদ থাকবে)
// Supported providers: 'bulksmsbd' | 'greenweb' | 'mimsms' | 'elitbuzz' | 'sslwireless' | 'custom'
// ---------------------------------------------------------------------------
define('SMS_PROVIDER', 'bulksmsbd');
define('SMS_API_KEY', 'YOUR_SMS_API_KEY');       // <-- আপনার SMS Gateway API Key / Token এখানে বসান
define('SMS_SENDER_ID', 'YOUR_SENDER_ID');       // <-- Sender ID / SID (যেমন BulkSMSBD: 8809617613541)
define('SMS_USERNAME', '');                      // <-- শুধুমাত্র MimSMS এর জন্য ইউজারনেম (না লাগলে খালি রাখুন)
define('SMS_BRAND_NAME', 'PW Platform');

// Optional: Custom HTTP SMS Gateway (শুধুমাত্র SMS_PROVIDER = 'custom' হলে ব্যবহার হবে)
define('SMS_CUSTOM_URL', '');                    // উদা: https://example.com/api/sms?key={api_key}&to={phone_88}&msg={message}
define('SMS_CUSTOM_METHOD', 'POST');             // 'GET' or 'POST'
define('SMS_CUSTOM_JSON', false);                // true হলে JSON বডি পাঠাবে, false হলে form-urlencoded / query string

// ---------------------------------------------------------------------------
// 2. OTP SECURITY & RATE LIMIT SETTINGS
// ---------------------------------------------------------------------------
define('OTP_SECRET', 'CHANGE_THIS_RANDOM_SECRET_KEY'); // ইচ্ছা করলে নিজের র‍্যান্ডম কী দিন
define('OTP_EXPIRY_SECONDS', 300);               // ৫ মিনিট (300 সেকেন্ড)
define('OTP_COOLDOWN_SECONDS', 300);             // একবার OTP পাঠালে ৫ মিনিট (300 সেকেন্ড) পর আবার পাঠানো যাবে
define('OTP_MAX_ATTEMPTS', 5);                   // ভুল কোড চেষ্টা সর্বোচ্চ ৫ বার
define('OTP_MAX_PER_HOUR', 6);                   // প্রতি নম্বরে ঘণ্টায় সর্বোচ্চ ৬ বার OTP
define('OTP_CORS_ORIGIN', '*');                  // চাইলে আপনার ওয়েবসাইটের ডোমেইন দিন, যেমন https://yourdomain.com

// ===========================================================================
// INTERNAL HELPERS (নিচের কোড পরিবর্তন করার প্রয়োজন নেই)
// ===========================================================================

function pw_otp_send_cors() {
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: ' . OTP_CORS_ORIGIN);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
    header('Cache-Control: no-store, no-cache, must-revalidate');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

function pw_otp_json($statusCode, $payload) {
    http_response_code((int)$statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function pw_otp_read_input() {
    $raw = file_get_contents('php://input');
    if (is_string($raw) && trim($raw) !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return is_array($_POST) ? $_POST : [];
}

function pw_otp_normalize_bd_phone($rawPhone) {
    $digits = preg_replace('/\D+/', '', (string)$rawPhone);
    if ($digits === '') {
        return ['valid' => false];
    }
    if (strpos($digits, '880') === 0) {
        $digits = substr($digits, 3);
    }
    if (strpos($digits, '0') === 0) {
        $digits = substr($digits, 1);
    }
    if (!preg_match('/^1[3-9]\d{8}$/', $digits)) {
        return ['valid' => false];
    }

    return [
        'valid'   => true,
        'core10'  => $digits,                              // e.g. 1712345678
        'local11' => '0' . $digits,                        // e.g. 01712345678
        'e164'    => '880' . $digits,                      // e.g. 8801712345678
        'masked'  => '0' . substr($digits, 0, 2) . '****' . substr($digits, -2)
    ];
}

function pw_otp_secret() {
    if (defined('OTP_SECRET') && OTP_SECRET !== '' && OTP_SECRET !== 'CHANGE_THIS_RANDOM_SECRET_KEY') {
        return OTP_SECRET;
    }
    $localSecretPath = __DIR__ . '/.otp_secret.key';
    if (file_exists($localSecretPath) && is_readable($localSecretPath)) {
        $saved = trim((string)file_get_contents($localSecretPath));
        if (strlen($saved) >= 32) {
            return $saved;
        }
    }
    $tmpSecretPath = rtrim(sys_get_temp_dir(), '/\\') . '/pw_otp_secret_' . substr(md5(__DIR__), 0, 8) . '.key';
    if (file_exists($tmpSecretPath) && is_readable($tmpSecretPath)) {
        $saved = trim((string)file_get_contents($tmpSecretPath));
        if (strlen($saved) >= 32) {
            return $saved;
        }
    }
    $generated = bin2hex(random_bytes(32));
    if (is_writable(__DIR__)) {
        @file_put_contents($localSecretPath, $generated, LOCK_EX);
        @chmod($localSecretPath, 0600);
        return $generated;
    }
    if (@is_writable(sys_get_temp_dir())) {
        @file_put_contents($tmpSecretPath, $generated, LOCK_EX);
        @chmod($tmpSecretPath, 0600);
        return $generated;
    }
    return hash('sha256', __FILE__ . '|' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '|' . php_uname('n'));
}

function pw_otp_b64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function pw_otp_b64url_decode($str) {
    $b64 = strtr((string)$str, '-_', '+/');
    $pad = strlen($b64) % 4;
    if ($pad > 0) {
        $b64 .= str_repeat('=', 4 - $pad);
    }
    return base64_decode($b64, true);
}

function pw_otp_sign_token($payload) {
    $json = json_encode($payload, JSON_UNESCAPED_SLASHES);
    $body = pw_otp_b64url_encode($json);
    $sig = pw_otp_b64url_encode(hash_hmac('sha256', $body, pw_otp_secret(), true));
    return $body . '.' . $sig;
}

function pw_otp_verify_token($token) {
    if (!is_string($token) || strpos($token, '.') === false) {
        return null;
    }
    $parts = explode('.', trim($token), 2);
    if (count($parts) !== 2 || $parts[0] === '' || $parts[1] === '') {
        return null;
    }
    $expectedSig = pw_otp_b64url_encode(hash_hmac('sha256', $parts[0], pw_otp_secret(), true));
    if (!hash_equals($expectedSig, $parts[1])) {
        return null;
    }
    $decoded = pw_otp_b64url_decode($parts[0]);
    if ($decoded === false) {
        return null;
    }
    $data = json_decode($decoded, true);
    return is_array($data) ? $data : null;
}

function pw_otp_store_path() {
    $localFile = __DIR__ . '/otp_store.json';
    if (file_exists($localFile) && is_writable($localFile)) {
        return $localFile;
    }
    if (is_writable(__DIR__)) {
        return $localFile;
    }
    return rtrim(sys_get_temp_dir(), '/\\') . '/pw_bd_otp_store_' . substr(md5(__DIR__), 0, 8) . '.json';
}

function pw_otp_load_store() {
    $path = pw_otp_store_path();
    if (!file_exists($path)) {
        return ['tokens' => [], 'rate' => []];
    }
    $raw = @file_get_contents($path);
    $data = $raw ? json_decode($raw, true) : null;
    if (!is_array($data)) {
        $data = [];
    }
    $now = time();
    $tokens = isset($data['tokens']) && is_array($data['tokens']) ? $data['tokens'] : [];
    foreach ($tokens as $jti => $entry) {
        if (!is_array($entry) || empty($entry['exp']) || ($entry['exp'] + 300) < $now) {
            unset($tokens[$jti]);
        }
    }
    $rate = isset($data['rate']) && is_array($data['rate']) ? $data['rate'] : [];
    foreach ($rate as $phone => $rEntry) {
        if (!is_array($rEntry) || (empty($rEntry['lastSent']) && empty($rEntry['hourly']))) {
            unset($rate[$phone]);
            continue;
        }
        $hourly = isset($rEntry['hourly']) && is_array($rEntry['hourly']) ? $rEntry['hourly'] : [];
        $hourly = array_values(array_filter($hourly, function($ts) use ($now) {
            return is_numeric($ts) && ($now - (int)$ts) < 3600;
        }));
        if (empty($hourly) && ($now - (int)($rEntry['lastSent'] ?? 0)) > 3600) {
            unset($rate[$phone]);
        } else {
            $rate[$phone]['hourly'] = $hourly;
        }
    }
    return ['tokens' => $tokens, 'rate' => $rate];
}

function pw_otp_save_store($store) {
    $path = pw_otp_store_path();
    @file_put_contents($path, json_encode($store, JSON_UNESCAPED_SLASHES), LOCK_EX);
    if (file_exists($path)) {
        @chmod($path, 0600);
    }
}

function pw_otp_is_configured() {
    $provider = strtolower(trim((string)SMS_PROVIDER));
    if ($provider === 'custom') {
        return trim((string)SMS_CUSTOM_URL) !== '';
    }
    $apiKey = trim((string)SMS_API_KEY);
    return $apiKey !== '' && $apiKey !== 'YOUR_SMS_API_KEY';
}

function pw_otp_http_request($url, $method = 'POST', $params = [], $asJson = false) {
    $method = strtoupper($method);
    $headers = [];
    $body = null;

    if ($method === 'GET' && !empty($params)) {
        $sep = (strpos($url, '?') === false) ? '?' : '&';
        $url .= $sep . http_build_query($params);
    } elseif ($method === 'POST') {
        if ($asJson) {
            $body = json_encode($params, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $headers[] = 'Content-Type: application/json';
            $headers[] = 'Accept: application/json';
        } else {
            $body = is_array($params) ? http_build_query($params) : (string)$params;
            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        }
    }

    if (function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        }
        $resp = curl_exec($ch);
        $err = curl_error($ch);
        $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($resp === false) {
            return ['ok' => false, 'httpCode' => $httpCode, 'body' => '', 'error' => $err ?: 'cURL error'];
        }
        return ['ok' => $httpCode >= 200 && $httpCode < 400, 'httpCode' => $httpCode, 'body' => $resp, 'error' => ''];
    }

    $opts = [
        'http' => [
            'method'        => $method,
            'timeout'       => 20,
            'ignore_errors' => true,
            'header'        => implode("\r\n", $headers)
        ]
    ];
    if ($method === 'POST' && $body !== null) {
        $opts['http']['content'] = $body;
    }
    $ctx = stream_context_create($opts);
    $resp = @file_get_contents($url, false, $ctx);
    if ($resp === false) {
        return ['ok' => false, 'httpCode' => 0, 'body' => '', 'error' => 'HTTP request failed'];
    }
    return ['ok' => true, 'httpCode' => 200, 'body' => $resp, 'error' => ''];
}

function pw_otp_dispatch_sms($phoneInfo, $otpCode) {
    $provider = strtolower(trim((string)SMS_PROVIDER));
    $apiKey = trim((string)SMS_API_KEY);
    $senderId = trim((string)SMS_SENDER_ID);
    if ($senderId === 'YOUR_SENDER_ID') {
        $senderId = '';
    }
    $brand = trim((string)SMS_BRAND_NAME) ?: 'PW Platform';
    $message = $brand . " verification code: " . $otpCode . ". Valid for 5 minutes. Do not share this code.";

    if ($provider === 'bulksmsbd') {
        $params = [
            'api_key'  => $apiKey,
            'type'     => 'text',
            'number'   => $phoneInfo['e164'],
            'senderid' => $senderId ?: 'Random',
            'message'  => $message
        ];
        $res = pw_otp_http_request('https://bulksmsbd.net/api/smsapi', 'POST', $params, false);
        if (!$res['ok']) {
            return ['sent' => false, 'error' => $res['error'] ?: 'BulkSMSBD connection error'];
        }
        $json = json_decode($res['body'], true);
        if (is_array($json) && isset($json['response_code'])) {
            $code = (int)$json['response_code'];
            if ($code === 202) {
                return ['sent' => true, 'provider' => 'bulksmsbd'];
            }
            return ['sent' => false, 'error' => $json['error_message'] ?? ('BulkSMSBD error code ' . $code)];
        }
        return ['sent' => stripos($res['body'], '202') !== false, 'error' => trim($res['body']) ?: 'BulkSMSBD unexpected response'];
    }

    if ($provider === 'greenweb') {
        $params = [
            'token'   => $apiKey,
            'to'      => $phoneInfo['local11'],
            'message' => $message
        ];
        $res = pw_otp_http_request('https://api.greenweb.com.bd/api.php', 'POST', $params, false);
        if (!$res['ok']) {
            return ['sent' => false, 'error' => $res['error'] ?: 'GreenWeb connection error'];
        }
        $body = trim((string)$res['body']);
        if (stripos($body, 'Ok:') !== false || stripos($body, 'SENT') !== false) {
            return ['sent' => true, 'provider' => 'greenweb'];
        }
        return ['sent' => false, 'error' => $body ?: 'GreenWeb rejected SMS'];
    }

    if ($provider === 'mimsms') {
        $params = [
            'UserName'        => trim((string)SMS_USERNAME),
            'Apikey'          => $apiKey,
            'MobileNumber'    => $phoneInfo['e164'],
            'CampaignId'      => 'null',
            'SenderName'      => $senderId,
            'TransactionType' => 'T',
            'Message'         => $message
        ];
        $res = pw_otp_http_request('https://api.mimsms.com/api/SmsSending/SMS', 'POST', $params, true);
        if (!$res['ok']) {
            return ['sent' => false, 'error' => $res['error'] ?: 'MimSMS connection error'];
        }
        $json = json_decode($res['body'], true);
        if (is_array($json) && ((string)($json['statusCode'] ?? '') === '200' || strtoupper((string)($json['status'] ?? '')) === 'SUCCESS')) {
            return ['sent' => true, 'provider' => 'mimsms'];
        }
        return ['sent' => false, 'error' => $json['responseResult'] ?? $res['body'] ?: 'MimSMS error'];
    }

    if ($provider === 'elitbuzz') {
        $params = [
            'api_key'  => $apiKey,
            'type'     => 'text',
            'contacts' => $phoneInfo['e164'],
            'senderid' => $senderId,
            'msg'      => $message
        ];
        $res = pw_otp_http_request('https://msg.elitbuzz-bd.com/smsapi', 'POST', $params, false);
        if (!$res['ok']) {
            return ['sent' => false, 'error' => $res['error'] ?: 'Elitbuzz connection error'];
        }
        $body = trim((string)$res['body']);
        if (stripos($body, 'SMS SUBMITTED') !== false) {
            return ['sent' => true, 'provider' => 'elitbuzz'];
        }
        return ['sent' => false, 'error' => $body ?: 'Elitbuzz rejected SMS'];
    }

    if ($provider === 'sslwireless') {
        $params = [
            'api_token' => $apiKey,
            'sid'       => $senderId,
            'msisdn'    => $phoneInfo['e164'],
            'sms'       => $message,
            'csms_id'   => bin2hex(random_bytes(8))
        ];
        $res = pw_otp_http_request('https://smsplus.sslwireless.com/api/v3/send-sms', 'POST', $params, true);
        if (!$res['ok']) {
            return ['sent' => false, 'error' => $res['error'] ?: 'SSLWireless connection error'];
        }
        $json = json_decode($res['body'], true);
        if (is_array($json) && (strtoupper((string)($json['status'] ?? '')) === 'SUCCESS' || (int)($json['status_code'] ?? 0) === 200)) {
            return ['sent' => true, 'provider' => 'sslwireless'];
        }
        return ['sent' => false, 'error' => $json['error_message'] ?? $res['body'] ?: 'SSLWireless error'];
    }

    if ($provider === 'custom') {
        $rawUrl = trim((string)SMS_CUSTOM_URL);
        if ($rawUrl === '') {
            return ['sent' => false, 'error' => 'SMS_CUSTOM_URL is empty'];
        }
        $replacements = [
            '{api_key}'   => rawurlencode($apiKey),
            '{sender_id}' => rawurlencode($senderId),
            '{phone_88}'  => rawurlencode($phoneInfo['e164']),
            '{phone_01}'  => rawurlencode($phoneInfo['local11']),
            '{phone_10}'  => rawurlencode($phoneInfo['core10']),
            '{otp}'       => rawurlencode($otpCode),
            '{message}'   => rawurlencode($message)
        ];
        $finalUrl = strtr($rawUrl, $replacements);
        $method = strtoupper(trim((string)SMS_CUSTOM_METHOD)) === 'GET' ? 'GET' : 'POST';
        $payload = ($method === 'POST') ? [
            'api_key'   => $apiKey,
            'sender_id' => $senderId,
            'to'        => $phoneInfo['e164'],
            'phone'     => $phoneInfo['local11'],
            'otp'       => $otpCode,
            'message'   => $message
        ] : [];
        $res = pw_otp_http_request($finalUrl, $method, $payload, (bool)SMS_CUSTOM_JSON);
        if ($res['ok']) {
            return ['sent' => true, 'provider' => 'custom'];
        }
        return ['sent' => false, 'error' => $res['error'] ?: ('HTTP ' . $res['httpCode'])];
    }

    return ['sent' => false, 'error' => 'Unsupported SMS_PROVIDER: ' . $provider];
}
