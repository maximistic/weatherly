"use client";

import { usePathname } from "next/navigation";
import Weather from "../app/weather/page";
import Cities from "../app/cities/page";
import Settings from "../app/settings/page";

const Page = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen p-6 rounded-md">
      <div className="flex-1 flex flex-col w-full">
        <div className=" flex-1">
          <div className="content">
            {pathname === "/" && <Weather />}
            {pathname === "/weather" && <Weather />}
            {pathname === "/cities" && <Cities />}
            {pathname === "/settings" && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
