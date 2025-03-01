import "./global.css";

import GlobalProvider from "@/libs/global-provider";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@/contexts/BottomSheetContext";

export default function Rootlayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Semibold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider>
        <GestureHandlerRootView>
          <BottomSheetProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </BottomSheetProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </GlobalProvider>
  );
}
