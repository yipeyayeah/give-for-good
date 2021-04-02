<?php
require('connection.php');

$campaignName = $_POST["campaignName"];
$campaignDescription = $_POST["campaignDescription"];
$startDate = $_POST["startDate"];
$endDate = $_POST["endDate"];
$location = $_POST["location"];
$campaignGoal = $_POST["campaignGoal"];
$campaignID = $_POST["campaignID"];
$GoalID;

$sqlQuery = $conn->prepare("UPDATE campaign SET CampaignName=?, Description=?, StartDateTime=?, EndDateTime=?, Location=? WHERE CampaignID=?;");
$sqlQuery->bind_param("sssssi", $campaignName, $campaignDescription, $startDate, $endDate, $location, $campaignID);
$sqlQuery->execute();

$sqlQuery = $conn->prepare('SELECT GoalID FROM campaign WHERE CampaignID=?');
$sqlQuery->bind_param("i", $campaignID);
$sqlQuery->execute();
$result = $sqlQuery->get_result();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $GoalID = $row['GoalID'];
  }
}

$sqlQuery = $conn->prepare("UPDATE goal SET Amount=? WHERE GoalID=?;");
$sqlQuery->bind_param("di", $campaignGoal, $GoalID);
$sqlQuery->execute();

echo 1;

$conn -> close();

?>
