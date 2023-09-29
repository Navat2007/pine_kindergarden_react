<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Authorization, Content-Type, X-Auth-Token');

require $_SERVER['DOCUMENT_ROOT'] . '/php/include.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/auth.php';

$id = htmlspecialchars($_POST["id"]);

$error = 0;
$error_text = "";
$sqls = array();
$params = "";

if(isset($_FILES['files']))
{

    $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files";
    if (!file_exists($baseDirName)) {
        $oldmask = umask(0);
        $mkdir_result = mkdir($baseDirName, 0777);
        umask($oldmask);
    }

    $baseDirName = $_SERVER['DOCUMENT_ROOT'] . "/files/profile";
    if (!file_exists($baseDirName)) {
        $oldmask = umask(0);
        $mkdir_result = mkdir($baseDirName, 0777);
        umask($oldmask);
    }

    foreach($_FILES['files']['error'] as $key => $error)
    {
        if ($error == UPLOAD_ERR_OK)
        {
            $temp_name = $_FILES['files']['tmp_name'][$key];
            $name = $_FILES['files']['name'][$key];

            $dirName = $_SERVER['DOCUMENT_ROOT'] . "/files/profile/" . $id;
            if (!file_exists($dirName)) {
                $oldmask = umask(0);
                $mkdir_result = mkdir($dirName, 0777);
                umask($oldmask);
            }

            $file_token = time();

            $path = $_SERVER['DOCUMENT_ROOT'] . "/files/profile/" . $id . "/" . $file_token . "_" . $name;

            @unlink($path);

            $sql = "SELECT * FROM accounts WHERE ID = '$id'";
            $sqls[] = $sql;
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_object($result);

            $oldpath = $_SERVER['DOCUMENT_ROOT'] . $row->photo;
            @unlink($oldpath);

            if(copy($temp_name, $path))
            {

                $file_to_DB = "/files/profile/" . $id . "/" . $file_token . "_" . $name;

                $add_sql = "UPDATE 
                                accounts
                            SET
                                photo = '$file_to_DB'
                            WHERE 
                                ID = '$id'";
                mysqli_query($conn, $add_sql);
                $params = $file_to_DB;
            }

        }
        else
        {
            $error = 1;
            $error_text = $error;
        }
    }

}

if(isset($_POST['delete']) && (int)$_POST['delete'] === 1){

    $sql = "SELECT * FROM accounts WHERE ID = '$id'";
    $sqls[] = $sql;
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_object($result);

    $photo_path = $_SERVER['DOCUMENT_ROOT'] . $row->photo;
    @unlink($photo_path);

    $sql = "UPDATE 
                accounts
            SET
                last_user_changed = '$authorization[1]', photo = ''
            WHERE 
                ID = '$id'";
    $sqls[] = $sql;
    mysqli_query($conn, $sql);
    $params = "";

}

$content = (object)[

    'input_params' => (object)[
        'GET' => $_GET,
        'POST' => $_POST,
        'FILES' => $_FILES,
    ],
    'error' => $error,
    'error_text' => $error_text,
    'sql' => $sqls,
    'params' => $params,

];
echo json_encode($content);