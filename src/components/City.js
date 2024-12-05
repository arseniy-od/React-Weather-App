import React, { useState, useEffect, useContext } from "react";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import useWeather from "../hooks/useWeather";
import { setDefaultCities } from "../utils";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AppContext } from "../context";

function City({ fetchDefault, cityNumber }) {
  const [query, setQuery] = useState("");
  const { weather, setWeather, fetchWeather } = useWeather();
  const { exportData, setExportData } = useContext(AppContext);

  useEffect(() => {
    if (weather.data.city) {
      setExportData({
        ...exportData,
        [cityNumber]: {
          city: weather.data.city,
          country: weather.data.country,
          date: Date(),
          currentTemp: weather.data.temperature.current,
          description: weather.data.condition.description,
          windSpeed: weather.data.wind.speed,
          humidity: weather.data.temperature.humidity,
          forecast: [],
        },
      });
    }
  }, [weather]);

  useEffect(() => {
    if (fetchDefault) {
      setDefaultCities(setQuery);
    } else {
      setWeather({ ...weather, loading: false });
    }
  }, []);

  useEffect(() => {
    if (query.length) {
      fetchWeather(query);
    }
  }, [query]);

  return (
    <div className="App">
      <SearchEngine setQuery={setQuery} />

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

      {weather && weather.data && weather.data.condition && (
        <Forecast weather={weather} cityNumber={cityNumber} />
      )}
    </div>
  );
}

export default City;
