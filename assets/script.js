var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");

var todayContainer = document.querySelector("#todays-forecast")
var fiveDayContainer = document.querySelector("#fiveday-forecast")
var searchHistory = document.querySelector("#history");

// Today's forecast fetch
var getTodaysForecast = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=96edaf2546f002ef2fa639940d7c6b1d";

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                var displayTodaysForecast = function(data, cityName) {
                    // clear out content
                    todayContainer.textContent = "";

                    var nameEl = cityName;
                        
                    var icon = document.createElement("img")
                    icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    var titleEl = document.createElement("h3");
                    titleEl.textContent = nameEl + " (" + new Date().toLocaleDateString() +")";


                    
                    var containerEl = document.createElement("div");
                    containerEl.classList = "text-left"

                    var temp = document.createElement("p");
                    temp.classList = "p-1";
                    temp.textContent = "Temperature: " + data.main.temp + " °F";

                    var humidity = document.createElement("p");
                    humidity.classList = "p-1";
                    humidity.textContent = "Humidity: " + data.main.humidity + "%";

                    var wind = document.createElement("p");
                    wind.classList = "p-1";
                    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";

                    titleEl.appendChild(icon);    
                    containerEl.appendChild(temp);
                    containerEl.appendChild(humidity);
                    containerEl.appendChild(wind);
                    todayContainer.appendChild(titleEl);
                    todayContainer.appendChild(containerEl);
                }
                var uvIndex = function(lat, lon) {
                    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=96edaf2546f002ef2fa639940d7c6b1d&units=imperial" + "&lat=" + lat + "&lon=" + lon;
                
                    fetch(apiUrl).then(function(response) {
                        if(response.ok) {
                            response.json().then(function(data){
                                    
                                var uv = document.createElement("p");
                                uv.classList = "p-1";
                                uv.textContent = "  UV Index: "

                                var dataColor = document.createElement("span");
                                dataColor.textContent = data.value;

                                todayContainer.appendChild(uv)
                                uv.appendChild(dataColor)
                                if (data.value < 3) {
                                    dataColor.classList = "bg-success p-2 rounded"
                                }
                                else if (data.value >=3 && data.value < 7) {
                                    dataColor.classList = "bg-warning p-2 rounded"
                                }
                                else if (data.value >=7 && data.value < 11) {
                                    dataColor.classList = "bg-danger p-2 rounded"
                                }
                                else if (data.value >=11) {
                                    dataColor.classList = "bg-primary p-2 rounded"
                                }
                            })
                        } else {
                            alert("Error: " + response.statusText);
                        }
                        
                    })
                    .catch(function(error) {
                        alert("Unable to find city's UV Index")
                    })
                    
                };

                displayTodaysForecast(data, cityName);
                uvIndex(data.coord.lat, data.coord.lon);
                
                
            });
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function(error){
        alert("Unable to find city's forcast")
    })
    
};

var getFivedayForecast = function(cityName) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=96edaf2546f002ef2fa639940d7c6b1d";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {

                fiveDayContainer.textContent = "";
                var titleEl = document.createElement("h4");
                titleEl.textContent = "5-Day Forecast: ";
                titleEl.classList = "m-auto"
                fiveDayContainer.appendChild(titleEl);
                
                for (var i = 0; i < data.list.length; i++) {
                
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1){
                        

                        var container = document.createElement("div");
                        container.classList = "text-left col-md"

                        var div = document.createElement("div");
                        div.classList = "bg-info text-white p-1";

                        var date = document.createElement("h5");
                        date.textContent = new Date(data.list[i].dt_txt).toLocaleDateString();
                        date.classList = "p-1";

                        var icon = document.createElement("img");
                        icon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                        icon.classList = "p-1";

                        var temp = document.createElement("p");
                        temp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                        temp.classList = "p-1";

                        var hum = document.createElement("p");
                        hum.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                        hum.classList = "p-1";

                        
                        
                        div.appendChild(date);
                        div.appendChild(icon);
                        div.appendChild(temp);
                        div.appendChild(hum);
                        container.appendChild(div);
                        
                        fiveDayContainer.appendChild(container);
                    }



                }
            })
        }
    })
    
    console.log(apiUrl)
}


// search bar function handler
var citySubmitHandler = function(event){
    event.preventDefault();

    // get value 
    var city = cityInputEl.value.trim();
    var upper = city.toUpperCase();

    if (upper) {
        getTodaysForecast(upper);
        getFivedayForecast(city);
        cityInputEl.value = "";
        // cityHistory(city);

    } else {
        alert("Please enter a city")
    }
    // console.log(event);
}

// // search bar history
// var cityHistory = function(city) {
//     if (historyList.indexOf(city) === -1) {
//         historyList.push(city);
//         localStorage.setItem("history", JSON.stringify(history));
//         historyList(city);
//     }
    
// }


// var historyList = function(text) {
//     var li = document.createElement("li");
//     li.classList= "search-history-item";
//     li.textContent = text;
//     searchHistory.appendChild(li);
    
// }

//  // get history or set to empty array
//  var history = JSON.parse(localStorage.getItem("history")) || []; 

//  for ( var i = 0; i < history.length; i++){
//      historyList(history[i]);
//  }


cityFormEl.addEventListener("submit", citySubmitHandler)

