import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useAddShoppingListProductCallback } from "@/stores/ShoppingListStore";
import { ThemedText } from "@/components/ThemedText";
import { Platform, View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useUser } from "@clerk/clerk-expo";

export default function NewItemScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const [name, setName] = useState("");
  const [units, setUnits] = useState("kg");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser();
  const { emailAddress } = user.primaryEmailAddress;

  const router = useRouter();
  const addShoppingListProduct = useAddShoppingListProductCallback(listId);

  const handleCreateProduct = () => {
    if (!name) {
      return;
    }

    addShoppingListProduct(
      name,
      quantity,
      units,
      notes,
      emailAddress.split("@")[0] // e.g. [beto, expo.io] -> beto
    );

    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLargeTitle: false,
          headerTitle: "Add product",
          headerRight: () => (
            <Button
              variant="ghost"
              onPress={handleCreateProduct}
              disabled={!name}
            >
              Save
            </Button>
          ),
          headerLeft: () => (
            <Button variant="ghost" onPress={router.back}>
              Cancel
            </Button>
          ),
        }}
      />
      <BodyScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <TextInput
          label="Name"
          placeholder="Potatoes"
          value={name}
          onChangeText={setName}
          autoFocus={true}
          onSubmitEditing={handleCreateProduct}
          returnKeyType="done"
        />
        <TextInput
          label="Units"
          placeholder="kg"
          value={units}
          onChangeText={setUnits}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText>
            x{quantity} {units}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => setQuantity(Math.max(0, quantity - 1))}
              variant="ghost"
            >
              <IconSymbol name="minus" color={"gray"} />
            </Button>
            <Button onPress={() => setQuantity(quantity + 1)} variant="ghost">
              <IconSymbol name="plus" color={"gray"} />
            </Button>
          </View>
        </View>
        <TextInput
          label="Notes"
          placeholder="Potatoes are good"
          textAlignVertical="top"
          value={notes}
          multiline={true}
          numberOfLines={4}
          inputStyle={{
            height: 100,
          }}
          onChangeText={setNotes}
        />
        {Platform.OS !== "ios" && (
          <Button onPress={handleCreateProduct} disabled={!name}>
            Add product
          </Button>
        )}
      </BodyScrollView>
    </>
  );
}
