import React, { useMemo, useState } from "react";
import { Href, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
// Components
import { IconCircle } from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TextInput from "@/components/ui/text-input";
// Constants & Utils
import { appleBlue, backgroundColors, emojies } from "@/constants/Colors";
import { useJoinShoppingListCallback } from "@/stores/ShoppingListsStore";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const router = useRouter();
  const joinShoppingListCallback = useJoinShoppingListCallback();
  const [listId, setListId] = useState<string | null>(null);
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const randomEmoji = useMemo(
    () => emojies[Math.floor(Math.random() * emojies.length)],
    []
  );

  const randomBackgroundColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

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
    <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <IconCircle
          style={styles.iconCircle}
          size={64}
          emoji={randomEmoji}
          backgroundColor={randomBackgroundColor}
        />
        <ThemedText type="subtitle" style={styles.title}>
          Collaborate and Sync in Real Time!
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitle}>
          Create a new list or join an existing one by scanning the QR code or
          entering a list ID.
        </ThemedText>

        <Button onPress={() => handleDismissTo("/list/new/create")}>
          Create new list
        </Button>

        <ThemedText type="default" style={styles.orText}>
          Or
        </ThemedText>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter a list code"
            onChangeText={setListId}
            onSubmitEditing={(e) => {
              joinShoppingListCallback(e.nativeEvent.text);
            }}
            containerStyle={styles.textInput}
          />
          <TouchableOpacity
            onPress={() => handleDismissTo("/list/new/scan")}
            style={styles.qrButton}
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

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    marginBottom: 100,
  },
  container: {
    gap: 16,
  },
  iconCircle: {
    alignSelf: "center",
    marginTop: 16,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
  },
  orText: {
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textInput: {
    flex: 1,
  },
  qrButton: {
    marginBottom: 16,
  },
});
