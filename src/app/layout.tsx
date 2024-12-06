"use client";

import localFont from "next/font/local";
import { useState } from "react";
import { FiCloud, FiSettings, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import Weather from "@/Pages/Weather";
import Cities from "@/Pages/Cities";
import Settings from "@/Pages/Settings";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState("Weather"); // Tracks which content to show

  const renderContent = () => {
    switch (currentView) {
      case "Weather":
        return <Weather />;
      case "Cities":
        return <Cities />;
      case "Settings":
        return <Settings />;
      default:
        return <Weather />;
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex h-screen p-8 rounded-md">
          {/* Sidebar */}
          <div
            className={`p-5 w-20 sm:w-40 transition-all duration-300 rounded-lg mr-8 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            {/* Logo */}
            <h1 className="text-center text-xl font-bold mt-2 sm:block hidden cursor-none">
              WEATHERLY
            </h1>

            {/* Sidebar Buttons */}
            <div className="flex flex-col items-center space-y-4 mt-10">
              <SidebarButton
                icon={<FiCloud size={28} />}
                label="Weather"
                isActive={currentView === "Weather"}
                onClick={() => setCurrentView("Weather")}
              />
              <SidebarButton
                icon={<FaCity size={28} />}
                label="Cities"
                isActive={currentView === "Cities"}
                onClick={() => setCurrentView("Cities")}
              />
              <SidebarButton
                icon={<FiSettings size={28} />}
                label="Settings"
                isActive={currentView === "Settings"}
                onClick={() => setCurrentView("Settings")}
              />
            </div>

            {/* Theme Toggle */}
            <div className="absolute bottom-8 left-8 pl-14 pb-10">
              <button
                className="rounded-md hover:bg-gray-600"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Searchbar */}
            <div
              className={`p-4 flex items-center space-x-4 rounded-lg mr-8 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <input
                type="text"
                placeholder="Search for cities"
                className={`px-4 py-2 rounded-md flex-1 ${
                  isDarkMode
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-gray-200 text-gray-900 border border-gray-600"
                }`}
              />
              <FiSearch
                size={28}
                className={`cursor-pointer ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              />
            </div>

            {/* Render Dynamic Content */}
            <div className="p-8">{renderContent()}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center hover:bg-gray-700 rounded-md p-2 w-full hover:text-gray-50 ${
        isActive ? "bg-gray-700 text-gray-50" : ""
      }`}
    >
      {icon}
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}