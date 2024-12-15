import React from "react";
import { ThemedText } from "./ThemedText";
import { useShoppingListEntryCell } from "@/stores/ShoppingListStore";

export default function ShoppingListEntryItem({
  listId,
  entryId,
}: {
  listId: string;
  entryId: string;
}) {
  const name = useShoppingListEntryCell(listId, entryId, "name");
  return <ThemedText type="defaultSemiBold">{name}</ThemedText>;
}
