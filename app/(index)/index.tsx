import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function HomeScreen() {
  return (
    <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <ThemedText>Hello</ThemedText>
    </BodyScrollView>
  );
}
