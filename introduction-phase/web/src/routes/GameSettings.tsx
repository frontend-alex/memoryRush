import { useState } from "react";
import { AlignRight, Play } from "lucide-react";
import { gameSettingsCards, SortCards } from "@/constants/Data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { TGameSetting } from "@/types/Types";
import { Link } from "react-router-dom";

const GameSettingsCard = ({
  color,
  description,
  levelName,
  numOfCards,
}: TGameSetting) => {
  return (
    <div>
      {localStorage.getItem(`highscore-${numOfCards}`) && (
        <div className="ml-auto w-max bg-amber-100 dark:bg-amber-500/10 rounded-t-lg py-1 px-2 flex justify-end items-end">
          <h1 className="text-sm text-amber-300">
            Best score: {localStorage.getItem(`highscore-${numOfCards}`)}
          </h1>
        </div>
      )}

      <div className="flex-between gap-3 p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 rounded-lg group">
        <div className="flex-3 w-full">
          <span
            style={{ backgroundColor: color }}
            className="w-[10px] h-[70px] rounded-lg"
          />
          <div>
            <h1 className="text-lg font-bold">{levelName}</h1>
            <p>{description}</p>
            <p>
              Number of cards: <strong>{numOfCards}</strong>
            </p>
          </div>
        </div>
        <Link to={`/game?cardId=${numOfCards}`}>
          <Button
            className="opacity-0 group-hover:opacity-100 transition-all rounded-full w-[100px] bg-rose-500 hover:bg-rose-600 border-none"
            variant={"outline"}
          >
            <Play fill="white" className="text-white" size={40} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const GameSettings = () => {
  const [cards, setCards] = useState<TGameSetting[]>(gameSettingsCards);
  const sortCards = SortCards(setCards);

  return (
    <div className="flex-col-5 overflow-hidden">
      <img
        src="/public/images/dancing.png"
        className="absolute left-5 bottom-56 -rotate-15  w-[15%] z-[-1]"
        alt="dancing lady"
      />
      <div className="flex-between-res">
        <h1 className="text-4xl font-bold">Game Settings</h1>
        <div className="flex-3">
          <p>Sort By Difficulty</p>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                <AlignRight />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortCards.map(({ label, onClick, icon }, idx) => (
                <DropdownMenuItem
                  key={idx}
                  className="flex-2"
                  onClick={onClick}
                >
                  <i>{icon}</i>
                  <p>{label}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-col-3">
        {cards.map((card: TGameSetting, idx) => (
          <GameSettingsCard {...card} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default GameSettings;
