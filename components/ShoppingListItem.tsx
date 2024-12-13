import React from "react";
import { SHOPPING_LIST_TABLE } from "@/app/(index)/_layout";
import { StyleSheet, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRow } from "tinybase/ui-react";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import { IconSymbol } from "./ui/IconSymbol";
import { appleRed } from "@/constants/Colors";
import { IconCircle } from "./IconCircle";

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 200 }],
    };
  });

  return (
    <Pressable onPress={() => alert("delete")}>
      <Reanimated.View style={[styleAnimation, styles.rightAction]}>
        <IconSymbol name="trash.fill" size={24} color="white" />
      </Reanimated.View>
    </Pressable>
  );
}

export default function ShoppingListItem({ id }: { id: string }) {
  const listItem = useRow(SHOPPING_LIST_TABLE, id);
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        overshootRight={false}
        enableContextMenu
      >
        <Link href={`/(index)/list-item?listId=${id}`}>
          <View style={styles.swipeable}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <IconCircle
                emoji={listItem.emoji === "" ? "🛒" : listItem.emoji}
                backgroundColor="lightblue"
              />
              <ThemedText type="defaultSemiBold">{listItem.name}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={14} color="#A1A1AA" />
          </View>
        </Link>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
    borderBottomColor: "#A1A1AA80",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
