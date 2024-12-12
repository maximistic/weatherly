"use client";

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
  deleteAllCities: () => void;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const CitiesProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
    setCities(savedCities);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    const channel = new BroadcastChannel("cities-sync");

    const syncCities = (event: MessageEvent) => {
      if (event.data.type === "SYNC_CITIES") {
        setCities(event.data.payload);
      }
    };

    channel.addEventListener("message", syncCities);

    return () => channel.close();
  }, []);

  const updateCitiesAndBroadcast = (updatedCities: City[]) => {
    setCities(updatedCities);
    const channel = new BroadcastChannel("cities-sync");
    channel.postMessage({ type: "SYNC_CITIES", payload: updatedCities });
    channel.close();
  };

  const addCity = (city: City) => {
    if (cities.some((c) => c.name === city.name)) return;
    updateCitiesAndBroadcast([...cities, city]);
  };

  const deleteCity = (name: string) => {
    updateCitiesAndBroadcast(cities.filter((city) => city.name !== name));
  };

  const deleteAllCities = () => {
    updateCitiesAndBroadcast([]);
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
