import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { appleRed } from "@/constants/Colors";
import { Image } from "react-native";

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
      {user?.imageUrl ? (
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      ) : null}
      <ThemedText type="defaultSemiBold">
        Hello {user?.emailAddresses[0].emailAddress}
      </ThemedText>

      <ThemedText>Joined {user?.createdAt?.toDateString()}</ThemedText>
      <Button
        onPress={handleSignOut}
        variant="ghost"
        textStyle={{ color: appleRed }}
      >
        Sign out
      </Button>
    </BodyScrollView>
  );
}
