<?php
require('connection.php');
date_default_timezone_set("Asia/Singapore");

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $accountId = $userDetails[0];
  $backers = 0;
  $donated = 0;
  $percentage = 0;
  $today = date("Y-m-d H:i:s");

  $sqlQuery = $conn->prepare('SELECT * FROM campaign INNER JOIN goal ON campaign.GoalID = goal.GoalID WHERE CharityID=? && campaign.StartDateTime <= ? && campaign.EndDateTime >= ?');
  $sqlQuery->bind_param("iss", $accountId, $today, $today);
  $sqlQuery->execute();
  $result = $sqlQuery->get_result();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

      $percentage = $row['AmountReceived'] / $row['Amount'] * 100;

      $row = (object) array_merge( (array)$row, array( 'percentage' => number_format((float)$percentage, 2, '.', '') ) );
      $data[] = $row;

    }
    echo json_encode($data);
  } else {
    echo 0;
  }
}
$conn -> close();

?>
