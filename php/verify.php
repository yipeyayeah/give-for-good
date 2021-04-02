<?php

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
  $userDetails = $_COOKIE["userDetails"];
  $userDetails = explode("-", $userDetails);
  $role = $userDetails[1];

  // check if user is a donor or charity

  if ($role == "donor") {
    echo 1;
  } else {
    echo 2;
  }

}

?>
