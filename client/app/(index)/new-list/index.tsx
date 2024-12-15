import React from "react";
import { Href, useRouter } from "expo-router";
import { IconCircle } from "@/components/IconCircle";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";

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

      <Button onPress={() => handleDismissTo("/(index)/new-list/create-list")}>
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
      />
      <Button
        variant="ghost"
        onPress={() => handleDismissTo("/(index)/new-list/join-list")}
      >
        Join list
      </Button>
    </BodyScrollView>
  );
}
