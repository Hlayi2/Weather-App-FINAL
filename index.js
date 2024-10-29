let currentUnit = 'metric'; // Default to Celsius

function refreshWeather(response) {
    document.querySelector("#loading").style.display = "none";
    let city = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let temperature = document.querySelector("#temperature");
    let time = document.querySelector("#time");
    let icon = document.querySelector("#icon");

    let data = response.data;
    city.innerHTML = data.city;
    time.innerHTML = formatDate(new Date(data.time * 1000));
    description.innerHTML = data.condition.description;
    humidity.innerHTML = `${data.temperature.humidity}%`;
    windSpeed.innerHTML = `${data.wind.speed} km/h`;
    temperature.innerHTML = Math.round(data.temperature.current);
    icon.innerHTML = `<img src="${data.condition.icon_url}" alt="Weather icon" />`;
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    document.querySelector("#loading").style.display = "block";
    let apiKey = "70bo47b7ca63b3dcb0f35atb0dc18d4a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${currentUnit}`;

    axios.get(apiUrl)
        .then(refreshWeather)
        .catch(error => {
            alert("City not found. Please try another one.");
            console.error(error);
            document.querySelector("#loading").style.display = "none";
        });
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function toggleUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    document.querySelector("#unit-toggle").innerHTML = currentUnit === 'metric' ? '°C' : '°F';
    
    let lastCity = document.querySelector("#city").innerHTML;
    if (lastCity) {
        searchCity(lastCity);
    }
}

document.querySelector("#search-form").addEventListener("submit", handleSearchSubmit);
document.querySelector("#unit-toggle").addEventListener("click", toggleUnit);

// Default city to load
searchCity("Paris");
