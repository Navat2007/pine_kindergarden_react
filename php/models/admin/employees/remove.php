<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "DELETE FROM employees WHERE ID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$sql = "DELETE FROM employee_education WHERE employeeID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$sql = "DELETE FROM employee_qualification WHERE employeeID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$sql = "DELETE FROM employee_work WHERE employeeID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$sql = "DELETE FROM employee_reward WHERE employeeID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);

$path = $_SERVER['DOCUMENT_ROOT'] . "/files/employees/" . $id;

if(file_exists($path)){
    array_map('unlink', glob("$path/*.*"));
    rmdir($path);
}

$log->add($conn, $authorization[1], 'Сотрудник ID: ' . $id . ' удален');

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';