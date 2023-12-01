<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
        *, (SELECT COUNT(*) FROM menu WHERE parentID = '$id') AS submenu
    FROM 
        menu
    WHERE 
        ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[
            'ID' => (int)$row->ID,
            'parentID' => (int)$row->parentID,
            'sorting' => (int)$row->sorting,
            'custom_page' => (int)$row->custom_page,
            'external' => (int)$row->external,
            'page' => (int)$row->page,
            'title' => htmlspecialchars_decode($row->title),
            'url' => htmlspecialchars_decode($row->url),
            'submenu' => (int)$row->submenu,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';