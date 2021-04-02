<?php
require('connection.php');

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $accountId = $userDetails[0];

  $sqlQuery = $conn->prepare('SELECT * FROM transaction WHERE DonorID = ?');
  $sqlQuery->bind_param("i", $accountId);
  $sqlQuery->execute();
  $result = $sqlQuery->get_result();
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

      //$row = (object) array_merge( (array)$row, array( 'percentage' => number_format((float)$percentage, 2, '.', '') ) );

      $sqlQuery1 = $conn->prepare('SELECT campaign.CampaignName, charity.entityName FROM campaign INNER JOIN charity ON campaign.CharityID = charity.CharityID WHERE CampaignID = ?');
      $sqlQuery1->bind_param("i", $row['CampaignID']);
      $sqlQuery1->execute();
      $result1 = $sqlQuery1->get_result();
      if ($result1->num_rows > 0) {
        while ($row1 = $result1->fetch_assoc()) {
          $row = (object) array_merge( (array)$row, array( 'CampaignName' => $row1['CampaignName'], 'entityName' => $row1['entityName'] ) );
        }
      }

      $data[] = $row;

    }
    echo json_encode($data);
  } else {
    echo 0;
  }
}
$conn -> close();

?>
