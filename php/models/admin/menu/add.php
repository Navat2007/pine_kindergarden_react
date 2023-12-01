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
$external = mysqli_real_escape_string($conn, htmlspecialchars($_POST["external"]));
$sorting = mysqli_real_escape_string($conn, htmlspecialchars($_POST["sorting"]));

function CheckTitle(): bool{
    global $conn, $sqls, $ID, $title;

    $sql = "SELECT 
        ID
    FROM 
        menu
    WHERE 
        title = '$title' AND ID <> '$ID'";
    $result = mysqli_query($conn, $sql);

    return mysqli_num_rows($result) == 0;
}

if(CheckTitle()){
    $sql = "INSERT INTO 
            menu (title, url, parentID, page, custom_page, external, sorting, userID, last_userID) 
        VALUES ('$title', '$url', '$parentID', '$page', '$custom_page', '$external', '$sorting', '$userID', '$userID')
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
}
else{
    $error = 1;
    $error_text = "Ошибка при добавлении пункта меню: такое название уже существует";
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';