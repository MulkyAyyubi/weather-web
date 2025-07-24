import React from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import humidity from "../assets/humidity.png";
import cloud from "../assets/cloud.png";
import feel from "../assets/feel.png";
import wind from "../assets/wind.png";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        cloud: data.clouds.all,
        feel: data.main.feels_like,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        country: data.sys.country,
        icon: icon,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Type the city name" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
          className="weather-icon"
        />
      </div>
      <img src={weatherData.icon} alt="" className="weather-img" />
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="location">
        {weatherData.location}, {weatherData.country}
      </p>

      <hr />

      <div className="weather-data">
        <div className="col first">
          <img src={humidity} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>{weatherData.windSpeed}/ms</p>
            <span>Wind Speed</span>
          </div>
          <div className="col">
            <img src={cloud} alt="" />
            <div>
              <p>{weatherData.cloud}%</p>
              <span>Clouds</span>
            </div>
          </div>
          <div className="col last">
            <img src={feel} alt="" />
            <div>
              <p>{weatherData.feel}%</p>
              <span>Real Feel</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="hr2" />
      <div className="forecast-container">
        <div class="forecast-card">
          <p class="day">Tuesday</p>
          <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="Cloudy" />
          <p class="temp">26°</p>
          <p class="desc">Cloudy</p>
        </div>
        <div class="forecast-card">
          <p class="day">Wednesday</p>
          <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="Rainy" />
          <p class="temp">14°</p>
          <p class="desc">Rainy</p>
        </div>
        <div class="forecast-card">
          <p class="day">Thursday</p>
          <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="Cloudy" />
          <p class="temp">25°</p>
          <p class="desc">Cloudy</p>
        </div>
        <div class="forecast-card">
          <p class="day">Friday</p>
          <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="Clear" />
          <p class="temp">32°</p>
          <p class="desc">Clear</p>
        </div>
        <div class="forecast-card">
          <p class="day">Saturday</p>
          <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="Cloudy" />
          <p class="temp">22°</p>
          <p class="desc">Cloudy</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
