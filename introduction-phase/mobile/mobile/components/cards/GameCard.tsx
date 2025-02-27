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
  cardCount
}: {
  id: number;
  name: string;
  flipped: boolean;
  matched: boolean;
  preFlip: boolean;
  cardCount: number,
  clicked: (name: string, id: number) => void;
}) => {
  const flipAnim = useRef(new Animated.Value(flipped || preFlip ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: flipped || preFlip ? 1 : 0,
      duration: 750,
      useNativeDriver: true,
    }).start();
  }, [flipped, preFlip]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"], 
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const cardStyle = {
    margin: 5,
    height: cardCount >= 15 ? 80 : 100,
    flex: 1,
    perspective: 1000 as unknown as ViewStyle["perspective"], 
}

  return (
    <Pressable
      onPress={() => (!flipped && !matched ? clicked(name, id) : undefined)}
      style={[cardStyle]}
    >
      <View style={styles.innerCard}>
        <Animated.View className="bg-neutral-50 border border-neutral-100 dark:border-neutral-800" style={[styles.side, { transform: [{ rotateY: backInterpolate }] }]}>
          <Image source={images.questionMark} style={styles.imageQuestionmark} />
        </Animated.View>

        <Animated.View style={[styles.side, styles.front, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Image source={cardImages[name]} style={styles.image} />
        </Animated.View>
      </View>
    </Pressable>
  );
};



const styles = StyleSheet.create({
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
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageQuestionmark: {
    width: "50%",
    height: "100%",
    resizeMode: "contain",
  }
});

export default GameCard;
