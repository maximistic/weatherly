"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type SearchQueryContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchQueryContext = createContext<SearchQueryContextType | undefined>(undefined);

export const SearchQueryProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    if (savedSearchQuery) setSearchQuery(savedSearchQuery);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = (): SearchQueryContextType => {
  const context = useContext(SearchQueryContext);
  if (!context) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
};