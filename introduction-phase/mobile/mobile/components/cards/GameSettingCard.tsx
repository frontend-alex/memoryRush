import { GameSettingsProps } from "@/types/Types";
import { router } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedView } from "../ui/themed-components";
import icons from "@/constants/icons";
import { getDifficultyColor } from "@/libs/utils";

const GameSettingsCard = ({
    description,
    name,
    numOfCards,
    difficulty,
    id
  }: GameSettingsProps) => {
    const handlePress = () => {
      Alert.alert(`Difficulty ${difficulty}`, "Are you sure?", [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            router.push(`/level?userChoice=${numOfCards}&levelName=${name}&levelId=${id}`),
          style: "default",
        },
      ]);
    };
  
    return (
      <View>
        <ThemedView className="flex-between-res gap-3 p-3 rounded-lg group">
          <View className="flex flex-row gap-3 w-full ">
            <View
              style={{ backgroundColor: getDifficultyColor(difficulty) }}
              className="w-[5px] h-[70px] rounded-lg"
            />
            <View className="flex-col-1">
              <ThemedText className="text-lg font-rubik-bold">
                {name}
              </ThemedText>
              <Text className="text-stone-400 max-w-[250px]">{description}</Text>
              <Text className="text-stone-400">
                Number of cards:{" "}
                <Text className="font-rubik-bold">{numOfCards}</Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handlePress}
            className="py-1 flex-center rounded-full w-[100px] bg-rose-500 hover:bg-rose-600 border-none"
          >
            <Image tintColor={"white"} className="size-6" source={icons.play} />
          </TouchableOpacity>
        </ThemedView>
      </View>
    );
  };

  export default GameSettingsCard;