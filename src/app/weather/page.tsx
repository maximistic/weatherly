"use client";
import React, { useEffect, useState } from "react";
import { FaCrosshairs } from "react-icons/fa";
import { WiThermometer, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { fetchWeatherData, fetchGeolocation, HourlyForecast, WeeklyForecast } from "@/utils/data";
import { useSettings } from "@/context/SettingsContext";
import { useSearchQuery } from "@/context/SearchQueryContext";
import Image from "next/image";
import "../globals.css";
import MapComponent from "./MapComponent";

const Weather = () => {
  const { temperatureUnit, windSpeedUnit } = useSettings();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [weatherData, setWeatherData] = useState<{
    city: string;
    currentTemp: number | string;
    temp_max: number | string;
    temp_min: number | string;
    realFeel: number | string;
    wind: number | string;
    sunrise: string;
    sunset: string;
    hourlyForecast: HourlyForecast[];
    weeklyForecast: WeeklyForecast[];
    lat: number;
    lon: number;
  } | null>(null);

  const convertTemperature = (temp: number | undefined) =>
    temp !== undefined
      ? temperatureUnit === "Fahrenheit"
        ? Math.round((temp * 9) / 5 + 32)
        : Math.round(temp)
      : "--";

  const convertWindSpeed = (speed: number | undefined) => {
    if (speed === undefined) return "--";
    if (windSpeedUnit === "m/s") return `${(speed / 3.6).toFixed(1)} m/s`;
    if (windSpeedUnit === "Knots") return `${(speed / 1.852).toFixed(1)} Knots`;
    return `${speed} km/h`;
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCondition, setActiveCondition] = useState<string | null>(null);

  const fetchData = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = query
        ? await fetchWeatherData(query)
        : await fetchGeolocation().then((geo) =>
            fetchWeatherData(undefined, geo.lat, geo.lon)
          );
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Check your input.");
      setLoading(false);
    }
  };

  // Fetch weather data based on the searchQuery
  useEffect(() => {
    if (searchQuery) {
      fetchData(searchQuery);
    } else {
      // Default to Coimbatore if no search query is present
      fetchData("Coimbatore");
    }
  }, [searchQuery]);

  const handleLocationFetch = async () => {
    const geo = await fetchGeolocation();
    setSearchQuery(geo.city);
    fetchData(geo.city);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-center">
        <p className="text-red-400">{error}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
          onClick={() => fetchData(searchQuery)}
        >
          Retry
        </button>
      </div>
    );

  const closeConditionSection = () => {
    setActiveCondition(null);
  };

  return (
    <div className={`p-1 font-[family-name:var(--font-geist-sans)]`}>
      {/* Today's Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div>
                <h1 className={`text-3xl font-bold`}>{weatherData?.city}</h1>
                <button onClick={handleLocationFetch} className="ml-4">
                  <FaCrosshairs size={24} />
                </button>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <WiThermometer size={24} className="mr-2 text-red-400" />
                    <span>
                      {convertTemperature(
                        weatherData?.temp_max
                          ? Number(weatherData.temp_max)
                          : undefined
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <WiThermometer size={24} className="mr-2 text-blue-400" />
                    <span>
                      {convertTemperature(
                        weatherData?.temp_min
                          ? Number(weatherData.temp_min)
                          : undefined
                      )}
                    </span>
                  </div>
                </div>
                <h2 className="text-6xl font-bold mt-4">
                  {convertTemperature(
                    weatherData?.currentTemp
                      ? Number(weatherData.currentTemp)
                      : undefined
                  )}
                  °{temperatureUnit === "Fahrenheit" ? "F" : "C"}
                </h2>
              </div>
              <Image
                src={weatherData?.hourlyForecast[0]?.icon || ""}
                className="ml-8"
                alt="Current Weather"
                width={128}
                height={128}
              />
            </div>
          </div>

        {/* Today's hourly forecast */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Today&apos;s Forecast</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {weatherData?.hourlyForecast.map((hour, index) => (
              <div
                key={index}
                className="tru p-4 rounded-lg text-center min-w-[80px]"
              >
                <p className="text-sm mb-2">{hour.time}</p>
                <Image
                  src={hour.icon}
                  alt="Weather Icon"
                  width={48}
                  height={48}
                  className="mx-auto mb-2"
                />
                <p className="font-bold">
                  {convertTemperature(
                    hour.temp ? Number(hour.temp) : undefined
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Air conditions and explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4 ">Air Conditions</h3>
            <div className="grid grid-cols-2 gap-4 tru p-4 rounded-lg h-full">
              <div
                className="flex items-center justify-between cursor-pointer tru hover:bg-gray-700 hover:text-white p-2 rounded-md transition-all"
                onClick={() => setActiveCondition("realFeel")}
              >
                <div>
                  <p className="text-sm text-gray-400">Real Feel</p>
                  <h4 className="font-bold text-lg">
                    {convertTemperature(
                      weatherData?.realFeel ? Number(weatherData.realFeel) : undefined
                    )}°{temperatureUnit === "Fahrenheit" ? "F" : "C"}
                  </h4>
                </div>
                <WiThermometer className="text-4xl text-blue-400" />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer tru hover:bg-gray-700 hover:text-white p-2 rounded-md transition-all"
                onClick={() => setActiveCondition("wind")}
              >
                <div>
                  <p className="text-sm text-gray-400">Wind</p>
                  <h4 className="font-bold text-lg">
                    {convertWindSpeed(
                      weatherData?.wind ? Number(weatherData.wind) : undefined
                    )}
                  </h4>
                </div>
                <WiStrongWind className="text-4xl text-blue-400" />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer tru hover:bg-gray-700 hover:text-white p-2 rounded-md transition-all"
                onClick={() => setActiveCondition("sunrise")}
              >
                <div>
                  <p className="text-sm text-gray-400">Sunrise</p>
                  <h4 className="font-bold text-lg">{weatherData?.sunrise}</h4>
                </div>
                <WiSunrise className="text-4xl text-yellow-400" />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer tru hover:bg-gray-700 hover:text-white p-2 rounded-md transition-all"
                onClick={() => setActiveCondition("sunset")}
              >
                <div>
                  <p className="text-sm text-gray-400">Sunset</p>
                  <h4 className="font-bold text-lg">{weatherData?.sunset}</h4>
                </div>
                <WiSunset className="text-4xl text-orange-400" />
              </div>
            </div>
          </div>

          <div
            className={`pt-7 mt-12 tru p-3 rounded-lg shadow-lg ${
              activeCondition ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-semibold">
                {activeCondition === "realFeel" && "Real Feel Explained"}
                {activeCondition === "wind" && "Wind Speed Explained"}
                {activeCondition === "sunrise" && "Sunrise Time Explained"}
                {activeCondition === "sunset" && "Sunset Time Explained"}
              </h4>
              <button
                onClick={closeConditionSection}
                className=" text-xl border border-gray-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 hover:text-white transition-all"
              >
                &times;
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              {activeCondition === "realFeel" && (
                <p>
                  Real feel is how the temperature feels when considering factors
                  like humidity, wind, and solar radiation.
                </p>
              )}
              {activeCondition === "sunrise" && (
                <p>
                  Sunrise is the time when the upper edge of the sun&apos;s disk
                  first appears above the horizon.
                </p>
              )}
              {activeCondition === "wind" && (
                <p>
                  Wind speed refers to how fast the air is moving.
                </p>
              )}
              {activeCondition === "sunset" && (
                <p>
                  Sunset is when the upper edge of the sun&apos;s disk disappears
                  below the horizon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map and 5-Day Forecast */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Location Map</h3>
        {weatherData?.city && weatherData?.lat && weatherData?.lon ? (
          <MapComponent lat={weatherData.lat} lon={weatherData.lon} />
        ) : (
          <p>Map unavailable for this location.</p>
        )}
          <h3 className="text-lg font-semibold mb-4 top-1/2 mt-10">5-Day Forecast</h3>
          <div className="tru p-2 rounded-lg mt-0">
          {weatherData?.weeklyForecast.map((day, index) => {
            const splitTemp = day.temp ? day.temp.split("/") : [];
            const convertedTemp = splitTemp.length === 2
              ? `${convertTemperature(parseFloat(splitTemp[0]))}/${convertTemperature(parseFloat(splitTemp[1]))}`
              : undefined;
            return (
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
                <p className="tru text-semibold">{day.condition}</p>
                <p className="font-bold">
                  {convertedTemp || day.temp} 
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>

  );
};

export default Weather;