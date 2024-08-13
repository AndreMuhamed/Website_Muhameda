<?php
$subject = 'Вы получили сообщение'; // Тема вашего электронного письма
$to = 'akynsasa@gmail.com';  // E-mail получателя
$emailTo = $_REQUEST['email'];

$name = $_REQUEST['name']; // Имя отправителя
$email = $_REQUEST['email']; // E-mail отправителя
$phone = $_REQUEST['phone']; // Номер телефона отправителя
$msg = $_REQUEST['message']; // Сообщение отправителя

$email_from = $name . '<' . $email . '>';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
$headers .= "From: " . $name . '<' . $email . '>' . "\r\n"; // E-mail отправителя
$headers .= "Return-Path: " . $email . "\r\n";

$message = 'Имя: ' . $name . "\n";
$message .= 'E-mail: ' . $email . "\n";
$message .= 'Телефон: ' . $phone . "\n";
$message .= 'Сообщение: ' . $msg;

if (@mail($to, $subject, $message, $headers))
{
	// Передаем значение 'sent' в функцию AJAX для отображения сообщения об успешной отправке.
	echo 'sent';
}
else
{
	// Передаем значение 'failed' в функцию AJAX для отображения сообщения об ошибке.
	echo 'failed';
}
?>
