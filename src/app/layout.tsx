"use client";
import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import { FiCloud, FiSettings, FiSearch, FiMenu } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import Weather from "../Pages/Weather";
import Cities from "../Pages/Cities";
import Settings from "../Pages/Settings";
import Pricing from "../Pages/Pricing";
import SignUp from "@/Pages/SignUp";

import "../globals.css";
import { SettingsProvider } from "../context/SettingsContext";
import { CitiesProvider } from "../context/CitiesContext"; 
import FallbackUI from "@/Pages/FallbackUI";

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

  useEffect(() => {
    const savedView = localStorage.getItem("currentView");
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentView === "Cities") return; 
    setCurrentView("Weather"); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      handleSearch(input.value); 
      input.value = ""; 
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "Weather":
        return <Weather searchQuery={searchQuery} />;
      case "Cities":
        return <Cities searchQuery={searchQuery} />;
      case "Settings":
        return <Settings />;
      case "pricing":
        return <Pricing />;
      case "signUp":
        return <SignUp />;
      default:
        return <Weather searchQuery={searchQuery} />;
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <FallbackUI>
        <CitiesProvider>
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

              {/* Top Bar */}
              <div className="flex-1 flex flex-col w-full">
                <div
                  className={`p-4 flex items-center space-x-4 rounded-lg  bg-gray-800 relative`}
                >
                  <div className="sm:hidden absolute top-1/2 left-7 -translate-y-1/2 z-10">
                    <button
                      className="text-white p-2 rounded-md hover:text-red-500"
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <FiMenu size={24} />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by city or ZIP"
                    className="px-4 py-2 rounded-md flex-1 bg-gray-700 text-white border border-gray-600 pl-12"
                    onKeyDown={handleKeyDown} 
                  />
                  <FiSearch
                    size={24}
                    className="cursor-pointer text-gray-400 hover:text-red-500"
                    onClick={() => {
                      const input = document.querySelector<HTMLInputElement>(
                        "input"
                      );
                      if (input) {
                        handleSearch(input.value); 
                        input.value = ""; 
                      }
                    }}
                  />
                </div>
                <div className="p-4 sm:p-8 flex-1 overflow-auto">
                  {renderContent()}
                </div>
              </div>
            </div>
          </SettingsProvider>
        </CitiesProvider>
        </FallbackUI>
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
      className={`flex flex-col items-center hover:text-red-500 rounded-md p-3 w-full ${
        isActive ? " text-red-500 " : ""
      }`}
    >
      {icon}
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}
