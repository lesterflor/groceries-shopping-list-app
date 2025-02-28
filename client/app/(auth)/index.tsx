import React from "react";
import * as Haptics from "expo-haptics";
import { useRouter, Href } from "expo-router";
import { useColorScheme } from "react-native";
import { isClerkAPIResponseError, useSSO } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as AuthSession from "expo-auth-session";
import { ClerkAPIError } from "@clerk/types";
import Landing from "@/components/Landing";

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const theme = useColorScheme();

  const handleSignInWithGoogle = React.useCallback(async () => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // Defaults to current path
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/(index)");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  const onNavigatePress = React.useCallback(
    (href: string) => {
      if (process.env.EXPO_OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      router.push(href as Href);
    },
    [router]
  );

  return (
    <Landing
      onGoogleSignIn={handleSignInWithGoogle}
      onEmailSignIn={() => onNavigatePress("/sign-in-email")}
      onPrivacyPolicy={() => onNavigatePress("/privacy-policy")}
    />
  );
}
