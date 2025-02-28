import React, { useState } from "react";
import { LoginInputs } from "@/constants/data";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { loginWithProvider } from "@/libs/appwrite";
import { Redirect } from "expo-router";
import {
  ThemedView,
  ThemedText,
  ThemedBorder,
  ThemedInput,
} from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";

import Logo from "@/components/ui/logo";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import { OAuthProvider } from "react-native-appwrite";

interface FormDataProps {
  username: string;
  email: string;
  password: string;
}

const InitialPage = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const [data, setData] = useState<FormDataProps>({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (name: keyof FormDataProps, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginInputs = LoginInputs(togglePassword);

  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  const handleGoogleLogin = async () => {
    const result = await loginWithProvider(OAuthProvider.Google);
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  const handleGithubLogin = async () => {
    const result = await loginWithProvider(OAuthProvider.Github);
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <FullSafeAreaScreen className="flex justify-between pb-10 px-5">
      <View className="flex-col-3 w-full mt-5">
        <Logo />
        <ThemedText className="font-black text-2xl mt-3">
          Welcome Back!
        </ThemedText>
        <Text className="text-stone-400">
          Sign in or create an account to start flipping, matching, and winning!
        </Text>
      </View>
      <View className="flex-col-3 w-full">
        {loginInputs.map((input, idx) => {
          const { icon, name, placeholder } = input;

          return (
            <View key={idx} className="relative">
              <ThemedInput
                placeholder={placeholder}
                value={data[name as keyof FormDataProps]}
                onChangeText={(text) =>
                  handleInput(name as keyof FormDataProps, text)
                }
                className="px-10 py-3"
              />
              <Image
                source={icon}
                className="w-5 h-5 absolute left-3 top-[12px]"
              />
            </View>
          );
        })}
      </View>
      <View className="w-full flex-col-3">
        <TouchableOpacity className="button">
          <Text className="text-white text-lg font-rubik-medium">Sign in</Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-center items-center gap-4 w-full">
          <ThemedBorder />
          <Text className="text-stone-400 text-sm">Or</Text>
          <ThemedBorder />
        </View>

        <View className="flex flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="bg-white shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded-full p-4"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.googleIcon}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGithubLogin}
            className="bg-white shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded-full  p-4"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.githubBlack}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </FullSafeAreaScreen>
  );
};

export default InitialPage;
