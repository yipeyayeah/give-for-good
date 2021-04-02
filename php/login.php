<?php
require('connection.php');

$email = $_GET["email"];
$password = $_GET["password"];

$hashedPassword = hash('ripemd160', $password);

$sqlQuery = $conn->prepare("SELECT * FROM donor WHERE Email = ? && Password = ?");
$sqlQuery->bind_param("ss", $email, $hashedPassword);
$sqlQuery->execute();
$result = $sqlQuery->get_result();

$role;

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $retrievedPassword = $row["Password"];
    $accountId = $row["DonorID"];
    $role = "donor";

    if ($retrievedPassword == $hashedPassword) {

        //Add session to database
        setcookie("userDetails",$accountId."-".$role,  time() + (86400 * 30), "/");
        echo 1;

    }
    else{
        echo 0;
    }

} else {
  $sqlQuery = $conn->prepare("SELECT * FROM charity WHERE Email = ? && Password = ?");
  $sqlQuery->bind_param("ss", $email, $hashedPassword);
  $sqlQuery->execute();
  $result = $sqlQuery->get_result();

  if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();

      $retrievedPassword = $row["Password"];
      $accountId = $row["CharityID"];
      $role = "charity";

      if ($retrievedPassword == $hashedPassword) {

          //Add session to database
          setcookie("userDetails",$accountId."-".$role,  time() + (86400 * 30), "/");
          echo 1;

      }
      else{
          echo 0;
      }

  }
}

$conn -> close();

?>
