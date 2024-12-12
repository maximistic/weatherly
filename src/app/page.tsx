"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Weather from "../app/weather/page";
import Cities from "../app/cities/page";
import Settings from "../app/settings/page";


interface PageProps {
  searchQuery: string;
}

const Page: React.FC<PageProps> = ({ searchQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string>(searchQuery);

  useEffect(() => {
    setQuery(searchQuery); 
  }, [searchQuery]);

  return (
    <div className="flex h-screen p-4 sm:p-8 rounded-md">
      <div className="flex-1 flex flex-col w-full">
        <div className=" sm:p-8 flex-1 ">
          <div className="content">
            {pathname === "/" && <Weather searchQuery={query} />}
            {pathname === "/weather" && <Weather searchQuery={query} />}
            {pathname === "/cities" && <Cities searchQuery={searchQuery} />}
            {pathname === "/settings" && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;