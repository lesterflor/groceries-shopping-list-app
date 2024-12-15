import React from "react";
import { useShoppingListEntryCell } from "@/stores/ShoppingListStore";
import { ThemedText } from "./ThemedText";

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
