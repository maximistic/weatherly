import React, { createContext, useContext, useState } from "react";

interface SettingsContextProps {
  notificationsEnabled: boolean;
  is12HourTime: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  setIs12HourTime: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [is12HourTime, setIs12HourTime] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        notificationsEnabled,
        is12HourTime,
        setNotificationsEnabled,
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