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
  $amount = $_GET["amount"] + 0;
  $transactionID = 0;
  $verifyID = 0;
  $today = time();
  $status = "Pending";

  if ($userDetails[1] == "donor") {
    $sqlQuery = $conn->prepare("INSERT INTO transaction VALUES(?,?,?,?,?,?);");
    $sqlQuery->bind_param("iiidis", $transactionID, $accountId, $campaignID, $amount, $today, $status);
    $sqlQuery->execute();
    $transactionID = $conn->insert_id;
    $key = $transactionID . $accountId . $campaignID . $amount . $today . $status;
    $hashedKey = hash('ripemd160', $key);

    $sqlQuery = $conn->prepare("INSERT INTO verify VALUES(?,?,?);");
    $sqlQuery->bind_param("iis", $verifyID, $transactionID, $hashedKey);
    $sqlQuery->execute();

    echo 1;
  } else {
    echo 0;
  }
}
$conn -> close();

?>
