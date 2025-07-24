# Проект API на PHP и Сайта на HTML, CSS, JS

Этот проект — API на PHP, которое можно запускать локально через XAMPP, OpenServer или любой другой веб-сервер с поддержкой PHP и MySQL.

Разрабатывался с нуля - [Виктор Коваленко(я)](https://t.me/achsick) и [Никита Буслаев](https://t.me/nikita_buslaev)

---

## Шаг 1. Размещение проекта

1. Скопируйте папку `api` в корень вашего веб-сервера:  
   - Для XAMPP: `C:\xampp\htdocs\api`  
   - Для OpenServer: `C:\OpenServer\domains\yourdomain\api`

2. Запустите веб-сервер.

---

## Шаг 2. Настройка подключения к базе данных

1. Откройте файл `api/database/db.php`.

2. Найдите и измените параметры подключения:

   ```php
   private static $host = 'localhost';       // IP или домен сервера базы данных (например, 127.0.0.1)
   private static $port = 3306;               // порт MySQL (обычно 3306)
   private static $database = 'api_database'; // имя базы данных
   private static $username = 'root';         // имя пользователя MySQL (рекомендуется не использовать root)
   private static $password = '';             // пароль пользователя (используйте сложный пароль). Рекомендую от себя использовать HEX 256bit пароль

## Готовая база данных MySQL лежит в папке api/db.sql просто импортируйте её

## Шаг 3. Изменение переменной в конфигурации

1. Откройте папку корня сайта

2. Откройте файл по пути `js/loadconfig.js`

3. Найдите и измените переменную:

    ```javascript
    const URL_API_LOAD = 'http://localhost/api'; // Домен или IP адрес где находится api например: https://127.0.0.1:8080/api или https://example.com/api

4. Запустите index.html в браузере или используйте apache, nginx или vscode live server

## Логин и пароль администратора
    - Номер: 7777777777
    - Пароль: adminadmin