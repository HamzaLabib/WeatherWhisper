function WeatherDisplay({ weather, unit }) {
  const temp = unit === 'metric' ? weather.main.temp : (weather.main.temp * 9/5) + 32;

  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <h3 style={{ color:'#0a0f85' }}>Weather Now</h3>
      <p>{temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity {weather.main.humidity}%</p>
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherDisplay;