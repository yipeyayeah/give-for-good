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

  $sqlQuery = $conn->prepare('SELECT * FROM campaign INNER JOIN goal ON campaign.GoalID = goal.GoalID WHERE CampaignID=?');
  $sqlQuery->bind_param("i", $campaignID);
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
