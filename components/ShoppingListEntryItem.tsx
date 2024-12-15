import React from "react";
import { ThemedText } from "./ThemedText";
import { useShoppingListEntryCell } from "@/stores/ShoppingListStore";

export default function ShoppingListEntryItem({ id }: { id: string }) {
  const name = useShoppingListEntryCell(id, "name");
  return <ThemedText type="defaultSemiBold">{name}</ThemedText>;
}
