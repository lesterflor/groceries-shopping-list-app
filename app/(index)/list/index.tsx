import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useShoppingListCell } from "@/stores/ShoppingListStore";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function ListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  return (
    <>
      <Stack.Screen
        options={{ headerTitle: useShoppingListCell(listId, "name") }}
      />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>List ID: {listId}</ThemedText>
      </BodyScrollView>
    </>
  );
}
