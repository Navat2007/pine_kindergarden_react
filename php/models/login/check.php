<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';

$login = mysqli_real_escape_string($conn, htmlspecialchars($_POST["login"]));
$password = mysqli_real_escape_string($conn, htmlspecialchars($_POST["password"]));

$error = 0;
$error_text = "";
$sqls = array();
$params = (object)[];

if (strlen($login) > 72) {
    $error = 1;
    $error_text = "Ошибка, логин или пароль введен неверно";
    die();
}
if (strlen($password) > 72) {
    $error = 1;
    $error_text = "Ошибка, логин или пароль введен неверно";
    die();
}

if (!empty($login) && !empty($password) ) {

    $sql = "SELECT 
                accounts.*
            FROM 
                accounts
            WHERE 
                accounts.archive = '0' AND (accounts.email = '$login' OR accounts.login = '$login')";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $params->sql = $sql;

    if (mysqli_num_rows($result) > 0) {

        $row = mysqli_fetch_object($result);

        if((int)$row->active === 0)
        {
            $error = 1;
            $error_text = "Ошибка, учетная запись отключена";
        }
        else if (password_verify($password, $row->pwd)) {

            $params = get_all_info($row, $conn);

        } else {

            $error = 1;
            $error_text = "Ошибка, логин или пароль введен неверно";

        }

    }
    else {

        $error = 1;
        $error_text = "Ошибка, логин или пароль введен неверно";

    }

} else {

    $error = 1;
    $error_text = "Ошибка, логин или пароль введен неверно";

}

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

function gen_token(): string
{

    return sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0xffff)
    );

}

function get_all_info($row, $conn): object
{

    $token = gen_token();

    $sql = "UPDATE accounts SET token = '$token' WHERE ID = '$row->ID'";
    mysqli_query($conn, $sql);

    $roleTitle = "";

    switch ($row->role){

        case "user":
            $roleTitle = "Пользователь";
            break;
        case "admin":
            $roleTitle = "Администратор";
            break;
        case "superadmin":
            $roleTitle = "Главный администратор";
            break;

    }

    return (object)[

        'ID' => (int)$row->ID,
        'login' => $row->login,
        'email' => $row->email,
        'phone' => $row->phone,
        'photo' => $row->photo,
        'fio' => $row->fio,
        'create_time' => $row->create_time,
        'role' => $row->role,
        'role_title' => $roleTitle,
        'roles' => get_roles($conn, $row->ID, $row->role),
        'new_user' => (int)$row->new_user,
        'token' => $token,

    ];

}

function get_roles($conn, $userID, $role){

    $sql1 = "SELECT * FROM admin_role WHERE userID = '$userID'";
    $result1 = mysqli_query($conn, $sql1);

    $roles = array();
    $roles[] = $role == "superadmin" ? 1:0;

    if(mysqli_num_rows($result1) > 0) {
        while ($row1 = mysqli_fetch_object($result1)) {

            $roles[] = (int)$row1->roleID;

        }
    }

    return $roles;

}