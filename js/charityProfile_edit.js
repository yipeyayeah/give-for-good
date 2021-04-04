var formData = new FormData();

$(document).ready(function () {
  formData.append("image", "");
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item active'><a class='nav-link' href='./charityProfile_donor.html'>Profile<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a></li></ul>"

     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item active'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link' href='./viewOngoingCampaigns_charity.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item active'><a class='nav-link' href='./charityProfile_charity.html'>Profile<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a></li></ul>"

     } else {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item active'><a class='nav-link'href='./index.html'>Home <span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login.html'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register.html'>Register</a></li></ul>"
     }

     $("#navbarSupportedContent").html(nav)
     loadProfile();

  });
});

function loadProfile() {
  $.ajax({
        type: "GET",
        url: "./php/charityProfile_edit.php",
        data: {}
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          document.getElementById("fullName_charity").value = jsonObj[0]['entityName'];
          document.getElementById("orgType").value = jsonObj[0]['entityType'];
          document.getElementById("uen_num").value = jsonObj[0]['UEN'];
          document.getElementById("uen_status").value = jsonObj[0]['uenStatus'];
          document.getElementById("uen_issue_date").value = jsonObj[0]['uenIssueDate'];
          document.getElementById("org_details").value = jsonObj[0]['CharityDescription'];
          document.getElementById("email_charity").value = jsonObj[0]['Email'];
          document.getElementById("contact_num_charity").value = jsonObj[0]['ContactNo'];
          document.getElementById("streetName_charity").value = jsonObj[0]['regStreetName'];
          document.getElementById("postalCode_charity").value = jsonObj[0]['PostalCode'];
          document.getElementById("bank_charity").value = jsonObj[0]['Bank'];
          document.getElementById("bankNo_charity").value = jsonObj[0]['BankAccNo'];

          if(jsonObj[0]['CharityImg'] != "" && jsonObj[0]['CharityImg'] != "null") {
            $('#profilePic_charity').attr('src', jsonObj[0]['CharityImg']);
          }

				}

    });
}

function readImgURL(input) {
    var imgElem = document.getElementById("profilePic_charity")
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#profilePic_charity').attr('src', e.target.result);
          formData.append("image", e.target.result.split(',')[1])
        }

        reader.readAsDataURL(input.files[0]) // convert to base64 string

    }
}

$("#charityProfile_pic").change(function() {
    readImgURL(this);
});

function update() {
  var entityName = document.getElementById("fullName_charity").value
  var entityType = document.getElementById("orgType").value
  var UEN = document.getElementById("uen_num").value
  var uenStatus = document.getElementById("uen_status").value
  var uenIssueDate = document.getElementById("uen_issue_date").value
  var CharityDescription = document.getElementById("org_details").value
  var Email = document.getElementById("email_charity").value
  var ContactNo = document.getElementById("contact_num_charity").value
  var regStreetName = document.getElementById("streetName_charity").value
  var PostalCode = document.getElementById("postalCode_charity").value
  var Bank = document.getElementById("bank_charity").value
  var BankAccNo = document.getElementById("bankNo_charity").value

  formData.append("entityName", entityName)
  formData.append("entityType", entityType)
  formData.append("UEN", UEN)
  formData.append("uenStatus", uenStatus)
  formData.append("uenIssueDate", uenIssueDate)
  formData.append("CharityDescription", CharityDescription)
  formData.append("Email", Email)
  formData.append("ContactNo", ContactNo)
  formData.append("regStreetName", regStreetName)
  formData.append("PostalCode", PostalCode)
  formData.append("Bank", Bank)
  formData.append("BankAccNo", BankAccNo)

  $.ajax({
      type: "POST",
      url: "./php/charityProfile_update.php",
      data: formData,
      processData: false,
      contentType: false
  }).done(function(result) {
      if (result == 1) {
          alert("Success!");
      } else {
          alert("Fail");
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
            window.location.href = "./index.html"
        } else {
            window.location.href = "./index.html"
        }

    });

}
