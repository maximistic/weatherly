"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WiThermometer, WiStrongWind, WiSunrise, WiSunset, WiThermometerExterior, WiThermometerInternal } from "react-icons/wi";
import { fetchWeatherData, fetchGeolocation, HourlyForecast, WeeklyForecast } from "../utils/data";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    currentTemp: string;
    temp_max: string;
    temp_min: string;
    realFeel: string;
    wind: string;
    sunrise: string;
    sunset: string;
    hourlyForecast: HourlyForecast[];
    weeklyForecast: WeeklyForecast[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const geolocation = await fetchGeolocation();
        const data = await fetchWeatherData(undefined, geolocation.lat, geolocation.lon);
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const handleRetry = async () => {
    setError(null);
    setLoading(true);
    try {
      const geolocation = await fetchGeolocation();
      const data = await fetchWeatherData(undefined, geolocation.lat, geolocation.lon);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      {/* Weather Data Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">{weatherData?.city}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <WiThermometerExterior className="mr-2 text-red-400" />
                  <span>{weatherData?.temp_max}</span>
                </div>
                <div className="flex items-center">
                  <WiThermometerInternal className="mr-2 text-blue-400" />
                  <span>{weatherData?.temp_min}</span>
                </div>
              </div>
              <h2 className="text-6xl font-bold mt-4">{weatherData?.currentTemp}</h2>
            </div>
            <Image
              src={weatherData?.hourlyForecast[0]?.icon || ""}
              alt="Current Weather"
              width={128}
              height={128}
            />
          </div>

          {/* Today's Forecast */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Today&apos;s Forecast</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {weatherData?.hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg text-center min-w-[80px]"
                >
                  <p className="text-sm mb-2">{hour.time}</p>
                  <Image
                    src={hour.icon}
                    alt="Weather Icon"
                    width={48}
                    height={48}
                    className="mx-auto mb-2"
                  />
                  <p className="font-bold">{hour.temp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Air Conditions */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">Air Conditions</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Real Feel</p>
                  <h4 className="font-bold text-lg">{weatherData?.realFeel}</h4>
                </div>
                <WiThermometer className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Wind</p>
                  <h4 className="font-bold text-lg">{weatherData?.wind}</h4>
                </div>
                <WiStrongWind className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Sunrise</p>
                  <h4 className="font-bold text-lg">{weatherData?.sunrise}</h4>
                </div>
                <WiSunrise className="text-4xl text-yellow-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Sunset</p>
                  <h4 className="font-bold text-lg">{weatherData?.sunset}</h4>
                </div>
                <WiSunset className="text-4xl text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="lg:col-span-1 sm:col-span-2">
          <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
          <div className="bg-gray-800 p-4 rounded-lg ">
            {weatherData?.weeklyForecast.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2 last:border-b-0"
              >
                <p className="font-bold">{day.day}</p>
                <Image
                  src={day.icon}
                  alt={day.condition}
                  width={32}
                  height={32}
                />
                <p className="text-gray-400">{day.condition}</p>
                <p className="font-bold">{day.temp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;