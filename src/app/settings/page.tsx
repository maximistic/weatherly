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

  const theme = document.documentElement.className; 
  const isDarkTheme = theme === "dark";

  const colors = isDarkTheme
    ? {
        background: "bg-gray-900",
        panel: "bg-gray-800",
        textPrimary: "text-white",
        textSecondary: "text-gray-400",
        button: "bg-blue-600",
        buttonHover: "hover:bg-blue-700",
      }
    : {
        background: "bg-[#FAFAFA]",
        panel: "bg-[#FFFFFF]",
        textPrimary: "text-[#1A1A1A]",
        textSecondary: "text-[#4A4A4A]",
        button: "bg-[#3B82F6]",
        buttonHover: "hover:bg-[#2563EB]",
      };

  return (
    <div className={`p-1 font-[family-name:var(--font-geist-sans)] rounded-lg ${colors.background}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Units Section */}
        <div className={`p-6 rounded-lg ${colors.panel}`}>
          <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>Units</h2>
          {/* Temperature */}
          <div className="mb-4">
            <p className={`font-semibold mb-2 ${colors.textPrimary}`}>TEMPERATURE</p>
            <div className="flex space-x-2">
              {["Celsius", "Fahrenheit"].map((unit) => (
                <button
                  key={unit}
                  className={`px-4 py-2 rounded-lg ${
                    temperatureUnit === unit
                      ? `${colors.button} text-white`
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
            <p className={`font-semibold mb-2 ${colors.textPrimary}`}>WIND SPEED</p>
            <div className="flex space-x-2">
              {["km/h", "m/s", "Knots"].map((unit) => (
                <button
                  key={unit}
                  className={`px-4 py-2 rounded-lg ${
                    windSpeedUnit === unit
                      ? `${colors.button} text-white`
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
        <div className={`p-6 rounded-lg ${colors.panel}`}>
          <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>Advanced</h2>
          <ul className={`mb-6 ${colors.textSecondary}`}>
            <li>Health activities overview</li>
            <li>Severe weather notifications</li>
          </ul>
          <button
            className={`w-full py-3 ${colors.button} text-white rounded-lg text-lg font-bold ${colors.buttonHover}`}
            onClick={() => (window.location.href = "/pricing")}
          >
            Explore
          </button>
        </div>

        {/* Umbrella Reminder Section */}
        <div className={`p-6 rounded-lg ${colors.panel}`}>
          <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>
            Never forget your umbrella!
          </h2>
          <p className={`mb-6 ${colors.textSecondary}`}>
            Sign up for our daily weather newsletter personalized just for you.
          </p>
          <button
            className={`w-full py-3 ${colors.button} text-white rounded-lg text-lg font-bold ${colors.buttonHover}`}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className={`mt-6 p-6 rounded-lg ${colors.panel}`}>
        <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>Notifications</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold ${colors.textPrimary}`}>Notifications</p>
            <p className={`${colors.textSecondary}`}>Be aware of the weather</p>
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
                notificationsEnabled ? colors.button : "bg-gray-400"
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
      <div className={`mt-6 p-6 rounded-lg ${colors.panel}`}>
        <h2 className={`text-xl font-bold mb-4 ${colors.textPrimary}`}>General</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold ${colors.textPrimary}`}>12-Hour Time</p>
            <p className={`${colors.textSecondary}`}>Switch between 12-hour and 24-hour time</p>
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
                is12HourTime ? colors.button : "bg-gray-400"
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