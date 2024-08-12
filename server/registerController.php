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
        $token = md5(rand());

        // check of existing email 
        $email_check = "SELECT email FROM admin WHERE email = '$email' LIMIT 1";
        $query_run = mysqli_query($connection, $email_check);
        if (mysqli_num_rows($query_run) > 0) {
            $_SESSION['status'] = "Email address already exists";
            header('Location: ../register.php');
            exit();
        } elseif(strlen($fullname) < 7 ) {
            $_SESSION['status'] = "invalid name please enter full name ";
            header('Location: ../register.php?fullname_error');
            exit();

        } elseif(!preg_match($userpatterns, trim($fullname))){
            $_SESSION['status'] = "invalid name ! please use only letters ";
            header('Location: ../register.php?fullname_error');
            exit();

        } elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['status'] = "Invalid email address!";
            header('Location: ../register.php?email_error');
            exit();

        } elseif(strlen($password) < 8){
            $_SESSION['status'] = "Invalid password! Password should have atleast 8 characters";
            header('Location: ../register.php?passwordLength_error');
            exit();

        } elseif(!preg_match($passwordPattern, $password)) {
            $_SESSION['status'] = "Invalid password! It must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol, and be at least 8 characters long.";
            header('Location: ../register.php');
            exit(); 

        } elseif($cpassword != $password) {
            $_SESSION['status'] = "Password mismatch! Make sure you repeat the correct password.";
            header('Location: ../register.php?password_mismatch');
            exit(); 
        }
    
        else {
            // Insert user data 
            $enc_pass = password_hash($password, PASSWORD_BCRYPT); 
            $query = "INSERT INTO admin (username, email, password, verification_token) VALUES ('$fullname', '$email', '$enc_pass', '$token')";
            $result = mysqli_query($connection, $query);

            if ($result) {
                $_SESSION['user_email'] = $email;
                $_SESSION['user_tokens'] = $token;

                $_SESSION['succes'] = "Registration successful! Please verify your email address. If you didn't receive the email, <a href='email-resend.php'>click here</a> to resend the verification email.";
                header('Location: ../login.php');
                // Email verification 
                $email_subject = 'Verify Your Email for ShuleWise ';

                $email_template = "
                <div style='font-family: Arial, sans-serif; background-color: #f4f4f9; padding: 20px;'>
                    <div style='max-width: 1040px; width: 100%; height: auto; min-height: 458px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'>
                        <h2 style='color: #2c3e50;'>Welcome to Leaderbase System!</h2>
                        <p style='color: #34495e; font-size: 16px;'>Thank you for registering with us. Please verify your email address to activate your account.</p>
                        <p style='color: #34495e; font-size: 16px;'>Click the button below to verify your email address:</p>
                        <a href='http://localhost:8888/Php_forms-main/auth/email-verification.php?token=$token' 
                            style='display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #3498db; text-decoration: none; border-radius: 5px;'>
                            Verify Email
                        </a>
                        <p style='color: #7f8c8d; font-size: 14px;'>If you did not register for a Leaderbase account, please ignore this email.</p>
                        <br>
                        <p style='color: #bdc3c7; font-size: 12px;'>Regards, <br>ShuleWise Team</p>
                    </div>
                </div>
            ";              
                 // email function 
                email_verification($fullname, $email, $email_subject, $email_template);
            } else {
                $_SESSION['status'] = "There was an error submitting data to the database";
                header('Location: ../register.php');
            }
        }
    }
}
?>
        



 
?>