import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";
import { ThemedText } from "@/components/ui/themed-components";
import { account } from "@/libs/appwrite";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const OTPInput = ({ otpLength = 6, onSubmit }: { otpLength: number; onSubmit: (otp: string) => void }) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));

  const handleChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);

      if (text && index < otpLength - 1) {
        const nextInput = index + 1;
        (nextInputRef[nextInput] as any).focus();
      }
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === otpLength) {
      onSubmit(otpString);
    } else {
      Alert.alert('Error', 'Please enter the full OTP.');
    }
  };

  const nextInputRef: any = [];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text >Enter OTP</Text>
      <View>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            maxLength={1}
            keyboardType="numeric"
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            ref={(input) => (nextInputRef[index] = input)}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Text >
        Enter the OTP sent to your email or phone.
      </Text>
      <View >
        <Text onPress={handleSubmit}>
          Verify OTP
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};


const verifying = () => {

  const handleVerifyPhoneOTP = async (otp: string) => {
    try {
      const user = await account.get();
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const response = await account.updateVerification(user.$id, otp);
      if (response) {
        Alert.alert("Verification Successful", "Your email has been verified.");
        router.push("/home"); 
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };
  

  return (
    <FullSafeAreaScreen>
      <View className="flex-col-5">
        <LottieView
          source={require("@/assets/lottie/verifying.json")}
          autoPlay
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <ThemedText className="text-3xl font-rubik-extrabold">We've send you an sms</ThemedText>
        <Text className="text-stone-400">
          In order to contunie using our app we need you to verify your phone number
        </Text>
        <OTPInput otpLength={6} onSubmit={handleVerifyPhoneOTP} />;
        <TouchableOpacity onPress={() => router.push('/home')} className="button">
          <Text className="text-white font-rubik-bold">Go Home</Text>
        </TouchableOpacity>
      </View>
    </FullSafeAreaScreen>
  );
};

export default verifying;
