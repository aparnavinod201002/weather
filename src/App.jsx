import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState(''); // to store input country
  const [searchQuery, setSearchQuery] = useState(''); // to trigger the search

  useEffect(() => {
    if (!searchQuery) return; // Avoid fetching if no search query

    setLoading(true);
    setError(null); // Reset error

    // Replace with your OpenWeatherMap API key
    
    const url = ` https://openweathermap.org/find?q=${searchQuery}`;
   
    fetch(url)
      .then(response => {
       
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (country) {
      setSearchQuery(country); 
    }
  };

  return (
    <div className="app">
      <h1>Weather Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={country}
          placeholder="Enter country"
          onChange={(e) => setCountry(e.target.value)} // Update the country input
        />
        <button type="submit">Get Weather</button>
      </form>

      

      {weatherData && (
        <div className="weather-card">
          <h1>Weather in {weatherData.name}</h1>
          <div className="weather-info">
            <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
            <p><strong>Condition:</strong> {weatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather condition"
            />
            <p><strong>Wind:</strong> {weatherData.wind.speed} m/s</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
