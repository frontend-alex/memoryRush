import React, { useEffect } from "react";
import { Text, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { account } from "@/libs/appwrite";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import useAuth from "@/hooks/useAuth";

const VerifyPage = () => {
  const { userId, secret } = useLocalSearchParams();

  const { handleVerifyOTP } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (typeof userId === "string" && typeof secret === "string") {
          await account.updateVerification(userId, secret);

          await handleVerifyOTP()

          router.push("/home");
        } else {
          throw new Error("Invalid verification link.");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        Alert.alert(
          "Error",
          error.message || "Failed to verify email. Please try again."
        );
        router.replace("/(auth)/sign-in");
      }
    };

    verifyEmail();
  }, [userId, secret]);

  return (
    <FullSafeAreaScreen className="flex-1 justify-center items-center">
      <Text className="text-xl font-rubik-bold">Verifying your email...</Text>
    </FullSafeAreaScreen>
  );
};

export default VerifyPage;
