<?php
/**
 * OKExPay Collect (PayIn) for cPanel
 * Initiates bKash / Nagad payment request
 */
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

// Allow CORS if called from external frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read parameters from POST JSON or form-urlencoded or GET
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);
if (empty($data)) {
    $data = $_POST ?: $_GET;
}

$amount = isset($data['amount']) ? intval($data['amount']) : 0;
$phone = isset($data['phone']) ? trim($data['phone']) : 'user';
$payType = isset($data['pay_type']) ? strtoupper(trim($data['pay_type'])) : 'BKASH';
if ($payType === 'NAGAD-C') $payType = 'NAGAD';
if ($payType === 'BKASH-C') $payType = 'BKASH';

if ($amount < 10) {
    echo json_encode([
        'success' => false,
        'message' => 'সর্বনিম্ন রিচার্জ পরিমাণ ১০ টাকা'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Generate unique Order Number
$outTradeNo = 'PW' . round(microtime(true) * 1000) . rand(1000, 9999);

$notifyUrl = SITE_BASE_URL . dirname($_SERVER['PHP_SELF']) . '/notify.php';
$returnUrl = SITE_BASE_URL . '/?payment=return&out_trade_no=' . $outTradeNo;

// Build payload with Merchant 5393 credentials
$payload = [
    'mchId'        => OKEXPAY_MCH_ID,
    'currency'     => 'BDT',
    'out_trade_no' => $outTradeNo,
    'pay_type'     => $payType,
    'money'        => (string)$amount,
    'attach'       => $phone,
    'notify_url'   => $notifyUrl,
    'returnUrl'    => $returnUrl
];
$payload['sign'] = okexpay_generate_sign($payload, OKEXPAY_MCH_KEY);

function send_post_request($url, $params) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 12);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);
    if ($err) return null;
    return json_decode($response, true);
}

// 1. Try production endpoint
$gatewayResponse = send_post_request(OKEXPAY_PROD_URL, $payload);

// 2. If production account is pending activation, use sandbox
$isSandbox = false;
if (!$gatewayResponse || !isset($gatewayResponse['code']) || $gatewayResponse['code'] !== 0) {
    $payload['mchId'] = OKEXPAY_SANDBOX_MCH_ID;
    $payload['sign'] = okexpay_generate_sign($payload, OKEXPAY_SANDBOX_MCH_KEY);
    $gatewayResponse = send_post_request(OKEXPAY_SANDBOX_URL, $payload);
    $isSandbox = true;
}

if ($gatewayResponse && isset($gatewayResponse['code']) && $gatewayResponse['code'] === 0) {
    $payUrl = isset($gatewayResponse['data']['url']) ? $gatewayResponse['data']['url'] : '';
    $transId = isset($gatewayResponse['data']['transaction_Id']) ? $gatewayResponse['data']['transaction_Id'] : '';

    // Save order record
    okexpay_save_order($outTradeNo, [
        'out_trade_no'   => $outTradeNo,
        'phone'          => $phone,
        'amount'         => $amount,
        'pay_type'       => $payType,
        'status'         => 'pending',
        'transaction_Id' => $transId,
        'pay_url'        => $payUrl,
        'is_sandbox'     => $isSandbox,
        'created_at'     => date('Y-m-d H:i:s')
    ]);

    // If request wants a redirect directly (from HTML form)
    if (isset($_GET['redirect']) && $_GET['redirect'] == '1' && !empty($payUrl)) {
        header('Location: ' . $payUrl);
        exit;
    }

    echo json_encode([
        'success'        => true,
        'payUrl'         => $payUrl,
        'out_trade_no'   => $outTradeNo,
        'transaction_Id' => $transId,
        'isSandbox'      => $isSandbox,
        'message'        => 'পেমেন্ট গেটওয়েতে সংযোগ সম্পন্ন হয়েছে।'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => isset($gatewayResponse['msg']) ? $gatewayResponse['msg'] : 'গেটওয়ে সংযোগে ব্যর্থ হয়েছে'
], JSON_UNESCAPED_UNICODE);
