import React from "react";
import * as Haptics from "expo-haptics";
import { useRouter, Href } from "expo-router";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useSSO } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import * as AuthSession from "expo-auth-session";
import { IconSymbol } from "@/components/ui/IconSymbol";

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const theme = useColorScheme();

  const handleSignInWithGoogle = React.useCallback(async () => {
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    try {
      await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: AuthSession.makeRedirectUri({
          path: "/oauth-native-callback",
        }),
      });
    } catch (err) {
      console.error("OAuth error", err);
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
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.appIcon}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.welcomeText}>
          Welcome back!
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitleText}>
          Local-first shopping list app powered by Expo & TinyBase
        </ThemedText>
      </View>

      <View style={styles.actionSection}>
        <Button
          onPress={handleSignInWithGoogle}
          variant="outline"
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require("../../assets/images/google-icon.png")}
              style={styles.buttonIcon}
            />
            <ThemedText style={styles.buttonText}>
              Continue with Google
            </ThemedText>
          </View>
        </Button>

        <Button
          onPress={() => onNavigatePress("/sign-in-email")}
          variant="outline"
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <IconSymbol
              name="envelope"
              color={theme === "dark" ? "white" : "black"}
              style={styles.buttonIcon}
            />
            <ThemedText style={styles.buttonText}>
              Continue with Email
            </ThemedText>
          </View>
        </Button>
      </View>

      <View style={styles.footer}>
        <Button
          onPress={() => onNavigatePress("/privacy-policy")}
          variant="ghost"
          textStyle={styles.privacyPolicyText}
        >
          Privacy Policy
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
  heroSection: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 32,
    textAlign: "center",
  },
  subtitleText: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 24,
  },
  actionSection: {
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
  buttonContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  buttonText: {
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
  },
  privacyPolicyText: {
    fontSize: 14,
    color: "gray",
  },
});
