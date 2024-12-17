import React, { useState, useMemo } from "react";
import { Href, useRouter } from "expo-router";
import { IconCircle } from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";
import { useJoinShoppingListCallback } from "@/stores/ShoppingListsStore";
import { randomUUID } from "expo-crypto";

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
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <IconCircle
        style={{ alignSelf: "center", marginTop: 16 }}
        size={64}
        emoji={emojies[Math.floor(Math.random() * emojies.length)]}
        backgroundColor={
          backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }
      />
      <ThemedText
        type="subtitle"
        style={{ textAlign: "center", marginVertical: 16 }}
      >
        Create a new list
      </ThemedText>

      <Button onPress={() => handleDismissTo("/list/new/create")}>
        Create new list
      </Button>

      <ThemedText
        style={{ textAlign: "center", color: "gray", marginVertical: 8 }}
      >
        Or
      </ThemedText>

      <TextInput
        placeholder="Enter a list code"
        label="Enter a list code"
        textContentType="creditCardNumber"
        onChangeText={setListId}
        onSubmitEditing={(e) => {
          joinShoppingListCallback(e.nativeEvent.text);
        }}
      />
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
