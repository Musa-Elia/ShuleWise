<?php
//session_start();
//require 'db.php';
require 'vendor/autoload.php'; // Use Composer's autoloader
include('email-credential.php');// This include files with email and password of author 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function email_verification($fullname, $email, $email_subject,  $email_template){
    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 2; // Enable detailed debug output

        $mail->isSMTP();                                            
        $mail->Host       = 'smtp.gmail.com';                        
        $mail->SMTPAuth   = true;                                
        $mail->Username   = 'taliantamten@gmail.com';                
        $mail->Password   = 'nanz sgco kefd ogfz';                          
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           
        $mail->Port       = 465;                                    

        $mail->setFrom('taliantamten@gmail.com', $fullname);
        $mail->addAddress($email); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = $email_subject;                               
        $mail->Body = $email_template;

        $mail->send();
        return true; 
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return false; // Indicate failure
    }
}

?>
