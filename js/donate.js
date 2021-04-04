$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item active'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./charityProfile_donor.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item active'><a class='nav-link' href='./viewOngoingCampaigns_charity.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./charityProfile_charity.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else {
       window.location.replace("./login");
     }
     $("#navbarSupportedContent").html(nav)

  });

  loadDetails();
});


function loadDetails() {
  var campaignID = getUrlVars()["campaignID"]
  $.ajax({
        type: "GET",
        url: "./php/donateDetails.php",
        data: {
          campaignID: campaignID
        }
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          document.getElementById("fullName").value = jsonObj[0]['FullName'];
          document.getElementById("email").value = jsonObj[0]['Email'];
          document.getElementById("address").value = jsonObj[0]['AddressOne'];
          document.getElementById("postalCode").value = jsonObj[0]['PostalCode'];
          document.getElementById("campaignName").value = jsonObj[1]['CampaignName'];

				} else {
          alert("Please login as a donor to donate!")
          window.location.href = "login.html"
        }

    });
}

function donate() {
  var campaignID = getUrlVars()["campaignID"]
  var amount = document.getElementById("amount").value
  $.ajax({
        type: "GET",
        url: "./php/donate.php",
        data: {
          campaignID: campaignID,
          amount: amount
        }
    }).done(function(result) {
				if (result != 0) {
          //console.log(result)
          alert("Successfull donated!")
					window.location.href = "viewTransactions_donor.html"
				} else {
          alert("Please login as a donor to donate!")
          window.location.href = "login.html"
        }

    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function logoutClick() {
    // logout
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
