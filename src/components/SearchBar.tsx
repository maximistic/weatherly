"use client";

import React from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";

export default function SearchBar({
  onSearch,
  setIsSidebarOpen,
  isSidebarOpen,
  theme,
  toggleTheme,
}: {
  onSearch: (query: string) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  theme: string;
  toggleTheme: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      onSearch(input.value);
      input.value = "";
    }
  };

  return (
    <div
      className={`p-4 flex items-center space-x-4 rounded-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-400"
      }`}
      style={{ margin: "10px" }}
    >
      <button
        className="text-white p-2 rounded-md hover:text-red-500 block sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <input
        type="text"
        placeholder="Search by city or ZIP"
        className={`px-4 py-2 rounded-md flex-1  border border-gray-600 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
        onKeyDown={handleKeyDown}
        style={{ width: "70%" }}
      />
      <FiSearch
        size={24}
        className={`cursor-pointer  hover:text-red-500 ${
          theme === "dark" ? "text-gray-400" : "text-white"
        }`}
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>("input");
          if (input) {
            onSearch(input.value);
            input.value = "";
          }
        }}
      />
      <button onClick={toggleTheme} className="ml-4 text-white hover:text-red-500">
        {theme === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  );
}