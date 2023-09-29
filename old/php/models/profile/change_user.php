<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);
$fio = mysqli_real_escape_string($conn, htmlspecialchars($_POST["fio"]));
$phone = mysqli_real_escape_string($conn, htmlspecialchars($_POST["phone"]));

$error = 0;
$error_text = "";
$sqls = array();
$params = "";

$sql = "UPDATE 
                accounts
            SET
                fio = '$fio', phone = '$phone'
            WHERE 
                ID = '$id'";
$sqls[] = $sql;
mysqli_query($conn, $sql);
$error_text = mysqli_error($conn);

$log->add($conn, $authorization[1], 'Пользователь ID: ' . $id . ' изменил данные профиля');

$content = (object)[

    'input_params' => (object)[
        'GET' => $_GET,
        'POST' => $_POST,
        'FILES' => $_FILES,
    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);