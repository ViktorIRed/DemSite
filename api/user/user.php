<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once __DIR__ . "/../database/db.php";

$json = file_get_contents('php://input');

$data = json_decode($json, true);

if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Not current JSON']);
    exit;
}



$user = new User($data);
if ($data['type'] == 'register') {

    if ($user->registration()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
if ($data['type'] == "authorization") {
    $token = $user->authorization();

    if ($token) {
        echo json_encode(['success' => true, 'token' => $token]);
    } else {
        echo json_encode(['success' => false]);
    }
}


class User
{
    private $_surName;
    private $_firstName;
    private $_lastName;
    private $_password;
    private $_phone;
    private $_db;

    public function __construct(array $data)
    {
        $this->_surName = $data['surName'] ?? null;
        $this->_firstName = $data['firstName'] ?? null;
        $this->_lastName = $data['lastName'] ?? null;
        $this->_password = $data['password'];
        $this->_phone = $data['phone'];
        $this->_db = DB::getInstance();
    }

    public function authorization()
    {
        $stmt = $this->_db->prepare('SELECT id, `password`, token FROM users WHERE phone = ? LIMIT 1');
        if (!$stmt) {
            throw new Exception("Ошибка подготовки запроса: " . $this->_db->error);
        }

        $stmt->bind_param("s", $this->_phone);
        $stmt->execute();
        $stmt->bind_result($id, $hashFromDb, $token);
        if ($stmt->fetch()) {
            $stmt->close();
            if (password_verify($this->_password, $hashFromDb)) {

                $token = bin2hex(random_bytes(16));
                $stmt = $this->_db->prepare("UPDATE users SET token = ? WHERE id = ?");
                if (!$stmt) {
                    throw new Exception("Ошибка подготовки запроса: " . $this->_db->error);
                }
                $stmt->bind_param("si", $token, $id);
                $stmt->execute();
                $stmt->close();
                
                return $token;
            }
        }
        return false;
    }

    public function registration()
    {
        $stmt = $this->_db->prepare("SELECT id FROM users WHERE phone = ? LIMIT 1");

        if (!$stmt) {
            throw new Exception("Ошибка подготовки запроса: " . $this->_db->error);
        }


        $stmt->bind_param("s", $this->_phone);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->close();
            return false;
        }
        $stmt->close();

        $passwordHash = password_hash($this->_password, PASSWORD_DEFAULT);

        $stmt = $this->_db->prepare("INSERT INTO users (surname, firstname, lastname, `password`, phone, `role`) VALUES (?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception("Ошибка подготовки запроса: " . $this->_db->error);
        }


        $userRole = 'user';
        $stmt->bind_param("ssssss", $this->_surName, $this->_firstName, $this->_lastName, $passwordHash, $this->_phone, $userRole);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            return true;
        }

        return false;
    }
}



?>