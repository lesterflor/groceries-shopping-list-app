import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useShoppingListCell } from "@/stores/ShoppingListStore";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import React from "react";

export default function ListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const name = useShoppingListCell(listId, "name");
  const emoji = useShoppingListCell(listId, "emoji");
  const color = useShoppingListCell(listId, "color");
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: emoji + " " + name,
          headerLargeStyle: { backgroundColor: color },
        }}
      />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>List ID: {listId}</ThemedText>
      </BodyScrollView>
    </>
  );
}
