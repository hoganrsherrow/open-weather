// API key from account with Open Weather
var apiKey = "bb7c4152bdea4e092599aeb298e2c4ef";
// API fetch to obtain current weather conditions from Open Weather
function callCurrentForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=36.174465&lon=-86.767960&appid=${apiKey}&units=imperial`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                });
            } else {
                console.log(response.statusText);
            }
        });
};

// Generate Search for a City section
function createSearchForACityEl() {
    $("main").append(`<section class="search-for-a-city"></section`);

    createCitySearchInputEl();
    createSearchBtnEl();
};

// Generate city search input
function createCitySearchInputEl() {
    $(".search-for-a-city").append(`<label for="city-input" class="form-label">Search for a City:</label><input type="text" class="form-control" id="city-input" placeholder="Nashville">`);
};

// Generate Search Button
function createSearchBtnEl() {
    $(".search-for-a-city").append(`<button type="button" class="btn btn-primary">Search</button>`);
};

// Generate forecast section
function createForecastEl() {
    $("main").append(`<section class="forecast-container d-flex"></section>`);
    console.log("Forecast section appended");
}

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



$(document).ready(() => {
    console.log("The document is ready!");
    createSearchForACityEl();
    createForecastEl();
});