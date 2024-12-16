import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function CreateItemScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "Product",
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Text>
          product {productId} in list {listId}
        </Text>
      </BodyScrollView>
    </>
  );
}
