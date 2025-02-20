import { useTheme } from "@/contexts/ThemeProvider";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBackgroundColor = () => {
  const { isDarkMode } = useTheme();  
  
  return isDarkMode ? '900' : '50';  
};