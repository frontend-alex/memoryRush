import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LandingPageImage from "@/assets/images/landingpage.png";
import { Link } from "expo-router";
import ThemedText from "@/components/ui/themed-text";

const InitialPage = () => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView
      style={{ height: height }}
      className="bg-white dark:bg-neutral-900 flex justify-between pb-10 px-5"
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
      <TouchableOpacity className="button">
        <Link
          href="/sign-in"
          className="text-lg text-center text-white font-rubik-medium"
        >
          Continue
        </Link>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InitialPage;
