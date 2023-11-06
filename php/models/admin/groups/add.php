<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$preview = mysqli_real_escape_string($conn, htmlspecialchars($_POST["preview"]));
$text = mysqli_real_escape_string($conn, htmlspecialchars($_POST["text"]));

$teachers = $_POST["employees"];
$image = $_POST["image"];

$sql = "
        INSERT INTO groups (title, preview, text, userID, last_userID) 
        VALUES ('$title', '$preview', '$text', '$userID', '$userID')
    ";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);
$lastID = mysqli_insert_id($conn);

if($lastID > 0){
    foreach ($teachers as $teacher) {

        $sql = "
        INSERT INTO group_teachers (groupID, teacherID) 
        VALUES ('$lastID', '$teacher')";

        $sqls[] = $sql;
        mysqli_query($conn, $sql);
    }

    if(is_array($image)){
        for ($i = 0; $i < count($image); $i++) {
            $url = $image[$i]['url'];
            $main = $image[$i]['main'];
            $order = $image[$i]['order'];
            $isFile = (int)$image[$i]['isFile'];
            $isLoaded = (int)$image[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $dir_name = 'groups';
                $url = "";

                $helper->createDir("/files/" . $dir_name . "/" . $lastID);

                $temp_name = $_FILES['image']['tmp_name'][$i]['file'];
                $name = $_FILES['image']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $file_token = $helper->gen_token();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/" . $dir_name . "/" . $lastID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/" . $dir_name . "/" . $lastID . "/" . $file_token . "_" . $name;

                    $sql = "
                    UPDATE 
                        groups
                    SET
                        image = '$url'
                    WHERE 
                        ID = '$lastID'";
                    $sqls[] = $sql;
                    mysqli_query($conn, $sql);
                }
            }
        }
    }
}

if (!$result  || (int)$lastID === 0) {
    $error = 1;
    $error_text = "Ошибка добавления группы: " .  mysqli_error($conn);
} else {
    $log->add($conn, $userID, 'Добавлена группа ID: ' . $lastID);
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';