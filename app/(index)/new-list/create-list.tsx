import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { Stack } from "expo-router";

export default function CreateListScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "New List",
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <ThemedText>Create List</ThemedText>
        <TextInput label="List Name" placeholder="Groceries List" />
        <TextInput label="List Description" placeholder="Groceries List" />
      </BodyScrollView>
    </>
  );
}
