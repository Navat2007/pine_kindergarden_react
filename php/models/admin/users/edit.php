<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$ID = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$login = htmlspecialchars($_POST["login"]);
$email = htmlspecialchars($_POST["email"]);
$password = htmlspecialchars($_POST["password"]);
$fio = htmlspecialchars($_POST["fio"]);
$phone = htmlspecialchars($_POST["phone"]);
$position = htmlspecialchars($_POST["position"]);
$org_name = htmlspecialchars($_POST["org_name"]);
$active = htmlspecialchars($_POST["active"]) === "true" ? 1 : 0;
$role = htmlspecialchars($_POST["superadmin"]) === "true" ? "superadmin" : "admin";

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM accounts WHERE ID = '$ID'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);
$admin_row = mysqli_fetch_object($result);

if($admin_row->email != $email){
    $sql = "SELECT * FROM accounts WHERE email = '$email' AND archive = 0";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0)
    {
        $error = 1;
        $error_text = "Такой email уже существует";
    }
}

if((int)$authorization[1] !== (int)$ID && ((int)$ID === 1 || (int)$ID === 2)){
    $error = 1;
    $error_text = "Данного администратора нельзя редактировать!";
}

if($error === 0){
    $sql = "UPDATE 
                accounts 
            SET 
                email = '$email', 
                login = '$login', 
                role = '$role', 
                fio = '$fio', 
                phone = '$phone', 
                position = '$position', 
                org_name = '$org_name',
                active = '$active', 
                token = '', 
                last_userID = '$userID' 
            WHERE ID = '$ID' AND archive = '0'";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    if(isset($_POST["password"]) && trim($_POST["password"]) != "")
    {
        $pwd = trim(htmlspecialchars($_POST["password"]));
        $new_password = password_hash($pwd, PASSWORD_DEFAULT);
        $current_password = $admin_row->pwd;
        $old_password = $admin_row->last_pwd;

        if(password_verify($pwd, $current_password))
        {
            $error = "1";
            $error_text = "Пароль совпадает с текущим";
        }
        elseif (password_verify($pwd, $old_password))
        {
            $error = "1";
            $error_text = "Пароль совпадает с предыдущим";
        }
        else
        {
            $update_query = "UPDATE accounts SET pwd = '$new_password', last_pwd = '$current_password', pwd_change_date = NOW() WHERE ID = '$ID' AND archive = '0'";
            $sqls[] = $update_query;
            mysqli_query($conn, $update_query);

            $helper->sendEmailWithPassword($conn, $email, $pwd, false);
        }

    }

    $log->add($conn, $authorization[1], 'Администратор отредактирован #' . $ID);
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