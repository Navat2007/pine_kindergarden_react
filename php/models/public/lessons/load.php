<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        ID, title, image, create_time
    FROM 
        lessons
    ORDER BY create_time";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params[] = (object)[
            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'image' => htmlspecialchars_decode($row->image),
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';