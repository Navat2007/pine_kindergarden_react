<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$url = mysqli_real_escape_string($conn, htmlspecialchars($_POST["url"]));
$parentID = mysqli_real_escape_string($conn, htmlspecialchars($_POST["parentID"]));
$page = mysqli_real_escape_string($conn, htmlspecialchars($_POST["page"]));
$custom_page = mysqli_real_escape_string($conn, htmlspecialchars($_POST["custom_page"]));
$sorting = mysqli_real_escape_string($conn, htmlspecialchars($_POST["sorting"]));

$sql = "INSERT INTO 
            menu (title, url, parentID, page, custom_page, sorting, userID, last_userID) 
        VALUES ('$title', '$url', '$parentID', '$page', '$custom_page', '$sorting', '$userID', '$userID')
    ";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);
$lastID = mysqli_insert_id($conn);

if (!$result  || (int)$lastID === 0) {
    $error = 1;
    $error_text = "Ошибка добавления пункта меню: " .  mysqli_error($conn);
} else {
    $log->add($conn, $userID, 'Добавлен пункт меню: ' . $title);
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';