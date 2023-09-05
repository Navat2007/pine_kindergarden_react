<?php
session_start();
//ini_set('display_errors',1);
//error_reporting(E_ALL);
require $_SERVER['DOCUMENT_ROOT'] . '/php/db_config.php';
require $_SERVER['DOCUMENT_ROOT'] . '/php/helper.php';

$helper = new helper();
$log = new log();
$constant_strings = new constant_strings();
