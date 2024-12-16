import React, { useCallback } from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  configureReanimatedLogger,
  FadeIn,
  LinearTransition,
  SharedValue,
  SlideOutLeft,
  useAnimatedStyle,
} from "react-native-reanimated";
import Reanimated from "react-native-reanimated";
import { appleRed, borderColor } from "@/constants/Colors";
import { useDelShoppingListCallback } from "@/stores/ShoppingListsStore";
import { useShoppingListValue } from "@/stores/ShoppingListStore";
import { IconCircle } from "./IconCircle";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

configureReanimatedLogger({ strict: false });

export default function ShoppingListItem({ listId }: { listId: string }) {
  // Listening to just these cells means that the component won't unnecessarily
  // re-render if anything else in the row changes (such as the timestamps).
  const [name] = useShoppingListValue(listId, "name");
  const [emoji] = useShoppingListValue(listId, "emoji");
  const [color] = useShoppingListValue(listId, "color");

  const RightAction = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value + 200 }],
        };
      });

      return (
        <Pressable onPress={useDelShoppingListCallback(listId)}>
          <Reanimated.View style={[styleAnimation, styles.rightAction]}>
            <IconSymbol name="trash.fill" size={24} color="white" />
          </Reanimated.View>
        </Pressable>
      );
    },
    [listId]
  );

  return (
    // TODO: Exiiting is not working not sure why
    <Animated.View
      layout={LinearTransition}
      entering={FadeIn}
      exiting={SlideOutLeft}
    >
      <GestureHandlerRootView>
        <ReanimatedSwipeable
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
          renderRightActions={RightAction}
          overshootRight={false}
          enableContextMenu
        >
          <Link href={{ pathname: "/list/[listId]", params: { listId } }}>
            <View style={styles.swipeable}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <IconCircle emoji={emoji} backgroundColor={color} />
                <ThemedText type="defaultSemiBold">{name}</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
            </View>
          </Link>
        </ReanimatedSwipeable>
      </GestureHandlerRootView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    width: 200,
    height: 65,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeable: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
