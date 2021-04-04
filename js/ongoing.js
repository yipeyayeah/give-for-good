var jsonObj;

$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link active' href='./ongoing_campaigns.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./donorProfile_edit.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item active'><a class='nav-link' href='./viewOngoingCampaigns_charity.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./charityProfile_charity.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item active'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns<span class='sr-only'>(current)</span></a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>Contact Us</a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login.html'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register.html'>Register</a></li></ul>"
     }
     $("#navbarSupportedContent").html(nav)

  });

  loadOngoing();
});


function loadOngoing() {
  $.ajax({
      type: "GET",
      url: "./php/loadOngoing.php",
      data: {}
  }).done(function(result) {

      jsonObj = JSON.parse(result)

      var card = ""

      for (var i = 0; i < jsonObj.length; i++) {
        //console.log(jsonObj[i])
        card += '<div class="card"><img src="assets/img/joel-muniz-y3ZY6qFln_g-unsplash.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ jsonObj[i]['CampaignName'] +'<br><a href="./charityProfile_donor?charityID=' + jsonObj[i]['CharityID'] + '" class="small">' + jsonObj[i]['entityName'] + '</a></h5><p class="card-text">' + jsonObj[i]['Description'] + '</p><a href="./donate?campaignID=' + jsonObj[i]["CampaignID"] + '" class="btn btn-info">Donate Today</a> <br><a href="./campaign_details?campaignID=' + jsonObj[i]["CampaignID"] + '"class="card-text"><small>More Details</small></a></div></div>'
      }
      $("#ongoingCard").html(card)

  });
}

function search() {
  var search = document.getElementById("inlineFormInputGroup").value;

  var items = jsonObj.filter((data) => {
      return data.CampaignName.toLowerCase().includes(search.toLowerCase()) || data.entityName.toLowerCase().includes(search.toLowerCase())
  })

  var card = ""

  for (var i = 0; i < items.length; i++) {
    card += '<div class="card"><img src="assets/img/joel-muniz-y3ZY6qFln_g-unsplash.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ items[i]['CampaignName'] +'<br><a href="./charityProfile_donor?charityID=' + items[i]['CharityID'] + '" class="small">' + items[i]['entityName'] + '</a></h5><p class="card-text">' + items[i]['Description'] + '</p><a href="./donate?campaignID=' + items[i]["CampaignID"] + '" class="btn btn-info">Donate Today</a> <br><a href="./campaign_details?campaignID=' + items[i]["CampaignID"] + '"class="card-text"><small>More Details</small></a></div></div>'
  }
  $("#ongoingCard").html(card)

  //console.log(items)
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
