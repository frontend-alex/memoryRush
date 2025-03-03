import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import { ThemedText } from "@/components/ui/themed-components";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const verifying = () => {
  return (
    <FullSafeAreaScreen>
      <View className="flex-col-5">
        <LottieView
          source={require("@/assets/lottie/verifying.json")}
          autoPlay
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <ThemedText className="text-3xl font-rubik-extrabold">We've send you an email</ThemedText>
        <Text className="text-stone-400">
          In order to contunie using our app we need you to verify your email
        </Text>
        <TouchableOpacity onPress={() => router.push('/home')} className="button">
          <Text className="text-white font-rubik-bold">Go Home</Text>
        </TouchableOpacity>
      </View>
    </FullSafeAreaScreen>
  );
};

export default verifying;
