<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$preview = mysqli_real_escape_string($conn, htmlspecialchars($_POST["preview"]));
$text = mysqli_real_escape_string($conn, htmlspecialchars($_POST["text"]));

$teachers = $_POST["employees"];
$image = $_POST["image"];

$sql = "UPDATE 
                groups
            SET
                title = '$title', 
                preview = '$preview', 
                text = '$text', 
                last_userID = '$userID'
            WHERE 
                ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (!$result) {
    $error = 1;
    $error_text = "Ошибка при редактировании группы: " . mysqli_error($conn);
}
else {
    $lastID = $id;

    $sql = "DELETE FROM group_teachers WHERE groupID = '$id'";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);

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

                $helper->createDir("/files/" . $dir_name . "/" . $id);

                $temp_name = $_FILES['image']['tmp_name'][$i]['file'];
                $name = $_FILES['image']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $file_token = $helper->gen_token();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/" . $dir_name . "/" . $id . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/" . $dir_name . "/" . $id . "/" . $file_token . "_" . $name;

                    $sql = "
                    UPDATE 
                        groups
                    SET
                        image = '$url'
                    WHERE 
                        ID = '$id'";
                    $sqls[] = $sql;
                    mysqli_query($conn, $sql);
                }
            }
        }
    }

    $log->add($conn, $authorization[1], 'Группа ID: ' . $id . ' отредактирована');
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';