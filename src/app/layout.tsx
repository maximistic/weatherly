"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import Searchbar from "../components/SearchBar";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import "./globals.css";

import { SettingsProvider } from "@/context/SettingsContext";
import { CitiesProvider } from "@/context/CitiesContext";
import { SearchQueryProvider } from "@/context/SearchQueryContext";

import Page from "./page";
import Pricing from "@/Pages/Pricing";
import SignUp from "@/Pages/SignUp";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({}: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", searchQuery);
  };

  return (
    <html lang="en" className={`${theme}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SettingsProvider>
          <SearchQueryProvider>
          <CitiesProvider>
          <div className="flex flex-row h-screen gap-2">
            <Sidebar
              theme={theme}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Searchbar
                onSearch={handleSearch}
                theme={theme}
                toggleTheme={toggleTheme}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
              />
            <main className="flex-1 overflow-auto p-2 sm:p-4">
              {(() => {
                if (pathname === "/pricing") return <Pricing />;
                if (pathname === "/signup") return <SignUp />;
                return <Page />;
              })()}
            </main>
            </div>
          </div>
          </CitiesProvider>
          </SearchQueryProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}