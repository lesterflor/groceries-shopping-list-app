import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { useShoppingListValue } from "@/stores/ShoppingListStore";

export default function ListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name, setName] = useShoppingListValue(listId, "name");
  const [description, setDescription] = useShoppingListValue(
    listId,
    "description"
  );

  return (
    <>
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput label="Name" value={name} onChangeText={setName} />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
      </BodyScrollView>
    </>
  );
}
