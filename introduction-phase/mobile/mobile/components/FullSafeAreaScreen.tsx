import { cn } from "@/libs/utils";
import { useTheme } from "@/contexts/ThemeProvider";
import { useWindowDimensions, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FullSafeAreaScreenProps {
  children: React.ReactNode;
  className?: string;
}

const FullSafeAreaScreen = ({
  children,
  className,
  ...props
}: FullSafeAreaScreenProps) => {
  
  const { height } = useWindowDimensions();
  const { isDarkMode } = useTheme();

  const dynamicStyles: ViewStyle = {
    minHeight: height,
    backgroundColor: isDarkMode ? "#171717" : "#fafafa", 
    paddingTop: 10
  };

  return (
    <SafeAreaView
      style={dynamicStyles}
      className={cn("px-5 pt-5", className)} 
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export default FullSafeAreaScreen;
