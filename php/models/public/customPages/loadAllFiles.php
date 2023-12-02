<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/params.php';

$id = mysqli_real_escape_string($conn, htmlspecialchars($_POST["id"]));
$title = mysqli_real_escape_string($conn, htmlspecialchars($_POST["title"]));
$files = $_POST["files"];

if(!empty($id)){
    $zip = new ZipArchive();
    $zip_file_name = "Файлы со страницы " . $title . ".zip";
    $zip_file = tempnam('.', '');

    if ($zip->open($zip_file, ZipArchive::CREATE) !== true) {
        $error = 1;
        $error_text = "* Sorry ZIP creation failed at this time<br/>";
    }
    if ($error == 0) {
        foreach ($files as $file) {
            $download_file = file_get_contents($file);
            $zip->addFromString(basename($file), $download_file);
        }

        $zip->close();

        if (file_exists($zip_file)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $zip_file_name . '"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($zip_file));
            readfile($zip_file);
            unlink($zip_file);
        }
    }
    else {
        require $_SERVER['DOCUMENT_ROOT'] . '/php/answer.php';
    }
}

