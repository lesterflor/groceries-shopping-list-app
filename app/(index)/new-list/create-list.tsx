import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";
import { randomUUID } from "expo-crypto";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useSetShoppingListCallback } from "@/stores/ShoppingListsStore";
import React from "react";

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
  const useAddShoppingList = useSetShoppingListCallback();

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const id = randomUUID();
    useAddShoppingList(id, listName, listDescription, listEmoji, listColor);

    router.replace({
      pathname: "/(index)/list",
      params: {
        listId: id,
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
