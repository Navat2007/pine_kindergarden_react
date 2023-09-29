<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$userID = $authorization[1];
$previewTitle = mysqli_real_escape_string($conn, htmlspecialchars($_POST["previewTitle"]));
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$date = htmlspecialchars($_POST["date"]);
$preview = mysqli_real_escape_string($conn, htmlspecialchars($_POST["editorPreview"]));
$review = mysqli_real_escape_string($conn, htmlspecialchars($_POST["editorReview"]));
$active = htmlspecialchars($_POST["active"]) === "true" ? 1 : 0;
$mainPage = htmlspecialchars($_POST["mainPage"]) === "true" ? 1 : 0;

$previewImage = $_POST["previewImage"];
$reviewImage = $_POST["reviewImage"];
$images = $_POST["images"];

$sql = "SELECT * FROM news WHERE title = '$title' AND archive = 0";
$sqls[] = $sql;
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    $error = 1;
    $error_text = "Новость с таким названием уже существует";
}

if ($error === 0) {

    $sql = "
        INSERT INTO news (preview_title, title, date, text, preview_text, show_on_main_page, active, userID, last_userID) 
        VALUES ('$previewTitle', '$title', '$date', '$review', '$preview', '$mainPage', '$active', '$userID', '$userID')
    ";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $lastID = mysqli_insert_id($conn);

    if($lastID > 0){

        for ($i = 0; $i < count($previewImage); $i++) {

            $url = $previewImage[$i]['url'];
            $main = $previewImage[$i]['main'];
            $order = $previewImage[$i]['order'];
            $isFile = (int)$previewImage[$i]['isFile'];
            $isLoaded = (int)$previewImage[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $helper->createDir("/files/news/" . $lastID);

                $temp_name = $_FILES['previewImage']['tmp_name'][$i]['file'];
                $name = $_FILES['previewImage']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $file_token = $helper->gen_token();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/news/" . $lastID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/news/" . $lastID . "/" . $file_token . "_" . $name;
                }

            }

            $sql = "
            UPDATE 
                news
            SET
                preview_image = '$url'
            WHERE 
                ID = '$lastID'";


            $sqls[] = $sql;
            mysqli_query($conn, $sql);

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        for ($i = 0; $i < count($reviewImage); $i++) {

            $url = $reviewImage[$i]['url'];
            $main = $reviewImage[$i]['main'];
            $order = $reviewImage[$i]['order'];
            $isFile = (int)$reviewImage[$i]['isFile'];
            $isLoaded = (int)$reviewImage[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $helper->createDir("/files/news/" . $lastID);

                $temp_name = $_FILES['reviewImage']['tmp_name'][$i]['file'];
                $name = $_FILES['reviewImage']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $file_token = $helper->gen_token();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/news/" . $lastID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/news/" . $lastID . "/" . $file_token . "_" . $name;
                }

            }

            $sql = "
            UPDATE 
                news
            SET
                image = '$url'
            WHERE 
                ID = '$lastID'";


            $sqls[] = $sql;
            mysqli_query($conn, $sql);

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);

        }

        for ($i = 0; $i < count($images); $i++) {

            $url = $images[$i]['url'];
            $main = $images[$i]['main'];
            $order = $images[$i]['order'];
            $isFile = (int)$images[$i]['isFile'];
            $isLoaded = (int)$images[$i]['isLoaded'];

            if($isFile === 1 && $isLoaded === 0){

                $url = "";

                $helper->createDir("/files/news/" . $lastID);

                $temp_name = $_FILES['images']['tmp_name'][$i]['file'];
                $name = $_FILES['images']['name'][$i]['file'];

                $sqls[] = $temp_name;
                $sqls[] = $name;

                $file_token = $helper->gen_token();

                $path = $_SERVER['DOCUMENT_ROOT'] . "/files/news/" . $lastID . "/" . $file_token . "_" . $name;

                @unlink($path);

                if(copy($temp_name, $path))
                {
                    $url = "/files/news/" . $lastID . "/" . $file_token . "_" . $name;

                    $sql = "
                    INSERT INTO news_images (newsID, url, main, photo_order)
                    VALUES ('$lastID', '$url', '$main', '$order')";

                    $sqls[] = $sql;
                    mysqli_query($conn, $sql);
                }
            }

            unset($url);
            unset($main);
            unset($order);
            unset($isFile);
            unset($isLoaded);
        }

    }

    if (!$result  || (int)$lastID === 0) {
        $error = 1;
        $error_text = "Ошибка добавления новости: " .  mysqli_error($conn);
    } else {

        $log->add($conn, $userID, 'Добавлена новость ID: ' . $lastID);
    }

}

require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';