import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import icons from "@/constants/icons";


const BackButton = () => {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      className="absolute z-[1000] left-5 top-10 "
      onPress={() => navigation.goBack()} 
    >
        <Image source={icons.chevronLeft} />
    </TouchableOpacity>
  );
};

export default BackButton;
