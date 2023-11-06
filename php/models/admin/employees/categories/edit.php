<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$sorting = mysqli_real_escape_string($conn, htmlspecialchars($_POST["sorting"]));

$sql = "UPDATE 
                employee_category
            SET
                title = '$title',
                sorting = '$sorting'
            WHERE 
                ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (!$result) {
    $error = 1;
    $error_text = "Ошибка при редактировании подразделения: " . mysqli_error($conn);
}
else {
    $log->add($conn, $authorization[1], 'Подразделение ID: ' . $id . ' отредактировано');
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';