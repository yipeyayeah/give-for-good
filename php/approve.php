<?php
require('connection.php');

$userDetails = $_COOKIE["userDetails"];
$userDetails = explode("-", $userDetails);
$accountId = $userDetails[0];

$sqlQuery = $conn->prepare('SELECT transaction.TransactionID, transaction.DonorID, transaction.CampaignID, transaction.Amount, transaction.TimeStamp, transaction.Status FROM transaction INNER JOIN campaign ON transaction.CampaignID = campaign.CampaignID INNER JOIN charity ON campaign.CharityID = charity.CharityID WHERE charity.CharityID = ? AND transaction.Status = "Pending"');
$sqlQuery->bind_param("i", $accountId);
$sqlQuery->execute();
$result = $sqlQuery->get_result();

if ($result->num_rows > 0) {

  while ($row = $result->fetch_assoc()) {
    $key = $row['TransactionID'] . $row['DonorID'] . $row['CampaignID'] . $row['Amount'] . $row['TimeStamp'] . $row['Status'];
    $hashedKey = hash('ripemd160', $key);

    $sqlQuery1 = $conn->prepare("SELECT * FROM verify WHERE TransactionID = ? && Hashkey = ?");
    $sqlQuery1->bind_param("is", $row['TransactionID'], $hashedKey);
    $sqlQuery1->execute();
    $result1 = $sqlQuery1->get_result();

    if ($result1->num_rows > 0) {
      $row1 = $result1->fetch_assoc();
      if ($row1['HashKey'] == $hashedKey) {

        $sqlQuery2 = $conn->prepare("SELECT GoalID FROM campaign WHERE CampaignID = ?");
        $sqlQuery2->bind_param("i", $row['CampaignID']);
        $sqlQuery2->execute();
        $result2 = $sqlQuery2->get_result();
        $row2 = $result2->fetch_assoc();

        $sqlQuery3 = $conn->prepare("UPDATE goal SET AmountReceived=AmountReceived+?, Backers=Backers+1 WHERE GoalID=?;");
        $sqlQuery3->bind_param("di", $row['Amount'], $row2['GoalID']);
        $sqlQuery3->execute();

        $sqlQuery4 = $conn->prepare("UPDATE transaction SET Status='Complete' WHERE TransactionID=?;");
        $sqlQuery4->bind_param("i", $row['TransactionID']);
        $sqlQuery4->execute();

        echo 1;
      }
    } else {
      $sqlQuery2 = $conn->prepare("UPDATE transaction SET Status='Rejected' WHERE TransactionID=?;");
      $sqlQuery2->bind_param("i", $row['TransactionID']);
      $sqlQuery2->execute();
    }

  }
  echo 1;
} else {
  echo 1;
}


// $sqlQuery = $conn->prepare("UPDATE charity SET UEN=?, uenStatus=?, entityName=?, entityType=?, uenIssueDate=?, Bank=?, BankAccNo=?, Email=?, ContactNo=?, regStreetName=?, PostalCode=?, CharityImg=?, CharityDescription=? WHERE CharityID=?;");
// $sqlQuery->bind_param("ssssssisisisss", $UEN, $uenStatus, $entityName, $entityType, $uenIssueDate, $Bank, $BankAccNo, $Email, $ContactNo, $regStreetName, $PostalCode, $image, $CharityDescription, $accountId);
// $sqlQuery->execute();

$conn -> close();

?>
