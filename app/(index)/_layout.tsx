import React from "react";
import { Stack } from "expo-router";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import ShoppingListStore from "@/stores/ShoppingListStore";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export const unstable_settings = {
  initialRouteName: "/(index)",
};

export default function AppIndexLayout() {
  const { user } = useUser();

  return (
    <SignedIn>
      <TinyBaseProvider>
        <ShoppingListStore />

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
            name="list/index"
            options={{
              headerLargeTitle: false,
            }}
          />
          <Stack.Screen
            name="list/new-entry/index"
            options={{
              headerLargeTitle: false,
            }}
          />
        </Stack>
      </TinyBaseProvider>
    </SignedIn>
  );
}
