<?php 
$host = "localhost";
$db_user = "root";
$db_password = "root";
$db_name = "shulewise";

$connection = mysqli_connect($host, $db_user, $db_password, $db_name);

if(!$connection){
   die();
}




?>