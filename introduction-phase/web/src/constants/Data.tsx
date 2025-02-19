import { TGameSetting } from "@/types/Types";
import { Shuffle, SortAsc } from "lucide-react";


export const availableCards: string[] = [
  "bell", "bell",
  "kiss", "kiss",
  "lightbulb", "lightbulb",
  "lotus", "lotus",
  "magnet", "magnet",
  "money", "money",
  "owl", "owl",
  "rain", "rain",
  "salaryman", "salaryman",
  "schoolgirl", "schoolgirl",
  "ship", "ship",
  "soccer", "soccer",
  "squirrel", "squirrel",
  "strength", "strength",
  "sun", "sun",
  "sunset", "sunset",
  "superhero", "superhero",
  "swimming", "swimming",
  "thanks", "thanks",
  "tree", "tree"
];


export const SortCards = (setCards: React.Dispatch<React.SetStateAction<any[]>>) => [
    {
      label: "Sort by Difficulty",
      icon: <SortAsc size={15} />,  
      onClick: () => {
        setCards((prevCards) => 
            [...prevCards].sort((a, b) => a.numOfCards - b.numOfCards)
          );
      },
    },
    {
      label: "Shuffle",
      icon: <Shuffle size={15}/>, 
      onClick: () => {
        setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
      },
    },
  ];

export const gameSettingsCards: TGameSetting[] = [
  {
    difficulty: "easy",
    color: "#4ade80",
    levelName: "Beginner's Luck",
    numOfCards: 8,
    description: "A relaxed level to get started with simple tasks and fewer cards."
  },
  {
    difficulty: "medium",
    color: "#fcd34d", 
    levelName: "Intermediate Challenge",
    numOfCards: 12,
    description: "A moderate level that introduces more complexity and additional cards."
  },
  {
    difficulty: "hard",
    color: "#ef4444", 
    levelName: "Expert's Gauntlet",
    numOfCards: 16,
    description: "A challenging level with tough tasks and more cards to handle."
  },
  {
    difficulty: "easy",
    color: "#4ade80", 
    levelName: "Casual Play",
    numOfCards: 6,
    description: "A very easy and casual level with fewer cards to keep things light."
  },
  {
    difficulty: "medium",
    color: "#fcd34d", 
    levelName: "Average Struggle",
    numOfCards: 10,
    description: "A balanced level with enough cards to keep you engaged without overwhelming."
  },
  {
    difficulty: "hard",
    color: "#ef4444", 
    levelName: "Ultimate Test",
    numOfCards: 20,
    description: "A tough challenge with many cards to sort, test your skills to the max."
  }
  ,
  {
    difficulty: "easy",
    color: "#4ade80", 
    levelName: "Ultimate Test",
    numOfCards: 2,
    description: "A tough challenge with many cards to sort, test your skills to the max."
  }
  ,
  {
    difficulty: "hard",
    color: "#ef4444", 
    levelName: "Ultimate Test",
    numOfCards: 28,
    description: "A tough challenge with many cards to sort, test your skills to the max."
  }
  ,
];


export const confetiSettings = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
};