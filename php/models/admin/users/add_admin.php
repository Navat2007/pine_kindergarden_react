<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$userID = $authorization[1];
$email = mysqli_real_escape_string($conn, htmlspecialchars($_POST["email"]));
$password = htmlspecialchars($_POST["password"]);
$fio = mysqli_real_escape_string($conn, htmlspecialchars($_POST["fio"]));
$phone = mysqli_real_escape_string($conn, htmlspecialchars($_POST["phone"]));
$active = htmlspecialchars($_POST["active"]) === "true" ? 1 : 0;
$role = htmlspecialchars($_POST["superadmin"]) === "true" ? "superadmin" : "admin";

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM accounts WHERE email = '$email' AND archive = 0";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    $error = 1;
    $error_text = "Такой email уже существует";
}

if($error === 0){

    $new_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO 
                accounts (email, pwd, role, fio, phone, active, userID, last_userID) 
            VALUES ('$email', '$new_password', '$role', '$fio', '$phone', '$active', '$userID', '$userID')";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    $helper->sendEmailWithPassword($conn, $email, $password, true);
    $log->add($conn, $authorization[1], 'Добавлен администратор #' . $lastID);

}

$content = (object)[

    'input_params' => (object)[
        'POST' => $_POST
    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);