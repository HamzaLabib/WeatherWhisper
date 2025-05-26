function TemperatureToggle({ unit, toggleUnit }) {
  return (
    <button onClick={toggleUnit}>
      Toggle to {unit === 'metric' ? '°F' : '°C'}
    </button>
  );
}

export default TemperatureToggle;