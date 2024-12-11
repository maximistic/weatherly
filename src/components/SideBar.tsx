"use client";

import React from "react";
import { FiCloud, FiSettings } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar({
  isSidebarOpen,
  setIsSidebarOpen,
  theme,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  const handleNavigation = (route: string) => {
    if (setIsSidebarOpen) setIsSidebarOpen(false);
    router.push(route);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "block" : "hidden"
      } sm:block rounded-lg p-5 w-16 sm:w-40 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-400"
      }`}
      style={{ margin: "10px" }}
    >
      <h1 className="text-center text-xl font-bold mt-2 sm:block hidden cursor-none">
        WEATHERLY
      </h1>
      <div className="flex flex-col items-center space-y-4 mt-10">
        <SidebarButton
          icon={<FiCloud size={28} />}
          label="Weather"
          active={isActive("/weather")}
          theme={theme}
          onClick={() => handleNavigation("/weather")}
        />
        <SidebarButton
          icon={<FaCity size={28} />}
          label="Cities"
          active={isActive("/cities")}
          theme={theme}
          onClick={() => handleNavigation("/cities")}
        />
        <SidebarButton
          icon={<FiSettings size={28} />}
          label="Settings"
          active={isActive("/settings")}
          theme={theme}
          onClick={() => handleNavigation("/settings")}
        />
      </div>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  active,
  theme,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  theme: string; // Add theme here to fix the error
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-md p-3 w-full ${
        active
          ? " text-red-500"
          : theme === "dark"
          ? "text-white hover:text-red-500"
          : "text-white hover:text-red-500"
      }`}
    >
      {icon}
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}