import { Linking } from "react-native";
import icons from "./icons";
import { GameSettingsProps, LoginInputsProps } from "@/types/Types";

export const LoginInputs = (togglePassword: boolean): LoginInputsProps[] => [
  {
    name: "Username",
    placeholder: "Enter your username",
    type: "email",
    icon: icons.aLarge,
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    icon: icons.email,
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: togglePassword ? "text" : "password",
    icon: icons.lock,
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: togglePassword ? "text" : "password",
    icon: icons.lock,
  },
];

export const settings = [
  {
    title: "My Games",
    icon: icons.gamepad,
    showArrow: true,
  },
  {
    title: "Play on Web",
    icon: icons.globe,
    showArrow: true,
    onPress: () => Linking.openURL("https://flip-card-game-sigma.vercel.app/")
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Privacy & Policy",
    icon: icons.cookie,
  },
  {
    title: "Invite Friends",
    icon: icons.addPeople,
  },
];


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
      icon: '',  
      onPress: () => {
        setCards((prevCards) => 
            [...prevCards].sort((a, b) => a.numOfCards - b.numOfCards)
          );
      },
    },
    {
      label: "Shuffle",
      icon: '', 
      onPress: () => {
        setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
      },
    },
  ];


export const gameSettingsCards: GameSettingsProps[] = [
  {
    id: 1,
    difficulty: "easy",
    color: "#4ade80",
    levelName: "Beginner's Luck",
    numOfCards: 8,
    description: "A relaxed level to get started with simple tasks and fewer cards."
  },
  {
    id: 2,
    difficulty: "medium",
    color: "#fcd34d", 
    levelName: "Intermediate Challenge",
    numOfCards: 12,
    description: "A moderate level that introduces more complexity and additional cards."
  },
  {
    id: 3,
    difficulty: "hard",
    color: "#ef4444", 
    levelName: "Expert's Gauntlet",
    numOfCards: 16,
    description: "A challenging level with tough tasks and more cards to handle."
  },
  {
    id: 4,
    difficulty: "easy",
    color: "#4ade80", 
    levelName: "Casual Play",
    numOfCards: 6,
    description: "A very easy and casual level with fewer cards to keep things light."
  },
  {
    id: 5,
    difficulty: "medium",
    color: "#fcd34d", 
    levelName: "Average Struggle",
    numOfCards: 10,
    description: "A balanced level with enough cards to keep you engaged without overwhelming."
  },
  {
    id: 6,
    difficulty: "hard",
    color: "#ef4444", 
    levelName: "Ultimate Test",
    numOfCards: 20,
    description: "A tough challenge with many cards to sort, test your skills to the max."
  }
];
