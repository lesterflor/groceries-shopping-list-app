import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import {
  Content,
  createIndexes,
  createStore,
  NoValuesSchema,
} from "tinybase/with-schemas";
import { useAndStartPersister } from "@/stores/useAndStartPersister";
import { useDelInitialContentCallback } from "./ShoppingListsStore";

const STORE_ID_PREFIX = "shoppingListStore-";

const VALUES_SCHEMA = {
  listId: { type: "string" },
  name: { type: "string" },
  description: { type: "string" },
  emoji: { type: "string" },
  color: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
} as const;
const TABLES_SCHEMA = {
  entries: {
    entryId: { type: "string" },
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

type Schema = [typeof TABLES_SCHEMA, typeof VALUES_SCHEMA];
type ShoppingListValueId = keyof typeof VALUES_SCHEMA;
type ShoppingListEntryCellId = keyof (typeof TABLES_SCHEMA)["entries"];

const {
  useStore,
  useCell,
  useCreateStore,
  useProvideStore,
  useSortedRowIds,
  useValue,
} = UiReact as UiReact.WithSchemas<Schema>;

const getStoreId = (listId: string) => STORE_ID_PREFIX + listId;

export const useAddShoppingListEntryCallback = (listId: string) => {
  const store = useStore(getStoreId(listId));
  return useCallback(
    (entryId: string, name: string) =>
      store.setRow("entries", entryId, {
        entryId,
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

export const useShoppingListValue = (
  listId: string,
  valueId: ShoppingListValueId
) => useValue(valueId, getStoreId(listId));

export const useShoppingListEntryIds = (
  listId: string,
  cellId: ShoppingListEntryCellId = "createdAt",
  descending?: boolean,
  offset?: number,
  limit?: number
) =>
  useSortedRowIds(
    "entries",
    cellId,
    descending,
    offset,
    limit,
    getStoreId(listId)
  );

export const useShoppingListEntryCell = (
  listId: string,
  entryId: string,
  cellId: ShoppingListEntryCellId
) => useCell("entries", entryId, cellId, getStoreId(listId));

export default function ShoppingListStore({
  listId,
  initialContentJson,
}: {
  listId: string;
  initialContentJson?: string;
}) {
  const delInitialContent = useDelInitialContentCallback(listId);

  const store = useCreateStore(() =>
    createStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  useAndStartPersister(
    getStoreId(listId),
    store,
    initialContentJson,
    delInitialContent
  );
  useProvideStore(getStoreId(listId), store);

  return null;
}
