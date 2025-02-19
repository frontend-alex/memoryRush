import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Text, TextProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';

const ThemedText: React.FC<TextProps & { className?: string }> = ({ className, children, ...props }) => {
  const { isDarkMode } = useTheme();
  
  const textClass = isDarkMode ? "text-white" : "text-black";

  return <Text className={twMerge(textClass, className)} {...props}>{children}</Text>;
};

export default ThemedText;
