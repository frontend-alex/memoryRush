import { ImageSourcePropType } from "react-native";
import icons from "./icons";

interface LoginInputsProps {
  name: string;
  placeholder: string;
  type: string;
  icon: ImageSourcePropType;
}

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
