import { useState } from "react";
import axios from "axios";

const useWeather = () => {
  const [weather, setWeather] = useState({ data: {}, loading: false, error: false });

  const fetchWeather = async (query) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

    setWeather((prev) => ({ ...prev, loading: true, error: false }));

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ data: {}, loading: false, error: true });
      console.error("Error fetching weather:", error);
    }
  };

  return { weather, setWeather, fetchWeather };
};

export default useWeather;
