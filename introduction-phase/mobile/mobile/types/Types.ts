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



export {
    LoginInputsProps,
    GameSettingsProps
}
