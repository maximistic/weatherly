import React from "react";
import { WiRaindrop, WiThermometer, WiStrongWind, WiDaySunny } from "react-icons/wi";

const Weather = () => {
  const hourlyForecast = [
    { time: "6:00 AM", temp: "25°", icon: "https://openweathermap.org/img/wn/04d.png" },
    { time: "9:00 AM", temp: "28°", icon: "https://openweathermap.org/img/wn/03d.png" },
    { time: "12:00 PM", temp: "33°", icon: "https://openweathermap.org/img/wn/01d.png" },
    { time: "3:00 PM", temp: "34°", icon: "https://openweathermap.org/img/wn/01d.png" },
    { time: "6:00 PM", temp: "32°", icon: "https://openweathermap.org/img/wn/01d.png" },
    { time: "9:00 PM", temp: "30°", icon: "https://openweathermap.org/img/wn/02d.png" },
  ];

  const weeklyForecast = [
    { day: "Today", condition: "Sunny", temp: "36/22", icon: "https://openweathermap.org/img/wn/01d.png" },
    { day: "Tue", condition: "Sunny", temp: "37/21", icon: "https://openweathermap.org/img/wn/01d.png" },
    { day: "Wed", condition: "Sunny", temp: "37/21", icon: "https://openweathermap.org/img/wn/01d.png" },
    { day: "Thu", condition: "Cloudy", temp: "37/21", icon: "https://openweathermap.org/img/wn/03d.png" },
    { day: "Fri", condition: "Cloudy", temp: "37/21", icon: "https://openweathermap.org/img/wn/04d.png" },
    { day: "Sat", condition: "Rainy", temp: "37/21", icon: "https://openweathermap.org/img/wn/09d.png" },
    { day: "Sun", condition: "Sunny", temp: "37/21", icon: "https://openweathermap.org/img/wn/01d.png" },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white font-[family-name:var(--font-geist-sans)]">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Weather Section */}
        <div className="lg:col-span-2">
          {/* Current Weather */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Madrid</h1>
              <p className="text-gray-400">Chance of rain: 0%</p>
              <h2 className="text-6xl font-bold mt-4">31°</h2>
            </div>
            <img
              src="https://openweathermap.org/img/wn/01d.png"
              alt="Sunny"
              className="w-32 h-32"
            />
          </div>

          {/* Today's Forecast */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Today's Forecast</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg text-center min-w-[80px]"
                >
                  <p className="text-sm mb-2">{hour.time}</p>
                  <img
                    src={hour.icon}
                    alt="Weather Icon"
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="font-bold">{hour.temp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Air Conditions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Air Conditions</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Real Feel</p>
                  <h4 className="font-bold text-lg">30°</h4>
                </div>
                <WiThermometer className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Wind</p>
                  <h4 className="font-bold text-lg">0.2 km/h</h4>
                </div>
                <WiStrongWind className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Chance of rain</p>
                  <h4 className="font-bold text-lg">0%</h4>
                </div>
                <WiRaindrop className="text-4xl text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">UV Index</p>
                  <h4 className="font-bold text-lg">3</h4>
                </div>
                <WiDaySunny className="text-4xl text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast Sidebar */}
        <div>
          <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
          <div className="bg-gray-800 p-4 rounded-lg">
            {weeklyForecast.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2 last:border-b-0"
              >
                <p className="font-bold">{day.day}</p>
                <img
                  src={day.icon}
                  alt={day.condition}
                  className="w-8 h-8"
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