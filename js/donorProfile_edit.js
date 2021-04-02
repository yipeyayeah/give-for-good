var formData = new FormData();

$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item active'><a class='nav-link' href='./donorProfile_edit'>Profile<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a></li></ul>"

     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item active'><a class='nav-link' href='./index'>Home</a></li><li class='nav-item'><a class='nav-link' href='./viewOngoingCampaigns_charity'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item active'><a class='nav-link' href='./donorProfile_edit'>Profile<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a></li></ul>"

     } else {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item active'><a class='nav-link' href='./index'>Home <span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register'>Register</a></li></ul>"
     }

     $("#navbarSupportedContent").html(nav)
     loadProfile();

  });
});

function loadProfile() {
  $.ajax({
        type: "GET",
        url: "./php/donorProfile_edit.php",
        data: {}
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          document.getElementById("fullName_donor").value = jsonObj[0]['FullName'];
          document.getElementById("email_donor").value = jsonObj[0]['Email'];
          document.getElementById("contactNum_donor").value = jsonObj[0]['ContactNo'];
          document.getElementById("addressLine1_donor").value = jsonObj[0]['AddressOne'];
          document.getElementById("addressLine2_donor").value = jsonObj[0]['AddressTwo'];
          document.getElementById("postalCode_donor").value = jsonObj[0]['PostalCode'];
				}

    });
}

function update() {
  var name = document.getElementById("fullName_donor").value
  var email = document.getElementById("email_donor").value
  var number = document.getElementById("contactNum_donor").value
  var address1 = document.getElementById("addressLine1_donor").value
  var address2 = document.getElementById("addressLine2_donor").value
  var postal = document.getElementById("postalCode_donor").value
  var password = document.getElementById("pw_donor").value
  var cfmPassword = document.getElementById("confirmPw_donor").value

  formData.append("name", name)
  formData.append("email", email)
  formData.append("number", number)
  formData.append("address1", address1)
  formData.append("address2", address2)
  formData.append("postal", postal)
  formData.append("password", password)
  formData.append("cfmPassword", cfmPassword)

  $.ajax({
      type: "POST",
      url: "./php/donorProfile_update.php",
      data: formData,
      processData: false,
      contentType: false
  }).done(function(result) {
    console.log(result)
      if (result == 10) {
          alert("Success!");
      } else {
          alert("New Password and Confirm Password not the Same!");
      }
  });

}

function logoutClick() {
    //verify user session identification
    $.ajax({
        type: "GET",
        url: "./php/logout.php",
        data: {}
    }).done(function(result) {

        if (result == 1) {
            window.location.href = "index.html"
        } else {
            window.location.href = "index.html"
        }

    });

}
