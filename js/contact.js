$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_donor.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item active'><a class='nav-link' href='./contact.html'>Contact Us<span class='sr-only'>(current)</span></a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./donorProfile_edit.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else if (result == 2) {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link' href='./viewOngoingCampaigns_charity.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./viewTransactions_charity.html'>Transactions</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item active'><a class='nav-link' href='./contact.html'>Contact Us<span class='sr-only'>(current)</span></a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./charityProfile_charity.html'>&nbsp;Profile</a></li><li class='nav-item'><a class='nav-link' onclick='logoutClick()'><span class='fas fa-sign-out-alt'></span>&nbsp;Log Out</a</li></ul>"
     } else {
       var nav = "<ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='./index.html'>Home</a></li><li class='nav-item'><a class='nav-link' href='./ongoing_campaigns.html'>Campaigns</a></li><li class='nav-item'><a class='nav-link' href='./contact.html'>About Us</a></li><li class='nav-item active'><a class='nav-link' href='./contact.html'>Contact Us<span class='sr-only'>(current)</span></a></li></ul><ul class='navbar-nav'><li class='nav-item'><a class='nav-link' href='./login.html'><span class='fas fa-sign-in-alt'></span>&nbsp;Login</a></li><li class='nav-item'><a class='nav-link' href='./register.html'>Register</a></li></ul>"
     }
     $("#navbarSupportedContent").html(nav)

  });
});

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
