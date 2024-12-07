"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  WiThermometer,
  WiStrongWind,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  fetchWeatherData,
  fetchGeolocation,
  HourlyForecast,
  WeeklyForecast,
} from "../utils/data";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Weather = ({ searchQuery }: { searchQuery: string }) => {
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
  const [showChart, setShowChart] = useState(false);

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

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-center">
        <p className="text-red-400">{error}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
          onClick={() => fetchData()}
        >
          Retry
        </button>
      </div>
    );

  const chartData = {
    labels: weatherData?.weeklyForecast.map((day) => day.day),
    datasets: [
      {
        label: "Temperature",
        data: weatherData?.weeklyForecast.map((day) =>
          parseInt(day.temp.replace("°", ""))
        ),
        fill: true,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        pointBackgroundColor: "#4F46E5",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dayData = weatherData?.weeklyForecast[tooltipItem.dataIndex];
            return `${dayData?.day}: ${dayData?.temp}, ${dayData?.condition}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#555",
        },
      },
    },
  };

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
                  <WiThermometer size={24} className="mr-2 text-red-400" />
                  <span>{weatherData?.temp_max}</span>
                </div>
                <div className="flex items-center">
                  <WiThermometer size={24} className="mr-2 text-blue-400" />
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">5-Day Forecast</h3>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => setShowChart((prev) => !prev)}
            >
              {showChart ? "Hide Chart" : "Show Chart"}
            </button>
          </div>

          {showChart ? (
            <div className="bg-gray-800 p-4 rounded-lg">
              <Line data={chartData} options={chartOptions} />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
