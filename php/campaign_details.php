<?php
require('connection.php');
date_default_timezone_set("Asia/Singapore");

$percentage = 0;
$campaignID = $_GET["campaignID"];
$today = time();

$sqlQuery = $conn->prepare('SELECT * FROM campaign INNER JOIN goal ON campaign.GoalID = goal.GoalID INNER JOIN charity on campaign.CharityID = charity.CharityID WHERE campaign.CampaignID = ?');
$sqlQuery->bind_param("i", $campaignID);
$sqlQuery->execute();
$result = $sqlQuery->get_result();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {

    $percentage = $row['AmountReceived'] / $row['Amount'] * 100;
    $your_date = strtotime($row['EndDateTime']);
    $datediff = $your_date - $today;
    $days = round($datediff / (60 * 60 * 24));

    $row = (object) array_merge( (array)$row, array( 'percentage' => number_format((float)$percentage, 2, '.', ''), 'days' => $days ) );
    $data[] = $row;

  }
  echo json_encode($data);
} else {
  echo 0;
}

$conn -> close();

?>
