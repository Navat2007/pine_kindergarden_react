<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

function getPhoto($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            news_images as image 
        WHERE 
            image.newsID = '$ID'";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[

                'ID' => (int)$row->ID,
                'url' => $row->url,
                'main' => (int)$row->main,
                'order' => (int)$row->photo_order,
                'isFile' => 1,
                'isLoaded' => 1

            ];
        }
    }

    return $data;
}

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
        item.*
    FROM 
        item as item
    WHERE 
        item.ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[

            'ID' => (int)$row->ID,
            'preview_title' => htmlspecialchars_decode($row->preview_title),
            'title' => htmlspecialchars_decode($row->title),
            'preview_text' => htmlspecialchars_decode($row->preview_text),
            'preview_image' => $row->preview_image,
            'text' => htmlspecialchars_decode($row->text),
            'image' => $row->image,
            'images' => getPhoto($row->ID),
            'date' => $row->date,
            'show_on_main_page' => (int)$row->show_on_main_page == 1 ? "Активен" : "Отключен",
            'active' => (int)$row->active == 1 ? "Активен" : "Отключен",
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';