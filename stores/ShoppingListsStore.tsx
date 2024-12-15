import React, { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createStore, NoValuesSchema } from "tinybase/with-schemas";
import { useLocalPersisterAndStart } from "@/stores/useLocalPersisterAndStart";
import ShoppingListStoreWithInitialContent from "./ShoppingListStore";

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

export const useDelInitialContentCallback = (id: string) =>
  useDelCellCallback("lists", id, "initialContentJson", false, STORE_ID);

export const useShoppingListIds = () => useRowIds("lists", STORE_ID);

export default function ShoppingListsStore() {
  const store = useCreateStore(() =>
    createStore().setTablesSchema(TABLES_SCHEMA)
  );
  useLocalPersisterAndStart(STORE_ID, store);
  useProvideStore(STORE_ID, store);

  return (
    <>
      {useShoppingListIds().map((listId) => (
        <ShoppingListStore listId={listId} key={listId} />
      ))}
    </>
  );
}

const ShoppingListStore = ({ listId }: { listId: string }) => (
  <ShoppingListStoreWithInitialContent
    listId={listId}
    initialContentJson={useCell(
      "lists",
      listId,
      "initialContentJson",
      STORE_ID
    )}
  />
);
