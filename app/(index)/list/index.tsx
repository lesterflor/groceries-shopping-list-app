import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import {
  useShoppingListCell,
  useShoppingListEntryIds,
} from "@/stores/ShoppingListStore";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import React from "react";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Animated from "react-native-reanimated";
import ShoppingListEntryItem from "@/components/ShoppingListEntryItem";

export default function ListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const name = useShoppingListCell(listId, "name");
  const emoji = useShoppingListCell(listId, "emoji");
  const color = useShoppingListCell(listId, "color");
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: emoji + " " + name,
          headerLargeStyle: { backgroundColor: color },
          headerRight: () => (
            <Link href={`/list/new-entry?listId=${listId}`}>
              <IconSymbol size={24} name="plus" color={"#007AFF"} />
            </Link>
          ),
        }}
      />

      <BodyScrollView contentContainerStyle={{}}>
        <Animated.FlatList
          data={useShoppingListEntryIds(listId)}
          renderItem={({ item: id }) => {
            return <ShoppingListEntryItem id={id} />;
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
              <Link href={`/list/new-entry?listId=${listId}`} asChild>
                <Button variant="ghost">Create your first entry</Button>
              </Link>
            </BodyScrollView>
          )}
        />
      </BodyScrollView>
    </>
  );
}
