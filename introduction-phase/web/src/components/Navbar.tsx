import { Button } from "./ui/button";
import { Brain } from "lucide-react";

import { NavigateFunction, useNavigate } from "react-router-dom";

import { ThemeToggler } from "./ui/theme-toggler";

const Logo = ({ navigate }: { navigate: NavigateFunction }) => {
  return (
    <div className="flex-2" onClick={() => navigate(0)}>
      <div className="bg-rose-500 p-2 rounded-lg">
        <Brain className="text-white" size={30} />
      </div>
      <h1 className="font-bold text-3xl">
        Memory<span className="text-rose-500">Rush</span>
      </h1>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 flex-between py-5 max-w-wrapper">
      <Logo navigate={navigate} />

      {window.location.pathname !== "/" ? (
        <div>

        </div>
      ) : (
        <div className="hidden lg:flex">
          <div className="flex-3">
            <ThemeToggler />
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              <a href="/game-settings">Try for free</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
