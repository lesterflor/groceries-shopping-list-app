import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Href, useRouter } from "expo-router";
import { View } from "react-native";

export default function NewListScreen() {
  const router = useRouter();

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };
  return (
    <>
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText
          type="subtitle"
          style={{ textAlign: "center", marginTop: 16 }}
        >
          Create or join a list
        </ThemedText>
        <View
          style={{
            backgroundColor: "lightblue",
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginVertical: 16,
          }}
        >
          <ThemedText style={{ fontSize: 24 }}>🛒</ThemedText>
        </View>

        <View style={{ gap: 8 }}>
          <Button
            onPress={() => handleDismissTo("/(index)/new-list/create-list")}
          >
            Create new list
          </Button>

          <ThemedText style={{ textAlign: "center", color: "gray" }}>
            Or
          </ThemedText>

          <View>
            <ThemedText type="defaultSemiBold">
              Join an existing list
            </ThemedText>
            <TextInput
              placeholder="Enter a list code"
              textContentType="creditCardNumber"
            />
            <Button
              variant="outline"
              onPress={() => handleDismissTo("/(index)/new-list/join-list")}
            >
              Join list
            </Button>
          </View>
        </View>
      </BodyScrollView>
    </>
  );
}
