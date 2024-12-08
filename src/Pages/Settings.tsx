"use client";
import React from "react";
import { useSettings } from "../context/SettingsContext";
import "../globals.css";

const Settings = () => {
  const {
    notificationsEnabled,
    is12HourTime,
    setNotificationsEnabled,
    setIs12HourTime,
  } = useSettings();

  return (
    <div className="p-8 bg-gray-900 text-white font-[family-name:var(--font-geist-sans)] rounded-lg">
      {/* Units Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Units Options */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Units</h2>
          {[
            { label: "Temperature", options: ["Celsius", "Fahrenheit"] },
            { label: "Wind Speed", options: ["km/h", "m/s", "Knots"] },
            { label: "Pressure", options: ["hPa", "Inches", "kPa", "mm"] },
            { label: "Precipitation", options: ["Millimeters", "Inches"] },
            { label: "Distance", options: ["Kilometers", "Miles"] },
          ].map((unit, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold mb-2">{unit.label.toUpperCase()}</p>
              <div className="flex space-x-4">
                {unit.options.map((option) => (
                  <button
                    key={option}
                    className="px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right-Hand Cards */}
        <div className="space-y-6">
          {/* Advanced Card */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Advanced</h2>
            <ul className="text-gray-400 mb-6">
              <li>Ad-free</li>
              <li>Health activities overview</li>
              <li>Severe weather notifications</li>
            </ul>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold">
              $5.99/month
            </button>
          </div>

          {/* Umbrella Reminder Card */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Never forget your umbrella!</h2>
            <p className="text-gray-400 mb-6">
              Sign up for our daily weather newsletter personalized just for you.
            </p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Notifications</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Notifications</p>
            <p className="text-gray-400">Be aware of the weather</p>
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
                notificationsEnabled ? "bg-blue-600" : "bg-gray-600"
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
      <div className="mt-8 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">General</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">12-Hour Time</p>
            <p className="text-gray-400">Switch between 12-hour and 24-hour time</p>
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
                is12HourTime ? "bg-blue-600" : "bg-gray-600"
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