<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

function getEducations($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            employee_education as p 
        WHERE 
            p.employeeID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
                'ID' => (int)$row->ID,
                'orgName' => htmlspecialchars_decode($row->org_name),
                'endDate' => $row->end_date,
                'qualification' => htmlspecialchars_decode($row->qualification),
            ];

        }
    }

    return $data;
}

function getQualifications($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            employee_qualification as p 
        WHERE 
            p.employeeID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
                'ID' => (int)$row->ID,
                'title' => htmlspecialchars_decode($row->title),
                'date' => $row->date,
                'place' => htmlspecialchars_decode($row->place),
                'hours' => (int)$row->hours,
            ];

        }
    }

    return $data;
}

function getWorks($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            employee_work as p 
        WHERE 
            p.employeeID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
                'ID' => (int)$row->ID,
                'summary' => htmlspecialchars_decode($row->summary),
                'education' => htmlspecialchars_decode($row->education),
                'work' => htmlspecialchars_decode($row->work),
                'category' => htmlspecialchars_decode($row->category),
                'date' => $row->date,
                'date_order' => htmlspecialchars_decode($row->date_order),
            ];

        }
    }

    return $data;
}

function getRewards($ID)
{
    global $conn;

    $data = array();

    $sql = "SELECT 
            *
        FROM 
            employee_reward as p 
        WHERE 
            p.employeeID = '$ID'";

    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_object($result)) {

            $data[] = (object)[
                'ID' => (int)$row->ID,
                'title' => htmlspecialchars_decode($row->title),
                'date' => $row->date,
            ];

        }
    }

    return $data;
}

$image = $_POST["image"] ?? [];
$educations = $_POST["educations"] ?? [];
$qualifications = $_POST["qualification"] ?? [];
$works = $_POST["work"] ?? [];
$rewards = $_POST["reward"] ?? [];

$id = htmlspecialchars($_POST["id"]);

$sql = "SELECT 
            t1.*, t2.title as category
        FROM 
            employees as t1
        LEFT JOIN 
            employee_category as t2 ON t1.categoryID = t2.ID
        WHERE 
            t1.ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_object($result)) {

        $params = (object)[
            'ID' => (int)$row->ID,
            'fio' => htmlspecialchars_decode($row->fio),
            'photo' => htmlspecialchars_decode($row->photo),
            'position' => htmlspecialchars_decode($row->position),
            'category' => htmlspecialchars_decode($row->categoryID),
            'page' => htmlspecialchars_decode($row->page),
            'educations' => getEducations($id),
            'qualifications' => getQualifications($id),
            'works' => getWorks($id),
            'rewards' => getRewards($id),
        ];

    }
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';