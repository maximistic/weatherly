"use client";
import React, { useState } from "react";
import localFont from "next/font/local";
import { FiCloud, FiSettings, FiSearch, FiMenu } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import Weather from "../Pages/Weather";
import Cities from "../Pages/Cities";
import Settings from "../Pages/Settings";
import "./globals.css";
import { SettingsProvider } from "../context/SettingsContext";

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

export default function RootLayout() {
  const [currentView, setCurrentView] = useState("Weather");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentView === "Cities") return; // Allow search functionality in Cities tab
    setCurrentView("Weather"); // Switch to Weather view
  };

  const renderContent = () => {
    switch (currentView) {
      case "Weather":
        return <Weather searchQuery={searchQuery} />;
      case "Cities":
        return <Cities searchQuery={searchQuery} />;
      case "Settings":
        return <Settings />;
      default:
        return <Weather searchQuery={searchQuery} />;
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <SettingsProvider>
        <div className="flex h-screen p-4 sm:p-8 rounded-md">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } sm:block p-5 w-16 sm:w-40 transition-all duration-300 rounded-lg mr-4 sm:mr-8 bg-gray-800`}
          >
            <h1 className="text-center text-xl font-bold mt-2 sm:block hidden cursor-none">
              WEATHERLY
            </h1>
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
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col w-full">
            <div
              className={`p-4 flex items-center space-x-4 rounded-lg mb-8 bg-gray-800`}
            >
              <div className="sm:hidden absolute top-4 left-4 z-10 pl-5 pt-5 pr-5">
                <button
                  className="text-white"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <FiMenu size={28} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search by city or ZIP"
                className="px-4 py-2 rounded-md flex-1 bg-gray-700 text-white border border-gray-600"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch((e.target as HTMLInputElement).value);
                }}
              />
              <FiSearch
                size={28}
                className="cursor-pointer text-gray-400"
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>("input");
                  if (input) handleSearch(input.value);
                }}
              />
            </div>
            <div className="p-4 sm:p-8 flex-1 overflow-auto">{renderContent()}</div>
          </div>
        </div>
        </SettingsProvider>
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
