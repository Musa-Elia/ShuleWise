<?php 
require "db.php";
if($_SERVER['REQUEST_METHOD'] == "POST"){
    if(isset($_POST["register"])){
        // section 1 data 
        $email = mysqli_real_escape_string($connection, $_POST['email']);
        $username = mysqli_real_escape_string($connection, $_POST['username']);
        $password = mysqli_real_escape_string($connection, $POST['password']);
        $cpassword = mysqli_real_escape_string($connection, $_POST['cpassword']);
        // section 2 data 
        $fullname = mysqli_real_escape_string($connection, $_POST['fullname']);
        $gender = mysqli_real_escape_string($connection, $_POST['gender']);
        $city = mysqli_real_escape_string($connection, $_POST['city']);
        $phone = mysqli_real_escape_string($connection, $_POST['phone']);

        // validation 
        



    }else{

    }

}else{

}


?>