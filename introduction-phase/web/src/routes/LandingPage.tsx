
import { Button } from "@/components/ui/button";

const LandingPage = () => {

  return (
    <div>
      <div className="w-full">
        <header className="flex flex-col gap-5 items-center justify-center text-center max-w-5xl mx-auto">
          <div className="bg-rose-100 dark:bg-rose-600/10 rounded-lg px-2 py-1">
            <p className="text-rose-500 font-medium">
              Introducing Memory Rush 2.0
            </p>
          </div>
          <h1 className="font-bold text-5xl lg:text-8xl">
          Flip, Match, and Train Your Brain Daily!
          </h1>
          <p className="text-lg">
            Test your memory and concentration in this fun and interactive
            card-flipping game! Flip the cards, find matching pairs, and
            challenge yourself to improve your recall speed. Play solo or
            compete with friends to see who has the sharpest mind!
          </p>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white z-[100]">
            <a href="/game-settings">Choose a game mode</a>
          </Button>
        </header>
        <img className="hidden lg:flex absolute 2xl:top-[20%] -left-32  z-[-1] -rotate-45" src="/images/landingpage.png" alt="" />
        <span className="hidden z-[-1] sm:flex absolute bottom-0 top-36 xl:left-1/2 w-[600px] h-[600px] overflow-hidden bg-rose-600/30 dark:bg-rose-600/10 blur-3xl"></span>
      </div>
    </div>
  );
};

export default LandingPage;
