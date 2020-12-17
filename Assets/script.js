$(document).ready(function () {
  var apiKey = "e5c644d8a9d3a1a36fe10a2c8c8934c4";
  var cDate = luxon.DateTime.local().toLocaleString({
    month: "short",
    day: "2-digit",
  });
 

  $("#searchBtn").click(function (e) {
    e.preventDefault();
    var searchText = $("#searchBar").val();
    var queryUrl1 =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchText +
      "&units=metric&appid=" +
      apiKey;
    
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
          console.log(weatherData)
        
      
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
            
            var cwUV = $("<p>").addClass("text-left");
            var uvSpan = $("<span>").addClass("text-left");
            var uvIndex = uvData.current.uvi;
            tabText.append(cwUV);
            cwUV.text("UV Index: ");
            cwUV.append(uvSpan);
            uvSpan.text(uvIndex);

            if (uvIndex < 5) {
              uvSpan.addClass("low");
            } else if (uvIndex > 5 && uvIndex < 8) {              
              uvSpan.removeClass("low");
              uvSpan.addClass("medium");
              uvSpan.css("color", "black")
            } else if (uvIndex > 8 && uvIndex < 10) {
              uvSpan.removeClass("low");
              uvSpan.removeClass("medium");
              uvSpan.addClass("high")
            } else {
              uvSpan.removeClass("high");
              uvSpan.removeClass("medium");
              uvSpan.removeClass("low");
              uvSpan.addClass("extreme");
            }
            
            $.ajax({
              url:
                "https://api.openweathermap.org/data/2.5/forecast?q=" +
                searchText +
                "&units=metric&appid=" +
                apiKey,
              method: "GET",
              success: function (forcast) {
                var cDeck = $("<div>").addClass("card-deck")
                tabText.append(cDeck)
                console.log(forcast);
               for (i = 0; i < forcast.list.length; i += 8) {
                 var forCard = $("<div>").addClass("card")
                 var cBody = $("<div>").addClass("card-body")
                 var cTitle = $("<h5>").addClass("card-title")
        
                 var cIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" +
                 forcast.list[i].weather[0].icon +
                 "@2x.png" )
                 var tempText = $("<p>").addClass("card-text")
                 var feelText = $("<p>").addClass("card-text")
                 cDeck.append(forCard);
                 forCard.append(cBody);
                 cBody.append(cTitle);
                 cTitle.text("This is working")
               }
              },
            });
          },
        });
      },
    });
  });
});
