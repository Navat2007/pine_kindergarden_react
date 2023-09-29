<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$ID = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$sql = "SELECT * FROM accounts WHERE ID = '$ID'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $params = (object)[

            'ID' => (int)$row->ID,
            'email' => $row->email,
            'photo' => $row->photo,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'role' => getRole($row->role),
            'fio' => $row->fio,
            'phone' => $row->phone,

        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';

function getRole($text): string {

    $result = "Пользователь";

    switch ($text){

        case "superadmin":
            $result = "Главный администратор";
            break;

        case "admin":
            $result = "Администратор";
            break;

    }

    return $result;

}