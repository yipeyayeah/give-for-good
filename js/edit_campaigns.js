var formData = new FormData();

$(document).ready(function () {
  loadCampaign();
});

function loadCampaign() {
  var campaignID = getUrlVars()["campaignID"]
  formData.append("campaignID", campaignID)
  $.ajax({
        type: "GET",
        url: "./php/edit_campaigns.php",
        data: {
          campaignID: campaignID
        }
    }).done(function(result) {
				if (result != 0) {
					var jsonObj = JSON.parse(result)
          //console.log(result)
          var startDate = Date.parse(jsonObj[0]['StartDateTime']);
          startDate = new Date(startDate).toISOString();

          var endDate = Date.parse(jsonObj[0]['EndDateTime']);
          endDate = new Date(endDate).toISOString();

          document.getElementById("campaignName").value = jsonObj[0]['CampaignName'];
          document.getElementById("campaignDescription").value = jsonObj[0]['Description'];
          document.getElementById("startDate").value = startDate.slice(0, 19);
          document.getElementById("endDate").value = endDate.slice(0, 19);
          document.getElementById("location").value = jsonObj[0]['Location'];
          document.getElementById("campaignGoal").value = jsonObj[0]['Amount'];

				}

    });
}

function update() {
  var campaignName = document.getElementById("campaignName").value
  var campaignDescription = document.getElementById("campaignDescription").value
  var startDate = document.getElementById("startDate").value
  var endDate = document.getElementById("endDate").value
  var location = document.getElementById("location").value
  var campaignGoal = document.getElementById("campaignGoal").value

  formData.append("campaignName", campaignName)
  formData.append("campaignDescription", campaignDescription)
  formData.append("startDate", startDate)
  formData.append("endDate", endDate)
  formData.append("location", location)
  formData.append("campaignGoal", campaignGoal)

  $.ajax({
      type: "POST",
      url: "./php/update_campaign.php",
      data: formData,
      processData: false,
      contentType: false
  }).done(function(result) {
    console.log(result)
      if (result == 1) {
          alert("Success!");
      } else {
          alert("Fail!!");
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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
