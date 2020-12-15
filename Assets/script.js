$(document).ready(function () {
  var apiKey = "e5c644d8a9d3a1a36fe10a2c8c8934c4";
  var cDate = luxon.DateTime.local().toLocaleString({
    month: "short",
    day: "2-digit",
  });
  console.log(cDate);

  $("#searchBtn").click(function (e) {
    e.preventDefault();
    var searchText = $("#searchBar").val();
    var queryUrl1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchText +
      "&units=metric&appid=" +
      apiKey;
    // current weather data call.
    $.ajax({
      url: queryUrl1,
      method: "GET",
      success: function (weatherData) {
        var cityLat = weatherData.coord.lat;
        var cityLong = weatherData.coord.lon;
        var weatherIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            weatherData.weather[0].icon +
            "@2x.png"
        );
        var navLink = $("<a>").addClass("nav-link");
        var tabText = $("<div>").addClass("tab-pane fade");
        var cwHeader = $("<h1>").addClass("text-center");
        var cwTempPara = $("<p>").addClass("text-left");
        var cwFeelsLike = $("<p>").addClass("text-left");
        var cwHumid = $("<p>").addClass("text-left");
        var cwWind = $("<p>").addClass("text-left");

        $("#v-pills-tab").prepend(navLink);
        $(".tab-content").prepend(tabText);
        tabText.attr("id", "v-pills-" + searchText);
        tabText.attr("role", "tabpanel");
        navLink.attr("id", "v-pills-" + searchText + "-tab");
        navLink.attr("role", "tab");
        navLink.attr("data-toggle", "pill");
        navLink.attr("href", "#v-pills-" + searchText);
        navLink.text(weatherData.name);
        tabText.append(cwHeader);
        cwHeader.text(weatherData.name + ", " + cDate);
        cwHeader.append(weatherIcon);
        tabText.append(cwTempPara);
        cwTempPara.text("Temperature: " + weatherData.main.temp + "°C");
        tabText.append(cwFeelsLike);
        cwFeelsLike.text("Feels Like: " + weatherData.main.feels_like + "°C");
        tabText.append(cwHumid);
        cwHumid.text("Humidty: " + weatherData.main.humidity + "%");
        tabText.append(cwWind);
        cwWind.text("Wind Speed: " + weatherData.wind.speed + " KPH");

        console.log(cityLat);
        console.log(cityLong);
        //place UV data AJAX call within this one
        console.log(weatherData);
        $.ajax({
          url:
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            cityLat +
            "&lon=" +
            cityLong +
            "&exclude=minutely,hourly,daily,alerts&units=metric&appid=" +
            apiKey,
          method: "GET",
          success: function (uvData) {
            console.log(uvData);
            //Need to print this below the current weather, inside a color coded box. Need a conditional statement to determine how the value impacts the color of the box.
            //use the code you got from Andrew to write your if/then statement
          },
        });
      },
    });
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchText +
        "&units=metric&appid=" +
        apiKey,
      method: "GET",
      success: function (forcast) {
        console.log(forcast);
        //need to write a loop that shows every 8th entry going from 0: 0, 15, and so on. Basically, i + 8 in a for loop. This will make each result be from the same time of day from when the API was called. You'll need to dynamically create cards in JQUERY, then print the cards to the HTML.
      },
    });
  });
});
