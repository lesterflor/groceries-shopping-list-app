import React, { useCallback } from "react";
import { randomUUID } from "expo-crypto";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore, NoValuesSchema } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "@/stores/persistence/useCreateClientPersisterAndStart";
import { useUser } from "@clerk/clerk-expo";
import ShoppingListStore from "./ShoppingListStore";
import { useCreateServerSynchronizerAndStart } from "./synchronization/useCreateServerSynchronizerAndStart";

const STORE_ID_PREFIX = "shoppingListsStore-";

const TABLES_SCHEMA = {
  lists: {
    id: { type: "string" },
    initialContentJson: { type: "string" },
  },
} as const;

const {
  useCreateMergeableStore,
  useDelRowCallback,
  useProvideStore,
  useRowIds,
  useStore,
  useTable,
} = UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

const useStoreId = () => STORE_ID_PREFIX + useUser().user.id;

export const useAddShoppingListCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (name: string, description: string, emoji: string, color: string) => {
      const id = randomUUID();
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
      });
      return id;
    },
    [store]
  );
};

export const useJoinShoppingListCallback = () => {
  const store = useStore(useStoreId());
  return useCallback(
    (listId: string) => {
      store.setRow("lists", listId, {
        id: listId,
        initialContentJson: JSON.stringify([{}, {}]),
      });
    },
    [store]
  );
};

export const useDelShoppingListCallback = (id: string) =>
  useDelRowCallback("lists", id, useStoreId());

export const useShoppingListIds = () => useRowIds("lists", useStoreId());

export default function ShoppingListsStore() {
  const storeId = useStoreId();
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setTablesSchema(TABLES_SCHEMA)
  );
  useCreateClientPersisterAndStart(storeId, store);
  useCreateServerSynchronizerAndStart(storeId, store);
  useProvideStore(storeId, store);

  return Object.entries(useTable("lists", storeId)).map(
    ([listId, { initialContentJson }]) => (
      <ShoppingListStore
        listId={listId}
        initialContentJson={initialContentJson}
        key={listId}
      />
    )
  );
}
