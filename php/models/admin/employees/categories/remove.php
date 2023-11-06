<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM employee_category WHERE ID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$log->add($conn, $authorization[1], 'Подразделение ID: ' . $id . ' удалено');

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';