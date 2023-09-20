<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$sql = "SELECT 
        t1.*, t2.title as category
    FROM 
        teachers as t1
    LEFT JOIN 
        teacher_category as t2 ON t1.categoryID = t2.ID
    ORDER BY create_time DESC";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $row->fio = $row->f . ' ' . $row->i . ' ' . $row->o;

        $params[] = $row;

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';