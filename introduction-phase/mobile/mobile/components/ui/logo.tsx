import icons from "@/constants/icons";
import { cn } from "@/libs/utils";
import { View, Text, Image, StyleSheet } from "react-native";
import ThemedText from "./themed-text";

const Logo = () => {
  return (
    <View className="flex items-center flex-row gap-2">
      <View className="bg-rose-500 rounded-md p-2">
        <Image source={icons.brain} />
      </View>
      <ThemedText className="text-3xl font-[800]">
        Memory<ThemedText className="text-rose-500">Rush</ThemedText>
      </ThemedText>
    </View>
  );
};



export default Logo;
