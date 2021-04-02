$(document).ready(function () {
  $.ajax({
        type: "GET",
        url: "./php/viewOngoingCampaigns_charity.php",
        data: {}
    }).done(function(result) {
      //console.log(result)
				if (result != 0) {
  				var jsonObj = JSON.parse(result)
          //console.log(jsonObj)

          var t = $('#campaigns_all').DataTable();

          for (var i = 0; i < jsonObj.length; i++) {
            t.row.add( [
                jsonObj[i]['CampaignName'],
                jsonObj[i]['AmountReceived'],
                jsonObj[i]['percentage'] + "%",
                "$" + jsonObj[i]['Amount'],
                jsonObj[i]['Backers'],
                jsonObj[i]['EndDateTime'],
                "In Progress",
                '<a href="./edit_campaign?campaignID=' + jsonObj[i]["CampaignID"] + '" type="button" class="btn btn-info">Edit</a>'
            ] ).draw( false );
          }

				}
    });
});



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
