<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'db.php';

if (isset($_POST['login'])) {
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        $email = mysqli_real_escape_string($connection, $_POST['email']);
        $password = mysqli_real_escape_string($connection, $_POST['password']);
        $remember_me = isset($_POST['remember-me']) ? $_POST['remember-me'] : false;

        // Use prepared statements for security
        $stmt = $connection->prepare("SELECT * FROM admin WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $rows = $result->fetch_assoc();
            $fetch_password = $rows['password'];
            if (password_verify($password, $fetch_password)) {
                $_SESSION['user-id'] = $rows['id'];
                $_SESSION['email'] = $email;
                $verification_status = $rows['verification_status'];
                if ($remember_me) {
                    $token = bin2hex(random_bytes(32));
                    $cookie_expire = time() + (86400 * 30);

                    $update_query = "UPDATE admin SET remember_token = ?, token_expiry = FROM_UNIXTIME(?) WHERE id = ?";
                    $update_stmt = $connection->prepare($update_query);
                    $update_stmt->bind_param("ssi", $token, $cookie_expire, $rows['id']);
                    $update_stmt->execute();

                    setcookie('remember_me', $token, $cookie_expire, '/', '', false, true);
                }
                if ($verification_status == 'verified') {
                    $_SESSION['email'] = $email;
                    $_SESSION['password'] = $password;
                    header('Location:  ../index.php');
                } else {
                    $_SESSION['status'] = "Authentication failed, please verify your email. Resend email <a href='email-resend.php'>click here</a>.";
                    header('Location: ../login.php');
                    exit();
                }
            } else {
                $_SESSION['status'] = "Incorrect username or password!";
                header('Location: ../login.php');
                exit();
            }
        } else {
            $_SESSION['status'] = "Account does not exist. Please sign up to create an account.";
            header('Location: ../login.php');
            exit();
        }
    } else {
        $_SESSION['status'] = "Invalid request.";
        header('Location: ../login.php');
        exit();
    }
} else {
    $_SESSION['status'] = "Invalid request.";
    header('Location: ../login.php');
    exit();
}
?>
