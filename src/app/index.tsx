import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import { colors, fontSize, spacing } from "@/constants/theme";

export default function WelcomeScreen() {
  return (
    <View style={styles.screen}>
      <Text accessibilityRole="header" style={styles.heading}>
        Welcome to AniTracker
      </Text>
      <PrimaryButton title="Get Started" onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.large,
    gap: spacing.medium,
  },
  heading: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
    textAlign: "center",
  },
});