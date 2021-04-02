$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./donorProfile_edit'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index'>Home</a></li><li class='nav-item'><a class='nav-link' href='./viewOngoingCampaigns_charity'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./charityProfile_charity'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='#'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register'>Register</a></li></ul>"
     }
     $("#navbarSupportedContent").html(nav)

  });

  loadProfile();
});

function loadProfile() {
  var charityID = getUrlVars()["charityID"]
  $.ajax({
        type: "GET",
        url: "./php/charityProfile_donor.php",
        data: {
          charityID: charityID
        }
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          //console.log(result)
          var charityName = '<h3>' + jsonObj[0]['entityName'] + '</h3><h5><small>' + jsonObj[0]['entityType'] + ' | 560 Donors</small></h5><a href="' + jsonObj[0]['Link'] + '"><span class="fa-stack fa-1-5x"><i class="fa fa-circle fa-stack-2x icon-background"></i><i class="fa fa-link fa-stack-1x"></i> </span></a>'
          var about = '<h5>About Us</h5><p>' + jsonObj[0]['CharityDescription'] + '</p>'
          var contact = '<div class="card-header"><h5>Contact Us</h5></div><div class="card-body"><h5>Jane Doh</h5><p><span class="fas fa-phone-alt mr-1"></span>' + jsonObj[0]['ContactNo'] + '</p><p><span class="fas fa-mail-bulk mr-1"></span>' + jsonObj[0]['Email'] + '</p><p><span class="fas fa-link mr-1"></span>' + jsonObj[0]['Link'] + '</p></div>'

          if(jsonObj[0]['CharityImg'] != "" && jsonObj[0]['CharityImg'] != "null") {
            $('#profilePic_charity').attr('src', jsonObj[0]['CharityImg']);
          }
          
          $("#charityName").html(charityName)
          $("#about").html(about)
          $("#contact").html(contact)
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


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
