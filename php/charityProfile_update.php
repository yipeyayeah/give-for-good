<?php
require('connection.php');

$entityName = $_POST["entityName"];
$entityType = $_POST["entityType"];
$UEN = $_POST["UEN"];
$uenIssueDate = $_POST["uenIssueDate"];
$CharityDescription = $_POST["CharityDescription"];
$uenStatus = $_POST["uenStatus"];
$ContactNo = $_POST["ContactNo"];
$Email = $_POST["Email"];
$regStreetName = $_POST["regStreetName"];
$PostalCode = $_POST["PostalCode"];
$Bank = $_POST["Bank"];
$BankAccNo = $_POST["BankAccNo"];
$image = $_POST["image"];

if($image != ""){
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    $filename = uniqid(substr(str_shuffle($permitted_chars), 0, 5), true);
    $bin = base64_decode($image);
    $size = getImageSizeFromString($bin);
    $ext = substr($size['mime'], 6);
    $img_file = "./../images/{$filename}.{$ext}";
    file_put_contents($img_file, $bin);
    $image = "./images/{$filename}.{$ext}";
}


$userDetails = $_COOKIE["userDetails"];
$userDetails = explode("-", $userDetails);
$accountId = $userDetails[0];


$sqlQuery = $conn->prepare("UPDATE charity SET UEN=?, uenStatus=?, entityName=?, entityType=?, uenIssueDate=?, Bank=?, BankAccNo=?, Email=?, ContactNo=?, regStreetName=?, PostalCode=?, CharityImg=?, CharityDescription=? WHERE CharityID=?;");
$sqlQuery->bind_param("ssssssisisisss", $UEN, $uenStatus, $entityName, $entityType, $uenIssueDate, $Bank, $BankAccNo, $Email, $ContactNo, $regStreetName, $PostalCode, $image, $CharityDescription, $accountId);
$sqlQuery->execute();
echo 1;

$conn -> close();

?>
