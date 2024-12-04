import React, { useState, useEffect } from "react";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import { toDate, setDefaultCities, fetchWeather } from "../utils";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState({
    loading: true,
    data: [],
    error: false,
  });

  useEffect(() => {
    setDefaultCities(setCities);
  }, []);

  useEffect(() => {
    if (cities.length) {
      fetchWeather({ cities, weather, setWeather });
    }
  }, [cities]);

  console.log(weather);

  return (
    <div className="App">
      <SearchEngine setQuery={() => console.log("query:", query)} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>Sorry city not found, please try again.</span>
          </span>
        </>
      )}

      {cities.map((city, index) => (
        <div key={index}>
          {weather && weather.data && weather.data[index].condition && (
            <Forecast weather={weather.data[index]} toDate={toDate} />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
