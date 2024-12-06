"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WiSunrise, WiSunset, WiThermometer } from "react-icons/wi";
import { fetchWeatherData, HourlyForecast, DailyForecast } from "../utils/data";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    currentTemp: string;
    minTemp: string;
    maxTemp: string;
    sunrise: string;
    sunset: string;
    hourlyForecast: HourlyForecast[];
    dailyForecast: DailyForecast[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            try {
              const data = await fetchWeatherData(latitude, longitude);
              setWeatherData(data);
              setLoading(false);
            } catch {
              setError(true);
              setLoading(false);
            }
          },
          () => {
            setError(true);
            setLoading(false);
          }
        );
      } else {
        setError(true);
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Failed to fetch weather data.</div>;

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{weatherData?.city}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center">
              <WiThermometer className="text-lg mr-1" />
              <p>{weatherData?.minTemp}/{weatherData?.maxTemp}</p>
            </div>
          </div>
          <h2 className="text-6xl font-bold mt-4">{weatherData?.currentTemp}</h2>
        </div>
        <Image
          src={weatherData?.hourlyForecast[0].icon || ""}
          alt="Current Weather"
          width={128}
          height={128}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Today&apos;s Forecast</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {weatherData?.hourlyForecast.map((hour, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center min-w-[80px]">
              <p className="text-sm mb-2">{hour.time}</p>
              <Image src={hour.icon} alt="Weather Icon" width={48} height={48} className="mx-auto mb-2" />
              <p className="font-bold">{hour.temp}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Sunrise & Sunset</h3>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <WiSunrise className="text-4xl text-yellow-400" />
            <p>Sunrise: {weatherData?.sunrise}</p>
          </div>
          <div className="flex items-center space-x-2">
            <WiSunset className="text-4xl text-orange-400" />
            <p>Sunset: {weatherData?.sunset}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          {weatherData?.dailyForecast.map((day, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-700 py-2 last:border-b-0">
              <p className="font-bold">{day.day}</p>
              <Image src={day.icon} alt={day.description} width={32} height={32} />
              <p className="text-gray-400">{day.description}</p>
              <p className="font-bold">{day.temp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
