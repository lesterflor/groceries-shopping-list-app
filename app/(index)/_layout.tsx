import { Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function IndexLayout() {
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
      <Stack.Screen name="index" options={{ title: "Shopping Lists" }} />
      <Stack.Screen
        name="new-list/index"
        options={{ title: "New List", presentation: "modal" }}
      />
    </Stack>
  );
}
