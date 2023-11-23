<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        *
    FROM 
        documents
    ORDER BY create_time DESC";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params[] = (object)[
            'ID' => (int)$row->ID,
            'titleShort' => htmlspecialchars_decode($row->title_short),
            'title' => htmlspecialchars_decode($row->title),
            'url' => htmlspecialchars_decode($row->url),
            'image' => htmlspecialchars_decode($row->image),
            'create_time' => $row->create_time,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';