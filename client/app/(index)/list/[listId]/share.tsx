import Clipboard from "expo-clipboard";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Alert, View, Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Button from "@/components/ui/button";

export default function ShareListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const router = useRouter();

  const handleShareListCode = async () => {
    const shareMessage = `🛒 Join my shopping list!\n\nPaste this code in the app to start collaborating:\n\n${listId}`;

    try {
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.error("Error sharing list code:", error);
    }
  };

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
        alignItems: "center",
        gap: 8,
      }}
    >
      <ThemedText>Scan QR code to start collaborating</ThemedText>
      <QRCode
        size={200}
        value={`https://shopping-list.expo.app/list/${listId}`}
      />
      <ThemedText>Or</ThemedText>
      <Button onPress={handleShareListCode} variant="ghost">
        Share list code
      </Button>
      <ThemedText
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "gray",
          marginTop: 16,
        }}
      >
        Be careful with whom you share your list. Anyone with the code can join
        your list.
      </ThemedText>
    </BodyScrollView>
  );
}
