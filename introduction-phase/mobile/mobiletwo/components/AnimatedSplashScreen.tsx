import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "@/contexts/ThemeProvider";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface SplashProps{
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const AnimatedSplashScreen = ({ setIsLoading }: SplashProps) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', margin: 0, backgroundColor: '#f43f5e'}}>
      <LottieView
        source={
          isDarkMode
            ? require("@/assets/lottie/dark-background.json")
            : require("@/assets/lottie/background.json")
        }
        autoPlay
        loop={false}
        resizeMode="cover"
        style={{ height: '100%', width: '100%'}}
        onAnimationFinish={() => setIsLoading(false)}
      />
    </View>
  );
};

export default AnimatedSplashScreen;
