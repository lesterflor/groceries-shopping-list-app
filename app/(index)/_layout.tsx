import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(index)",
};

export default function AppIndexLayout() {
  return (
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
        title: "Shopping Lists",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="new-list/index"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 0.75],
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen name="list-item/index" />
    </Stack>
  );
}
