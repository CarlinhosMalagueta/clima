//Interação 
const citySearchInput = document.getElementById('city-search-input');

const citySearchButton = document.getElementById('city-search-button');


//Exibição
const currentDate = document.getElementById('current-dade');

const cityName = document.getElementById('city-name');

const watherIcon = document.getElementById('weater-icon');

const watherDescription = document.getElementById('wather-description');

const currentTemperature = document.getElementById('current-temp');

const windSpeed = document.getElementById('wind-speed');

const feelsLikeTemperature = document.getElementById('fells-liketemperature');

const currentHumidity = document.getElementById('current-humidity');

const sunriseTime = document.getElementById('sunrise-time');

const sunsetTime = document.getElementById('sunset-time');

const api_key = "036bcb7882e504ae6dfd98e26bd81225";

citySearchButton.addEventListener("click", () => {

  let cityName = citySearchInput.value
  getCityWeather(cityName)
})

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  getCurrentLocationWeaather(lat, lon)

},
  (err) => {
    if (err.cod === 1) {
      alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade na barra de pesquisa.")
    } else {
      console.log(err)
    }
  }
)

function getCurrentLocationWeaather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) {

  watherIcon.src = `./assets/loading-icon.svg`

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data

  currentDate.textContent = formatDate(dt);
  cityName.textContent = name;
  watherIcon.src = `./assets/${icon}.svg`;
  watherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)}°C`;
  windSpeed.textContent = `${Math.round(speed * 3.6)}Km/h`;
  feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
  currentHumidity.textContent = `${humidity}%`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)

  let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: "numeric" })

  return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}hs`
}

