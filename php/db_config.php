<?php        

$DB_SERVER = "localhost";
$DB_USER = "theatre";
$DB_PASSWORD = 'VSTw5467wWV%$sdvfghbs#@2564';
$DB_DATABASE = "theatre";

$conn = new mysqli($DB_SERVER, $DB_USER, $DB_PASSWORD, $DB_DATABASE);
$conn->set_charset("utf8mb4");

if(!$conn)
{
        die("Connection failed.". mysql_connect_error());
}