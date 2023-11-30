<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$userID = $authorization[1];
$sorting = $_POST["sorting"];

if($sorting){
    foreach ($sorting as $key => $value) {
        $ID = $value['id'];
        $currentSorting = $value['sorting'];
        $sql = "UPDATE 
                    menu 
                SET
                    sorting = '$currentSorting',
                    last_userID = '$userID'
                WHERE
                    ID = '$ID'";
        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';