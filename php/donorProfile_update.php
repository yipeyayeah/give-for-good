<?php
require('connection.php');

$name = $_POST["name"];
$email = $_POST["email"];
$number = $_POST["number"];
$postal = $_POST["postal"];
$address1 = $_POST["address1"];
$address2 = $_POST["address2"];
$password = $_POST["password"];
$cfmPassword = $_POST["cfmPassword"];

$userDetails = $_COOKIE["userDetails"];
$userDetails = explode("-", $userDetails);
$accountId = $userDetails[0];


$sqlQuery = $conn->prepare("UPDATE donor SET FullName=?, Email=?, ContactNo=?, AddressOne=?, AddressTwo=?, PostalCode=? WHERE DonorID=?;");
$sqlQuery->bind_param("ssissii", $name, $email, $number, $address1, $address2, $postal, $accountId);
$sqlQuery->execute();
echo 1;


if ($password != "" || $cfmPassword != "") {
  if ($password == $cfmPassword) {
    $hashedPassword = hash('ripemd160', $password);
    $sqlQuery = $conn->prepare("UPDATE donor SET Password=? WHERE DonorID=?;");
    $sqlQuery->bind_param("si", $hashedPassword, $accountId);
    $sqlQuery->execute();
    echo 0;
  } else {
    echo 1;
  }
} else {
  echo 0;
}


$conn -> close();

?>
