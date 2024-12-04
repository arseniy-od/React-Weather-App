import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  console.log("data", data);
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;
      // const url = "";
      const cachedData = {
        city: "Zaporizhzhia",
        country: "Ukraine",
        coordinates: {
          longitude: 35.1182867,
          latitude: 47.8507859,
        },
        daily: [
          {
            condition: {
              description: "few clouds",
              icon_url:
                "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png",
              icon: "few-clouds-day",
            },
            temperature: {
              day: 3.14,
              minimum: -1.8,
              maximum: 3.3,
              humidity: 60,
            },
            wind: {
              speed: 3.53,
            },
            time: 1733302800,
          },
          {
            condition: {
              description: "overcast clouds",
              icon_url:
                "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png",
              icon: "broken-clouds-day",
            },
            temperature: {
              day: 3.69,
              minimum: 1.21,
              maximum: 4.24,
              humidity: 73,
            },
            wind: {
              speed: 4.74,
            },
            time: 1733389200,
          },
          {
            condition: {
              description: "light rain",
              icon_url: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
              icon: "rain-day",
            },
            temperature: {
              day: 4.12,
              minimum: 2.89,
              maximum: 5.51,
              humidity: 87,
            },
            wind: {
              speed: 4.52,
            },
            time: 1733475600,
          },
          {
            condition: {
              description: "light rain",
              icon_url: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
              icon: "rain-day",
            },
            temperature: {
              day: 6.36,
              minimum: 4.55,
              maximum: 7.61,
              humidity: 79,
            },
            wind: {
              speed: 6.92,
            },
            time: 1733562000,
          },
          {
            condition: {
              description: "moderate rain",
              icon_url: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
              icon: "rain-day",
            },
            temperature: {
              day: 6.36,
              minimum: 4.98,
              maximum: 6.62,
              humidity: 81,
            },
            wind: {
              speed: 8.2,
            },
            time: 1733648400,
          },
          {
            condition: {
              description: "light rain",
              icon_url: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
              icon: "rain-day",
            },
            temperature: {
              day: 10.36,
              minimum: 7.61,
              maximum: 11.11,
              humidity: 73,
            },
            wind: {
              speed: 7.87,
            },
            time: 1733734800,
          },
          {
            condition: {
              description: "light rain",
              icon_url: "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png",
              icon: "rain-day",
            },
            temperature: {
              day: 9.54,
              minimum: 3.95,
              maximum: 9.94,
              humidity: 82,
            },
            wind: {
              speed: 4.44,
            },
            time: 1733821200,
          },
        ],
      };
      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
        // setForecastData(cachedData.daily);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{data.condition.description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div>
            <p className="wind">{data.wind.speed}m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div>
            <p className="humidity">{data.temperature.humidity}%</p>
            <p>Humidity</p>
        </div>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.slice(0, 5).map((day) => (
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}        

export default Forecast;