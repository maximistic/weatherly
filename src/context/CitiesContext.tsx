import React, { createContext, useContext, useEffect, useState } from "react";

type City = {
  name: string;
  temp: string;
  icon: string;
  time: string;
  timezone: string;
  hourlyForecast: { time: string; temp: string; icon: string }[];
};

type CitiesContextType = {
  cities: City[];
  addCity: (city: City) => void;
  deleteCity: (name: string) => void;
  deleteAllCities: () => void; // Add this method
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<City[]>([]);

  // Load saved cities from localStorage on initial load
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
    setCities(savedCities);
  }, []);

  // Persist cities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(cities));
  }, [cities]);

  // Sync cities across tabs using BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel("cities-sync");
    channel.onmessage = (event) => {
      if (event.data.type === "SYNC_CITIES") {
        setCities(event.data.payload);
      }
    };
    return () => channel.close();
  }, []);

  const addCity = (city: City) => {
    if (cities.some((c) => c.name === city.name)) return;
    const updatedCities = [...cities, city];
    setCities(updatedCities);

    // Notify other tabs
    new BroadcastChannel("cities-sync").postMessage({
      type: "SYNC_CITIES",
      payload: updatedCities,
    });
  };

  const deleteCity = (name: string) => {
    const updatedCities = cities.filter((city) => city.name !== name);
    setCities(updatedCities);

    // Notify other tabs
    new BroadcastChannel("cities-sync").postMessage({
      type: "SYNC_CITIES",
      payload: updatedCities,
    });
  };

  const deleteAllCities = () => {
    setCities([]); // Clear the cities array

    // Notify other tabs
    new BroadcastChannel("cities-sync").postMessage({
      type: "SYNC_CITIES",
      payload: [],
    });
  };

  return (
    <CitiesContext.Provider value={{ cities, addCity, deleteCity, deleteAllCities }}>
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = (): CitiesContextType => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};
