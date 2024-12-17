import React, { useState, useMemo } from "react";
import { Href, useRouter } from "expo-router";
import { IconCircle } from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useJoinShoppingListCallback } from "@/stores/ShoppingListsStore";
import { randomUUID } from "expo-crypto";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TouchableOpacity, View } from "react-native";

const isValidUUID = (id) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const router = useRouter();
  const joinShoppingListCallback = useJoinShoppingListCallback();
  const [listId, setListId] = useState<string | null>(null);
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const randomEmoji = useMemo(() => {
    return emojies[Math.floor(Math.random() * emojies.length)];
  }, []);

  const randomBackgroundColor = useMemo(() => {
    return backgroundColors[
      Math.floor(Math.random() * backgroundColors.length)
    ];
  }, []);

  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  const handleJoinList = () => {
    if (listId && isValidUUID(listId)) {
      joinShoppingListCallback(listId);

      // dismissTo method is not working due to a bug in react-native-screens
      router.dismiss();
      setTimeout(() => {
        router.push({
          pathname: "/list/[listId]",
          params: { listId },
        });
      }, 100);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16, marginBottom: 100 }}>
      <View style={{ gap: 16 }}>
        <IconCircle
          style={{ alignSelf: "center", marginTop: 16 }}
          size={64}
          emoji={randomEmoji}
          backgroundColor={randomBackgroundColor}
        />
        <ThemedText type="subtitle" style={{ textAlign: "center" }}>
          Collaborate and Sync in Real Time!
        </ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{ textAlign: "center", color: "gray" }}
        >
          Create a new list or join an existing one by scanning the QR code or
          entering a list ID.
        </ThemedText>

        <Button onPress={() => handleDismissTo("/list/new/create")}>
          Create new list
        </Button>

        <ThemedText type="default" style={{ textAlign: "center" }}>
          Or
        </ThemedText>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <TextInput
            placeholder="Enter a list code"
            onChangeText={setListId}
            onSubmitEditing={(e) => {
              joinShoppingListCallback(e.nativeEvent.text);
            }}
            containerStyle={{
              flex: 1,
            }}
          />
          <TouchableOpacity
            onPress={() => handleDismissTo("/list/new/scan")}
            style={{
              marginBottom: 16,
            }}
          >
            <IconSymbol name="qrcode.viewfinder" color={appleBlue} size={32} />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        variant="ghost"
        disabled={!isValidListId}
        onPress={handleJoinList}
      >
        Join list
      </Button>
    </BodyScrollView>
  );
}
