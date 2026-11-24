import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import TextField from "@/components/TextField";
import { mockUser } from "@/constants/mockUser";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { loginSchema } from "@/schemas/loginSchema";

type LoginErrors = {
  email?: string;
  password?: string;
  credentials?: string;
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleLogin() {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const issues = result.error.issues;
      setErrors({
        email: issues.find((issue) => issue.path[0] === "email")?.message,
        password: issues.find((issue) => issue.path[0] === "password")?.message,
      });
      return;
    }

    if (
      result.data.email.toLowerCase() !== mockUser.email ||
      result.data.password !== mockUser.password
    ) {
      setErrors({ credentials: "Incorrect email or password" });
      return;
    }

    setErrors({});
    router.replace("/home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.intro}>
          <Text accessibilityRole="header" style={styles.heading}>
            Welcome back
          </Text>
          <Text style={styles.subtitle}>Log in to continue tracking your anime.</Text>
        </View>

        <TextField
          label="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrors((current) => ({
              ...current,
              email: undefined,
              credentials: undefined,
            }));
          }}
          error={errors.email}
          keyboardType="email-address"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          placeholder="you@example.com"
        />

        <TextField
          label="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setErrors((current) => ({
              ...current,
              password: undefined,
              credentials: undefined,
            }));
          }}
          error={errors.password}
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />

        {errors.credentials ? (
          <View style={styles.errorBanner} accessibilityLiveRegion="polite">
            <Ionicons name="alert-circle" size={20} color={colors.danger} accessibilityElementsHidden />
            <Text style={styles.error}>{errors.credentials}</Text>
          </View>
        ) : null}

        <PrimaryButton title="Log in" onPress={handleLogin} />

        <View style={styles.demo}>
          <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} accessibilityElementsHidden />
          <Text style={styles.demoText}>
            Demo account: {mockUser.email} / {mockUser.password}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.large,
    gap: spacing.medium,
  },
  intro: {
    gap: spacing.small,
    marginBottom: spacing.small,
  },
  heading: {
    color: colors.text,
    fontSize: fontSize.display,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    padding: spacing.medium - 4,
    borderRadius: radius.medium,
    backgroundColor: colors.dangerSoft,
  },
  error: {
    flex: 1,
    color: colors.danger,
    fontSize: fontSize.medium,
  },
  demo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xsmall + 2,
  },
  demoText: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
});