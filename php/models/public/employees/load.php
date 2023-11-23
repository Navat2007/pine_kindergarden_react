<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        t1.*, t2.title as category, t2.sorting
    FROM 
        employees as t1
    LEFT JOIN 
        employee_category as t2 ON t1.categoryID = t2.ID
    ORDER BY t2.sorting = '0', t2.sorting";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $persons = [];
    $categories = [];

    while ($row = mysqli_fetch_object($result)) {

        $persons[] = (object)[
            'ID' => (int)$row->ID,
            'photo' => htmlspecialchars_decode($row->photo),
            'fio' => htmlspecialchars_decode($row->fio),
            'position' => htmlspecialchars_decode($row->position),
            'category' => htmlspecialchars_decode($row->category),
        ];

        if(in_array($row->category, $categories) == false) {
            $categories[] = $row->category;
        }

    }

    foreach ($categories as $category) {
        $personsForCategory = [];

        foreach ($persons as $person) {
            if($person->category == $category) {
                $personsForCategory[] = $person;
            }
        }

        $params[] = (object)[
            'category' => $category,
            'persons' => $personsForCategory
        ];
    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';