// app.js

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');

    searchBtn.addEventListener('click', () => {
        const city = locationInput.value;
        const apiKey = '981f7f37b3a33434702f46a0be4dc097'; 
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherData = {
                    temperature: data.main.temp + '°C',
                    condition: data.weather[0].main,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                };
                displayWeather(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = '<p class="text-red-600">Error fetching weather data. Please try again later.</p>';
            });
    });

    function displayWeather(weatherData) {
        const weatherHtml = `
            <h2 class="text-xl font-bold mb-2">${locationInput.value}</h2>
            <p class="text-gray-800">Temperature: ${weatherData.temperature}</p>
            <p class="text-gray-800">Weather: ${weatherData.condition}</p>
            <img src="${weatherData.icon}" alt="weather icon" class="w-12 h-12 mt-4">
        `;
        weatherInfo.innerHTML = weatherHtml;
    }
});
