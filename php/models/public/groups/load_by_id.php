<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

function getTeachers($ID)
{
    global $conn, $sqls;

    $data = array();

    $sql = "SELECT 
            t2.*, t3.title as category
        FROM 
            group_teachers as t1
        LEFT JOIN 
            employees as t2 ON t1.teacherID = t2.ID
        LEFT JOIN 
            employee_category as t3 ON t2.categoryID = t3.ID
        WHERE 
            t1.groupID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
                'ID' => (int)$row->ID,
                'fio' => htmlspecialchars_decode($row->fio),
                'photo' => htmlspecialchars_decode($row->photo),
                'position' => htmlspecialchars_decode($row->position),
                'category' => htmlspecialchars_decode($row->category),
            ];

        }
    }

    return $data;
}

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
        *
    FROM 
        groups
    WHERE 
        ID = '$id'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[

            'ID' => (int)$row->ID,
            'title' => htmlspecialchars_decode($row->title),
            'preview' => htmlspecialchars_decode($row->preview),
            'text' => htmlspecialchars_decode($row->text),
            'employees' => getTeachers($row->ID),
            'image' => $row->image,
            'create_time' => $row->create_time,
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';