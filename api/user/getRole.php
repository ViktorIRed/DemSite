<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require_once __DIR__ . "/../database/db.php";

// Получаем заголовки
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(['success' => false, 'message' => 'Токен не передан']);
    exit;
}

$token = trim(str_replace('Bearer', '', $headers['Authorization']));

// Получаем подключение к БД
$db = DB::getInstance();

$stmt = $db->prepare('SELECT `role` FROM users WHERE token = ? LIMIT 1');
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    echo json_encode(['success' => true, 'user' => ['role' => $user['role']]]);
} else {
    echo json_encode(['success' => false, 'message' => 'Пользователь не найден']);
}

$stmt->close();
