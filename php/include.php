<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/php/db_config.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/helper.php';

$helper = new helper();
$log = new log();
$constant_strings = new constant_strings();
