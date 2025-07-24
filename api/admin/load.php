<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require_once __DIR__ . "/../database/db.php";
$db = DB::getInstance();

$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    echo json_encode(['success' => false, 'message' => 'Токен не передан']);
    exit;
}
$token = trim(str_replace('Bearer', '', $headers['Authorization']));
$stmt = $db->prepare('SELECT `role` FROM users WHERE token = ? LIMIT 1');
$stmt->bind_param('s', $token);
$stmt->execute();
$result = $stmt->get_result();
$user_is_admin = $result->fetch_assoc()['role'];

if ($user_is_admin != 'admin')
    header('Location: /index.html');

$usersResult = $db->query("SELECT id, surname, firstname, lastname, phone FROM users");
$users = [];
while ($row = $usersResult->fetch_assoc())
    $users[] = $row;

$usersBidResult = $db->query("SELECT id, fio, phone, `service` FROM userbid");
$usersBid = [];
while ($row = $usersBidResult->fetch_assoc())
    $usersBid[] = $row;

$servicesResult = $db->query("SELECT * FROM services");
$services = [];
while ($row = $servicesResult->fetch_assoc())
    $services[] = $row;

echo json_encode(['success' => true, 'users' => $users, 'usersbid' => $usersBid, 'services'=> $services]);
?>