<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$ID = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$url = mysqli_real_escape_string($conn, htmlspecialchars($_POST["url"]));
$content = mysqli_real_escape_string($conn, htmlspecialchars($_POST["content"]));
$photo = $_POST["photo"];
$video = $_POST["video"];
$files = $_POST["files"];

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

function CheckPageExist(): bool
{
    global $conn, $sqls, $ID;

    $sql = "SELECT 
        ID
    FROM 
        custom_pages
    WHERE 
        menuID = '$ID'";
    $result = mysqli_query($conn, $sql);

    return mysqli_num_rows($result) > 0;
}

function UpdateMenu()
{
    global $conn, $sqls, $ID, $title, $url, $userID;

    $sql = "UPDATE 
            menu
        SET
            title = '$title', 
            url = '$url',
            last_userID = '$userID'
        WHERE 
            ID = '$ID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
}

function AddPage(){
    global $conn, $sqls, $log, $ID, $title, $content, $userID;

    $sql = "
        INSERT INTO custom_pages (menuID, title, content, userID, last_userID) 
        VALUES ('$ID', '$title', '$content', '$userID', '$userID')
    ";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $error = 1;
        $error_text = "Ошибка при редактировании пользовательской страницы: " . mysqli_error($conn);
    }
    else {
        $log->add($conn, $authorization[1], 'Пользовательская страница: ' . $title . ' отредактирована');
    }
}

function EditPage(){
    global $conn, $sqls, $log, $ID, $title, $content, $userID;

    $sql = "UPDATE 
            custom_pages
        SET
            title = '$title', 
            content = '$content', 
            last_userID = '$userID'
        WHERE 
            menuID = '$ID'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (!$result) {
        $error = 1;
        $error_text = "Ошибка при редактировании пользовательской страницы: " . mysqli_error($conn);
    }
    else {
        $log->add($conn, $authorization[1], 'Пользовательская страница: ' . $title . ' отредактирована');
    }
}

function UpdateAssets()
{
    global $conn, $sqls, $error_text, $ID, $photo, $video, $files;

    $sql = "
        DELETE FROM custom_page_files WHERE menuID = '$ID'
    ";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);

    if($photo){
        foreach ($photo as $key => $value) {
            $sql = "
                INSERT INTO custom_page_files (menuID, type, url) 
                VALUES ('$ID', 'photo', '$value')
            ";
            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }
    }

    if($video){
        foreach ($video as $key => $value) {
            $sql = "
                INSERT INTO custom_page_files (menuID, type, url) 
                VALUES ('$ID', 'video', '$value')
            ";
            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }
    }

    if($files){
        foreach ($files as $key => $value) {
            $error_text = $value;
            $fileTitle = $value['title'];
            $fileUrl = $value['url'];
            $sql = "
                INSERT INTO custom_page_files (menuID, type, url, title) 
                VALUES ('$ID', 'file', '$fileUrl', '$fileTitle')
            ";
            $sqls[] = $sql;
            mysqli_query($conn, $sql);
        }
    }
}

if(CheckTitle()){
    UpdateMenu();

    if(CheckPageExist())
        EditPage();
    else
        AddPage();

    UpdateAssets();
}
else{
    $error = 1;
    $error_text = "Ошибка при редактировании пользовательской страницы: такое название уже существует";
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';