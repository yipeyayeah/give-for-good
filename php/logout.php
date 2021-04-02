<?php

// check for cookies
if(!isset($_COOKIE["userDetails"])) {
  echo 0;
} else {
	setcookie("userDetails","",  time() - 3600, "/");
	echo 1;
}
  
?>
