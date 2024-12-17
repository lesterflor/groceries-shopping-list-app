import React from "react";
import { useLocalSearchParams } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { useShoppingListProductCell } from "@/stores/ShoppingListStore";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function ProductScreen() {
  const { listId, productId } = useLocalSearchParams() as {
    listId: string;
    productId: string;
  };
  const [name, setName] = useShoppingListProductCell(listId, productId, "name");
  const [quantity, setQuantity] = useShoppingListProductCell(
    listId,
    productId,
    "quantity"
  );
  const [units, setUnits] = useShoppingListProductCell(
    listId,
    productId,
    "unit"
  );
  const [notes, setNotes] = useShoppingListProductCell(
    listId,
    productId,
    "notes"
  );
  const [createdBy] = useShoppingListProductCell(
    listId,
    productId,
    "createdBy"
  );
  const [createdAt] = useShoppingListProductCell(
    listId,
    productId,
    "createdAt"
  );

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
    >
      <FieldItem label="Product name" value={name} onChangeText={setName} />
      <FieldItem label="Created by" value={createdBy ?? "unknown"} />
      <FieldItem
        label="Created at"
        value={createdAt ? new Date(createdAt).toDateString() : "unknown"}
      />
      <FieldItem
        label="Quantity"
        value={quantity.toString()}
        onChangeText={(value) => setQuantity(Number(value))}
      />
      <FieldItem label="Units" value={units} onChangeText={setUnits} />
      <FieldItem
        label="Notes"
        value={notes ?? "(none)"}
        onChangeText={setNotes}
      />
    </BodyScrollView>
  );
}

function FieldItem({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 8,
      }}
    >
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <TextInput
        value={value}
        editable={onChangeText !== undefined}
        onChangeText={onChangeText}
        variant="ghost"
        placeholder="..."
        size="sm"
        containerStyle={{ maxWidth: "60%" }}
        inputStyle={{ padding: 0, margin: 0, textAlign: "right" }}
      />
    </View>
  );
}
