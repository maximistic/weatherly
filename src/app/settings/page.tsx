"use client";
import React, { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

const Settings = () => {
  const {
    temperatureUnit,
    windSpeedUnit,
    is12HourTime,
    setTemperatureUnit,
    setWindSpeedUnit,
    setIs12HourTime,
  } = useSettings();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div className={`p-1 font-[family-name:var(--font-geist-sans)] rounded-lg `}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Units Section */}
        <div className={`p-6 rounded-lg tru`}>
          <h2 className={`text-xl font-bold mb-4`}>Units</h2>
          {/* Temperature */}
          <div className="mb-4">
            <p className={`font-semibold mb-2 `}>TEMPERATURE</p>
            <div className="flex space-x-2">
              {["Celsius", "Fahrenheit"].map((unit) => (
                <button
                  key={unit}
                  className={`px-4 py-2 rounded-lg ${
                    temperatureUnit === unit
                      ? ` text-white`
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setTemperatureUnit(unit as "Celsius" | "Fahrenheit")}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {/* Wind Speed */}
          <div>
            <p className={`font-semibold mb-2 `}>WIND SPEED</p>
            <div className="flex space-x-2">
              {["km/h", "m/s", "Knots"].map((unit) => (
                <button
                  key={unit}
                  className={`px-4 py-2 rounded-lg ${
                    windSpeedUnit === unit
                      ? ` text-white`
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setWindSpeedUnit(unit as "km/h" | "m/s" | "Knots")}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className={`p-6 rounded-lg tru`}>
          <h2 className={`text-xl font-bold mb-4 `}>Advanced</h2>
          <ul className={`mb-6 `}>
            <li>Health activities overview</li>
            <li>Severe weather notifications</li>
          </ul>
          <button
            className={`w-full py-3  text-white rounded-lg text-lg font-bold`}
            onClick={() => (window.location.href = "/pricing")}
          >
            Explore
          </button>
        </div>

        {/* Umbrella Reminder Section */}
        <div className={`p-6 rounded-lg tru`}>
          <h2 className={`text-xl font-bold mb-4 `}>
            Never forget your umbrella!
          </h2>
          <p className={`mb-6 `}>
            Sign up for our daily weather newsletter personalized just for you.
          </p>
          <button
            className={`w-full py-3  text-white rounded-lg text-lg font-bold `}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className={`mt-6 p-6 rounded-lg tru`}>
        <h2 className={`text-xl font-bold mb-4 `}>Notifications</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold `}>Notifications</p>
            <p className={``}>Be aware of the weather</p>
          </div>
          <label className="relative inline-block w-10 h-6">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="hidden"
            />
            <span
              className={`block w-full h-full rounded-full cursor-pointer ${
                notificationsEnabled ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></span>
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notificationsEnabled ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </label>
        </div>
      </div>

      {/* General Section */}
      <div className={`mt-6 p-6 rounded-lg tru`}>
        <h2 className={`text-xl font-bold mb-4 `}>General</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold `}>12-Hour Time</p>
            <p className={``}>Switch between 12-hour and 24-hour time</p>
          </div>
          <label className="relative inline-block w-10 h-6">
            <input
              type="checkbox"
              checked={is12HourTime}
              onChange={() => setIs12HourTime(!is12HourTime)}
              className="hidden"
            />
            <span
              className={`block w-full h-full rounded-full cursor-pointer ${
                is12HourTime ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></span>
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                is12HourTime ? "translate-x-4" : "translate-x-0"
              }`}
            ></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;