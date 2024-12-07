import React, { useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import { fetchWeatherData } from "../utils/data"; // Assuming this function fetches weather data from an API.
import { FiPlus, FiTrash } from "react-icons/fi";

type City = {
  name: string;
  temp: string;
  icon: string;
  time: string;
  hourlyForecast: { time: string; icon: string; temp: string }[];
  weeklyForecast: { day: string; icon: string; high: string; low: string }[];
};

const Cities = ({ searchQuery }: { searchQuery: string }) => {
  const [cities, setCities] = useState<City[]>([]); // Stores city data
  const [selectedCity, setSelectedCity] = useState<City | null>(null); // Stores currently selected city
  const [isAdding, setIsAdding] = useState(false); // Toggles adding mode
  const [error, setError] = useState<string | null>(null); // Stores any error messages

  // Handle Add City Button
  const handleAddCity = async () => {
    if (cities.length >= 5) {
      alert("You can only store up to 5 cities in the list.");
      return;
    }

    if (!searchQuery) {
      alert("Please enter a valid city name or ZIP to add.");
      return;
    }

    try {
      const weatherData = await fetchWeatherData(searchQuery);

      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newCity: City = {
        name: weatherData.city,
        temp: weatherData.currentTemp,
        icon: weatherData.icon, // Placeholder if no icon available
        time: currentTime,
        hourlyForecast: weatherData.hourlyForecast.map((hour: any) => ({
          time: hour.time,
          icon: hour.icon ,
          temp: hour.temp,
        })),
        weeklyForecast: weatherData.weeklyForecast.map((day: any) => ({
          day: day.day,
          icon: day.icon,
          high: day.high,
          low: day.low,
        })),
      };

      // Check for duplicates
      if (cities.some((city) => city.name === newCity.name)) {
        alert("City is already in the list.");
        return;
      }

      setCities((prevCities) => [...prevCities, newCity]);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("City not found or API error. Please try again.");
      console.error(err);
    }
  };

  // Handle Delete City
  const handleDeleteCity = (cityName: string) => {
    setCities((prevCities) => prevCities.filter((city) => city.name !== cityName));
    if (selectedCity?.name === cityName) setSelectedCity(null); // Deselect if deleted
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-8">
      {/* City List Section */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cities</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            <FiPlus />
            Add City
          </button>
        </div>

        {isAdding && (
          <button
            onClick={handleAddCity}
            className="w-full p-2 bg-gray-700 rounded-md hover:bg-gray-600 text-white transition"
          >
            Confirm Add
          </button>
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
                <p className="text-sm text-gray-400">{city.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xl font-semibold">{city.temp}°</div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click
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
            No cities added yet. Click -Add City- to get started!
          </p>
        )}
      </div>

      {/* City Details Section */}
      <div className="flex-1 bg-gray-800 rounded-lg p-6">
        {selectedCity ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedCity.name}</h2>
                <p className="text-gray-400">
                  Today Forecast: {selectedCity.temp}°
                </p>
              </div>
              <Image
                src={selectedCity.icon}
                alt={`${selectedCity.name} weather`}
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {selectedCity.hourlyForecast.map((hour, i) => (
                <div key={i} className="text-center">
                  <p className="text-gray-400 text-sm">{hour.time}</p>
                  <Image
                    src={hour.icon}
                    alt="hourly forecast icon"
                    width={32}
                    height={32}
                    className="w-8 h-8 mx-auto"
                  />
                  <p className="font-medium">{hour.temp}°</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center mt-8">
            Select a city to view details.
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default Cities;
