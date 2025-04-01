export function handleFormSubmit(weatherData, currentUnit) {
  if (!weatherData || !weatherData.currentConditions) {
    showError('Invalid weather data received');
    return;
  }

  // Set location and date
  const locationNameElement = document.getElementById('location-name');
  const currentDateElement = document.getElementById('current-date');
  locationNameElement.textContent = `${weatherData.resolvedAddress}`;
  currentDateElement.textContent = formatDate(new Date());

  // Set current conditions
  const current = weatherData.currentConditions;

  // Temperature is already in Celsius from the API (metric units)
  updateTemperatureDisplay(current.temp, current.feelslike, currentUnit);

  const weatherConditionsElement =
    document.getElementById('weather-conditions');
  const humidityElement = document.getElementById('humidity');
  const windElement = document.getElementById('wind');
  weatherConditionsElement.textContent = current.conditions;
  humidityElement.textContent = current.humidity;
  windElement.textContent = current.windspeed;

  // Display forecast
  displayForecast(weatherData.days, currentUnit);

  // Show the weather container
  showWeather();
}

export function displayForecast(days, currentUnit) {
  const forecastContainer = document.getElementById('forecast-container');
  forecastContainer.innerHTML = ''; // Clear previous forecast

  // Display next 6 days
  const daysToShow = Math.min(6, days.length);

  for (let i = 0; i < daysToShow; i++) {
    const day = days[i];

    // Create forecast card
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('forecast-card');

    // Get day name (Today, Tomorrow, or day of week)
    let dayName;
    if (i === 0) {
      dayName = 'Today';
    } else if (i === 1) {
      dayName = 'Tomorrow';
    } else {
      dayName = formatDay(new Date(day.datetime));
    }

    // Convert temperature based on current unit
    const tempValue =
      currentUnit === 'celsius' ? day.temp : celsiusToFahrenheit(day.temp);

    // Populate card content
    forecastCard.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-temp">${Math.round(tempValue)}°${
      currentUnit === 'celsius' ? 'C' : 'F'
    }</div>
        <div class="forecast-description">${day.conditions}</div>
      `;

    forecastContainer.appendChild(forecastCard);
  }
}

export function changeUnit(unit, weatherData) {
  if (unit === 'celsius') {
    document.getElementById('celsius-btn').classList.add('active');
    document.getElementById('fahrenheit-btn').classList.remove('active');
  } else {
    document.getElementById('celsius-btn').classList.remove('active');
    document.getElementById('fahrenheit-btn').classList.add('active');
  }

  const current = weatherData.currentConditions;
  updateTemperatureDisplay(current.temp, current.feelslike, unit);

  displayForecast(weatherData.days, unit);
}

export function updateTemperatureDisplay(temp, feelsLike, unit) {
  let displayTemp, displayFeelsLike;

  if (unit === 'celsius') {
    displayTemp = temp;
    displayFeelsLike = feelsLike;
  } else {
    displayTemp = celsiusToFahrenheit(temp);
    displayFeelsLike = celsiusToFahrenheit(feelsLike);
  }

  document.getElementById('current-temp').textContent = Math.round(displayTemp);
  document.getElementById('feels-like').textContent =
    Math.round(displayFeelsLike);
}

// Helper function: Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Helper function: Format date
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function: Format day name
function formatDay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// UI Helpers
export function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

export function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

export function showWeather() {
  document.getElementById('weather-container').classList.remove('hidden');
}

export function hideWeather() {
  document.getElementById('weather-container').classList.add('hidden');
}

export function showError(message) {
  document.getElementById('error-container').textContent = message;
  document.getElementById('error-container').classList.remove('hidden');
}

export function hideError() {
  document.getElementById('error-container').classList.add('hidden');
}
