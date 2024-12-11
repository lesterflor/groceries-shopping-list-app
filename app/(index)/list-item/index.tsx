import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack } from "expo-router";

export default function ListItemScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "List Item", headerLargeTitle: false }} />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>List Item</ThemedText>
      </BodyScrollView>
    </>
  );
}
