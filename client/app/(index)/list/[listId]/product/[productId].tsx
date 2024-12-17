import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import {
  useShoppingListProductCell,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";
import { ThemedText } from "@/components/ThemedText";

export default function ProductScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };
  const [name, setName] = useShoppingListProductCell(listId, productId, "name");
  const [createdBy] = useShoppingListProductCell(
    listId,
    productId,
    "createdBy"
  );

  const [color] = useShoppingListValue(listId, "color");

  return (
    <>
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput label="Product name" value={name} onChangeText={setName} />
        <ThemedText>Created by {createdBy ?? "unknown"}</ThemedText>
      </BodyScrollView>
    </>
  );
}
