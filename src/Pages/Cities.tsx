import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { fetchWeatherData } from "../utils/data";
import { FiTrash } from "react-icons/fi";
import { useCities } from "../context/CitiesContext";
import { useSettings } from "../context/SettingsContext";
import "../globals.css";

type City = {
  name: string;
  temp: string;
  icon: string;
  hourlyForecast: { time: string; temp: string; icon: string }[];
};

const Cities = ({ searchQuery }: { searchQuery: string }) => {
  const { cities, addCity, deleteCity, deleteAllCities } = useCities();
  const { temperatureUnit } = useSettings(); // Get the temperatureUnit from context
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddCity = useCallback(async (query: string) => {
    if (cities.length >= 5) {
      setError("Maximum 5 cities allowed. Delete one to add another.");
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
      return;
    }
  
    try {
      const weatherData = await fetchWeatherData(query);
  
      const newCity: City = {
        name: weatherData.city,
        temp: weatherData.currentTemp.toString(),  // Ensure temperature is a string
        icon: weatherData.hourlyForecast[0]?.icon || "",
        hourlyForecast: weatherData.hourlyForecast.slice(0, 6).map((hour) => ({
          ...hour,
          temp: hour.temp.toString(),  // Ensure hourly temperatures are strings
        })),
      };
  
      addCity(newCity);
      setError(null);  // Clear any previous error
    } catch {
      setError("City not found or API error. Please try again.");
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
    }
  }, [cities, addCity]);  

  const convertTemperature = (temp: number | string, toUnit: "Celsius" | "Fahrenheit"): string => {
    if (typeof temp === "string" || temp === undefined) return temp.toString();
  
    if (toUnit === "Fahrenheit") {
      return ((temp * 9) / 5 + 32).toFixed(1); 
    }
    return temp.toFixed(1); 
  };

  useEffect(() => {
    if (searchQuery) {
      handleAddCity(searchQuery);
    }
  }, [searchQuery, handleAddCity]);

  const handleDeleteCity = (cityName: string) => {
    deleteCity(cityName);
    if (selectedCity?.name === cityName) setSelectedCity(null);
  };

  const handleDeleteAllCities = () => {
    deleteAllCities(); // Deletes all cities from the list
    setSelectedCity(null); // Clears selected city if all cities are deleted
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Cities</h2>
          <button
            onClick={handleDeleteAllCities}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Delete All
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm absolute top-0 right-0 mt-4 mr-4 p-2 bg-gray-800 rounded-md">
            {error}
          </p>
        )}
        {cities.map((city, index) => (
          <div
            key={index}
            onClick={() => setSelectedCity(city)}
            className={`flex items-center justify-between p-4 rounded-lg ${
              selectedCity?.name === city.name
                ? "bg-gray-700 border border-blue-500"
                : "bg-gray-800 hover:bg-gray-700"
            } cursor-pointer transition-all`}
          >
            <div className="flex items-center gap-4">
              <Image
                src={city.icon}
                alt={`${city.name} weather`}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-lg font-bold">{city.name}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold">
                {convertTemperature(Number(city.temp), temperatureUnit)}°{temperatureUnit === "Celsius" ? "C" : "F"}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCity(city.name);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
        {cities.length === 0 && (
          <p className="text-gray-400 text-center mt-8">
            No cities added yet. Search to add a city!
          </p>
        )}
      </div>
      <div
        className={`${
          selectedCity ? "block" : "hidden"
        } flex flex-col sm:flex-1 sm:max-w-sm p-4 rounded-lg bg-gray-900 border border-gray-700 space-y-4 mt-4 sm:mt-0`}
      >
        {selectedCity && (
          <>
            <h2 className="text-lg font-bold">{selectedCity.name} Details</h2>
            <div className="flex items-center gap-4">
              <Image
                src={selectedCity.icon}
                alt={`${selectedCity.name} weather`}
                width={50}
                height={50}
                className="w-12 h-12"
              />
              <div>
                <p className="text-xl font-bold">
                  {convertTemperature(Number(selectedCity.temp), temperatureUnit)}°
                  {temperatureUnit === "Celsius" ? "C" : "F"}
                </p>
              </div>
            </div>
            <h3 className="text-md font-bold">Hourly Forecast</h3>
            <div className="grid grid-cols-3 sm:grid-cols-2 gap-4">
              {selectedCity.hourlyForecast.map((hour, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-800 p-2 rounded-lg"
                >
                  <p className="text-sm font-bold">{hour.time}</p>
                  <Image
                    src={hour.icon}
                    alt="Weather Icon"
                    width={30}
                    height={30}
                    className="w-8 h-8"
                  />
                  <p className="text-sm">
                    {convertTemperature(Number(hour.temp), temperatureUnit)}°
                    {temperatureUnit === "Celsius" ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cities;
