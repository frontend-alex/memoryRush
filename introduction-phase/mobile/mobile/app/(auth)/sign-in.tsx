import React, { useState } from "react";
import { LoginInputs } from "@/constants/data";
import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/ui/logo";
import icons from "@/constants/icons";
import ThemedView from "@/components/ui/themed-view";
import ThemedText from "@/components/ui/themed-text";
import { useGlobalContext } from "@/libs/global-provider";
import { Redirect } from "expo-router";
import { login } from "@/libs/appwrite";

interface FormDataProps {
  username: string;
  email: string;
  password: string;
}

const InitialPage = () => {
  const { height } = useWindowDimensions();

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

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView
      style={{ height: height }}
      className="bg-neutral-50 dark:bg-neutral-900 flex justify-between pb-10 px-5 relative"
    >
      <ThemedView className="flex flex-col gap-10 items-center mt-10">
        <View className="flex-col-3 w-full">
          <Logo />
          <ThemedText className="font-black text-2xl mt-3">
            Welcome Back!
          </ThemedText>
          <Text className="text-stone-400">
            Sign in or create an account to start flipping, matching, and
            winning!
          </Text>
        </View>
        <View className="flex-col-3 w-full">
          {loginInputs.map((input, idx) => {
            const { icon, name, placeholder } = input;

            return (
              <View key={idx} className="relative">
                <TextInput
                  placeholder={placeholder}
                  value={data[name as keyof FormDataProps]}
                  onChangeText={(text) =>
                    handleInput(name as keyof FormDataProps, text)
                  }
                  className="input px-10 py-3"
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
            <Text className="text-white text-lg font-rubik-medium">
              Sign in
            </Text>
          </TouchableOpacity>

          <View className="flex flex-row justify-center items-center gap-4 w-full">
            <View className="w-1/3 bg-stone-300 h-[1px]" />
            <Text className="text-stone-400 text-sm">Or</Text>
            <View className="w-1/3 bg-stone-300 h-[1px]" />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded-full w-full py-4"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.googleIcon}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default InitialPage;
