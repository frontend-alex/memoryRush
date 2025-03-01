import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Set MAX_TRANSLATE_Y to 40% of the screen height
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.9;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const overlayOpacity = useSharedValue(0);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
      overlayOpacity.value = withTiming(destination !== 0 ? 0.5 : 0); 
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y); // Limit to MAX_TRANSLATE_Y
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0); // Snap to bottom
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y); // Snap to 40% height
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const rOverlayStyle = useAnimatedStyle(() => {
      return {
        opacity: overlayOpacity.value,
      };
    });

    return (
      <>
        <Animated.View style={[styles.overlay, rOverlayStyle]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={() => scrollTo(0)} 
          />
        </Animated.View>

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={styles.line} />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 998, // Below the bottom sheet
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    zIndex: 999, // Above the overlay
    elevation: 999, // For Android
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;