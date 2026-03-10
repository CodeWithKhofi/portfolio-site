// This is a test pull from github

const cityInput = document.getElementById("city-input");
const city = document.getElementById("city");
const currentDate = document.getElementById("date");
const weatherIcon = document.getElementById("weather-icon");
const temp = document.getElementById("temp");
const tempDesc = document.getElementById("desc");
const feelsLike = document.getElementById("feels-like");
const humid = document.getElementById("humidity");
const wind = document.getElementById("wind");
const rain = document.getElementById("rain");
const searchButton = document.getElementById("search-btn");

const now = new Date();
const date = now.toLocaleDateString(undefined,{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
currentDate.textContent = date;


async function getCoords(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.results){
        return {lat:data.results[0].latitude,long:data.results[0].longitude};
    }
    
    
}



let lat = 51.50;
let long = -0.12;


async function getWeather(lat,long) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const weatherVisuals = {
    0: { text: "Clear Skies", icon: "☀️", color: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)" },
    1: { text: "Mainly Clear", icon: "🌤️", color: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)" },
    2: { text: "Partly Cloudy", icon: "⛅", color: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)" },
    3: { text: "Overcast", icon: "☁️", color: "linear-gradient(135deg, #3e5151 0%, #decba4 100%)" },
    45: { text: "Foggy", icon: "🌫️", color: "linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)" },
    61: { text: "Slight Rain", icon: "🌧️", color: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)" },
    80: { text: "Rain Showers", icon: "🌦️", color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
    };
    let temperature = data.current.temperature_2m;
    let humidity = data.current.relative_humidity_2m;
    let windSpeed = data.current.wind_speed_10m;
    let code = data.current.weather_code;
    let weatherText = weatherVisuals[code];


    city.textContent = cityInput.value;
    weatherIcon.textContent = weatherVisuals[code].icon;
    temp.textContent = `${temperature}°C`;
    tempDesc.textContent = weatherVisuals[code].text;
    document.body.style.background = weatherVisuals[code].color;
    humid.textContent = `${humidity}%`;
    wind.textContent = `${windSpeed}km/h`;
    console.log(`It is ${temperature}°C with ${weatherText} and ${humidity}% humidity`);
    // console.log(data.current_weather.temperature);
    // console.log(data);
    
}

async function handleSearch() {
    const cityName = cityInput.value;
    if(!cityName) return;

    const coords = await getCoords(cityName);
    if(coords){
        getWeather(coords.lat, coords.long);
    }else{
        alert("City not found!");
    }
    
}

searchButton.addEventListener('click',handleSearch);
