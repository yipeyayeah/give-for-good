<?php
require('connection.php');

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $accountId = $userDetails[0];

  $sqlQuery = $conn->prepare('SELECT * FROM donor WHERE DonorID=?');
  $sqlQuery->bind_param("i", $accountId);
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
}
$conn -> close();

?>
