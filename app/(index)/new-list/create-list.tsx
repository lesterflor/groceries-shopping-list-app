import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAddRowCallback } from "tinybase/ui-react";
import { useStore } from "tinybase/ui-react";
import {
  SHOPPING_LIST_COLOR_CELL,
  SHOPPING_LIST_CREATED_AT_CELL,
  SHOPPING_LIST_DESCRIPTION_CELL,
  SHOPPING_LIST_EMOJI_CELL,
  SHOPPING_LIST_ID_CELL,
  SHOPPING_LIST_NAME_CELL,
  SHOPPING_LIST_TABLE,
  SHOPPING_LIST_UPDATED_AT_CELL,
} from "../_layout";
import { randomUUID } from "expo-crypto";
import { backgroundColors } from "@/constants/Colors";

export default function CreateListScreen() {
  const store = useStore();
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listEmoji, setListEmoji] = useState("");
  const [listColor, setListColor] = useState(
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  );

  const router = useRouter();

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const id = randomUUID();

    store?.setRow(SHOPPING_LIST_TABLE, id, {
      [SHOPPING_LIST_ID_CELL]: id,
      [SHOPPING_LIST_NAME_CELL]: listName,
      [SHOPPING_LIST_DESCRIPTION_CELL]: listDescription,
      [SHOPPING_LIST_EMOJI_CELL]: listEmoji,
      [SHOPPING_LIST_COLOR_CELL]: listColor,
      [SHOPPING_LIST_CREATED_AT_CELL]: new Date().toISOString(),
      [SHOPPING_LIST_UPDATED_AT_CELL]: new Date().toISOString(),
    });

    router.push({
      pathname: "/(index)/list-item",
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
