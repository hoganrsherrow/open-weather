// Array to hold city names if one does not already exist in localStorage
if (localStorage.cityNames) {
    var cityNames = JSON.parse(localStorage.getItem("cityNames"));
    console.log(localStoragecityNames);
} else {
    var cityNames = [];
};
console.log(cityNames);
// API key from account with Open Weather
var apiKey = "bb7c4152bdea4e092599aeb298e2c4ef";
// API fetch to obtain current weather conditions from Open Weather
function callCurrentForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    console.log(data.main);
                    console.log(data.name);
                    createCurrentForecastEl(data.name, data.main.temp, data.main.feels_like, data.wind.speed, data.main.humidity);

                });
            } else {
                console.log(response.statusText);
            }
        });
};

// Generate current forecast element
function createCurrentForecastEl(name, temp, feelsLike, wind, humidity) {
    $(".forecast-container").append(`<div class="d-flex flex-wrap" id="today-forecast"></div>`);

    $("#today-forecast").append(`<h2>${name}</h2><div>Temp: ${temp}\u2109</div><div>Feels Like: ${feelsLike}\u2109</div><div>Wind: ${wind} MPH</div><div>Humidity: ${humidity} %</div>`);
    updateSearchHistory();
};

// Generate Search for a City section
function createSearchForACityEl() {
    $("main").append(`<section class="search-for-a-city d-flex flex-wrap"></section`);

    createCitySearchInputEl();
    createSearchBtnEl();
    updateSearchHistory();
};

// Generate city search input
function createCitySearchInputEl() {
    $(".search-for-a-city").append(`<label for="city-input" class="form-label"><h2>Search for a City:</h2></label><input type="text" class="form-control" id="city-input" placeholder="Nashville">`);
};

// Generate Search Button
function createSearchBtnEl() {
    $(".search-for-a-city").append(`<button type="button" class="btn btn-primary">Search</button>`);
};

// Generate forecast section
function createForecastEl() {
    $("main").append(`<section class="forecast-container d-flex"></section>`);
    console.log("Forecast section appended");
};

// Fetch for city lat and lon
function fetchGeocode(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then( (response) => {
            if (response.ok) {
                response.json().then( (data) => {
                    console.log(data);
                    console.log(data[0].lat);
                    console.log(data[0].lon);
                    callCurrentForecast(data[0].lat, data[0].lon);
                })
            } else {
                console.log(response.statusText);
                $(".search-for-a-city").prepend(`<div id="api-warning">Please enter a valid city name.</div>`);
            }
        })
};

// API fetch to obtain future forecasts. Limits requests to 5 days
// fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=36.174465&lon=-86.767960&appid=${apiKey}&cnt=5&units=imperial`)
//     .then( (response) => {
//         if (response.ok) {
//             response.json().then( (data) => {
//                 console.log(data);
//             });
//         } else {
//             console.log(response.statusText);
//         }
//     });

// Save to localStorage
function saveToLocalStorage(names) {
    localStorage.setItem("cityNames", JSON.stringify(names));
    console.log(localStorage.getItem("cityNames"));
};

// Update Search History
function updateSearchHistory() {
    if (cityNames.length > 0) {
        $(".search-for-a-city").append(`<div class="content-separator"></div>`);
        for (let i = 0; i < cityNames.length; i++) {
            $(".search-for-a-city").append(`<button type="button" class="btn btn-secondary city-btn" id="${cityNames[i]}">${cityNames[i]}</button>`);
        }
        console.log($(".city-btn").length);
        console.log($(".city-btn")[0].id);
    }
};

$(document).ready(() => {
    console.log("The document is ready!");
    createSearchForACityEl();
    createForecastEl();
   // callCurrentForecast();
    $("button").click( () => {
        console.log("click me");
        if ($("input")[0].value == "") {
            $(".search-for-a-city").prepend(`<div id="api-warning">Please enter a valid city name.</div>`);
        } else {
            fetchGeocode($("input")[0].value);
            // push() name to cityNames array
            // cityNames.push($("input")[0].value);
            // console.log(cityNames);
            // saveToLocalStorage(cityNames);
            $("input")[0].value = "";
            //updateSearchHistory();
        }
    });
});