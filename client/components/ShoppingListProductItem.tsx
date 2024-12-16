import React from "react";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { borderColor } from "@/constants/Colors";
import { useShoppingListProductCell } from "@/stores/ShoppingListStore";
import { ThemedText } from "./ThemedText";
import { IconSymbol } from "./ui/IconSymbol";

export default function ShoppingListProductItem({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const [name] = useShoppingListProductCell(listId, productId, "name");
  return (
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
  );
}

const styles = StyleSheet.create({
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
