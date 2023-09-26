<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$ID = htmlspecialchars($_POST["ID"]);
$url = htmlspecialchars($_POST["url"]);

if(!empty($url))
{
    $photo_path = $_SERVER['DOCUMENT_ROOT'] . $url;
    @unlink($photo_path);
}

$sql = "UPDATE media_files SET url = '' WHERE ID = '$ID'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';