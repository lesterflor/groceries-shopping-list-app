import React from "react";
import { Stack } from "expo-router";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import * as UiReact from "tinybase/ui-react/with-schemas";
import { createStore, NoValuesSchema } from "tinybase/with-schemas";
import { useAndStartPersister } from "@/tinybase/useAndStartPersister";

export const SHOPPING_LIST_TABLE = "shoppingLists";
export const SHOPPING_LIST_ID_CELL = "id";
export const SHOPPING_LIST_NAME_CELL = "name";
export const SHOPPING_LIST_DESCRIPTION_CELL = "description";
export const SHOPPING_LIST_EMOJI_CELL = "emoji";
export const SHOPPING_LIST_COLOR_CELL = "color";
export const SHOPPING_LIST_CREATED_AT_CELL = "createdAt";
export const SHOPPING_LIST_UPDATED_AT_CELL = "updatedAt";

export const SHOPPING_LIST_ITEM_TABLE = "shoppingListItems";
export const SHOPPING_LIST_ITEM_ID_CELL = "id";
export const SHOPPING_LIST_ITEM_NAME_CELL = "name";
export const SHOPPING_LIST_ITEM_QUANTITY_CELL = "quantity";
export const SHOPPING_LIST_ITEM_UNIT_CELL = "unit";
export const SHOPPING_LIST_ITEM_IS_PURCHASED_CELL = "isPurchased";
export const SHOPPING_LIST_ITEM_CATEGORY_CELL = "category";
export const SHOPPING_LIST_ITEM_NOTES_CELL = "notes";
export const SHOPPING_LIST_ITEM_CREATED_AT_CELL = "createdAt";
export const SHOPPING_LIST_ITEM_UPDATED_AT_CELL = "updatedAt";

export const unstable_settings = {
  initialRouteName: "/(index)",
};

const TABLES_SCHEMA = {
  shoppingLists: {
    [SHOPPING_LIST_ID_CELL]: { type: "string" },
    [SHOPPING_LIST_NAME_CELL]: { type: "string" },
    [SHOPPING_LIST_DESCRIPTION_CELL]: { type: "string" },
    [SHOPPING_LIST_EMOJI_CELL]: { type: "string" },
    [SHOPPING_LIST_COLOR_CELL]: { type: "string" },
    [SHOPPING_LIST_CREATED_AT_CELL]: { type: "string" },
    [SHOPPING_LIST_UPDATED_AT_CELL]: { type: "string" },
  },
  shoppingListItems: {
    [SHOPPING_LIST_ITEM_ID_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_NAME_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_QUANTITY_CELL]: { type: "number" },
    [SHOPPING_LIST_ITEM_UNIT_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_IS_PURCHASED_CELL]: { type: "boolean" },
    [SHOPPING_LIST_ITEM_CATEGORY_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_NOTES_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_CREATED_AT_CELL]: { type: "string" },
    [SHOPPING_LIST_ITEM_UPDATED_AT_CELL]: { type: "string" },
  },
} as const;

const { useCreateStore, Provider: TinyBaseProvider } =
  UiReact as UiReact.WithSchemas<[typeof TABLES_SCHEMA, NoValuesSchema]>;

export default function AppIndexLayout() {
  const { user } = useUser();
  const store = useCreateStore(() => {
    const store = createStore().setTablesSchema(TABLES_SCHEMA);
    useAndStartPersister(store as any);
    return store;
  });

  // console.log(JSON.stringify(user?.primaryEmailAddress?.emailAddress));

  // store.setTables({
  //   shoppingLists: {
  //     "1": {
  //       id: "1",
  //       name: "My first shopping list",
  //       description: "This is my first shopping list",
  //       emoji: "🛒",
  //       color: "lightblue",
  //       createdAt: new Date().toISOString(),
  //       updatedAt: new Date().toISOString(),
  //     },
  //   },
  // });

  // console.log(store.getRow("shoppingLists", "1").n);

  return (
    <SignedIn>
      <TinyBaseProvider store={store}>
        <Stack
          screenOptions={{
            ...(process.env.EXPO_OS !== "ios"
              ? {}
              : {
                  headerLargeTitle: true,
                  headerTransparent: true,
                  headerBlurEffect: "systemChromeMaterial",
                  headerLargeTitleShadowVisible: false,
                  headerShadowVisible: true,
                  headerLargeStyle: {
                    // NEW: Make the large title transparent to match the background.
                    backgroundColor: "transparent",
                  },
                }),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Shopping lists",
            }}
          />
          <Stack.Screen
            name="new-list/index"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.75],
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="profile/index"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [0.5, 0.75],
              sheetGrabberVisible: true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="list-item/index"
            options={{
              headerLargeTitle: false,
            }}
          />
        </Stack>
      </TinyBaseProvider>
    </SignedIn>
  );
}
