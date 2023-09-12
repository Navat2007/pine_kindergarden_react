<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$error = 0;
$error_text = "";
$sqls = array();
$params = array();

$sql = "SELECT * FROM accounts WHERE archive = '0' AND (role = 'superadmin' OR role = 'admin')";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_object($result))
    {

        $params[] = (object)[

            'ID' => (int)$row->ID,
            'email' => $row->email,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
            'role' => $row->role == "superadmin" ? "Главный администратор":"Администратор",
            'fio' => $row->fio,

        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';