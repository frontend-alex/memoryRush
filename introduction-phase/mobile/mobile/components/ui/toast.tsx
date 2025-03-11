import * as React from "react";
import { cn } from "@/libs/utils";
import { cva } from "class-variance-authority";
import { Text, View, Animated } from "react-native";

const toastVariants = cva(
  "absolute left-5  p-4 flex flex-row items-center rounded-md gap-3 transition-all duration-500",
  {
    variants: {
      type: {
        success: "bg-green-500/60 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-black",
        info: "bg-blue-500 text-white",
      },
      position: {
        top: "top-0",
        left: "left-1/2",
        bottom: "bottom-0",
      },
    },
    defaultVariants: {
      type: "success",
      position: "bottom",
    },
  }
);

type ToastProps = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "success" | "error" | "warning" | "info";
  position?: "top" | "bottom";
  message: string;
};

const Toast = ({ setToast, variant = "success", position = "bottom", message }: ToastProps) => {
  const bottom = React.useRef(new Animated.Value(-80)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  function animate() {
    Animated.timing(bottom, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        setToast(false);
      });
    });
  }

  React.useEffect(() => {
    animate();
  }, []);

  return (
    <Animated.View
      style={[{ bottom, opacity }]}
      className={cn(toastVariants({ type: variant, position }), 'flex-center w-full mx-auto')}
    >
      {/* <Text className="text-xl">{variant === "success" ? "✅" : "❌"}</Text> */}
      <View className="">
        <Text className="font-bold">{variant.toUpperCase()}</Text>
        <Text>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default Toast;
