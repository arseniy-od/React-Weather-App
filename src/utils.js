import axios from "axios";

import { days, months } from "./constants";

export const toDate = () => {
  const currentDate = new Date();
  const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  return date;
};

export const setDefaultCities = (setQuery) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.data;
          const city = data.address.city || data.address.town || data.address.village;
          setQuery(city);
        } catch (err) {
          console.error("Failed to fetch city data:", err);
          setQuery("Rabat");
        }
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        setQuery("Rabat");
      }
    );
  } else {
    console.error("Geolocation is not supported by your browser");
    setQuery("Rabat");
  }
};

export const fetchWeather = async ({ query, weather, setWeather }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    setWeather({ data: response.data, loading: false, error: false });
  } catch (error) {
    setWeather({ data: {}, loading: false, error: true });
    console.log("error", error);
  }
};

export function exportToCSV(data) {
  const headers = [
    "City",
    "Country",
    "Date",
    "Temperature (°C)",
    "Description",
    "Wind Speed (m/s)",
    "Humidity (%)",
    "Day",
    "Min Temp (°C)",
    "Max Temp (°C)",
  ];

  const rows = data
    .map((item) =>
      item.forecast
        .map((forecast) =>
          [
            item.city,
            item.country,
            item.date,
            item.currentTemp,
            item.description,
            item.windSpeed,
            item.humidity,
            forecast.day,
            forecast.minTemp,
            forecast.maxTemp,
          ].join(",")
        )
        .join("\n")
    )
    .join("\n");

  const csvContent = [headers.join(","), rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "weather-data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}