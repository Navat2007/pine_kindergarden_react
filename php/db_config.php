<?php
$DB_SERVER = "localhost";
$DB_USER = "u2150183_default";
$DB_PASSWORD = 'WSpR39Il4xI3Vlmn';
$DB_DATABASE = "u2150183_default";

$conn = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DATABASE);
$conn->set_charset("utf8mb4");

if (!$conn) {
    die("Connection failed." . mysql_connect_error());
}