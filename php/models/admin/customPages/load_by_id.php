<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

function getFiles($ID){
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            custom_page_files
        WHERE 
            menuID = '$ID'";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {
            $data[] = (object)[
                'ID' => (int)$row->ID,
                'menuID' => (int)$row->menuID,
                'url' => htmlspecialchars_decode($row->url),
                'type' => htmlspecialchars_decode($row->type),
                'title' => htmlspecialchars_decode($row->title),
            ];
        }
    }

    return $data;
}

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
        *
    FROM 
        custom_pages
    WHERE 
        menuID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {
        $params = (object)[
            'ID' => (int)$row->ID,
            'menuID' => (int)$row->menuID,
            'title' => htmlspecialchars_decode($row->title),
            'content' => htmlspecialchars_decode($row->content),
            'files' => getFiles($row->menuID),
        ];
    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';