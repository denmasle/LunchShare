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
});

$("#signUpButton").on("click", function (event) {
    event.preventDefault();
});