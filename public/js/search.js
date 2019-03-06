var token = window.localStorage.getItem("token");
var payload = JSON.parse(window.atob(token.split('.')[1]));
var currentTime = new Date();
if (!token) {
    //check token exp
    window.location.assign("/login.html")
}
console.log(JSON.parse(window.atob(token.split('.')[1])))