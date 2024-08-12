<?php  
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "db.php";
include('../auth/email-api.php');

$userpatterns = '/^[A-Za-z]+(?:\s[A-Za-z]+)*$/';
$passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/';

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

        // check of existing email 
        $email_check = "SELECT email FROM admin WHERE email = '$email' LIMIT 1";
        $query_run = mysqli_query($connection, $email_check);
        if (mysqli_num_rows($query_run) > 0) {
            $_SESSION['status'] = "Email address already exists";
            header('Location: ../register.php');
            exit();
        } 
        



    }else{

    }

}else{

}


?>