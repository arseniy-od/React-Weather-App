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
  //   const url = "";
  const cachedData = {
    city: "Zaporizhzhia",
    country: "Ukraine",
    coordinates: {
      longitude: 35.1182867,
      latitude: 47.8507859,
    },
    condition: {
      description: "scattered clouds",
      icon_url:
        "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png",
      icon: "scattered-clouds-day",
    },
    temperature: {
      current: 2.88,
      humidity: 63,
      feels_like: 0.17,
      pressure: 1025,
    },
    wind: {
      speed: 2.75,
      degree: 56,
    },
    time: 1733315980,
  };
  try {
    const response = await axios.get(url);
    setWeather({ data: response.data, loading: false, error: false });
    // setWeather({ data: cachedData, loading: false, error: false });
  } catch (error) {
    setWeather({ data: {}, loading: false, error: true });
    console.log("error", error);
  }
};
