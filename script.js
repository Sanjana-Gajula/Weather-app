const apiKey = "b59d593c97cd94e16dcdd1b2938404e5"; // Replace with your actual OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorDiv = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      showError("City not found. Please try again.");
      weatherInfo.innerHTML = "";
    } else {
      errorDiv.style.display = "none";
      displayWeather(data);
    }
  } catch (error) {
    showError("Something went wrong. Please try again later.");
    console.error(error);
  }
}

function displayWeather(data) {
  const { name, sys, weather, main, wind } = data;

  const weatherHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
    <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
    <p>🌡 Temperature: ${main.temp} °C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>💨 Wind Speed: ${wind.speed} m/s</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}

function showError(message) {
  errorDiv.style.display = "block";
  errorDiv.textContent = message;
}

