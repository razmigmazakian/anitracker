import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import TextField from "@/components/TextField";
import { mockUser } from "@/constants/mockUser";
import { colors, fontSize, spacing } from "@/constants/theme";
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text accessibilityRole="header" style={styles.heading}>
        Log in
      </Text>

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
      />

      {errors.credentials ? (
        <Text style={styles.error}>{errors.credentials}</Text>
      ) : null}

      <PrimaryButton title="Log in" onPress={handleLogin} />
    </ScrollView>
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
  heading: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.medium,
  },
});