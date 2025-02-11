import humanizeDuration from "humanize-duration";
import GameController from "@/controllers/GameController";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Share } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { calculateScore } from "@/lib/utils";


const GameCard = ({
  id,
  name,
  flipped,
  matched,
  preFlip,
  clicked,
}: {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
  preFlip: boolean;
  clicked: (name: string, id: number) => {} | any;
}) => {

  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={
        "card" + (flipped || preFlip ? " flipped" : "") + (matched ? " matched" : "")
      }
    >
      <div className="back">
        <img src="/public/images/cardImages/questionmark.png" className="w-1/2 lg:w-1/3" alt="question mark"/>
      </div>
      <div className="front">
        <img
          className="w-full lg:w-1/2 mx-auto flex-center"
          alt={name}
          src={"/public/images/cardImages/" + name + ".png"}
        />
      </div>
    </div>
  );
};

const GameBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cardId = Number(queryParams.get("cardId"));


  const { cardList, flippedCards, gameOver, elapsedTime, preFlip, handleClick } =
    GameController(cardId);

  return (
    <div className="flex-col-5">
      {!gameOver ? (
        <div className="flex-between">
          <div className="flex lg:hidden"/>
          <h1 className="hidden lg:flex font-bold text-2xl">
            Elapsed time: {humanizeDuration(elapsedTime)}
          </h1>
          <Link className="flex-2 text-stone-400" to={"/game-settings"}>
            <ChevronLeft size={15} /> Go back{" "}
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-4 lg:grid-cols-6 gap-5 game-board">
        {!gameOver &&
          cardList.map((card, index) => (
            <GameCard
              key={index}
              id={index}
              name={card.name}
              flipped={card.flipped}
              matched={card.matched}
              preFlip={preFlip}
              clicked={flippedCards.length === 2 ? () => {} : handleClick}
            />
          ))}
      </div>
      {gameOver && (
        <div className="flex flex-col gap-3 items-center justify-center normal-border p-5 rounded-lg w-full">
          <img src="/images/win.png" alt="win image" />
          <h1 className="font-bold text-3xl">Congratulations! You Won!</h1>
          <p className="max-w-lg text-center">
            You’ve successfully matched all the cards! Your memory and skills
            have been put to the test, and you’ve come out victorious.
          </p>
          <div className="text-center">
            <h1 className="font-bold">
            Time taken: {humanizeDuration(elapsedTime)}
          </h1>
          <h1 className="font-bold">
            Current Score: {calculateScore(elapsedTime, { allowBonus: true })}
          </h1>
          </div>
          
          <div className="flex-3">
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              <ChevronLeft /> Go Back
            </Button>
            <Button className="bg-rose-500 hover:bg-rose-600">
              <Share /> Share results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
