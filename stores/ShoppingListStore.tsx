import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createStore, NoValuesSchema } from "tinybase/with-schemas";
import { useAndStartPersister } from "@/tinybase/useAndStartPersister";

const STORE_ID = "shoppingListStore";

const TABLES_SCHEMA = {
  shoppingLists: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    emoji: { type: "string" },
    color: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
  shoppingListItems: {
    id: { type: "string" },
    name: { type: "string" },
    quantity: { type: "number" },
    unit: { type: "string" },
    isPurchased: { type: "boolean" },
    category: { type: "string" },
    notes: { type: "string" },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
} as const;

type ShoppingListCellId = keyof (typeof TABLES_SCHEMA)["shoppingLists"];
type ShoppingListItemCellId = keyof (typeof TABLES_SCHEMA)["shoppingListItems"];

const {
  useStore,
  useDelRowCallback,
  useCell,
  useCreateStore,
  useProvideStore,
  useSortedRowIds,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

export const useSetShoppingListCallback = () => {
  const store = useStore(STORE_ID);
  return useCallback(
    (
      id: string,
      name: string,
      description: string,
      emoji: string,
      color: string
    ) =>
      store.setRow("shoppingLists", id, {
        id,
        name,
        description,
        emoji,
        color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    [store]
  );
};

export const useDelShoppingListCallback = (id: string) =>
  useDelRowCallback("shoppingLists", id, STORE_ID);

export const useSortedShoppingListIds = (
  cellId: ShoppingListCellId = "createdAt",
  descending?: boolean,
  offset?: number,
  limit?: number
) =>
  useSortedRowIds("shoppingLists", cellId, descending, offset, limit, STORE_ID);

export const useShoppingListCell = (id: string, cellId: ShoppingListCellId) =>
  useCell("shoppingLists", id, cellId, STORE_ID);

export default function ShoppingListStore() {
  const store = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA)
  );

  useAndStartPersister(store as any);
  useProvideStore(STORE_ID, store);

  return null;
}
