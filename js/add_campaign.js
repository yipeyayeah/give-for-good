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

//Register user
function btnSubmitClick() {
  var CampaignName = document.getElementById("campaignName").value
  var Description = document.getElementById("campaignDescription").value
  var StartDateTime = document.getElementById("startDate").value
  var EndDateTime = document.getElementById("endDate").value
  var Location = document.getElementById("location").value
  var Amount = document.getElementById("campaignGoal").value

  $.ajax({
      type: "GET",
      url: "./php/add_campaign.php",
      data: {
          CampaignName: CampaignName,
          Description: Description,
          StartDateTime: StartDateTime,
          EndDateTime: EndDateTime,
          Location: Location,
          Amount: Amount
      },
      success: function(result) {
          // check result pass or fail
          //console.log(result)
          if (result == "failed") {
            // if fail to add
            alert("Failed to add")
          } else {
            alert("New Campaign added successfully")
            window.location.href = "../viewOngoingCampaigns_charity.html";
          }
      }
  });
}
