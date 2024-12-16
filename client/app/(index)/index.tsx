import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { IconCircle } from "@/components/IconCircle";
import ShoppingListItem from "@/components/ShoppingListItem";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { backgroundColors } from "@/constants/Colors";
import { useShoppingListIds } from "@/stores/ShoppingListsStore";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Shopping lists",
          headerRight: () => (
            <Link href={"/list/new"}>
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
      <Animated.FlatList
        data={useShoppingListIds()}
        renderItem={({ item: listId }) => <ShoppingListItem listId={listId} />}
        contentContainerStyle={{
          paddingTop: 8,
        }}
        contentInsetAdjustmentBehavior="automatic"
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
            <Button onPress={() => router.push("/list/new")} variant="ghost">
              Create your first list
            </Button>
          </BodyScrollView>
        )}
      />
    </>
  );
}
