import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  FadeIn,
  FadeOut,
  SharedValue,
  SlideInLeft,
  SlideOutLeft,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import { IconSymbol } from "./ui/IconSymbol";
import { appleRed, backgroundColors, emojies } from "@/constants/Colors";
import { IconCircle } from "./IconCircle";
import Animated from "react-native-reanimated";
import { useDelShoppingListCallback } from "@/stores/ShoppingListsStore";
import { useShoppingListValue } from "@/stores/ShoppingListStore";

// function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
//   const store = useStore();

//   const styleAnimation = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: drag.value + 200 }],
//     };
//   });

//   const handleDelete = () => {
//     store.delRow(SHOPPING_LIST_TABLE, id);
//   };

//   return (
//     <Pressable onPress={handleDelete}>
//       <Reanimated.View style={[styleAnimation, styles.rightAction]}>
//         <IconSymbol name="trash.fill" size={24} color="white" />
//       </Reanimated.View>
//     </Pressable>
//   );
// }

export default function ShoppingListItem({ listId }: { listId: string }) {
  // Listening to just these cells means that the component won't unnecessarily
  // re-render if anything else in the row changes (such as the timestamps).
  const name = useShoppingListValue(listId, "name");
  const emoji = useShoppingListValue(listId, "emoji");
  const color = useShoppingListValue(listId, "color");

  return (
    // TODO: Exiiting is not working not sure why
    <Animated.View entering={FadeIn}>
      <GestureHandlerRootView>
        <ReanimatedSwipeable
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
          renderRightActions={(
            prog: SharedValue<number>,
            drag: SharedValue<number>
          ) => {
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
          }}
          overshootRight={false}
          enableContextMenu
        >
          <Link href={`/(index)/list?listId=${listId}`}>
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
    borderBottomColor: "#A1A1AA80",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
