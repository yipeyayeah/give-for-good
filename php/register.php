<?php
// add database connection
require('connection.php');

$hashedPassword;

$donorId = 0;

$name = $_GET["name"];
$email = $_GET["email"];
$number = $_GET["number"];
$postal = $_GET["postal"];
$address1 = $_GET["address1"];
$address2 = $_GET["address2"];
$password = $_GET["password"];
$cfmPassword = $_GET["cfmPassword"];

if ($password == $cfmPassword) {
    $hashedPassword = hash('ripemd160', $password);
    $sqlQuery = $conn->prepare("INSERT INTO donor VALUES(?,?,?,?,?,?,?,?);");
    $sqlQuery->bind_param("ississis", $donorId, $name, $email, $number, $address1, $address2, $postal, $hashedPassword);
    $sqlQuery->execute();
    $conn->close();
}
else{
    echo "failed";
}


?>
