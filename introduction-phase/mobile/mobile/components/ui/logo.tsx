import icons from "@/constants/icons";
import { View, Image } from "react-native";
import { ThemedText } from "./themed-components";

const Logo = ({ type = "horizontal" }: { type?: "horizontal" | "vertical" }) => {
  return (
    <View
      className={`flex ${
        type === "vertical" ? "flex-col" : "flex-row"
      } items-center  gap-2`}
    >
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
