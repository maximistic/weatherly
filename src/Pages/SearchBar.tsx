"use client";

import React from "react";
import { FiSearch, FiMenu } from "react-icons/fi";

export default function SearchBar({
  handleSearch,
  setIsSidebarOpen,
}: {
  handleSearch: (query: string) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      handleSearch(input.value);
      input.value = "";
    }
  };

  return (
    <div
      className={`p-4 flex items-center space-x-4 rounded-lg bg-gray-800 relative`}
    >
      <div className="sm:hidden absolute top-1/2 left-7 -translate-y-1/2 z-10">
        <button
          className="text-white p-2 rounded-md hover:text-red-500"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FiMenu size={24} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by city or ZIP"
        className="px-4 py-2 rounded-md flex-1 bg-gray-700 text-white border border-gray-600 pl-12"
        onKeyDown={handleKeyDown}
      />
      <FiSearch
        size={24}
        className="cursor-pointer text-gray-400 hover:text-red-500"
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>("input");
          if (input) {
            handleSearch(input.value);
            input.value = "";
          }
        }}
      />
    </div>
  );
}