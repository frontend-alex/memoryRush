import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Redirect, router } from "expo-router";
import {
  ThemedText,
  ThemedBorder,
  ThemedInput,
} from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";
import Logo from "@/components/ui/logo";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import {
  Pressable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import useAuth from "@/hooks/useAuth";

const InitialPage = () => {
  const { loading, isLogged } = useGlobalContext();
  const {
    togglePassword,
    step,
    data,
    errors,
    handleInput,
    handleNextStep,
    handlePreviousStep,
    handleRegister,
    handleGoogleLogin,
    handleGithubLogin,
  } = useAuth();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <FullSafeAreaScreen className="flex gap-5 pb-10 px-5">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex justify-center gap-10">
          <View className="flex-col-3 w-full mt-5">
            <Logo />
            <ThemedText className="font-black text-2xl mt-3">
              {step === 1
                ? "Choose a Username"
                : step === 2
                ? "Enter Your Email"
                : "Create a Password"}
            </ThemedText>
            <Text className="text-stone-400">
              {step === 1
                ? "Pick a unique username to get started."
                : step === 2
                ? "We'll use this to keep your account secure."
                : "Make sure it's strong and secure!"}
            </Text>
          </View>

          <View className="w-full flex-row justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <View
                key={s}
                className={`h-2 w-10 rounded-full ${
                  step >= s ? "bg-rose-500" : "bg-stone-200"
                }`}
              />
            ))}
          </View>

          <View className="flex flex-col gap-3">
            {step === 1 && (
              <View className="flex-col-3 w-full">
                <View className="relative">
                  <ThemedInput
                    placeholder="Username"
                    value={data.name}
                    onChangeText={(text) => handleInput("name", text)}
                    className={`px-10 py-3 ${
                      errors.name
                        ? "border-red-300 border placeholder:text-red-300"
                        : ""
                    }`}
                  />
                  <Image
                    tintColor={errors.name ? "#fca5a5" : "#a8a29e"}
                    source={icons.user}
                    className="w-5 h-5 absolute left-3 top-[12px]"
                  />
                </View>
                {errors.name && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </Text>
                )}
              </View>
            )}

            {step === 2 && (
              <View className="flex-col-3 w-full">
                <View className="relative">
                  <ThemedInput
                    placeholder="Email"
                    value={data.email}
                    onChangeText={(text) => handleInput("email", text)}
                    className={`px-10 py-3 ${
                      errors.email
                        ? "border-red-300 border placeholder:text-red-300"
                        : ""
                    }`}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                  <Image
                    source={icons.email}
                    tintColor={errors.email ? "#fca5a5" : "#a8a29e"}
                    className="w-5 h-5 absolute left-3 top-[12px]"
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>
            )}

            {step === 3 && (
              <View className="w-full">
                <View className="relative">
                  <ThemedInput
                    placeholder="Password"
                    value={data.password}
                    onChangeText={(text) => handleInput("password", text)}
                    secureTextEntry={!togglePassword}
                    className={`px-10 py-3 ${
                      errors.password
                        ? "border-red-300 border placeholder:text-red-300"
                        : ""
                    }`}
                  />
                  <Image
                    source={icons.lock}
                    className="w-5 h-5 absolute left-3 top-[12px]"
                  />
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}

                <View className="relative mt-4">
                  <ThemedInput
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChangeText={(text) =>
                      handleInput("confirmPassword", text)
                    }
                    secureTextEntry={!togglePassword}
                    className={`px-10 py-3 ${
                      errors.confirmPassword ? "border-red-300 border" : ""
                    }`}
                  />
                  <Image
                    source={icons.lock}
                    className="w-5 h-5 absolute left-3 top-[12px]"
                  />
                </View>
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View className="w-full flex-col-3">
        {step > 1 && (
          <TouchableOpacity
            className="flex flex-row items-center gap-3"
            onPress={handlePreviousStep}
          >
            <Image tintColor={"#a8a29e"} source={icons.chevronLeft} />
            <Text className="text-stone-400 text-center">Back</Text>
          </TouchableOpacity>
        )}

        {step < 3 ? (
          <TouchableOpacity
            className="button bg-rose-500 py-3 rounded-lg"
            onPress={handleNextStep}
          >
            <Text className="text-white text-lg font-rubik-medium text-center">
              Next
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="button bg-rose-500 py-3 rounded-lg"
            onPress={handleRegister}
          >
            <Text className="text-white text-lg font-rubik-medium text-center">
              Register
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {step <= 1 ? (
        <View className="flex-end flex-row gap-1">
          <ThemedText className="text-stone-400">
            Already a player of us?
          </ThemedText>
          <Pressable onPress={() => router.push("/(auth)/log-in")}>
            <Text className="text-rose-500 font-rubik-bold">Log in</Text>
          </Pressable>
        </View>
      ) : (
        ""
      )}

      <View className="flex flex-col gap-3">
        <View className="flex flex-row justify-center items-center gap-4 w-full">
          <ThemedBorder />
          <Text className="text-stone-400 text-sm">Or</Text>
          <ThemedBorder />
        </View>

        <View className="flex flex-row items-center justify-center gap-3">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="bg-white shadow-sm shadow-zinc-300 dark:shadow-zinc-700 rounded-full p-4"
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
            className="bg-white shadow-sm shadow-zinc-300 dark:shadow-zinc-700 rounded-full p-4"
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
