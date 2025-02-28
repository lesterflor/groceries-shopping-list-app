import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { BodyScrollView } from "./ui/BodyScrollView";
import Button from "./ui/button";

type LandingProps = {
  onGoogleSignIn: () => void;
  onEmailSignIn: () => void;
  onPrivacyPolicy: () => void;
};

export default function Landing({
  onGoogleSignIn,
  onEmailSignIn,
  onPrivacyPolicy,
}: LandingProps) {
  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.appIcon}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.welcomeText}>
          Shopping List: Sync & Share
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.subtitleText}>
          Streamline your shopping experience with our collaborative, real-time
          shopping list app
        </ThemedText>
      </View>

      <View style={styles.featuresSection}>
        <ThemedText type="subtitle" style={styles.featuresTitle}>
          App Features
        </ThemedText>

        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">📱 Cross-Platform</ThemedText>
          <ThemedText>Available on iOS, Android, and Web</ThemedText>
        </View>

        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">
            👨‍👩‍👧‍👦 Real-time Collaboration
          </ThemedText>
          <ThemedText>Share lists with family and friends</ThemedText>
        </View>

        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">🔄 Offline Support</ThemedText>
          <ThemedText>Works even without an internet connection</ThemedText>
        </View>

        <View style={styles.featureItem}>
          <ThemedText type="defaultSemiBold">🔒 Secure</ThemedText>
          <ThemedText>Your data is protected with modern security</ThemedText>
        </View>
      </View>

      <View style={styles.actionSection}>
        <ThemedText type="subtitle" style={styles.signInTitle}>
          Get Started Now
        </ThemedText>
        <Button
          onPress={onGoogleSignIn}
          variant="outline"
          style={styles.button}
        >
          Sign in with Google
        </Button>

        <Button onPress={onEmailSignIn} variant="outline" style={styles.button}>
          Sign in with Email
        </Button>
      </View>

      <View style={styles.footer}>
        <Button
          onPress={onPrivacyPolicy}
          variant="ghost"
          textStyle={styles.privacyPolicyText}
        >
          Privacy Policy
        </Button>
        <ThemedText style={styles.copyright}>
          © {new Date().getFullYear()} Shopping List App. All rights reserved.
        </ThemedText>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    maxWidth: 800,
    marginHorizontal: "auto",
    gap: 48,
  },
  heroSection: {
    alignItems: "center",
    gap: 16,
    marginTop: 48,
    marginBottom: 24,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 36,
    textAlign: "center",
  },
  subtitleText: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 24,
    fontSize: 18,
  },
  featuresSection: {
    gap: 16,
  },
  featuresTitle: {
    textAlign: "center",
    marginBottom: 8,
  },
  featureItem: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
  },
  actionSection: {
    gap: 16,
    alignItems: "center",
  },
  signInTitle: {
    marginBottom: 8,
  },
  button: {
    marginBottom: 8,
    width: "100%",
    maxWidth: 320,
  },
  footer: {
    alignItems: "center",
    gap: 12,
  },
  privacyPolicyText: {
    fontSize: 14,
    color: "gray",
  },
  copyright: {
    fontSize: 12,
    color: "gray",
  },
});
