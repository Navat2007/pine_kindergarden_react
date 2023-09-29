<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        ID, title, file_name, url, type, create_time
    FROM 
        media_files
    ORDER BY create_time DESC";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params[] = (object)[
            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'file_name' => htmlspecialchars_decode($row->file_name),
            'url' => htmlspecialchars_decode($row->url),
            'type' => htmlspecialchars_decode($row->type),
            'create_time' => $row->create_time,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';