import { IconCircle } from "@/components/IconCircle";
import ShoppingListItem from "@/components/ShoppingListItem";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { backgroundColors } from "@/constants/Colors";
import { useSortedShoppingListIds } from "@/stores/ShoppingListStore";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/new-list">
              <IconSymbol size={24} name="plus" color={"#007AFF"} />
            </Link>
          ),
          headerLeft: () => (
            <Link href="/profile">
              <IconSymbol size={22} name="person" color={"#007AFF"} />
            </Link>
          ),
        }}
      />
      <BodyScrollView contentContainerStyle={{}}>
        <Animated.FlatList
          data={useSortedShoppingListIds()}
          renderItem={({ item }) => {
            return <ShoppingListItem id={item} />;
          }}
          contentContainerStyle={{
            paddingTop: 8,
          }}
          ListEmptyComponent={() => (
            <BodyScrollView
              contentContainerStyle={{
                alignItems: "center",
                gap: 8,
                paddingTop: 100,
              }}
            >
              <IconCircle
                emoji="🛒"
                backgroundColor={
                  backgroundColors[
                    Math.floor(Math.random() * backgroundColors.length)
                  ]
                }
              />
              <Link href="/new-list" asChild>
                <Button variant="ghost">Create your first list</Button>
              </Link>
            </BodyScrollView>
          )}
        />
      </BodyScrollView>
    </>
  );
}
