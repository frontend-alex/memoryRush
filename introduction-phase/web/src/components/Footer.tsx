import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

// 

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-rose-500 flex-col-3 w-full p-5 rounded-t-xl">
      <div className="flex-between-res">
        <div className="flex-3">
          <div className="bg-white p-2 rounded-lg">
            <Brain size={25} className="text-black" />
          </div>
          <h1 className="font-bold text-white text-xl">MemoryRush</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          <Link className="underline text-white" to={'/privacy-policy'}>Privacy & Policy</Link>
          <p className="text-white">{year} © MemoryRush All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
