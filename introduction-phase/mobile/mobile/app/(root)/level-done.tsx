import React, { useState } from "react";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import BackButton from "@/components/ui/goBackButton";

import icons from "@/constants/icons";
import LottieView from "lottie-react-native";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";

import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getAllLevel, getLevelById } from "@/libs/appwrite";
import { useTheme } from "@/contexts/ThemeProvider";
import { Alert, Image, Text, View } from "react-native";
import {
  ThemedText,
  ThemedTochableOpacity,
} from "@/components/ui/themed-components";

import Animated, { FadeIn } from "react-native-reanimated";
import { getNextLevel } from "@/libs/utils";
import SplashScreen from "@/components/SplashScreen";

const LevelDone = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isDarkMode } = useTheme();

  const {
    levelId,
    levelName,
    userChoice,
  }: { levelId: string; levelName: string; userChoice: string } =
    useLocalSearchParams();

    const { data, loading } = useAppwrite({ fn : getAllLevel })

    if(loading) return <SplashScreen/>

    const nextLevel = getNextLevel(data?.documents, levelId)

  const handlePress = () => {
    Alert.alert(`Retry?`, "Are you sure you want to try again?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () =>
          router.push(
            `/level?userChoice=${userChoice}&levelName=${levelName}&levelId=${levelId}`
          ),
        style: "default",
      },
    ]);
  };

  return (
    <FullSafeAreaScreen>
      <Animated.View
        entering={FadeIn.duration(500)}
        
        className="justify-between flex-col-5 h-full"
      >
        <View className="flex justify-start items-start">
          <BackButton path={"/game-settings"} />
        </View>
        <View className="flex-center gap-3">
          <LottieView
            source={
              isDarkMode
                ? require("@/assets/lottie/dark-bookie.json")
                : require("@/assets/lottie/book.json")
            }
            autoPlay
            loop={true}
            style={{ width: 300, height: 300 }}
          />
          <LottieView
            source={require("@/assets/lottie/animation.json")}
            autoPlay
            loop={true}
            style={{
              width: 300,
              height: 300,
              position: "absolute",
              zIndex: -1,
            }}
          />
          <ThemedText className="text-3xl font-rubik-extrabold">
            Level Complete!
          </ThemedText>
          <Text className="text-center font-rubik text-stone-400">
            Great job! You’ve successfully completed this level. Your skills are
            improving, and your memory is getting sharper!
          </Text>
        </View>

        <View className="flex flex-row gap-3 mb-3 w-full">
          <ThemedTochableOpacity
            className="w-1/3 text-center flex-center"
            onPress={handlePress}
          >
            <ThemedText>Retry</ThemedText>
          </ThemedTochableOpacity>

          <ThemedTochableOpacity
            className="button flex w-2/3"
            onPress={() => router.push(`/level?userChoice=${nextLevel.numOfCards}&levelName=${nextLevel.name}&levelId=${nextLevel.$id}`)}
          >
            <View className="flex flex-row items-center gap-3">
              <Text className="text-white">Continue</Text>
              <Image
                tintColor={"white"}
                className="rotate-180"
                source={icons.chevronLeft}
              />
            </View>
          </ThemedTochableOpacity>
        </View>
      </Animated.View>
    </FullSafeAreaScreen>
  );
};

export default LevelDone;
