import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';


//------------------------themed text -------------------------------//
export const ThemedText: React.FC<TextProps & { className?: string }> = ({ className, children, ...props }) => {
  const { isDarkMode } = useTheme();
  
  const textClass = isDarkMode ? "text-white" : "text-black";

  return <Text className={twMerge(textClass, className)} {...props}>{children}</Text>;
};

//------------------------themed view -------------------------------//
export const ThemedView: React.FC<ViewProps & { className?: string }> = ({ className, children, ...props }) => {
    const { isDarkMode } = useTheme();
    
    const viewClass = isDarkMode ? "bg-[#171717]" : "bg-neutral-50";
  
    return <View className={twMerge(viewClass, className)} {...props}>{children}</View>;
};
  
  
//------------------------themed border -------------------------------//
export const ThemedBorder: React.FC<ViewProps & { className?: string }> = ({ className, children, ...props }) => {
    const { isDarkMode } = useTheme();
    
    const viewClass = isDarkMode ? "bg-neutral-700" : "bg-neutral-200";
  
    return <View className={twMerge(viewClass, className)} {...props}>{children}</View>;
};
  