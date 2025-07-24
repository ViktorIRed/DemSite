<?php
class DB
{
    private static $instance = null;
    private $_db = null;

    private static $host = 'localhost'; //domain: example.com or ip address: 127.0.0.1
    private static $port = 3306; //you port mysql database
    private static $database = 'api_database'; //name database from mysql
    private static $username = 'root'; //NOT USE root user, better create simple user with limited rights
    private static $password = ''; //use a complex password, for example HEX 256bit

    private function __construct()
    {
        $this->_db = mysqli_connect(self::$host, self::$username, self::$password, self::$database, self::$port);
        if (!$this->_db) {
            throw new Exception("Ошибка подключения к БД: " . mysqli_connect_error());
        }
        mysqli_set_charset($this->_db, "utf8");
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance->_db;
    }
}

?>