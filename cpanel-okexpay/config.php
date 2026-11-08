<?php
/**
 * OKExPay Gateway Configuration for cPanel
 * Merchant: 5393
 */

define('OKEXPAY_MCH_ID', '5393');
define('OKEXPAY_MCH_KEY', 'd8490b215ef5248d7fb693a101f9898d');

// Gateway Hosts
define('OKEXPAY_PROD_URL', 'https://api.wpay.life/v1/Collect');
define('OKEXPAY_SANDBOX_URL', 'https://sandbox.okexpay.dev/v1/Collect');
define('OKEXPAY_SANDBOX_MCH_ID', '1000');
define('OKEXPAY_SANDBOX_MCH_KEY', '4035fcd2d720e1b06ea455bdde411012');

// Base URL of your website/cPanel domain
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$domain = $_SERVER['HTTP_HOST'];
define('SITE_BASE_URL', $protocol . $domain);

// File-based order storage path
define('ORDERS_DB_FILE', __DIR__ . '/orders_data.json');

/**
 * OKExPay MD5 Signature Generation:
 * 1. Exclude 'sign' and empty parameters
 * 2. Sort keys ASCII lexicographically
 * 3. Concatenate key1=value1&key2=value2...&key=SECRET_KEY
 * 4. Lowercase MD5 hash
 */
function okexpay_generate_sign($params, $secretKey) {
    ksort($params);
    $signStr = '';
    foreach ($params as $k => $v) {
        if ($k !== 'sign' && $v !== null && $v !== '') {
            $signStr .= $k . '=' . $v . '&';
        }
    }
    $signStr .= 'key=' . $secretKey;
    return strtolower(md5($signStr));
}

function okexpay_verify_sign($params, $secretKey) {
    if (empty($params['sign'])) return false;
    $calculated = okexpay_generate_sign($params, $secretKey);
    return strtolower($calculated) === strtolower($params['sign']);
}

function okexpay_get_orders() {
    if (file_exists(ORDERS_DB_FILE)) {
        $data = file_get_contents(ORDERS_DB_FILE);
        return json_decode($data, true) ?: [];
    }
    return [];
}

function okexpay_save_order($orderNo, $orderData) {
    $orders = okexpay_get_orders();
    $orders[$orderNo] = $orderData;
    file_put_contents(ORDERS_DB_FILE, json_encode($orders, JSON_PRETTY_PRINT));
}
