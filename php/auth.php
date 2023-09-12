<?php
$server_headers = getallheaders();

if(empty($server_headers['Authorization'])){
    die("Требуется авторизация");
}

$authorization = explode('&', $server_headers['Authorization']);

$sql = "SELECT * FROM accounts WHERE ID = '$authorization[1]' and token = '$authorization[0]'";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) == 0){

    $content = (object)[

        'error' => 3,
        'error_text' => "auth",

    ];
    echo json_encode($content);

    die();
}
