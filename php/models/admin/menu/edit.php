<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$url = mysqli_real_escape_string($conn, htmlspecialchars($_POST["url"]));
$parentID = mysqli_real_escape_string($conn, htmlspecialchars($_POST["parentID"]));
$page = mysqli_real_escape_string($conn, htmlspecialchars($_POST["page"]));
$custom_page = mysqli_real_escape_string($conn, htmlspecialchars($_POST["custom_page"]));
$external = mysqli_real_escape_string($conn, htmlspecialchars($_POST["external"]));
$sorting = mysqli_real_escape_string($conn, htmlspecialchars($_POST["sorting"]));

function CheckTitle(): bool{
    global $conn, $sqls, $id, $title, $custom_page;

    $sql = "SELECT 
        ID
    FROM 
        menu
    WHERE 
        title = '$title' AND ID <> '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if((int)$custom_page == 0)
        return true;
    else if(mysqli_num_rows($result) == 0)
        return true;

    return false;
}

if(CheckTitle()){
    $sql = "UPDATE 
            menu
        SET
            title = '$title', 
            url = '$url', 
            sorting = '$sorting', 
            parentID = '$parentID', 
            page = '$page', 
            custom_page = '$custom_page', 
            external = '$external', 
            last_userID = '$userID'
        WHERE 
            ID = '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if((int)$custom_page != 1){
        $sql = "DELETE FROM custom_pages WHERE menuID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);

        $sql = "DELETE FROM custom_page_files WHERE menuID = '$id'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    if (!$result) {
        $error = 1;
        $error_text = "Ошибка при редактировании меню: " . mysqli_error($conn);
    }
    else {
        $log->add($conn, $authorization[1], 'Пункт меню: ' . $title . ' отредактирован');
    }
}
else{
    $error = 1;
    $error_text = "Ошибка при редактировании пункта меню: такое название уже существует";
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';