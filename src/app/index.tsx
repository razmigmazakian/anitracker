import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PrimaryButton from "@/components/PrimaryButton";
import { colors, fontSize, radius, spacing } from "@/constants/theme";

const features: { icon: ComponentProps<typeof Ionicons>["name"]; text: string }[] = [
  { icon: "compass-outline", text: "Discover trending and popular anime" },
  { icon: "play-circle-outline", text: "Log episodes as you watch" },
  { icon: "albums-outline", text: "Organize your watchlist by status" },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <View style={styles.logo}>
          <Ionicons name="tv" size={40} color={colors.onPrimary} accessibilityElementsHidden />
        </View>
        <Text accessibilityRole="header" style={styles.heading}>
          AniTracker
        </Text>
        <Text style={styles.tagline}>Track every episode. Never lose your place.</Text>
      </View>

      <View style={styles.features}>
        {features.map(({ icon, text }) => (
          <View key={text} style={styles.feature}>
            <Ionicons name={icon} size={22} color={colors.primary} accessibilityElementsHidden />
            <Text style={styles.featureText}>{text}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton title="Get Started" icon="arrow-forward" onPress={() => router.push("/login")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.large,
    gap: spacing.xlarge,
  },
  hero: {
    alignItems: "center",
    gap: spacing.medium - 4,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: radius.large + 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginBottom: spacing.small,
  },
  heading: {
    color: colors.text,
    fontSize: fontSize.display,
    fontWeight: "800",
    textAlign: "center",
  },
  tagline: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
    lineHeight: 24,
    textAlign: "center",
  },
  features: {
    gap: spacing.medium,
    padding: spacing.large - 4,
    borderRadius: radius.large,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium - 4,
  },
  featureText: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.medium,
  },
});
