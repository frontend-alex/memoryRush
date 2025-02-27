import React from "react";
import icons from "@/constants/icons";

import { cn } from "@/libs/utils";
import { TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";

const BackButton = ({
  className,
  path,
  unsavedChanges = false,
}: {
  className?: string;
  path: any;
  unsavedChanges?: boolean;
}) => {
  const handlePress = () => {
    if (unsavedChanges) {
      return Alert.alert("Any progress will be lost", "Are you sure?", [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => router.push(path),
          style: "default",
        },
      ]);
    }

    router.push(path);
  };

  return (
    <TouchableOpacity
      className={cn("p-2 rounded-full bg-rose-500/15 dark:bg-rose-500/50 w-max", className)}
      onPress={handlePress}
    >
      <Image className="size-7" source={icons.chevronLeft} />
    </TouchableOpacity>
  );
};

export default BackButton;
