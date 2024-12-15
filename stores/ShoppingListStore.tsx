import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import {
  createIndexes,
  createStore,
  NoValuesSchema,
} from "tinybase/with-schemas";
import { useAndStartPersister } from "@/stores/useAndStartPersister";

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
  shoppingListEntries: {
    id: { type: "string" },
    listId: { type: "string" },
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
type ShoppingListEntryCellId =
  keyof (typeof TABLES_SCHEMA)["shoppingListEntries"];

const {
  useStore,
  useDelRowCallback,
  useCell,
  useCreateStore,
  useProvideStore,
  useSortedRowIds,
  useCreateIndexes,
  useSliceRowIds,
  useProvideIndexes,
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

export const useAddShoppingListEntryCallback = (listId: string) => {
  const store = useStore(STORE_ID);
  return useCallback(
    (id: string, name: string) =>
      store.setRow("shoppingListEntries", id, {
        id,
        listId,
        name,
        quantity: 1,
        unit: "bag",
        isPurchased: false,
        category: "",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    [store, listId]
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

export const useShoppingListEntryIds = (listId: string) =>
  useSliceRowIds("entriesByListId", listId, STORE_ID);

export const useShoppingListEntryCell = (
  id: string,
  cellId: ShoppingListEntryCellId
) => useCell("shoppingListEntries", id, cellId, STORE_ID);

export default function ShoppingListStore() {
  const store = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA)
  );
  useAndStartPersister(store as any);
  useProvideStore(STORE_ID, store);

  const indexes = useCreateIndexes(store, () =>
    createIndexes(store).setIndexDefinition(
      "entriesByListId",
      "shoppingListEntries",
      "listId"
    )
  );
  useProvideIndexes(STORE_ID, indexes);

  return null;
}
