import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";
import useAuth from "@/hooks/useAuth";
import Logo from "@/components/ui/logo";
import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import {
  ThemedBorder,
  ThemedInput,
  ThemedText,
} from "@/components/ui/themed-components";

const LoginPage = () => {
  const { loading, isLogged } = useGlobalContext();
  const {
    togglePassword,
    setTogglePassword,
    data,
    errors,
    handleInput,
    handleLogin,
    handleGithubLogin,
    handleGoogleLogin
  } = useAuth();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <FullSafeAreaScreen className="flex justify-center gap-10 pb-10 px-5">
        <View className="flex justify-center gap-10">
          {/* Logo and Title */}
          <View className="flex-col-3 w-full mt-5">
            <Logo />
            <Text className="font-black text-2xl mt-3">Welcome Back!</Text>
            <Text className="text-stone-400">
              Sign in to continue your journey.
            </Text>
          </View>

          <View className="flex-col-3">
            <View className="flex-col-3 w-full">
              <View className="relative">
                <ThemedInput
                  placeholder="Email"
                  value={data.email}
                  onChangeText={(text) => handleInput("email", text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className={`px-10 py-3 ${
                    errors.email ? "border-red-300 placeholder:text-red-300" : ""
                  }`}
                />
                <Image
                  tintColor={errors.email ? "#fca5a5" : "#a8a29e"}
                  source={icons.email}
                  className="w-5 h-5 absolute left-3 top-[12px]"
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="flex-col-3 w-full">
              <View className="relative">
                <ThemedInput
                  placeholder="Password"
                  value={data.password}
                  onChangeText={(text) => handleInput("password", text)}
                  secureTextEntry={!togglePassword}
                  className={`px-10 py-3 ${
                    errors.password ? "border-red-300  placeholder:text-red-300" : ""
                  }`}
                />
                <Image
                  source={icons.lock}
                  tintColor={errors.password ? "#fca5a5" : "#a8a29e"}
                  className="w-5 h-5 absolute left-3 top-[12px]"
                />
                <Pressable
                  onPress={() => setTogglePassword(!togglePassword)}
                  className="absolute right-3 top-[12px]"
                >
                  <Image
                    source={togglePassword ? icons.eye : icons.eyeClosed}
                    className="w-5 h-5"
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm">
                  {errors.password}
                </Text>
              )}
              <TouchableOpacity className="flex-end">
                <Text className="text-rose-500 font-rubik-bold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-col-5">
            {/* Login Button */}
            <TouchableOpacity
              className="button bg-rose-500 py-3 rounded-lg"
              onPress={handleLogin}
            >
              <Text className="text-white text-lg font-rubik-medium text-center">
                Log In
              </Text>
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <View className="flex-col-3 flex-end">
              <View className="flex-end flex-row gap-1">
                <ThemedText className="text-stone-400">
                  Not a player of us?
                </ThemedText>
                <Pressable onPress={() => router.push("/(auth)/sign-in")}>
                  <Text className="text-rose-500 font-rubik-bold">Sign in</Text>
                </Pressable>
              </View>
            </View>

            {/* Social Login Options */}
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
          </View>
        </View>
    </FullSafeAreaScreen>
  );
};

export default LoginPage;
