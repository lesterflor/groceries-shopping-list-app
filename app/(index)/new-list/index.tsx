import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Link } from "expo-router";

export default function NewListScreen() {
  return (
    <>
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Create or Join a List
        </ThemedText>
        <Link href="/(index)/new-list/create-list" dismissTo push>
          Create List
        </Link>
        <Link href="/(index)/new-list/join-list" dismissTo push>
          Join List
        </Link>
      </BodyScrollView>
    </>
  );
}
