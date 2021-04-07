<?php

// $servername = "localhost";
// $database = "database_project";
// $username = "root";
// $password = "123456789";


$servername = "172.20.10.12";
$database = "database_project";
$username = "csc2008gideon";
$password = "123456789";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";

?>
