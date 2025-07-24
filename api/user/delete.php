<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
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

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = file_get_contents('php://input');

    $data = json_decode($input, true);

    if (isset($data['id'])) {
        $id = intval($data['id']);

        $db = DB::getInstance();
        $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Пользователь удалён']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка при удалении']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'ID не передан']);
    }

    exit;
}

?>