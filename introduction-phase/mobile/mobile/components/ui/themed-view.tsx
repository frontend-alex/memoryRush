import React from 'react';
import { twMerge } from 'tailwind-merge';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeProvider';

const ThemedView: React.FC<ViewProps & { className?: string }> = ({ className, children, ...props }) => {
  const { isDarkMode } = useTheme();
  
  const viewClass = isDarkMode ? "bg-neutral-900" : "bg-neutral-50";

  return <View className={twMerge(viewClass, className)} {...props}>{children}</View>;
};

export default ThemedView;
