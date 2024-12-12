import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
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
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>Create List</ThemedText>
      </BodyScrollView>
    </>
  );
}
