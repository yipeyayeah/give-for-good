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
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item active'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login.html'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register.html'>Register</a></li></ul>"
     }
     $("#navbarSupportedContent").html(nav)

  });

  loadCampaign();
});


function loadCampaign() {
  var campaignID = getUrlVars()["campaignID"]
  $.ajax({
        type: "GET",
        url: "./php/campaign_details.php",
        data: {
          campaignID: campaignID
        }
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          //console.log(result)

          var campaignName = '<h5>' + jsonObj[0]['CampaignName'] + '</h5>'
          var cardBody = '<h5><span class="fas fa-user-circle mr-1"></span>' + jsonObj[0]['entityName'] + '</h5><p class="subtitle1 font-weight-bold">$<span>' + jsonObj[0]['AmountReceived'] + '</span></p><p class="subtitle2">raised from <span>' + jsonObj[0]['Backers'] + '</span> donors</p><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ' + jsonObj[0]['percentage'] + '%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div><p class="float-left"><span>' + jsonObj[0]['percentage'] + '</span>% of $<span>' + jsonObj[0]['Amount'] + '</span></p><p class="float-right"><span>' + jsonObj[0]['days'] + '</span> more days</p><div class="col text-center"><a href="./donate?campaignID=' + jsonObj[0]["CampaignID"] + '" class="btn btn-info">Donate Today</a></div>'
          var about = '<h5>About Campaign</h5><p>' + jsonObj[0]['Description'] + '</p>'

          $("#campainName").html(campaignName)
          $("#cardBody").html(cardBody)
          $("#about").html(about)

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
            window.location.href = "./index.html"
        } else {
            window.location.href = "./index.html"
        }

    });

}
