<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$ID = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

if((int)$ID === 1){
    $error = 1;
    $error_text = "Данного администратора нельзя удалять!";
}

if($error === 0){

    $sql = "UPDATE accounts SET archive = '1', token = '' WHERE ID = '$ID' AND archive = '0'";
    mysqli_query($conn, $sql);

    $log->add($conn, $authorization[1], 'Администратор отправлен в архив #' . $ID);

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