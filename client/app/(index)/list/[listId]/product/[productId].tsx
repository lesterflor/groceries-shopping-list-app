import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import {
  useShoppingListProductCell,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";

export default function ProductScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };
  const [name, setName] = useShoppingListProductCell(listId, productId, "name");

  const [color] = useShoppingListValue(listId, "color");

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
        <TextInput label="Product name" value={name} onChangeText={setName} />
      </BodyScrollView>
    </>
  );
}
