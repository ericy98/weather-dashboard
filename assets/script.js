var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");

var todayContainer = document.querySelector("#todays-forecast")
var fiveDayContainer = document.querySelector("#fiveday-forecast")

// get history or set to empty array
var history = JSON.parse(localStorage.getItem("history")) || [];

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
                        
                    var titleEl = document.createElement("h3");
                    titleEl.textContent = nameEl

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
                
                
                // console.log(cityName);
                
            });
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function(error){
        alert("Unable to find city's forcast")
    })
    
};



// search bar function handler
var citySubmitHandler = function(event){
    event.preventDefault();

    // get value 
    var city = cityInputEl.value.trim();
    var upper = city.toUpperCase();

    if (upper) {
        getTodaysForecast(upper);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
    // console.log(event);
}

// // display todays forecast on page
// var displayTodaysForecast = function(city) {

    
//     // clear out content
//     todayContainer.textContent = "";

//     for (var i = 0; i < city.length; i++) {

//         var nameEl = city.name;
//         console.log(nameEl);
//         var titleEl = document.createElement("h3");
//         titleEl.textContent = nameEl

//         var containerEl = document.createElement("div");
//         containerEl.classList = "text-left"

//         var temp = document.createElement("p");
//         temp.textContent = city.main.temp;

        
        
//         containerEl.appendChild(temp);
//         todayContainer.appendChild(titleEl);
//         todayContainer.appendChild(containerEl);
//     }   
//     console.log(temp);
//     console.log(titleEl);
// }

// search bar history
var cityHistory = function(text) {
    var li = document.createElement("li");
    li.classList("search-history-item");
    li.textContent(text);
    history.appendChild(li);
}


cityFormEl.addEventListener("submit", citySubmitHandler)

// loop over 5day forcast
// for (var i = 0; i < city.length; i++) {
        
//     var cityName = city[i].name;

//     // container
//     var container = document.createElement("div");
//     container.classList = "col-md-2";
    
//     var cityEl = document.createElement("div");
//     cityEl.textContent = cityName;

//     container.appendChild(cityEl);
//     todayContainer.appendChild(container);

// }
