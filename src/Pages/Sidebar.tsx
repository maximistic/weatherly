"use client";

import React from "react";
import { FiCloud, FiSettings } from "react-icons/fi";
import { FaCity } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;

  const handleNavigation = (route: string) => {
    if (setIsSidebarOpen) setIsSidebarOpen(false); // Close sidebar on mobile
    router.push(route);
  };

  return (
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
          active={isActive("/Weather")}
          onClick={() => handleNavigation("/Weather")}
        />
        <SidebarButton
          icon={<FaCity size={28} />}
          label="Cities"
          active={isActive("/Cities")}
          onClick={() => handleNavigation("/Cities")}
        />
        <SidebarButton
          icon={<FiSettings size={28} />}
          label="Settings"
          active={isActive("/Settings")}
          onClick={() => handleNavigation("/Settings")}
        />
      </div>
    </div>
  );
}

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-md p-3 w-full text-white ${
        active ? "bg-gray-700 text-red-500" : "hover:text-red-500"
      }`}
    >
      {icon}
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}