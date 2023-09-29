<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = htmlspecialchars($_POST["id"]);
$userID = $authorization[1];
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$text = mysqli_real_escape_string($conn, htmlspecialchars($_POST["text"]));
$type = mysqli_real_escape_string($conn, htmlspecialchars($_POST["type"]));
$file = $_POST["file"];

$sql = "UPDATE
                media_files
            SET
                title = '$title',
                text = '$text',
                type = '$type',
                last_userID = '$userID'
            WHERE
                ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (!$result) {
    $error = 1;
    $error_text = "Ошибка при редактировании занятия: " . mysqli_error($conn);
}
else {
    $lastID = $id;

    for ($i = 0; $i < count($file); $i++) {
        $main = $file[$i]['main'];
        $order = $file[$i]['order'];
        $isFile = (int)$file[$i]['isFile'];
        $isLoaded = (int)$file[$i]['isLoaded'];

        if($isFile === 1 && $isLoaded === 0){

            $dir_name = 'mediaFiles';
            $url = "";

            $file_token = $helper->gen_token();
            $helper->createDir("/files/" . $dir_name . "/" . $id . "/" . $file_token);

            $temp_name = $_FILES['file']['tmp_name'][$i]['file'];
            $name = $_FILES['file']['name'][$i]['file'];

            $sqls[] = $temp_name;
            $sqls[] = $name;

            $path = $_SERVER['DOCUMENT_ROOT'] . "/files/" . $dir_name . "/" . $id . "/" . $file_token . "/" . $name;

            @unlink($path);

            if(copy($temp_name, $path))
            {
                $url = "/files/" . $dir_name . "/" . $id . "/" . $file_token . "/" . $name;

                $sql = "
                    UPDATE
                        media_files
                    SET
                        url = '$url',
                        file_name = '$name'
                    WHERE
                        ID = '$id'";
                $sqls[] = $sql;
                mysqli_query($conn, $sql);
            }
        }
    }

    $log->add($conn, $authorization[1], 'Файл ID: ' . $id . ' отредактирован');
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';