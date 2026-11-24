import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

import { colors } from "@/constants/theme";
import { EntriesProvider } from "@/context/EntriesContext";

export default function RootLayout() {
  return (
    <EntriesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Log in", headerTitle: "" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="anime/[id]" options={{ title: "Details" }} />
      </Stack>
    </EntriesProvider>
  );
}
