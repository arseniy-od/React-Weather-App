import React, { useState, useEffect } from "react";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import City from "./City";
import { toDate, setDefaultCities, fetchWeather } from "../utils";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [citiesLength, setCitiesLength] = useState(1);

  return (
    <>
      <button className="add-city-button" onClick={() => setCitiesLength(citiesLength + 1)}>
        Add city
      </button>
      {Array.from(Array(citiesLength).keys()).map((cityNumber) => (
        <City fetchDefault={cityNumber === 0} key={cityNumber} />
      ))}
    </>
  );
}

export default App;