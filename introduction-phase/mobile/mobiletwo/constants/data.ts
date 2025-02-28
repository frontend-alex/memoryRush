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

export const cardImages: Record<string, any> = {
  bell: require("@/assets/images/bell.png"),
  icon: require("@/assets/images/icon.png"),
  kiss: require("@/assets/images/kiss.png"),
  landingpage: require("@/assets/images/landingpage.png"),
  lightbulb: require("@/assets/images/lightbulb.png"),
  "loading-image": require("@/assets/images/loading-image.png"),
  lotus: require("@/assets/images/lotus.png"),
  magnet: require("@/assets/images/magnet.png"),
  money: require("@/assets/images/money.png"),
  owl: require("@/assets/images/owl.png"),
  questionmark: require("@/assets/images/questionmark.png"),
  rain: require("@/assets/images/rain.png"),
  salaryman: require("@/assets/images/salaryman.png"),
  schoolgirl: require("@/assets/images/schoolgirl.png"),
  ship: require("@/assets/images/ship.png"),
  soccer: require("@/assets/images/soccer.png"),
  "splash-icon": require("@/assets/images/splash-icon.png"),
  squirrel: require("@/assets/images/squirrel.png"),
  strength: require("@/assets/images/strength.png"),
  sun: require("@/assets/images/sun.png"),
  sunset: require("@/assets/images/sunset.png"),
  superhero: require("@/assets/images/superhero.png"),
  swimming: require("@/assets/images/swimming.png"),
  thanks: require("@/assets/images/thanks.png"),
  tree: require("@/assets/images/tree.png"),
};




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


