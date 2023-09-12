<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$ID = $authorization[1];
$text = mysqli_real_escape_string($conn, htmlspecialchars($_POST["text"]));
$email = mysqli_real_escape_string($conn, htmlspecialchars($_POST["email"]));
$fio = "";
$org_short_name = "";

$error = "";
$error_text = "";

try {
    $sql = "INSERT INTO support (userID, email, text) VALUES ('$ID', '$email', '$text')";
    mysqli_query($conn, $sql);
}
catch (Exception $exception){}

$sql = "SELECT * FROM accounts WHERE ID = '$ID'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_object($result);
    $fio = $row->fio;

    if((int)$row->schoolID == 0){
        $org_short_name = htmlspecialchars_decode($row->org_name);
    }
    else
    {
        $sql = "SELECT * FROM schools WHERE ID = '$row->schoolID'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_object($result);
        $org_short_name = htmlspecialchars_decode($row->org_short_name);
    }

}

$content = (object)[

    'entry' => (object)[
        'POST' => $_POST,
    ],
    'error' => $error,
    'error_text' => $error_text,
    'params' => $params,

];

echo json_encode($content);