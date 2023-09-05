<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$imageID = htmlspecialchars($_POST["ID"]);
$newsID = htmlspecialchars($_POST["newsID"]);
$url = htmlspecialchars($_POST["url"]);
$place = htmlspecialchars($_POST["place"]);

if(!empty($url))
{
    $photo_path = $_SERVER['DOCUMENT_ROOT'] . $url;
    @unlink($photo_path);
}

switch ($place){

    case "images":
        $sql = "DELETE FROM news_images WHERE ID = '$imageID'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
        break;

    case "preview":
        $sql = "UPDATE news SET preview_image = '' WHERE ID = '$newsID'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
        break;

    case "review":
        $sql = "UPDATE news SET image = '' WHERE ID = '$newsID'";
        $sqls[] = $sql;
        $result = mysqli_query($conn, $sql);
        break;

}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';