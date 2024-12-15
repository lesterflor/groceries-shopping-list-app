import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createStore, NoValuesSchema } from "tinybase/with-schemas";
import { useLocalPersisterAndStart } from "@/stores/useLocalPersisterAndStart";
import ShoppingListStore from "./ShoppingListStore";

const STORE_ID = "shoppingListsStore";

const TABLES_SCHEMA = {
  lists: {
    id: { type: "string" },
    initialContentJson: { type: "string" },
  },
} as const;

const {
  useStore,
  useDelRowCallback,
  useCreateStore,
  useProvideStore,
  useRowIds,
  useDelCellCallback,
  useCell,
  useTable,
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
      store.setRow("lists", id, {
        id,
        initialContentJson: JSON.stringify([
          {},
          {
            id,
            name,
            description,
            emoji,
            color,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]),
      }),
    [store]
  );
};

export const useDelShoppingListCallback = (id: string) =>
  useDelRowCallback("lists", id, STORE_ID);

export const useShoppingListIds = () => useRowIds("lists", STORE_ID);

export const useShoppingLists = () => useTable("lists", STORE_ID);

export default function ShoppingListsStore() {
  const store = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA)
  );
  useLocalPersisterAndStart(STORE_ID, store);
  useProvideStore(STORE_ID, store);

  return Object.entries(useShoppingLists()).map(
    ([listId, { initialContentJson }]) => (
      <ShoppingListStore
        listId={listId}
        initialContentJson={initialContentJson}
        key={listId}
      />
    )
  );
}
