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

// $sqlQuery = $conn->prepare('CALL spGetCampaignDetails(?);');
// // $campaignID = $_GET["campaignID"];
// $campaignID = 2;
// $sqlQuery->bind_param("i", $campaignID);
// $sqlQuery->execute();
// $result = $sqlQuery->get_result();
// if ($result->num_rows > 0) {
//   while ($row = $result->fetch_assoc()) {
//     echo $row['CampaignName']."</br>";
//     echo $row['Description']."</br>";
//     echo $row['Location']."</br>";
//     echo $row['Backers']."</br>";
//     echo $row['UEN']."</br>";
//     echo $row['uenStatus']."</br>";
//   }
// } else {
//   echo 0;
// }

?>
