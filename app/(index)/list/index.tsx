import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Animated from "react-native-reanimated";
import ShoppingListEntryItem from "@/components/ShoppingListEntryItem";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  useShoppingListEntryIds,
  useShoppingListValue,
} from "@/stores/ShoppingListStore";

export default function ListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };
  const name = useShoppingListValue(listId, "name");
  const emoji = useShoppingListValue(listId, "emoji");
  const color = useShoppingListValue(listId, "color");
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

      <Animated.FlatList
        data={useShoppingListEntryIds(listId)}
        renderItem={({ item: entryId }) => {
          return <ShoppingListEntryItem listId={listId} entryId={entryId} />;
        }}
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
            <Link href={`/list/new-entry?listId=${listId}`} asChild>
              <Button variant="ghost">Create your first entry</Button>
            </Link>
          </BodyScrollView>
        )}
      />
    </>
  );
}
