import React from "react";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  configureReanimatedLogger,
  FadeIn,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Reanimated from "react-native-reanimated";
import { appleRed, borderColor } from "@/constants/Colors";
import { useDelShoppingListCallback } from "@/stores/ShoppingListsStore";
import {
  useShoppingListProductCount,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";
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
  const productCount = useShoppingListProductCount(listId);

  const deleteCallback = useDelShoppingListCallback(listId);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 200 }],
      };
    });

    return (
      <Pressable
        onPress={() => {
          if (process.env.EXPO_OS === "ios") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          }
          deleteCallback();
        }}
      >
        <Reanimated.View style={[styleAnimation, styles.rightAction]}>
          <IconSymbol name="trash.fill" size={24} color="white" />
        </Reanimated.View>
      </Pressable>
    );
  };

  return (
    <Animated.View entering={FadeIn}>
      <ReanimatedSwipeable
        key={listId}
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
                gap: 12,
              }}
            >
              <IconCircle emoji={emoji} backgroundColor={color} />
              <View>
                <ThemedText type="defaultSemiBold">{name}</ThemedText>
                <ThemedText
                  type="defaultSemiBold"
                  style={{ fontSize: 12, color: "gray" }}
                >
                  {productCount} product{productCount == 1 ? "" : "s"}
                </ThemedText>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
          </View>
        </Link>
      </ReanimatedSwipeable>
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
