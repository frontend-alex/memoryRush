import { useState } from "react";
import { Alert } from "react-native";
import { account, avatar, config, databases, loginUser, loginWithProvider } from "@/libs/appwrite";
import { ID, OAuthProvider, Permission, Role } from "react-native-appwrite";
import { useGlobalContext } from "@/libs/global-provider";
import { router } from "expo-router";

interface FormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

interface ErrorProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
}

const useAuth = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<FormDataProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errors, setErrors] = useState<ErrorProps>({});

  const { refetch } = useGlobalContext();

  const handleInput = (name: keyof FormDataProps, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleNextStep = () => {
    const newErrors: ErrorProps = {};

    if (step === 1 && !data.name.trim()) {
      newErrors.name = "Username cannot be empty";
    }
    if (step === 2 && !validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (step === 3 && (!validatePassword(data.password) || !data.confirmPassword.trim())) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await account.createVerification("http://192.168.2.9:8081/verify");
      Alert.alert("OTP Sent", "Check your email for the OTP.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await account.updateVerification(data.email, data.otp);
  
      const user = await account.get();
      if (!user) throw new Error("User not found");
  
      const userDocument = await databases.createDocument(
        config.databaseId!, 
        config.userCollectionId!, 
        ID.unique(),
        {
          userId: user.$id,
          name: data.name,
          email: data.email,
          avatar: data.name ? avatar.getInitials(data.name) : "",
          provider: "email",
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
  
      Alert.alert("OTP Verified", "Your email has been verified.");
      router.replace("/home");
  
      return true;
    } catch (error) {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      return false;
    }
  };

  const handleRegister = async () => {
    const newErrors: ErrorProps = {};

    if (!data.name.trim()) {
      newErrors.name = "Username cannot be empty";
    }
    if (!validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!validatePassword(data.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      await account.create(ID.unique(), data.email, data.password, data.name);

      const session = await account.createEmailPasswordSession(data.email, data.password);
      if (!session) throw new Error("Failed to create session");

      await handleSendOTP();

      router.push('/(auth)/verifying')

    } catch (error: any) {
      console.error("Registration error:", error);
      Alert.alert("Registration Error", error.message || "An error occurred during registration.");
      return false;
    }
  };

  const handleLogin = async () => {
    const newErrors: ErrorProps = {};

    if (!data.email.trim()) {
      newErrors.email = "Email cannot be empty";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password cannot be empty";
    } else if (!validatePassword(data.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    try {
      const session = await account.createEmailPasswordSession(data.email, data.password);
      if (!session) throw new Error("Failed to create session");

      refetch();

      router.push("/home"); 
      return true;
    } catch (error: any) {
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
      Alert.alert("Login Error", "Invalid email or password. Please try again.");
      return false;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithProvider(OAuthProvider.Google);
      if (result) {
        refetch();
        return true;
      } else {
        throw new Error("Failed to login with Google");
      }
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Error", "Failed to login with Google");
      return false;
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await loginWithProvider(OAuthProvider.Github);
      if (result) {
        refetch();
        return true;
      } else {
        throw new Error("Failed to login with GitHub");
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      Alert.alert("Error", "Failed to login with GitHub");
      return false;
    }
  };

  return {
    togglePassword,
    setTogglePassword,
    step,
    setStep,
    data,
    errors,
    handleInput,
    handleNextStep,
    handlePreviousStep,
    handleSendOTP,
    handleVerifyOTP,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleGithubLogin,
  };
};

export default useAuth;