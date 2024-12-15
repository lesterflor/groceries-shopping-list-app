import { useCallback } from "react";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createMergeableStore } from "tinybase/with-schemas";
import { useCreateClientPersisterAndStart } from "@/stores/persisters/useCreateClientPersisterAndStart";

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
  products: {
    productId: { type: "string" },
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
type ShoppingListProductCellId = keyof (typeof TABLES_SCHEMA)["products"];

const {
  useCell,
  useCreateMergeableStore,
  useProvideStore,
  useSortedRowIds,
  useStore,
  useValue,
} = UiReact as UiReact.WithSchemas<Schema>;

const getStoreId = (listId: string) => STORE_ID_PREFIX + listId;

export const useAddShoppingListProductCallback = (listId: string) => {
  const store = useStore(getStoreId(listId));
  return useCallback(
    (productId: string, name: string) =>
      store.setRow("products", productId, {
        productId,
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

export const useShoppingListProductIds = (
  listId: string,
  cellId: ShoppingListProductCellId = "createdAt",
  descending?: boolean,
  offset?: number,
  limit?: number
) =>
  useSortedRowIds(
    "products",
    cellId,
    descending,
    offset,
    limit,
    getStoreId(listId)
  );

export const useShoppingListProductCell = (
  listId: string,
  productId: string,
  cellId: ShoppingListProductCellId
) => useCell("products", productId, cellId, getStoreId(listId));

export default function ShoppingListStore({
  listId,
  initialContentJson,
}: {
  listId: string;
  initialContentJson: string;
}) {
  const store = useCreateMergeableStore(() =>
    createMergeableStore().setSchema(TABLES_SCHEMA, VALUES_SCHEMA)
  );

  useCreateClientPersisterAndStart(
    getStoreId(listId),
    store,
    initialContentJson
  );
  useProvideStore(getStoreId(listId), store);

  return null;
}
