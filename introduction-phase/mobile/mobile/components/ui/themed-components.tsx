import React from "react";
import { twMerge } from "tailwind-merge";
import { Image, ImageProps, ImageSourcePropType, Text, TextProps, View, ViewProps, TextInput, TextInputProps  } from "react-native";
import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/libs/utils";
import icons from "@/constants/icons";

//------------------------themed text -------------------------------//
export const ThemedText: React.FC<TextProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  const textClass = isDarkMode ? "text-white" : "text-black";

  return (
    <Text className={twMerge(textClass, className)} {...props}>
      {children}
    </Text>
  );
};

//------------------------themed view -------------------------------//
export const ThemedView: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  const viewClass = isDarkMode ? "bg-[#171717] border-neutral-800" : "bg-neutral-50 border-neutral-100";

  return (
    <View className={twMerge('border rounded-md',viewClass, className)} {...props}>
      {children}
    </View>
  );
};

//------------------------themed border -------------------------------//
export const ThemedBorder: React.FC<ViewProps & { className?: string }> = ({
  className,
  children,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  const viewClass = isDarkMode ? "border-neutral-800" : "border-neutral-200";

  return (
    <View className={twMerge('border w-1/3',viewClass, className)} {...props}>
      {children}
    </View>
  );
};

//------------------------themed image/icon -------------------------------//
export const ThemedIcon: React.FC<ImageProps & { className?: string, icon: ImageSourcePropType }> = ({
  className,
  icon,
  ...props
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Image
      source={icon}
      tintColor={isDarkMode ? "white" : "black"}
      className={cn('size-5', className)}
      {...props}
    />
  );
};


//------------------------themed input -------------------------------//
export const ThemedInput: React.FC<TextInputProps & { className?: string }> = ({ className, style, ...props }) => {

  const { isDarkMode } = useTheme();

  const viewClass = isDarkMode ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-neutral-50 ";

  return (
    <TextInput
      className={twMerge("box-border w-full border rounded-3xl", viewClass, className)}
      style={style}
      {...props}
    />
  );
};

