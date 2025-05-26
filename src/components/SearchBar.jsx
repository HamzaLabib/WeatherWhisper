function SearchBar({ city, setCity, fetchWeather }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Let me know the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Take a look at Weather</button>
    </div>
  );
}

export default SearchBar;