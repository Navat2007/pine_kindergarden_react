<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM news_images WHERE newsID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$sql = "DELETE FROM news WHERE ID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$path = $_SERVER['DOCUMENT_ROOT'] . "/files/news/" . $id;
array_map('unlink', glob("$path/*.*"));
rmdir($path);

$log->add($conn, $authorization[1], 'Новость ID: ' . $id . ' удалена');

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';