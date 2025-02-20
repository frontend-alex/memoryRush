import React from "react";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import { Image, Text, View } from "react-native";
import { ThemedIcon, ThemedText } from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";

const Home = () => {

  const { user } = useGlobalContext();

  return (
    <FullSafeAreaScreen>
      <View className="flex flex-row items-center justify-between">
        <View className="flex items-center flex-row gap-3">
          <Image className="size-11 rounded-full" source={{ uri: user?.avatar }}/>
          <View>
            <Text className="text-sm text-stone-400">Good Morning</Text>
            <ThemedText className="font-rubik-semibold">{user?.name}</ThemedText>
          </View>
        </View>
        <ThemedIcon icon={icons.bell} />
      </View>
    </FullSafeAreaScreen>
  );
};

export default Home;
