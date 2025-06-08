import { useState } from 'react';
import './App.css';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast'; 
import TemperatureToggle from './components/TemperatureToggle';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const apiKey = import.meta.env.WEATHER_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'763e7400b23eb2879b13d6c44bb051f3'}&units=${unit}`
      );
      setWeather(res.data);
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App">
      <h1 style={{ color:'#0a0f85' }}>Weather Whisper</h1>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />

      {weather && (
        <>
          <button onClick={() => window.location.reload()} className="refresh-button">
            Refresh
          </button>
          <TemperatureToggle unit={unit} toggleUnit={toggleUnit} />
        </>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && <WeatherDisplay weather={weather} unit={unit} />}

      {weather && <Forecast city={city} unit={unit} />}
    </div>
  );
}

export default App;
