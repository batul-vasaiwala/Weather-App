document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e90642609da698675228c1398d7a47b0';
    const submitButton = document.getElementById('submit');
    const cityInput = document.getElementById('city');
    const weatherDiv = document.getElementById('weather');
    const locationElement = document.getElementById('location');
    const iconElement = document.getElementById('icon');
    const descriptionElement = document.getElementById('description');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const pressureElement = document.getElementById('pressure');
    const errorElement = document.getElementById('error');

    submitButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        } else {
            showError('Please enter a city name.');
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            showError(error.message);
        }
    }

    function displayWeather(data) {
        errorElement.classList.add('hidden');
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
        iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        iconElement.alt = data.weather[0].description;
        descriptionElement.textContent = data.weather[0].description;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
        weatherDiv.classList.remove('hidden');
        setBackground(data.weather[0].main);
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        weatherDiv.classList.add('hidden');
    }

    function setBackground(weather) {
        const body = document.body;
        switch (weather.toLowerCase()) {
            case 'clear':
                body.style.backgroundImage = "url('images/clear.webp')";
                break;
            case 'clouds':
                body.style.backgroundImage = "url('images/cloudy.webp')";
                break;
            case 'rain':
                body.style.backgroundImage = "url('images/rainy.webp')";
                break;
            case 'snow':
                body.style.backgroundImage = "url('images/snowy.jpg')";
                break;
            case 'thunderstorm':
                body.style.backgroundImage = "url('images/thunderstorm.webp')";
                break;
            case 'drizzle':
                body.style.backgroundImage = "url('images/drizzle.jpg')";
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                body.style.backgroundImage = "url('images/haze.jpg')";
                break;
            default:
                body.style.backgroundImage = "url('images/default.webp')";
                break;
        }
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
    }
});
