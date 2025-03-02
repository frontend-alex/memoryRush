import React, { useEffect, memo } from "react";
import icons from "@/constants/icons";
import SplashScreen from "@/components/SplashScreen";

import { View, Image } from "react-native";
import { router, Tabs } from "expo-router";
import { useTheme } from "@/contexts/ThemeProvider";
import { ThemedText } from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";

const TabIcon = memo(
  ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    icon: any;
    title: string;
  }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#f43f5e" : "#a8a29e"}
        resizeMode="contain"
        className="size-6"
      />
      <ThemedText
        className={`${
          focused
            ? "text-rose-300 font-rubik-medium"
            : "text-stone-400 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </ThemedText>
    </View>
  )
);

const LoggedLayout = () => {
  const { isDarkMode } = useTheme();
  const { isLogged, loading } = useGlobalContext();

  useEffect(() => {
    if (!loading && !isLogged) {
      router.replace("/(auth)/sign-in");
    }
  }, [loading, isLogged]);

  if (loading) return <SplashScreen />;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#171717" : "#fafafa",
          position: "absolute",
          minHeight: 70,
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? "#292524" : "#f5f5f5",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 1,
          zIndex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="story-mode"
        options={{
          title: "Story Mode",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.book} focused={focused} title="Story Mode" />
          ),
        }}
      />
       <Tabs.Screen
        name="multiplayer"
        options={{
          title: "Mutliplayer",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.swrod} focused={focused} title="Multiplayer" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.user} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default LoggedLayout;
