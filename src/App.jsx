import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-solid-svg-icons"; 
import {faGaugeSimple} from  "@fortawesome/free-solid-svg-icons"; 
import {faSun} from  "@fortawesome/free-solid-svg-icons"; 


import axios from "axios";

import clear from "./assets/clear.png";
import clouds from "./assets/cloudy.jpg";
import rain from "./assets/rain.jpg";
import sunny from "./assets/sunny.jpg";


const App = () => {
  const [data, setData] = useState("");
  const [data2, setdata2] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setforecast] = useState([])
  const [compareData, setCompareData] = useState(null);

  const getCardImage = (condition) => {
    switch (condition) {
      case "Clear":
        return clear;

      case "Clouds":
        return clouds;

      case "Rain":
      case "Drizzle":
        return rain;

     

      default:
        return clear;
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=f128ee3cc0d07cdd63f5d8f900587f39&units=metric`
      );
      console.log(response.data)









      setWeather({
        city: response.data.city.name,
        temp: response.data.list[0].main.temp,
        condition: response.data.list[0].weather[0].main,
        wind:response.data.list[0].wind.speed,
        humidity:response.data.list[0].main.humidity,
        visibility:response.data.list[0].visibility,
        pressure:response.data.list[0].main.pressure,
        direction:response.data.list[0].wind.deg,
        sunrise:response.data.city.sunrise,
        sunset:response.data.city.sunset
      });
      setforecast(response.data.list)

      setData("");
    } catch (error) {
      alert("City not found!");
      console.log(error);
    }
  };



const compareCities = async () => {
  try {
    const response1 = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=f128ee3cc0d07cdd63f5d8f900587f39&units=metric`
    );

    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${data2}&appid=f128ee3cc0d07cdd63f5d8f900587f39&units=metric`
    );

    setCompareData({
      city1: response1.data.name,
      temp1: response1.data.main.temp,
      humidity1: response1.data.main.humidity,
      wind1: response1.data.wind.speed,

      city2: response2.data.name,
      temp2: response2.data.main.temp,
      humidity2: response2.data.main.humidity,
      wind2: response2.data.wind.speed,
    });
  } catch (error) {
    alert("City not found!");
  }
};



















  const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
const dailyForecast = forecast.filter(
  (item) => item.dt_txt.includes("12:00:00")
);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-sky-500 to-blue-900 p-4 sm:p-6">

  {/* Heading */}
  <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mt-4 sm:mt-6">
    Weather App
  </h1>


  {/* Search */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-10">

    <input
      type="text"
      placeholder="Enter city name..."
      value={data}
      onChange={(e) => setData(e.target.value)}
      className="w-full sm:w-96 md:w-125 lg:w-150 px-4 py-3 rounded-xl bg-white text-black transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:scale-105"
    />

    <button
      onClick={getData}
      className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
    >
      Search
    </button>

  </div>


  {/* Weather */}
  {weather && (
    <>

      {/* Main Weather Card */}
      <div className="flex justify-center mt-8 sm:mt-12 px-2">

        <div
          className="w-full max-w-md h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-3"
          style={{
            backgroundImage: `url(${getCardImage(weather.condition)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="w-full h-full bg-black/30 flex flex-col justify-center items-center text-white">

            <h2 className="text-3xl sm:text-4xl font-light">
              {weather.city}
            </h2>

            <h1 className="text-7xl sm:text-8xl font-thin mt-2">
              {Math.round(weather.temp)}°
            </h1>

            <p className="text-xl sm:text-2xl mt-2">
              {weather.condition}
            </p>

          </div>

        </div>

      </div>


      {/* Weather Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-12 sm:mt-20">

        {/* Wind */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faWind} /> Wind
          </h3>

          <p className="text-3xl">
            {weather.wind}
          </p>

          <p>m/s</p>
        </div>


        {/* Humidity */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faDroplet} /> Humidity
          </h3>

          <p className="text-3xl">
            {weather.humidity}%
          </p>

        </div>


        {/* Visibility */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faEye} /> Visibility
          </h3>

          <p className="text-3xl">
            {(weather.visibility / 1000).toFixed(1)}
          </p>

          <p>km</p>

        </div>


        {/* Pressure */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faGaugeSimple} /> Pressure
          </h3>

          <p className="text-3xl">
            {weather.pressure}
          </p>

          <p>hPa</p>

        </div>


        {/* Sunrise */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faSun} /> Sunrise
          </h3>

          <p className="text-2xl">
            {formatTime(weather.sunrise)}
          </p>

        </div>


        {/* Sunset */}
        <div className="w-full h-32 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">

          <h3 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faSun} /> Sunset
          </h3>

          <p className="text-2xl">
            {formatTime(weather.sunset)}
          </p>

        </div>

      </div>


      {/* 5 Day Forecast */}
      <h2 className="text-2xl sm:text-3xl text-white text-center mt-12 mb-6 font-semibold">
        5-Day Forecast
      </h2>


      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">

        {dailyForecast.slice(0, 5).map((day, index) => (

          <div
            key={index}
            className="w-full h-52 bg-white/20 backdrop-blur-md rounded-3xl text-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
          >

            <h3 className="text-xl font-medium">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt=""
              className="w-16"
            />

            <p className="text-3xl font-light">
              {Math.round(day.main.temp)}°
            </p>

            <p className="text-sm">
              {day.weather[0].main}
            </p>

          </div>

        ))}

      </div>

    </>
  )}


  {/* Compare Cities */}
  <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-12 lg:mt-18">

    <h1 className="text-white font-bold text-xl sm:text-2xl text-center lg:mr-4">
      Compare weather of two cities
    </h1>


    <input
      type="text"
      placeholder="First City"
      value={data}
      onChange={(e) => setData(e.target.value)}
      className="w-full sm:w-72 px-4 py-3 rounded-xl text-black font-bold border border-white"
    />


    <input
      type="text"
      placeholder="Second City"
      value={data2}
      onChange={(e) => setdata2(e.target.value)}
      className="w-full sm:w-72 px-4 py-3 rounded-xl text-black border border-white font-bold"
    />


    <button
      onClick={compareCities}
      className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
    >
      Compare Cities
    </button>

  </div>


  {/* Comparison Result */}
  {compareData && (

    <div className="flex justify-center mt-8 px-2">

      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-3xl p-4 sm:p-8 text-white">

        <h2 className="text-2xl sm:text-3xl text-center mb-6">
          🌍 City Comparison
        </h2>


        <div className="grid grid-cols-3 gap-3 sm:gap-8 text-center text-sm sm:text-base">

          <div></div>

          <div className="font-bold text-base sm:text-xl break-words">
            {compareData.city1}
          </div>

          <div className="font-bold text-base sm:text-xl break-words">
            {compareData.city2}
          </div>


          <div>
            <FontAwesomeIcon icon={faTemperatureHigh} />
            {" "}Temp
          </div>

          <div>
            {Math.round(compareData.temp1)}°C
          </div>

          <div>
            {Math.round(compareData.temp2)}°C
          </div>


          <div>
            <FontAwesomeIcon icon={faDroplet} />
            {" "}Humidity
          </div>

          <div>
            {compareData.humidity1}%
          </div>

          <div>
            {compareData.humidity2}%
          </div>


          <div>
            <FontAwesomeIcon icon={faWind} />
            {" "}Wind
          </div>

          <div>
            {compareData.wind1} m/s
          </div>

          <div>
            {compareData.wind2} m/s
          </div>

        </div>


        <div className="text-center mt-6 text-lg sm:text-xl">

          Difference:{" "}

          {Math.abs(
            compareData.temp1 - compareData.temp2
          ).toFixed(1)}

          °C

        </div>


        <div className="text-center mt-3 text-base sm:text-lg">

          {compareData.temp1 > compareData.temp2
            ? `${compareData.city1} is hotter`
            : `${compareData.city2} is hotter`}

        </div>

      </div>

    </div>

  )}

</div>
)}

export default App
 