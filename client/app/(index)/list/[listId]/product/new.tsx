import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useAddShoppingListProductCallback } from "@/stores/ShoppingListStore";

export default function NewItemScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name, setName] = useState("");

  const router = useRouter();
  const addShoppingListProduct = useAddShoppingListProductCallback(listId);

  const handleCreateProduct = () => {
    if (!name) {
      return;
    }

    addShoppingListProduct(name);

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "Add product",
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput
          label="Product name"
          placeholder="Potatoes"
          value={name}
          onChangeText={setName}
        />
        <Button onPress={handleCreateProduct} disabled={!name}>
          Add product
        </Button>
      </BodyScrollView>
    </>
  );
}
