<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        news.ID, news.preview_title, news.preview_text, news.preview_image, news.date, news.active
    FROM 
        news as news
    WHERE 
        news.archive = '0' AND news.active = '1' AND news.date <= NOW()
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