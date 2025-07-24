<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . "/../database/db.php";
$db = DB::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $db->prepare("SELECT * FROM reviews");
        $stmt->execute();
        $result = $stmt->get_result();

        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'id обязателен для удаления']);
            exit;
        }

        $stmt = $db->prepare("DELETE FROM reviews WHERE id = ?");
        $stmt->bind_param("i", $data['id']);
        $stmt->execute();

        echo json_encode(['success' => true]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Метод не поддерживается']);
        break;
}
?>