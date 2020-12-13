console.log("LINKED");

$(document).ready(function () {
  var apiKey = "e5c644d8a9d3a1a36fe10a2c8c8934c4";
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
          },
        });
      },
    });
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchText +
        "&appid=" +
        apiKey,
      method: "GET",
      success: function (forcast) {
        console.log(forcast);
        //need to write a loop that shows every 8th entry going from 0: 0, 15, and so on. Basically, i + 8 in a for loop. This will make each result be from the same time of day from when the API was called.
      },
    });
  });
});
