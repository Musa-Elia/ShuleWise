<?php 
$db_host = "localhost";
$db_user = "root";
$db_password = "root";
$db_name = "leaderbase";

$connection = mysqli_connect($host, $db_user, $db_password, $db_name);

if(mysqli_connect_errno()){
    echo "connection failed" . mysqli_connect_error();
}


?>