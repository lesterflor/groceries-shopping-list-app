import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import {
  useShoppingListProductCell,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";

export default function CreateItemScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };
  const name = useShoppingListProductCell(listId, productId, "name");
  const color = useShoppingListValue(listId, "color");

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: name,
          headerLargeStyle: { backgroundColor: color },
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Text>
          product {productId} in list {listId}
        </Text>
      </BodyScrollView>
    </>
  );
}
