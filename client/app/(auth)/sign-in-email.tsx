import React from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";

export default function SignInEmail() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const onSignInPress = React.useCallback(async () => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (!isLoaded) {
      return;
    }

    setIsSigningIn(true);
    setErrors([]);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, signIn, emailAddress, password, setActive]);

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.formSection}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          label="Email"
          keyboardType="email-address"
          placeholder="Enter your email"
          onChangeText={setEmailAddress}
        />
        <TextInput
          value={password}
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={styles.errorText}>
            {error.longMessage}
          </ThemedText>
        ))}

        <Button
          onPress={onSignInPress}
          loading={isSigningIn}
          disabled={!emailAddress || !password || isSigningIn}
          style={styles.signInButton}
        >
          Sign in
        </Button>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Forgot password?</ThemedText>
        <Button onPress={() => router.push("/reset-password")} variant="ghost">
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 32,
  },
  formSection: {
    gap: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  signInButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "gray",
  },
});
