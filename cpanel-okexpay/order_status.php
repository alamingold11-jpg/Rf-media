<?php
/**
 * Order Status Query for cPanel
 */
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$outTradeNo = isset($_GET['out_trade_no']) ? trim($_GET['out_trade_no']) : '';
if (empty($outTradeNo)) {
    echo json_encode(['success' => false, 'message' => 'out_trade_no required']);
    exit;
}

$orders = okexpay_get_orders();
if (!isset($orders[$outTradeNo])) {
    echo json_encode(['success' => false, 'message' => 'Order not found']);
    exit;
}

echo json_encode([
    'success' => true,
    'order'   => $orders[$outTradeNo]
], JSON_UNESCAPED_UNICODE);
