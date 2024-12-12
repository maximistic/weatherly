"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

enum TemperatureUnit {
  Celsius = "Celsius",
  Fahrenheit = "Fahrenheit",
}

enum WindSpeedUnit {
  KmPerHour = "km/h",
  MetersPerSecond = "m/s",
  Knots = "Knots",
}

interface SettingsContextType {
  temperatureUnit: TemperatureUnit;
  windSpeedUnit: WindSpeedUnit;
  is12HourTime: boolean;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setWindSpeedUnit: (unit: WindSpeedUnit) => void;
  setIs12HourTime: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_KEY = "userSettings";

export const SettingsProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.Celsius);
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>(WindSpeedUnit.KmPerHour);
  const [is12HourTime, setIs12HourTime] = useState<boolean>(true);

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setTemperatureUnit(parsedSettings.temperatureUnit || TemperatureUnit.Celsius);
      setWindSpeedUnit(parsedSettings.windSpeedUnit || WindSpeedUnit.KmPerHour);
      setIs12HourTime(parsedSettings.is12HourTime ?? true);
    }
  }, []);

  useEffect(() => {
    const settings = { temperatureUnit, windSpeedUnit, is12HourTime };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [temperatureUnit, windSpeedUnit, is12HourTime]);

  return (
    <SettingsContext.Provider
      value={{
        temperatureUnit,
        windSpeedUnit,
        is12HourTime,
        setTemperatureUnit,
        setWindSpeedUnit,
        setIs12HourTime,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};