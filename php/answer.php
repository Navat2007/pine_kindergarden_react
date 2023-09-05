<?php

if(!isset($error))
    $error = 0;

if(!isset($error_text))
    $error_text = "";

if(!isset($sqls))
    $sqls = array();

if(!isset($params))
    $params = array();

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