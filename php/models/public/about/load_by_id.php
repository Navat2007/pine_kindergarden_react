<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = 1;

$sql = "SELECT 
        *
    FROM 
        about
    WHERE 
        ID = '$id'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[
            'ID' => (int)$row->ID,
            'text' => htmlspecialchars_decode($row->text),
            'preview' => htmlspecialchars_decode($row->preview),
            'image' => $row->image,
            'preview_image' => $row->preview_image,
            'create_time' => $row->create_time,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';