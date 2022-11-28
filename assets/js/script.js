// Array to hold city names if one does not already exist in localStorage
if (localStorage.cityNames) {
    var cityNames = JSON.parse(localStorage.getItem("cityNames"));
    console.log(localStorage.cityNames);
} else {
    var cityNames = [];
};
console.log(cityNames);
// API key from account with Open Weather
const apiKey = "bb7c4152bdea4e092599aeb298e2c4ef";

// Create city search btn
const createCitySearchEl = () => {
    
}

// API fetch to obtain current weather conditions from Open Weather
const callCurrentForecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    console.log(data.main);
                    console.log(data.name);
                    //createCurrentForecastEl(data.name, data.main.temp, data.main.feels_like, data.wind.speed, data.main.humidity);

                });
            } else {
                console.log(response.statusText);
            }
        });
};

// Fetch for city lat and lon
const fetchGeocode = (city) => {
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





$(document).ready(() => {
    console.log("The document is ready!");
   
});


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