import { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";
import * as Linking from "expo-linking";
import { useGlobalContext } from "@/libs/global-provider";
import {
  ID,
  OAuthProvider,
  Permission,
  Query,
  Role,
} from "react-native-appwrite";
import {
  account,
  avatar,
  config,
  databases,
  loginWithProvider,
} from "@/libs/appwrite";

interface FormDataProps {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    phone: "",
    confirmPassword: "",
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
    if (
      step === 3 &&
      (!validatePassword(data.password) || !data.confirmPassword.trim())
    ) {
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

  const handleRegister = async () => {
    const newErrors: ErrorProps = {};

    // Basic validation
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

      const session = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      if (!session) throw new Error("Failed to create session");

      const user = await account.get();
      if (!user) throw new Error("User not found");

      const existingUser = await databases.listDocuments(
        config.databaseId!,
        config.userCollectionId!,
        [Query.equal("userId", user.$id)]
      );

      if (existingUser.documents.length === 0) {
        await databases.createDocument(
          config.databaseId!,
          config.userCollectionId!,
          ID.unique(),
          {
            userId: user.$id,
            name: user.name,
            email: user.email,
            avatar: user.name ? avatar.getInitials(user.name) : "",
            provider: "email",
          },
          [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
          ]
        );
      }

      router.replace("/home");

      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      Alert.alert(
        "Registration Error",
        error.message || "An error occurred during registration."
      );
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
      const session = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      if (!session) throw new Error("Failed to create session");

      refetch();

      router.push("/home");
      return true;
    } catch (error: any) {
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
      Alert.alert(
        "Login Error",
        "Invalid email or password. Please try again."
      );
      return false;
    }
  };

  // const handleSendPhoneOTP = async () => {
  //   try {
  //     const response = await account.createPhoneVerification();

  //     if (response) {
  //       Alert.alert("OTP Sent", "Check your phone for the OTP.");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     Alert.alert("Error", "Failed to send OTP. Please try again.");
  //   }
  // };

  // const handleVerifyOTP = async () => {
  //   try {

  //     const user = await account.get();
  //     if (!user) throw new Error("User not found");

  //     const existingUser = await databases.listDocuments(
  //       config.databaseId!,
  //       config.userCollectionId!,
  //       [Query.equal("userId", user.$id)]
  //     );

  //     if (existingUser.documents.length === 0) {
  //       await databases.createDocument(
  //         config.databaseId!,
  //         config.userCollectionId!,
  //         ID.unique(),
  //         {
  //           userId: user.$id,
  //           name: user.name,
  //           email: user.email,
  //           avatar: user.name ? avatar.getInitials(user.name) : "",
  //           provider: "email",
  //         },
  //         [
  //           Permission.read(Role.user(user.$id)),
  //           Permission.update(Role.user(user.$id)),
  //           Permission.delete(Role.user(user.$id)),
  //         ]
  //       );
  //     }
  //     console.log('verification updated')
  //     await account.updateVerification(data.email, data.otp);
  //     Alert.alert("OTP Verified", "Your email has been verified.");

  //     router.replace("/home");

  //     return true;
  //   } catch (error) {
  //     Alert.alert("Error", "Invalid OTP. Please try again.");
  //     return false;
  //   }
  // };

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
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleGithubLogin,
  };
};

export default useAuth;
