import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchWeatherData } from "../utils/data";
import { FiTrash } from "react-icons/fi";

type City = {
  name: string;
  temp: string;
  icon: string;
  time: string;
  hourlyForecast: { time: string; temp: string; icon: string }[];
};

const Cities = ({ searchQuery }: { searchQuery: string }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      handleAddCity(searchQuery);
    }
  }, [searchQuery]);

  const handleAddCity = async (query: string) => {
    if (cities.length >= 5) {
      setError("Maximum 5 cities allowed. Delete one to add another.");
      return;
    }
    try {
      const weatherData = await fetchWeatherData(query);
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newCity: City = {
        name: weatherData.city,
        temp: weatherData.currentTemp,
        icon: weatherData.hourlyForecast[0]?.icon || "",
        time: currentTime,
        hourlyForecast: weatherData.hourlyForecast.slice(0, 6), // Taking 6-hour forecast
      };

      if (cities.some((city) => city.name === newCity.name)) {
        setError("City already added.");
        return;
      }

      setCities([...cities, newCity]);
      setError(null);
    } catch {
      setError("City not found or API error. Please try again.");
    }
  };

  const handleDeleteCity = (cityName: string) => {
    setCities((prev) => prev.filter((city) => city.name !== cityName));
    if (selectedCity?.name === cityName) setSelectedCity(null);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-8">
      {/* City List */}
      <div className="flex-1 space-y-4">
        <h2 className="text-xl font-bold">Your Cities</h2>
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
                <p className="text-sm text-gray-400">{city.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold">{city.temp}</div>
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

      {/* Selected City Details */}
      {selectedCity && (
        <div
          className={`flex-1 sm:max-w-sm p-4 rounded-lg bg-gray-900 border border-gray-700 space-y-4 ${
            selectedCity ? "block" : "hidden"
          }`}
        >
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
              <p className="text-xl font-bold">{selectedCity.temp}</p>
              <p className="text-gray-400 text-sm">{selectedCity.time}</p>
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
                <p className="text-sm">{hour.temp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cities;
