// Create previous searches element
const renderPreviousSearch = name => {
    $("#previous-searches-row").append(`
        <button class="btn col-8 col-md-5 col-lg-3" type="btn" onClick="fetchGeocode('${name}')">${name}</button>
    `);
};

// Save to localStorage
const save = (names) => {
    localStorage.setItem("cityNames", JSON.stringify(names));
    console.log(JSON.parse(localStorage.getItem("cityNames")));
}

// Clear localStorage
const clearSearchHistory = (arr) => {
    $("#previous-searches-row").empty();
    arr.splice(0, arr.length);
    localStorage.setItem("cityNames", JSON.stringify(arr));
}

// Array to hold city names if one does not already exist in localStorage
if (localStorage.cityNames) {
    var cityNames = JSON.parse(localStorage.getItem("cityNames"));
    cityNames.forEach(element => {
        renderPreviousSearch(element);
    });
} else {
    var cityNames = [];
};

const checkApiWarning = () => {
    if($("#api-warning")) alert("warning");
}

// API key from account with Open Weather
const apiKey = "bb7c4152bdea4e092599aeb298e2c4ef";

// See if cityNames already holds searched value
const cityNameCheck = (name, namesArray) => {
    // console.log(typeof(name));
    for(let i = 0; i < namesArray.length; i++) {
        if(namesArray[i] == name) return false;
    }

    return true;
}

// Create current forecast element
const createCurrentForecastEl = (name, temp, feelsLike, windSpeed, humidity) => {
    $("#forecast-container").append(`
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <div>Temperature: ${temp} &degF</div>
        <div>Feels Like: ${feelsLike} &degF</div>
        <div>Wind Speed: ${windSpeed} MPH</div>
        <div>Humidity: ${humidity}%</div>
    </div>
    `);
    if(cityNameCheck(name, cityNames)) {
        cityNames.push(name);
        save(cityNames);
        renderPreviousSearch(name);
    }
}

// API fetch to obtain current weather conditions from Open Weather
const callCurrentForecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    // console.log(data);
                    // console.log(data.main);
                    // console.log(data.name);
                    createCurrentForecastEl(data.name, data.main.temp, data.main.feels_like, data.wind.speed, data.main.humidity);

                });
            } else {
                console.log(response.statusText);
            }
        });
};

// Fetch for city lat and lon
const fetchGeocode = (city) => {
    if($("#api-warning")) {
        $("#api-warning").remove();
    }
    if($(".card-body")) $(".card-body").remove();
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        .then( (response) => {
            if (response.ok) {
                response.json().then( (data) => {
                    // console.log(data);
                    // console.log(data[0].lat);
                    // console.log(data[0].lon);
                    callCurrentForecast(data[0].lat, data[0].lon);
                })
            } else {
                // console.log(response.statusText);
                $(".search-for-a-city").prepend(`<div id="api-warning">Please enter a valid city name.</div>`);
            }
        })
};


$("#city-btn").click(() => {
    // console.log($("#city").val());
    fetchGeocode($("#city").val())
});

$("#clear-history").click(() => {
    clearSearchHistory(cityNames);
})


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