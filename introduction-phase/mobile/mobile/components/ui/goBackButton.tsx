import React from "react";
import icons from "@/constants/icons";

import { cn } from "@/libs/utils";
import { TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const BackButton = ({ className }: { className?: string }) => {

  const router = useRouter();
  
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home"); 
    }
  };

  return (
    <TouchableOpacity
      className={cn("p-2 rounded-full bg-rose-300 w-max", className)}
      onPress={handleGoBack}
    >
      <Image className="size-7" source={icons.chevronLeft} />
    </TouchableOpacity>
  );
};

export default BackButton;
