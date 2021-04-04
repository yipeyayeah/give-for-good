$(document).ready(function () {
  $.ajax({
     type: "GET",
     url: "./php/verify.php",
     data: {}
  }).done(function(result) {
     if (result == 1) {
       window.location.replace("index.html");
     } else if (result == 2) {
       window.location.replace("index.html");
     }

  });
});

//Register user
function btnSubmitClick() {
  var name = document.getElementById("name").value
  var email = document.getElementById("email").value
  var number = document.getElementById("number").value
  var postal = document.getElementById("postal").value
  var address1 = document.getElementById("address1").value
  var address2 = document.getElementById("address2").value
  var password = document.getElementById("password").value
  var cfmPassword = document.getElementById("cfmPassword").value

  $.ajax({
      type: "GET",
      url: "./php/register.php",
      data: {
          name: name,
          email: email,
          number: number,
          postal: postal,
          address1: address1,
          address2: address2,
          password: password,
          cfmPassword: cfmPassword
      },
      success: function(result) {
          // check result pass or fail
          if (result == "failed") {
            // if fail to register
            alert("Password and Confirm Password not the same!")
          } else {
            alert("Your account has been added successfully")
            window.location.href = "../login.html";
          }
      }
  });
}
