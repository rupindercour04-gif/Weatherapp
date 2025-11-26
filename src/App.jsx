import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    const API_KEY = "c115672cc120970493545b8683256b6c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        setError("City not found! Please check the name.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeather(data);
      setLoading(false);
      setCity("");
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong! Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1 className="title"> Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button onClick={getWeather} className="search-button">
            Search
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-info">
            <div className="location">
              <h2>{weather.name}</h2>
              <p className="country">{weather.sys.country}</p>
            </div>

            <div className="temperature">
              <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
              <p className="weather-desc">{weather.weather[0].description}</p>
              <div className="weather-icon">
                {weather.weather[0].main === "Clear" && "☀️"}
                {weather.weather[0].main === "Clouds" && "☁️"}
                {weather.weather[0].main === "Rain" && "🌧️"}
                {weather.weather[0].main === "Snow" && "❄️"}
                {weather.weather[0].main === "Thunderstorm" && "⛈️"}
                {weather.weather[0].main === "Drizzle" && "🌦️"}
                {weather.weather[0].main === "Mist" && "🌫️"}
                {!["Clear", "Clouds", "Rain", "Snow", "Thunderstorm", "Drizzle", "Mist"].includes(weather.weather[0].main) && "🌤️"}
              </div>
            </div>

            <div className="details">
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <div>
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <div>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.main.humidity}%</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <div>
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">{weather.wind.speed} m/s</p>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">🔽</span>
                <div>
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;