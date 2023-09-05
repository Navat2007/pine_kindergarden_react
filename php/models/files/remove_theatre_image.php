<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$error = 0;
$error_text = "";
$sqls = array();
$params = null;

$ID = htmlspecialchars($_POST["ID"]);
$isTheatre = htmlspecialchars($_POST["isTheatre"]);
$isVisit = htmlspecialchars($_POST["isVisit"]);
$url = htmlspecialchars($_POST["url"]);

if(!empty($url))
{
    $photo_path = $_SERVER['DOCUMENT_ROOT'] . $url;
    @unlink($photo_path);
}

if((int)$isTheatre === 1){

    $sql = "DELETE FROM theatres_photo WHERE ID = '$ID'";

}
else{

    $sql = "DELETE FROM theatre_request_photo WHERE ID = '$ID'";

}

$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

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