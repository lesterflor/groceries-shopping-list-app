import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Button } from "react-native";

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/new-list">
              <IconSymbol size={24} name="plus" color={"#007AFF"} />
            </Link>
          ),
        }}
      />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>Hello</ThemedText>
        <Link href="/new-list">
          <ThemedText>New List</ThemedText>
        </Link>
        <Link href="/list-item">
          <ThemedText>List Item</ThemedText>
        </Link>
        <SignedIn>
          <ThemedText>Hello {user?.emailAddresses[0].emailAddress}</ThemedText>
          <Button title="Sign out" onPress={handleSignOut} />
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)">Sign in</Link>
          <Link href="/(auth)/sign-up">Sign up</Link>
        </SignedOut>
      </BodyScrollView>
    </>
  );
}
