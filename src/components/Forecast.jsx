import { useEffect, useState } from 'react';
import axios from 'axios';

function Forecast({ city, unit }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const fetchForecast = async () => {
      setLoading(true);
      setError('');

      try {
        const apiKey = import.meta.env.VITE_FORECAST_API_KEY;

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
        );

        const daily = res.data.list.filter((_, index) => index % 8 === 0);

        setForecast(daily);
      } catch (err) {
        setError('Unable to fetch forecast data.');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city, unit]);

  const formatTemperature = (temp, unit) => {
    return `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`;
  };

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>

      {loading && <p>Loading forecast...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && forecast.length === 0 && !error && (
        <p>No forecast data available.</p>
      )}

      <div className="forecast-days">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'long',
              })}
            </p>
            <p>{formatTemperature(day.main.temp, unit)}</p>
            <p>Humidity {day.main.humidity}%</p>
            <p>Wind {day.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;