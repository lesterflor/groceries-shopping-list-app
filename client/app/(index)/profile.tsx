import { useRouter } from "expo-router";
import { Alert, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { appleRed } from "@/constants/Colors";
import { useClerk, useUser } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };

  const handleDeleteAccount = async () => {
    try {
      Alert.alert(
        "Delete account",
        "Are you sure you want to delete your account? This action is irreversible.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              await user?.delete();
              router.replace("/(auth)");
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to delete account");
      console.error(error);
    }
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

      <Button
        onPress={handleDeleteAccount}
        variant="ghost"
        textStyle={{ color: "gray" }}
      >
        Delete account
      </Button>
    </BodyScrollView>
  );
}
