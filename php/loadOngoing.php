<?php
require('connection.php');
date_default_timezone_set("Asia/Singapore");

$percentage = 0;
$today = date("Y-m-d H:i:s");

$sqlQuery = $conn->prepare('SELECT * FROM campaign INNER JOIN goal ON campaign.GoalID = goal.GoalID INNER JOIN charity on campaign.CharityID = charity.CharityID WHERE campaign.StartDateTime <= ? && campaign.EndDateTime >= ?');
$sqlQuery->bind_param("ss", $today, $today);
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

$conn -> close();

?>
