import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Button, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useRow, useSortedRowIds } from "tinybase/ui-react";

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
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Animated.FlatList
          data={useSortedRowIds("shoppingLists", "createdAt")}
          renderItem={({ item }) => {
            return <ListItem id={item} />;
          }}
        />
      </BodyScrollView>
    </>
  );
}

const ListItem = ({ id }: { id: string }) => {
  const list = useRow("shoppingLists", id);
  return (
    <Link href={`/(index)/list-item?listId=${id}`} asChild>
      <Pressable>
        <ThemedText>{list.name}</ThemedText>
        <ThemedText>{list.description}</ThemedText>
      </Pressable>
    </Link>
  );
};
