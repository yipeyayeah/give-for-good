<?php
require('connection.php');

$charityID = $_GET["charityID"];

$sqlQuery = $conn->prepare('SELECT * FROM charity WHERE CharityID=?');
$sqlQuery->bind_param("i", $charityID);
$sqlQuery->execute();
$result = $sqlQuery->get_result();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode($data);
} else {
  echo 0;
}

$conn -> close();

?>
