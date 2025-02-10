import { cn } from "@/lib/utils";

const Gridbackround = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center",
        className
      )}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    </div>
  );
};

export default Gridbackround;
