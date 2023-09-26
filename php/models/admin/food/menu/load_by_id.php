<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
        *
    FROM 
        food_menu
    WHERE 
        ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[
            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'text' => htmlspecialchars_decode($row->text),
            'url' => htmlspecialchars_decode($row->url),
            'image' => $row->image,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';