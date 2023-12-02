<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

function getItems($parentID, $menu) {
    $items = [];
    foreach ($menu as $item) {
        if ($item->parentID == $parentID) {
            $item->submenu = getItems($item->ID, $menu);
            $items[] = $item;
        }
    }
    return $items;
}

$sql = "SELECT 
        *
    FROM 
        menu
    ORDER BY parentID, sorting";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $menu = [];

    while ($row = mysqli_fetch_object($result)) {
        $menu[] = (object)[
            'ID' => (int)$row->ID,
            'parentID' => (int)$row->parentID,
            'sorting' => (int)$row->sorting,
            'custom_page' => (int)$row->custom_page,
            'page' => (int)$row->page,
            'external' => (int)$row->external,
            'title' => htmlspecialchars_decode($row->title),
            'url' => htmlspecialchars_decode($row->url),
        ];
    }

    $params['all'] = $menu;
    $params['sorted'] = getItems(0, $menu);
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';