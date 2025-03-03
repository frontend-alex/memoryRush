import SplashScreen from "@/components/SplashScreen";

import React, { useEffect, useState } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { useGlobalContext } from "@/libs/global-provider";

const AuthLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const { isLogged, loading, user } = useGlobalContext();

  const [redirected, setRedirected] = useState(false); 

  useEffect(() => {
    if (isLogged && pathname !== "/home" && !redirected) {
      setRedirected(true); 
      router.replace("/home");
    }
  }, [isLogged, pathname, redirected]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="log-in" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
      <Stack.Screen name="verifying" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
