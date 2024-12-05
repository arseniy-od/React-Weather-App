import React, { useState } from "react";
import City from "./components/City";
import { exportToCSV } from "./utils";
import { AppContext } from "./context";

import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [citiesLength, setCitiesLength] = useState(1);
  const [exportData, setExportData] = useState({});

  const handleDownload = () => {
    exportToCSV(Object.values(exportData));
  };

  return (
    <AppContext.Provider value={{ exportData, setExportData }}>
      <button className="add-city-button" onClick={() => setCitiesLength(citiesLength + 1)}>
        Add city
      </button>
      <button className="add-city-button" onClick={handleDownload}>
        Download
      </button>
      {Array.from(Array(citiesLength).keys()).map((cityNumber) => (
        <City key={cityNumber} fetchDefault={cityNumber === 0} cityNumber={cityNumber} />
      ))}
    </AppContext.Provider>
  );
}

export default App;
