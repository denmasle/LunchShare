$("#title").delay(1000).animate({ height: 350 }, 700);
$("#sign").delay(1500).fadeIn(800);

$("#signIn").on("click", function (event) {
    event.preventDefault();
    $("#title").animate({ height: 490 }, 700);
    $("#sign").fadeOut(800);
    $("#signInForm").delay(800).fadeIn(800);
});

$("#signUp").on("click", function (event) {
    event.preventDefault();
    $("#title").animate({ height: 625 }, 700);
    $("#sign").fadeOut();
    $("#signUpForm").delay(800).fadeIn(800);
});

$("#signInButton").on("click", function (event) {
    event.preventDefault();

    var email = $("#id").val();
    var password = $("#pw").val();

    axios.post("/auth/login", {
        email: email,
        password: password
    })
        .then(function (resp) {
            console.log(resp);
            window.localStorage.setItem("token", resp.data.token);

            alert("Welcome");
            window.setTimeout(function () {
                window.location.assign("/search.html")
            }, 1000)
        })
        .catch(function (err) {
            console.error(err);
        })
});

$("#signUpButton").on("click", function (event) {
    event.preventDefault();

    var userData = {
        name: $("#name").val(),
        url: $("#pic").val(),
        email: $("#email").val(),
        password: $("#password").val()
      };

    console.log(userData);
    $.post("/auth/register", userData)
    .then(function() {
        alert("User created");
      window.setTimeout(function () {
          window.location.assign("/search.html")
      }, 1000)
    });
});