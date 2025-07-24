<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . "/../database/db.php";
$db = DB::getInstance();

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Not current JSON']);
    exit;
}

function insertBid($db, array $data)
{
    $serviceID = $data['service'];
    $serviceName = $db->query("SELECT `name` FROM services WHERE id = '$serviceID'");
    $serviceName = $serviceName->fetch_assoc()['name'];
    $stmt = $db->prepare('INSERT INTO userbid(fio, phone, `service`, `timestamp`) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssss', $data['fio'], $data['phone'], $serviceName, $data['timestamp']);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

echo json_encode(['success' => insertBid($db, $data)]);
?>