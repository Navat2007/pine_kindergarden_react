<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = 1;
$userID = $authorization[1];
$text = mysqli_real_escape_string($conn, htmlspecialchars($_POST["text"]));
$preview = mysqli_real_escape_string($conn, htmlspecialchars($_POST["preview"]));

$sql = "UPDATE 
            about
        SET
            text = '$text', 
            preview = '$preview', 
            last_userID = '$userID'
        WHERE 
            ID = '$id'";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (!$result) {
    $error = 1;
    $error_text = "Ошибка при редактировании основной информации: " . mysqli_error($conn);
}
else {
    $lastID = $id;

    if(isset($_POST["image"]) && empty($_POST["image"]) == false){
        $image = $_POST["image"];

        for ($i = 0; $i < count($image); $i++) {
            $main = $image[$i]['main'];
            $order = $image[$i]['order'];
            $isFile = (int)$image[$i]['isFile'];
            $isLoaded = (int)$image[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $dir_name = 'about';
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
                        about
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

    if(isset($_POST["previewImage"]) && empty($_POST["previewImage"]) == false){
        $image = $_POST["previewImage"];

        for ($i = 0; $i < count($image); $i++) {
            $main = $image[$i]['main'];
            $order = $image[$i]['order'];
            $isFile = (int)$image[$i]['isFile'];
            $isLoaded = (int)$image[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $dir_name = 'about';
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
                        about
                    SET
                        preview_image = '$url'
                    WHERE 
                        ID = '$id'";
                    $sqls[] = $sql;
                    mysqli_query($conn, $sql);
                }
            }
        }
    }

    $log->add($conn, $authorization[1], 'Занятие ID: ' . $id . ' отредактировано');
}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';