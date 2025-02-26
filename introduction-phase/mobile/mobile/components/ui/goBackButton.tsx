import React from "react";
import icons from "@/constants/icons";

import { cn } from "@/libs/utils";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BackButton = ({ className }: { className?: string }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className={cn("p-2 rounded-full bg-rose-300 w-max", className)}
      onPress={() => navigation.goBack()}
    >
      <Image className="size-7" source={icons.chevronLeft} />
    </TouchableOpacity>
  );
};

export default BackButton;
