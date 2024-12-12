import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ListItemScreen() {
  const { listId } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ headerTitle: "[list title]" }} />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>List ID: {listId}</ThemedText>
      </BodyScrollView>
    </>
  );
}
