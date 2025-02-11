import { Brain } from "lucide-react";

const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <div className="bg-rose-500 flex-col-3 w-full p-5 rounded-t-xl">
      <div className="flex-between-res">
        <div className="flex-3">
          <div className="bg-white p-2 rounded-lg">
            <Brain size={25} className="text-black" />
          </div>
          <h1 className="font-bold text-white text-xl">
            MemoryRush
          </h1>
        </div>
        <p className="text-white">{year} © MemoryRush All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
