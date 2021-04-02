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

function loginClick() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    if (email != "" && password != "") {
        $.ajax({
            type: "GET",
            url: "./php/login.php",
            data: {
                email: email,
                password: password
            },
            success: function(result) {
                if (result == 1) {
                    window.location.href = "index.html"
                } else {
                    alert("Incorrect email or password")
                }
            }
        });
    } else {
        alert("Fill in your email or password")
    }

}
