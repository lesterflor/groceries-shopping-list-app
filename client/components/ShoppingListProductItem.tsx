import React from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { appleGreen, appleRed, borderColor } from "@/constants/Colors";
import {
  useDelShoppingListProductCallback,
  useShoppingListProductCell,
} from "@/stores/ShoppingListStore";
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
  const router = useRouter();
  const [name] = useShoppingListProductCell(listId, productId, "name");
  const [isPurchased, setIsPurchased] = useShoppingListProductCell(
    listId,
    productId,
    "isPurchased"
  );

  const deleteCallback = useDelShoppingListProductCallback(listId, productId);

  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    return (
      <Pressable
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
    <ReanimatedSwipeable
      key={productId}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
      overshootRight={false}
      enableContextMenu
      containerStyle={{
        paddingBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Pressable
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setIsPurchased(!isPurchased);
          }}
        >
          <IconSymbol
            name={isPurchased ? "checkmark.square.fill" : "square"}
            size={30}
            color={borderColor}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/list/[listId]/product/[productId]",
              params: { listId, productId },
            });
          }}
          style={styles.swipeable}
        >
          <ThemedText
            type="defaultSemiBold"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: "95%" }}
          >
            {name}
          </ThemedText>
          <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
        </Pressable>
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  swipeable: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderColor,
    gap: 8,
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
