<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM media_files WHERE ID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$path = $_SERVER['DOCUMENT_ROOT'] . "/files/mediaFiles/" . $id;
$helper->rrmdir($path);

$log->add($conn, $authorization[1], 'Файл ID: ' . $id . ' удален');

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';