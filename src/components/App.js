import React, { useState, useEffect } from "react";
import City from "./City";
import { exportToCSV } from "../utils";

import "../styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [citiesLength, setCitiesLength] = useState(1);
  const [data, setData] = useState({});

  const handleDownload = () => {
    exportToCSV(Object.values(data));
  };

  return (
    <>
      <button className="add-city-button" onClick={() => setCitiesLength(citiesLength + 1)}>
        Add city
      </button>
      <button className="add-city-button" onClick={handleDownload}>
        Download
      </button>
      {Array.from(Array(citiesLength).keys()).map((cityNumber) => (
        <City
          key={cityNumber}
          fetchDefault={cityNumber === 0}
          setMainData={setData}
          mainData={data}
          cityNumber={cityNumber}
        />
      ))}
    </>
  );
}

export default App;
