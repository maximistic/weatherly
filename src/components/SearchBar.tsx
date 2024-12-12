// src/components/SearchBar.tsx
"use client";
import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSearchQuery } from "@/context/SearchQueryContext"; // Import the custom hook

interface SearchBarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSidebarOpen: boolean;
  theme: string;
  toggleTheme: () => void;
  onSearch: (query: string) => void;
}

export default function SearchBar({
  setIsSidebarOpen,
  isSidebarOpen,
  theme,
  toggleTheme,
}: SearchBarProps) {
  const { setSearchQuery } = useSearchQuery(); // Access the setSearchQuery from context
  const [inputValue, setInputValue] = useState(""); // Local state for input field

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue); // Set the query to context when Enter is pressed
      setInputValue(""); // Clear the input field
    }
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue); // Set the query to context when search icon is clicked
    setInputValue(""); // Clear the input field
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
        value={inputValue} // Bind input value to local state
        onChange={(e) => setInputValue(e.target.value)} // Update local state on input change
        className={`px-4 py-2 rounded-md flex-1  border border-gray-600 ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
        onKeyDown={handleKeyDown}
        style={{ width: "70%" }}
      />
      <FiSearch
        size={24}
        className={`cursor-pointer hover:text-red-500 ${
          theme === "dark" ? "text-gray-400" : "text-white"
        }`}
        onClick={handleSearchClick} 
      />
      <button onClick={toggleTheme} className="ml-4 text-white hover:text-red-500">
        {theme === "dark" ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </div>
  );
}
