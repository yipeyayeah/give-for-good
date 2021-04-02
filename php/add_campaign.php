<?php
// add database connection
require('connection.php');

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo "failed";
} else {
  $goalID = 0;
  $backers = 0;
  $AmountReceived = 0.0;

  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $accountId = $userDetails[0];

  $CampaignID = 0;
  $CampaignName = $_GET["CampaignName"];
  $Description = $_GET["Description"];
  $StartDateTime = $_GET["StartDateTime"];
  $EndDateTime = $_GET["EndDateTime"];
  $Location = $_GET["Location"];
  $Amount = $_GET["Amount"];

  $sqlQuery = $conn->prepare("INSERT INTO goal VALUES(?,?,?,?);");
  $sqlQuery->bind_param("iddi", $goalID, $Amount, $AmountReceived, $backers);
  $sqlQuery->execute();
  $goalID = $conn->insert_id;

  $sqlQuery = $conn->prepare("INSERT INTO campaign VALUES(?,?,?,?,?,?,?,?);");
  $sqlQuery->bind_param("iiisssss", $CampaignID, $accountId, $goalID, $CampaignName, $Description, $StartDateTime, $EndDateTime, $Location);
  $sqlQuery->execute();

  echo 0;

  $conn->close();

}


?>
