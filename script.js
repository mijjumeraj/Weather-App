const API_KEY = "2c2f71719d770c7582bdfa0da24ee346";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const errorMsg = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

// Allow Enter key to trigger search
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  errorMsg.textContent = "Loading data...";
  result.style.display = "none";

  try {
    const apiUrl = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Could not find city data.");
    }

    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    showError(`Error fetching weather data: ${error.message}`);
  }
}

function displayWeather(data) {
  errorMsg.textContent = "";
  result.style.display = "block";

  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;

  const description = data.weather[0].description;
  document.getElementById("weatherDesc").textContent =
    description.charAt(0).toUpperCase() + description.slice(1);

  document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function showError(message) {
  result.style.display = "none";
  errorMsg.textContent = message;
}
