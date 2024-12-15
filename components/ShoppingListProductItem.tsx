import React from "react";
import { useShoppingListProductCell } from "@/stores/ShoppingListStore";
import { ThemedText } from "./ThemedText";

export default function ShoppingListProductItem({
  listId,
  productId,
}: {
  listId: string;
  productId: string;
}) {
  const name = useShoppingListProductCell(listId, productId, "name");
  return <ThemedText type="defaultSemiBold">{name}</ThemedText>;
}
