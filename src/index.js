import './style.css';
import { changeUnit, handleFormSubmit, hideLoading } from './ui.js';
import { fetchWeatherData } from './api.js';

document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const weatherForm = document.getElementById('weather-form');
  const locationInput = document.getElementById('location-input');
  const celsiusBtn = document.getElementById('celsius-btn');
  const fahrenheitBtn = document.getElementById('fahrenheit-btn');

  // API key - replace with your Visual Crossing API key
  const API_KEY = 'KCTHAJZQZNWSG2EP9Y3X7XBBB';

  let currentUnit = 'celsius'; // Default temperature unit
  let weatherData = null; // Store the weather data

  weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();

    if (!location) return;

    try {
      weatherData = await fetchWeatherData(location, API_KEY);
      console.log(weatherData);
      handleFormSubmit(weatherData, currentUnit);
      hideLoading(); //hide Loading once it fetched !
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // showError('Failed to fetch weather data. Please try again.');
    }
  });

  // Handle change unit btn

  celsiusBtn.addEventListener('click', () => {
    currentUnit = 'celsius';
    celsiusBtn.classList.add('active');
    fahrenheitBtn.classList.remove('active');
    if (weatherData) {
      changeUnit(currentUnit, weatherData);
    }
  });

  fahrenheitBtn.addEventListener('click', () => {
    currentUnit = 'fahrenheit';
    fahrenheitBtn.classList.add('active');
    celsiusBtn.classList.remove('active');
    if (weatherData) {
      changeUnit(currentUnit, weatherData);
    }
  });
});
