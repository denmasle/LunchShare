$(document).ready(function () {
    var valid = window.localStorage.getItem("EnMonte");

    if (!valid) {
        window.localStorage.clear();
        window.location.assign("/login.html")
    } else {
        var token = window.localStorage.getItem("token");

        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            var currentTime = new Date();
    
            if (payload.exp < currentTime / 1000) {
                window.location.assign("/login.html")
            };
        };
    };

    $('.sidenav').sidenav();
    $('.modal').modal({ endingTop: '42%' });

    function myLunch() {
        $.ajax({
            url: "/api/user/" + payload.userID,
            method: "GET",
            headers: { "Authorization": 'Bearer ' + token }
        })
            .then(function (resp) {
                console.log(resp);
                if (resp.length === 0) {

                }
            }).catch(function (err) {
                throw err;
            });
    };

    myLunch();


    //     // for each character that our server sends us back
    //     for (var i = 0; i < data.length; i++) {
    //       // create a parent div for the oncoming elements
    //       var foodSection = $("<div>");
    //       // add a class to this div: 'food'
    //       foodSection.addClass("food");
    //       // add an id to the food to mark which food it is
    //       foodSection.attr("id", "search2" + i);
    //       // append the food to the food section
    //       $("#searchItems").append(foodSection);

    //       // Now add all of our character data to the food we just placed on the page

    //       // make the name an h2,
    //       $("#searchItems" + i).append("<h2>Name:" + data[i].eater + "</h2>");
    //       // the role an h3,
    //       $("#searchItems" + i).append("<h3>Food: " + data[i].lunch + "</h4>");
    //       // the age an h3,
    //       $("#searchItems" + i).append("<h3>Tradable: " + data[i].tradable + "</h4>");
    //       $("#searchItems" + i).append("<button>Trade</button>");
    //       // and the forcepoints an h3.

    //     }
    //   });



});