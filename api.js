const nameOfCity = document.querySelector(".city"); // создали переменную, в которые уходят данные ввода введенные в input
const searchButton = document.querySelector(".btn"); // создали кнопку, при нажатии на которую должна отображаться погода в введенном городе
const weather = document.querySelector(".cityWeather"); // вывод всей информации о погоде

searchButton.addEventListener("click", ()=>{
    let city = nameOfCity.value;
    console.log(nameOfCity.value);
    callCity(city)
});
nameOfCity.addEventListener("keypress", press => {
    if (press.key == 'Enter') {
        let city = nameOfCity.value;
        callCity(city);
    }
} )

function callCity(city) {
    const request = (city == undefined)? "Moscow" : city;
    const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${request}&appid=74e63e46227a677464861a2db0dc04b8`;  
    fetch(weatherLink)
    .then ((weather)=> weather.json())
    .then((getWeather) => cityDescription(getWeather))
}
callCity();

    function cityDescription(getWeather) {
        const city = getWeather.name;
        const conditions = getWeather.weather[0].description;
        const icon = getWeather.weather[0].icon; // объявляем переменную которая отображает иконку погоды в 17 ряду выводим icon  на страницу icon будет меняться в зависимости от погоды
        const iconAlt = getWeather.weather[0].description;
        const temp = Math.round(getWeather.main.temp - 273.15);
        const tempMax = Math.round(getWeather.main.temp_max - 273.15);
        const tempMin = Math.round(getWeather.main.temp_min - 273.15);
        const visibility = getWeather.visibility;
        const humidity = getWeather.main.humidity;
        const pressure = getWeather.main.pressure;
        const windSpeed = getWeather.wind.speed;
        const directionWind = getWeather.wind.deg;
        const direction = (directionWind == 0)? "N": (directionWind > 0 && directionWind < 90)? "NE" : (directionWind == 90)? "E": (directionWind > 90 && directionWind < 180)? "SE": (directionWind == 180)? "S": (directionWind >180 && directionWind < 270)? "SW": (directionWind == 270)? "W" : "NW";
        weather.innerHTML = `
        <div class="cityName">
            <i class="fa-solid fa-location-dot"></i>
            <p class="cityName__title">${city}</p>
        </div>
        <div class="weather">
            <div class="weather__picture">
                <img src="./images/${icon}.png" alt="${iconAlt}"> 
            </div>
            <p class="weather__desc">${conditions}</p>
        </div>
        <div class="temperature">
            <p class="temperature__desc">${temp}</p>
            <span class="сelsius">℃</span>
        </div>
        <div class="average__temp">
            <div class="max__temp">
                <p class="temp__desc">${tempMax}</p> 
                <span class="сelsius__item">℃</span>
            </div>
            <div class="line">/</div>
            <div class="min__temp">
                <p class="temp__desc">${tempMin}</p>
                <span class="сelsius__item">℃</span>
            </div>
        </div>
        <div class="weather__data">
            <div class="visibility">
                <p class="details">visibility on the road, ft: <span class="weather__details">${visibility}</span></p>
                
            </div>
            <div class="humidity__pressure">
                <p class="details">humidity, %: <span class="weather__details">${humidity}</span></p>
                <p class="details">pressure, inHg: <span class="weather__details">${pressure}</span></p>
            </div>
            <div class="wind__direction">
                <p class="details">wind speed, mph: <span class="weather__details">${windSpeed}</span></p>
                <p class="details">direction: <span class="weather__details">${direction}</span></p>
            </div>
        </div>
        `
        console.log(getWeather);
    }
