const input = document.querySelector('input');

function handleError(){
    console.log('Unable to get weather data for city.');
}

function displayWeatherIcon(weather){
    const weatherIcon = document.querySelector('img');
    weatherIcon.src = require(`./weatherimages/` + weather.currentConditions.icon + `.png`);
}

function displayCityAddress(weather){
    const cityAddress = document.querySelector('#city-address');
    cityAddress.textContent = 'Location: ' + weather.resolvedAddress;
}

function displayDateTime(weather){
    const dateTime = document.querySelector('#date-time');
    const time = weather.currentConditions.datetime.split(':');
    const checkAmPm = time[0] >= 12 ? 'pm' : 'am';
    const hour = (time[0] % 12 || 12);
    const finalTime = hour + ':' + time[1] + ":" + time[2] + checkAmPm;
    dateTime.textContent = finalTime;
}

function displayTemperature(weather){
    const temperature = document.querySelector('.city-temperature');
    temperature.textContent = weather.currentConditions.temp + 'F';
}

function displayDescription(weather){
    const description = document.querySelector('#weather-description');
    description.textContent = weather.description;
}

function displayWindSpeed(weather){
    const windSpeed = document.querySelector('#wind-speed');
    windSpeed.textContent = 'Wind speed: ' + weather.currentConditions.windspeed + 'm/s';
}

function displayWeeklyForecast(weather){
    const weeklyForecast = document.querySelector('#weekly-weather');
    const p = document.querySelector('.weekly-forecast-title');
    p.textContent = 'Weekly Forecast';
    for(let i = 0; i < 8; i++){
        const fcastContainer = document.createElement('div');
        fcastContainer.classList.add('forecast-card');
        const weeklyDescription = document.createElement('ul');

        const icon = document.createElement('img');
        icon.src = require(`./weatherimages/` + weather.currentConditions.icon + `.png`);
        const weatherIcon = document.createElement('li');
        weatherIcon.appendChild(icon);

        const date = document.createElement('li');
        const temperature = document.createElement('li');

        date.textContent = weather.days[i].datetime;
        temperature.textContent = weather.days[i].temp + 'F';

        weeklyDescription.appendChild(weatherIcon);
        weeklyDescription.appendChild(date);
        weeklyDescription.appendChild(temperature);

        fcastContainer.appendChild(weeklyDescription);
        weeklyForecast.appendChild(fcastContainer);
    }
}

async function getWeatherData(city){
    const getCity = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=LT8DGGA3GL5HDAL5AY52YW9NJ&iconSet=icons1&iconSet=icons2`);
    const weather = getCity.json().catch(handleError);
    return weather;
}

async function weatherInformation(event){
    event.preventDefault();
    const currentCity = input.value;
    const weather = await getWeatherData(currentCity);
    console.log(weather);
    
    displayWeatherIcon(weather);
    displayCityAddress(weather);
    displayDateTime(weather);
    displayTemperature(weather);
    displayDescription(weather);
    displayWindSpeed(weather);
    displayWeeklyForecast(weather);
}

export default weatherInformation;