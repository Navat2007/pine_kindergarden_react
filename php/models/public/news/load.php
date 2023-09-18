<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        item.ID, item.preview_title, item.preview_text, item.preview_image, item.date, item.active
    FROM 
        item as item
    WHERE 
        item.archive = '0' AND item.active = '1' AND item.date <= NOW()
    ORDER BY date DESC";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $types = (object)[

            'ID' => (int)$row->ID,
            'preview_title' => htmlspecialchars_decode($row->preview_title),
            'preview_text' => htmlspecialchars_decode($row->preview_text),
            'preview_image' => $row->preview_image,
            'date' => $row->date,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
        ];

        $params[] = $types;

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';