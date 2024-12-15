import React, { useState } from "react";
import { randomUUID } from "expo-crypto";
import { Stack, useRouter } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useAddShoppingListCallback } from "@/stores/ShoppingListsStore";

export default function CreateListScreen() {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listEmoji, setListEmoji] = useState(
    emojies[Math.floor(Math.random() * emojies.length)]
  );
  const [listColor, setListColor] = useState(
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  );

  const router = useRouter();
  const useAddShoppingList = useAddShoppingListCallback();

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const listId = randomUUID();
    useAddShoppingList(listId, listName, listDescription, listEmoji, listColor);

    router.replace({
      pathname: "/(index)/list",
      params: {
        listId: listId,
      },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "New list",
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput
          label="List name"
          placeholder="Groceries List"
          value={listName}
          onChangeText={setListName}
        />
        <TextInput
          label="List description (optional)"
          placeholder="Groceries for the week"
          value={listDescription}
          onChangeText={setListDescription}
        />
        <Button onPress={handleCreateList} disabled={!listName}>
          Create list
        </Button>
      </BodyScrollView>
    </>
  );
}
