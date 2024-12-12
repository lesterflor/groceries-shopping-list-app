import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Button } from "react-native";

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
      <BodyScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
      ></BodyScrollView>
    </>
  );
}
