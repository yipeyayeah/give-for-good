$(document).ready(function () {
  loadProfile();
});

function loadProfile() {
  $.ajax({
        type: "GET",
        url: "./php/charityProfile_charity.php",
        data: {}
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
            window.location.href = "../index.html"
        } else {
            window.location.href = "../index.html"
        }

    });

}
