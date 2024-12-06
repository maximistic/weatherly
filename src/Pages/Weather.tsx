"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WiRaindrop, WiThermometer, WiStrongWind, WiDaySunny } from "react-icons/wi";
import { fetchWeatherData, HourlyForecast, WeeklyForecast } from "../utils/data";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    currentTemp: string;
    chanceOfRain: string;
    realFeel: string;
    wind: string;
    uvIndex: string;
    hourlyForecast: HourlyForecast[];
    weeklyForecast: WeeklyForecast[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeatherData("riyadh");
        setWeatherData(data);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Failed to fetch weather data.</div>;

  return (
    <div className="p-6 bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">{weatherData?.city}</h1>
              <p className="text-gray-400">Chance of rain: {weatherData?.chanceOfRain}</p>
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

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Air Conditions</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
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
                  <p className="text-sm text-gray-400">Chance of rain</p>
                  <h4 className="font-bold text-lg">{weatherData?.chanceOfRain}</h4>
                </div>
                <WiRaindrop className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">UV Index</p>
                  <h4 className="font-bold text-lg">{weatherData?.uvIndex}</h4>
                </div>
                <WiDaySunny className="text-4xl text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
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