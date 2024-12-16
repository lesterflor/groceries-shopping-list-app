import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };
  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 32,
        gap: 16,
      }}
    >
      <ThemedText type="subtitle">
        Hello {user?.emailAddresses[0].emailAddress}
      </ThemedText>
      <Button onPress={handleSignOut} variant="outline">
        Sign out
      </Button>
    </BodyScrollView>
  );
}
