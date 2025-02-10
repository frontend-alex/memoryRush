import React from "react";

import Navbar from "../Navbar";
import Footer from "../Footer";
import Gridbackround from "../ui/backgrounds/grid-backround";

import { Outlet } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const RouteLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-10 justify-between min-h-screen">
      <div className="space-y-10">
        <div>
          <Navbar />
          <Gridbackround
            className={`${
              theme === "light" ? "opacity-30" : "opacity-5"
            } absolute top-0 h-[50vh]  z-[-1]`}
          />
        </div>
        <div className="max-w-wrapper">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RouteLayout;
