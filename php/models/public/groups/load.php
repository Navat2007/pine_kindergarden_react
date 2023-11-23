<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        ID, title, preview, image, create_time
    FROM 
        groups";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params[] = (object)[
            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'preview' => htmlspecialchars_decode($row->preview),
            'image' => $row->image,
            'create_time' => $row->create_time,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';