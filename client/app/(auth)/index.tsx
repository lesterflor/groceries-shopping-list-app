import React from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        label="Email"
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={onSignInPress} disabled={!emailAddress || !password}>
        Sign in
      </Button>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Don't have an account?</ThemedText>
        <Button onPress={() => router.push("/sign-up")} variant="ghost">
          Sign up
        </Button>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot password?</ThemedText>
        <Button onPress={() => router.push("/reset-password")} variant="ghost">
          Reset password
        </Button>
      </View>
    </BodyScrollView>
  );
}
