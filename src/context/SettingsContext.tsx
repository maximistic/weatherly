import React, { createContext, useContext, useState } from "react";

interface SettingsContextProps {
  temperatureUnit: "Celsius" | "Fahrenheit";
  windSpeedUnit: "km/h" | "m/s" | "Knots";
  is12HourTime: boolean;
  setTemperatureUnit: (unit: "Celsius" | "Fahrenheit") => void;
  setWindSpeedUnit: (unit: "km/h" | "m/s" | "Knots") => void;
  setIs12HourTime: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<"Celsius" | "Fahrenheit">("Celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState<"km/h" | "m/s" | "Knots">("km/h");
  const [is12HourTime, setIs12HourTime] = useState<boolean>(true);

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

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};