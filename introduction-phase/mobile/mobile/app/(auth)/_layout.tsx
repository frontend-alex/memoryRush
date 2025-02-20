import React, { useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import { Stack, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";

const AuthLayout = () => {
  const { isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (isLogged) {
      router.replace("/home");
    }
  }, [isLogged, router]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
