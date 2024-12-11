import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <ThemedText>Hello</ThemedText>
      <Link href="/new-list">
        <ThemedText>New List</ThemedText>
      </Link>
      <Link href="/list-item">
        <ThemedText>List Item</ThemedText>
      </Link>
    </BodyScrollView>
  );
}
