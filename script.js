const apiKey = 'a3797cc775ca199c5635a929d9e5914d'; // Your API key

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherResult = document.getElementById('weather-result');

    if (city === '') {
        weatherResult.innerHTML = '<p>Please enter a valid city name.</p>';
        return;
    }

    try {
        // Fetching weather data using OpenWeather API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found. Please enter a valid city name.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp.toFixed(1);
    const humidity = main.humidity;
    const description = weather[0].description;

    document.getElementById('weather-result').innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
