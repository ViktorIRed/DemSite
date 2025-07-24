<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . "/../database/db.php";
$db = DB::getInstance();


switch ($_GET['list']) {
    case 'services':
        $list = $db->query('SELECT * FROM services');
        $json = [];
        while ($service = $list->fetch_assoc()) {
            $json[] = $service;
        }
        echo json_encode(['success' => true, 'list' => $json]);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'list not found']);
        break;
}
?>