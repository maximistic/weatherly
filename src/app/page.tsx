// src/app/page.tsx
"use client";

import { usePathname } from "next/navigation";
import { useSearchQuery } from "@/context/SearchQueryContext"; // Use the context hook
import Weather from "../app/weather/page";
import Cities from "../app/cities/page";
import Settings from "../app/settings/page";

const Page = () => {
  const pathname = usePathname();
  const { searchQuery } = useSearchQuery(); // Get searchQuery directly from the context

  return (
    <div className="flex h-screen p-4 sm:p-8 rounded-md">
      <div className="flex-1 flex flex-col w-full">
        <div className="sm:p-8 flex-1">
          <div className="content">
            {pathname === "/" && <Weather searchQuery={searchQuery} />}
            {pathname === "/weather" && <Weather searchQuery={searchQuery} />}
            {pathname === "/cities" && <Cities />}
            {pathname === "/settings" && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
