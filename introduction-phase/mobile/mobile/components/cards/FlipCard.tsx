import { cardImages } from "@/constants/data";
import images from "@/constants/images";
import React, { useRef, useEffect } from "react";
import { Animated, Pressable, View, Image, StyleSheet, ViewStyle } from "react-native";

const GameCard = ({
  id,
  name,
  flipped,
  matched,
  preFlip,
  clicked,
}: {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
  preFlip: boolean;
  clicked: (name: string, id: number) => void;
}) => {
  const flipAnim = useRef(new Animated.Value(flipped || preFlip ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: flipped || preFlip ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [flipped, preFlip]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"], // Front starts flipped, rotates to 0deg
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Back starts at 0deg, rotates to 180deg
  });

  return (
    <Pressable
      onPress={() => (!flipped && !matched ? clicked(name, id) : undefined)}
      style={styles.card}
    >
      <View style={styles.innerCard}>
        {/* Back of the Card */}
        <Animated.View className="border border-neutral-100" style={[styles.side, { transform: [{ rotateY: backInterpolate }] }]}>
          <Image source={images.questionMark} style={styles.image} />
        </Animated.View>

        {/* Front of the Card */}
        <Animated.View style={[styles.side, styles.front, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Image source={cardImages[name]} style={styles.image} />
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    height: 100,
    flex: 1,
    perspective: 1000 as unknown as ViewStyle["perspective"], // Perspective to create a 3D effect
  },
  innerCard: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  side: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden", 
  },
  front: {
    backgroundColor: "#fff",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default GameCard;
