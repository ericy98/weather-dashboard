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
                displayTodaysForecast(data, cityName);
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

    if (city) {
        getTodaysForecast(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city")
    }
    // console.log(event);
}

// display todays forecast on page
var displayTodaysForecast = function(city) {

    console.log(city)
    // clear out content
    todayContainer.textContent = "";

    for (var i = 0; i < city.length; i++) {

        var nameEl = city.name;

        var titleEl = document.createElement("h3")
        titleEl.textContent = nameEl

        var containerEl = document.createElement("div");
        containerEl.classList = "text-left"

        
        
        
        containerEl.appendChild(titleEl);
        todayContainer.appendChild(containerEl);
    }   
}

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

