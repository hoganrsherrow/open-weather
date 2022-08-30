console.log("JS is working.");
// API key from account with Open Weather
var apiKey = "bb7c4152bdea4e092599aeb298e2c4ef";
// API fetch to obtain current weather conditions from Open Weather
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