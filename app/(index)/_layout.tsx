import React from "react";
import { Stack } from "expo-router";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import {
  useCreateStore,
  Provider as TinyBaseProvider,
} from "tinybase/ui-react";
import { createStore } from "tinybase";
import { useAndStartPersister } from "@/tinybase/useAndStartPersister";

export const unstable_settings = {
  initialRouteName: "/(index)",
};

export default function AppIndexLayout() {
  const { user } = useUser();
  const store = useCreateStore(createStore);

  console.log(JSON.stringify(user?.emailAddresses[0].emailAddress, null, 2));

  store.setTablesSchema({
    shoppingLists: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      emoji: {
        type: "string",
      },
      color: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
    },
    shoppingListItems: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      quantity: {
        type: "number",
      },
      unit: {
        type: "string",
      },
      is_purchased: {
        type: "boolean",
      },
      category: {
        type: "string",
      },
      notes: {
        type: "string",
      },
      createdAt: {
        type: "string",
      },
      updatedAt: {
        type: "string",
      },
    },
  });

  store.setTables({
    shoppingLists: {
      "1": {
        id: "1",
        name: "My first shopping list",
        description: "This is my first shopping list",
        emoji: "🛒",
        color: "lightblue",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  });

  useAndStartPersister(store);

  console.log(store.getRow("shoppingLists", "1"));

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
              title: "Shopping Lists",
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
