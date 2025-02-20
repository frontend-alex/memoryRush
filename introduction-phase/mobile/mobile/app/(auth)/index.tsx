import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/themed-components";

import LandingPageImage from "@/assets/images/landingpage.png";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

const InitialPage = () => {
  const { height } = useWindowDimensions();
  const router = useRouter()

  return (
    <FullSafeAreaScreen
      className="flex justify-between pb-10"
    >
      <View className="bg-rose-500 absolute top-0 h-[170px] -translate-x-1/2 left-1/2 w-full rounded-b-full z-[-1]" />

      <View className="flex flex-col items-center">
        <Image
          source={LandingPageImage}
          alt="login-image"
          className="w-auto h-[200px] z-[10]"
          resizeMode="contain"
        />
        <View className="flex-col-3">
          <ThemedText className="text-center font-black text-5xl">
            Welcome to Flip Card Game!
          </ThemedText>
          <Text className="text-center text-stone-400 max-w-[250px] mx-auto">
            Join the fun! Flip, match, and win in the ultimate card game. Get
            started now!
          </Text>
        </View>
      </View>
      <TouchableOpacity className="button" onPress={() => router.push('/sign-in')}>
          <Text className="text-lg text-white font-rubik-semibold">
            Continue
          </Text>
      </TouchableOpacity>
    </FullSafeAreaScreen>
  );
};

export default InitialPage;
