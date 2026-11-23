import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  keyboardType?: TextInputProps["keyboardType"];
  multiline?: boolean;
  secureTextEntry?: boolean;
};

export default function TextField({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
  multiline,
  secureTextEntry = false,
}: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        multiline={multiline}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, error ? styles.invalidInput : null]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.small,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.medium,
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: spacing.small,
    color: colors.text,
    fontSize: fontSize.medium,
    padding: spacing.medium,
  },
  invalidInput: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.small,
  },
});