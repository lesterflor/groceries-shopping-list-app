import Clipboard from "expo-clipboard";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Alert } from "react-native";

export default function ShareListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const router = useRouter();

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText>Share List</ThemedText>
      <Pressable
        onPress={async () => {
          await Clipboard.setStringAsync(listId);
          Alert.alert("Copied to clipboard");
          router.back();
        }}
      >
        <ThemedText>{listId}</ThemedText>
      </Pressable>
    </BodyScrollView>
  );
}
