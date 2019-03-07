var token = window.localStorage.getItem("token");

if (!token) {
    window.location.assign("/login.html")
} else {
    var payload = JSON.parse(window.atob(token.split('.')[1]));
    var currentTime = new Date();

    if (payload.exp < currentTime / 1000) {
        window.location.assign("/login.html")
    };
};

$(document).ready(function () {
    $('.sidenav').sidenav();



});