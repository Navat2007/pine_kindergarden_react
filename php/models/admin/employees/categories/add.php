<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$sorting = mysqli_real_escape_string($conn, htmlspecialchars($_POST["sorting"]));

$sql = "INSERT INTO 
            employee_category (title, sorting) 
        VALUES ('$title', '$sorting')
    ";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);
$lastID = mysqli_insert_id($conn);

if (!$result  || (int)$lastID === 0) {
    $error = 1;
    $error_text = "Ошибка добавления подразделения: " .  mysqli_error($conn);
} else {
    $log->add($conn, $userID, 'Добавлено подразделение ID: ' . $lastID);
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';