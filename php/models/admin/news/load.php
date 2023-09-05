<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        news.ID, news.preview_title, news.date, news.active
    FROM 
        news as news
    WHERE 
        news.archive = '0'
    ORDER BY date DESC";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params[] = (object)[

            'ID' => (int)$row->ID,
            'preview_title' => htmlspecialchars_decode($row->preview_title),
            'date' => $row->date,
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';