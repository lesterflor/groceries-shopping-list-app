import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack } from "expo-router";

export default function NewListScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "New List",
          headerLargeTitle: false,
          presentation: "modal",
        }}
      />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>New List</ThemedText>
      </BodyScrollView>
    </>
  );
}
