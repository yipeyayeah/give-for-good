$(document).ready(function () {
  $.ajax({
        type: "GET",
        url: "./php/viewTransactions_charity.php",
        data: {}
    }).done(function(result) {
      //console.log(result)
				if (result != 0) {
  				var jsonObj = JSON.parse(result)
          //console.log(jsonObj)

          var t = $('#transactions_all').DataTable();

          for (var i = 0; i < jsonObj.length; i++) {
            var myDate = new Date(1000*jsonObj[i]['TimeStamp']);

            t.row.add( [
                myDate.toLocaleString(),
                jsonObj[i]['TransactionID'],
                jsonObj[i]['FullName'],
                jsonObj[i]['CampaignName'],
                jsonObj[i]['Amount'],
                jsonObj[i]['Status']
            ] ).draw( false );
          }

				}
    });
});

function approve() {
  $.ajax({
        type: "POST",
        url: "./php/approve.php",
        data: {}
    }).done(function(result) {
      console.log(result)
				if (result == 0) {
          alert("Fail!")
				} else {
          alert("Transaction Status Updated!")
          location.reload();
        }
    });
}

function logoutClick() {
    // logout
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
