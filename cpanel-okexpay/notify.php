<?php
/**
 * OKExPay Callback / Webhook (PayIn Notification)
 * Must return plain text 'success' when status == 1
 */
require_once __DIR__ . '/config.php';

// Log incoming request
$rawInput = file_get_contents('php://input');
$logEntry = date('Y-m-d H:i:s') . ' [Notify Raw]: ' . $rawInput . ' POST: ' . json_encode($_POST) . "\n";
file_put_contents(__DIR__ . '/notify.log', $logEntry, FILE_APPEND);

$params = json_decode($rawInput, true);
if (empty($params)) {
    $params = $_POST;
}

$outTradeNo = isset($params['out_trade_no']) ? trim($params['out_trade_no']) : '';
$status = isset($params['status']) ? (string)$params['status'] : '';
$money = isset($params['money']) ? floatval($params['money']) : 0;
$sign = isset($params['sign']) ? $params['sign'] : '';

// Verify signature with Production key or Sandbox key
$validProd = okexpay_verify_sign($params, OKEXPAY_MCH_KEY);
$validSand = okexpay_verify_sign($params, OKEXPAY_SANDBOX_MCH_KEY);

if ($status === '1' || $status === 'success') {
    $orders = okexpay_get_orders();
    $order = isset($orders[$outTradeNo]) ? $orders[$outTradeNo] : [
        'out_trade_no' => $outTradeNo,
        'amount'       => $money,
        'created_at'   => date('Y-m-d H:i:s')
    ];

    $order['status'] = 'paid';
    $order['paid_at'] = date('Y-m-d H:i:s');
    $order['transaction_Id'] = isset($params['transaction_Id']) ? $params['transaction_Id'] : (isset($order['transaction_Id']) ? $order['transaction_Id'] : '');

    okexpay_save_order($outTradeNo, $order);

    // Optional: Update your MySQL database here if you use MySQL on cPanel:
    /*
    $conn = new mysqli('localhost', 'db_user', 'db_pass', 'db_name');
    if (!$conn->connect_error) {
        $stmt = $conn->prepare("UPDATE users SET balance = balance + ?, lifetime_earnings = lifetime_earnings + ? WHERE phone = ?");
        $stmt->bind_param("dds", $order['amount'], $order['amount'], $order['phone']);
        $stmt->execute();
        $conn->close();
    }
    */
}

// OKExPay specification requirement:
// "When the merchant receives our callback, please return: success"
header('Content-Type: text/plain; charset=utf-8');
echo 'success';
exit;
