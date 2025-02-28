import React from "react";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import { Dimensions, Image, Text, View } from "react-native";
import { ThemedIcon, ThemedText } from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";
import { getGreeting } from "@/libs/utils";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getAllLevel, getGamesByUserId } from "@/libs/appwrite";
import { AnimatedCircularProgress } from "react-native-circular-progress";


const Home = () => {
  const { user } = useGlobalContext();
  const screenWidth = Dimensions.get("window").width;

  const { data: allLevels, loading, error } = useAppwrite({ fn: getAllLevel });
  const { data: completedLevels } = useAppwrite({ fn: getGamesByUserId });

  const greeting = getGreeting();

  const completionPercentage =
    completedLevels?.total !== undefined && allLevels?.total
      ? (completedLevels.total / allLevels.total) * 100
      : 0;

  return (
    <FullSafeAreaScreen className="flex-col-5">
      <View className="flex flex-row items-center justify-between">
        <View className="flex items-center flex-row gap-3">
          <Image
            className="size-11 rounded-full"
            source={{ uri: user?.avatar }}
          />
          <View>
            <Text className="text-sm text-stone-400">{greeting},</Text>
            <ThemedText className="font-rubik-semibold">
              {user?.name}
            </ThemedText>
          </View>
        </View>
        <ThemedIcon icon={icons.bell} />
      </View>
      <View className="bg-amber-400 flex gap-10 flex-row w-full justify-between items-center rounded-3xl p-5">
        <View className="flex flex-col gap-3 max-w-[130px]">
          <Text className="font-rubik-bold text-2xl">
            Story Mode Progression
          </Text>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-lg text-black font-rubik-bold">
              {completedLevels?.total} / {allLevels?.total}
            </Text>
            <Text className="text-stone-700">Levels completed</Text>
          </View>
        </View>
        <View className="w-24 h-24 flex items-center justify-center mr-10">
          <AnimatedCircularProgress
            size={80}
            width={13}
            fill={completionPercentage}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="#ca8a04"
          />
        </View>
      </View>

     
    </FullSafeAreaScreen>
  );
};

export default Home;
