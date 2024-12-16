import React from "react";
import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { appleRed, borderColor } from "@/constants/Colors";
import { useShoppingListProductCell } from "@/stores/ShoppingListStore";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useAnimatedStyle } from "react-native-reanimated";
import Reanimated, { SharedValue } from "react-native-reanimated";

export default function ShoppingListProductItem({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const [name] = useShoppingListProductCell(listId, productId, "name");

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    const handleDelete = () => {};

    return (
      <Pressable onPress={handleDelete}>
        <Reanimated.View style={[styleAnimation, styles.rightAction]}>
          <IconSymbol name="trash.fill" size={24} color="white" />
        </Reanimated.View>
      </Pressable>
    );
  };

  return (
    <ReanimatedSwipeable
      key={listId}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      overshootRight={false}
      enableContextMenu
      containerStyle={{
        paddingBottom: 12,
      }}
    >
      <Link
        href={{
          pathname: "/list/[listId]/product/[productId]",
          params: { listId, productId },
        }}
      >
        <View style={styles.swipeable}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ThemedText type="defaultSemiBold">{name}</ThemedText>
          </View>
          <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
        </View>
      </Link>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rightAction: {
    width: 80,
    height: 40,
    backgroundColor: appleRed,
    alignItems: "center",
    justifyContent: "center",
  },
});
