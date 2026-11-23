import { Stack } from "expo-router";

import { EntriesProvider } from "@/context/EntriesContext";

export default function RootLayout() {
  return (
    <EntriesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </EntriesProvider>
  );
}
