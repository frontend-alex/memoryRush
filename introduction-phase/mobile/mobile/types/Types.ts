import { ImageSourcePropType } from "react-native";

interface LoginInputsProps {
  name: string;
  placeholder: string;
  type: string;
  icon: ImageSourcePropType;
}

type Difficulty = "easy" | "medium" | "hard";

interface GameSettingsProps {
  id: number
  difficulty: Difficulty;
  color: string;
  levelName: string;
  numOfCards: number;
  description: string;
};


interface CardProps {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
};

interface FlippedCardProps {
  name: string;
  index: number;
};

interface RootStackParamList  {
  Home: undefined;  // Home doesn't take any parameters
  Level: { numOfCards: number };  // Level screen expects a numOfCards parameter
};


export {
    LoginInputsProps,
    GameSettingsProps,
    CardProps,
    FlippedCardProps,
    RootStackParamList
}
