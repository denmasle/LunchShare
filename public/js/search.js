$(document).ready(function () {
    var valid = window.localStorage.getItem("EnMonte");

    if (!valid) {
        window.localStorage.clear();
        window.location.assign("/index.html")
    } else {
        var token = window.localStorage.getItem("token");

        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            var currentTime = new Date();

            if (payload.exp < currentTime / 1000) {
                window.location.assign("/index.html")
            };
        };
    };

    $('.sidenav').sidenav();
    $('.modal').modal({ endingTop: '42%' });

    $('#userName1').html("Welcome,<br>" + payload.name);
    $('#userName2').html("Welcome,<br>" + payload.name);

    if (payload.url != "") {
        $('#userPic1').attr("src", payload.url);
        $('#userPic2').attr("src", payload.url);
    }

    myLunch();

    function myLunch() {
        $.ajax({
            url: "/api/user/" + payload.userID,
            method: "GET",
            headers: { "Authorization": 'Bearer ' + token }
        })
            .then(function (resp) {
                if (resp.length === 0) {
                    $("#myItems").html("<h4>Nothing...</h4>");
                } else {
                    $("#myItems").empty();
                    for (var i = 0; i < resp.length; i++) {
                        var food = resp[i].lunch;
                        if (resp[i].tradable) {
                            food += " <span style='font-size:16px; font-weight:100; font-style: italic;'>(tradable)</span>";
                        };
                        var foodName = $("<div class='foodName col s10 amber lighten-4'>").html(food);
                        var button = $('<button class="foodDelete waves-effect waves-light btn orange lighten-1">').attr("id", resp[i].id).text("X");
                        var foodOption = $("<div class='foodOption col s2'>").append(button);
                        $("#myItems").append(foodName).append(foodOption);
                    };
                };
            }).catch(function (err) {
                throw err;
            });
    };

    function tradableLunch() {
        $.ajax({
            url: "/api/lunch",
            method: "GET",
            headers: { "Authorization": 'Bearer ' + token }
        })
            .then(function (resp) {
                if (resp.length === 0) {
                    $("#searchItems").html("<h4>Nothing...</h4>");
                } else {
                    $("#searchItems").empty();
                    for (var i = 0; i < resp.length; i++) {
                        if (payload.userID != resp[i].userID) {
                            var food = resp[i].lunch + " <span style='font-size:14px; font-weight:100; font-style: italic;'>(" + resp[i].eater + ")</span>";
                            var foodName = $("<div class='foodName col s9 amber lighten-4'>").html(food);
                            var button = $('<button class="foodTrade waves-effect waves-light btn orange lighten-1">').attr("id", resp[i].id).text("Trade");
                            var foodOption = $("<div class='foodOption col s3'>").append(button);
                            $("#searchItems").append(foodName).append(foodOption);
                        };
                    };
                };
            }).catch(function (err) {
                throw err;
            });
    };

    $("#allTradable1").on("click", function (event) {
        event.preventDefault();
        tradableLunch();
    });

    $("#allTradable2").on("click", function (event) {
        event.preventDefault();
        tradableLunch();
    });

    $("#signOut1").on("click", function (event) {
        event.preventDefault();
        window.localStorage.clear();
        window.location.assign("/index.html")
    });

    $("#signOut2").on("click", function (event) {
        event.preventDefault();
        window.localStorage.clear();
        window.location.assign("/index.html")
    });

    $("#addButton").on("click", function (event) {
        event.preventDefault();

        if ($("#foodName").val() === "") {
            return;
        };

        $.ajax({
            url: "/api/user/",
            method: "POST",
            headers: { "Authorization": 'Bearer ' + token },
            data: {
                "userID": payload.userID,
                "eater": payload.name,
                "lunch": $("#foodName").val(),
                "tradable": $("#trade").is(":checked")
            }
        }).then(function (resp) {
            myLunch();
        }).catch(function (err) {
            throw err;
        });
    });

    $(document).on("click", ".foodDelete", function (event) {
        event.preventDefault();

        $.ajax({
            url: "/api/user/" + $(this).attr("id"),
            method: "DELETE",
            headers: { "Authorization": 'Bearer ' + token }
        }).then(function (resp) {
            myLunch();
        }).catch(function (err) {
            throw err;
        });
    });

    // If ‘Enter’ key has been pressed
    $("#search1").on("keypress", function (e) {
        if (e.which === 13) {
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            searchLunch($("#search1").val().trim());

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
        }
    });

    $("#search2").on("click", function (e) {
        if (e.which === 13) {
            //Disable textbox to prevent multiple submit
            $(this).attr("disabled", "disabled");

            searchLunch($("#search2").val().trim());

            //Enable the textbox again if needed.
            $(this).removeAttr("disabled");
        }
    });

    function searchLunch(food) {        
        $.ajax({
            url: "/api/lunch/" + food,
            method: "GET",
            headers: { "Authorization": 'Bearer ' + token }
        })
            .then(function (resp) {
                if (resp.length === 0) {
                    $("#searchItems").html("<h4>Nothing...</h4>");
                } else {
                    $("#searchItems").empty();
                    for (var i = 0; i < resp.length; i++) {
                        if (payload.userID != resp[i].userID) {
                            var food = resp[i].lunch + " <span style='font-size:14px; font-weight:100; font-style: italic;'>(" + resp[i].eater + ")</span>";
                            var foodName = $("<div class='foodName col s9 amber lighten-4'>").html(food);
                            var button = $('<button class="foodTrade waves-effect waves-light btn orange lighten-1">').attr("id", resp[i].id).text("Trade");
                            var foodOption = $("<div class='foodOption col s3'>").append(button);
                            $("#searchItems").append(foodName).append(foodOption);
                        };
                    };
                };
            }).catch(function (err) {
                throw err;
            });
    };
});