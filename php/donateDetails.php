<?php
require('connection.php');

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $accountId = $userDetails[0];
  $campaignID = $_GET["campaignID"];

  if ($userDetails[1] == "donor") {
    $sqlQuery = $conn->prepare('SELECT * FROM donor WHERE DonorID=?');
    $sqlQuery->bind_param("i", $accountId);
    $sqlQuery->execute();
    $result = $sqlQuery->get_result();
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
          $data[] = $row;
      }

      $sqlQuery = $conn->prepare('SELECT CampaignName FROM campaign WHERE CampaignID=?');
      $sqlQuery->bind_param("i", $campaignID);
      $sqlQuery->execute();
      $result = $sqlQuery->get_result();
      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
      } else {
        echo 0;
      }

      echo json_encode($data);
    } else {
      echo 0;
    }
  } else {
    echo 0;
  }
}
$conn -> close();

?>
