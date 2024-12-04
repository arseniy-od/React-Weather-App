import React, { useState, useEffect } from "react";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import { setDefaultCities, fetchWeather } from "../utils";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function City({ fetchDefault, setMainData, mainData, cityNumber }) {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  useEffect(() => {
    if (weather.data.city) {
      setMainData({
        ...mainData,
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
      fetchWeather({ query, weather, setWeather });
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
        <Forecast
          weather={weather}
          setMainData={setMainData}
          mainData={mainData}
          cityNumber={cityNumber}
        />
      )}
    </div>
  );
}

export default City;
