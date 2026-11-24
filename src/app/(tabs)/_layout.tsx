import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";

import { colors } from "@/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

function tabIcon(active: IconName, inactive: IconName) {
  return function TabIcon({ color, size, focused }: { color: unknown; size: number; focused: boolean }) {
    return <Ionicons name={focused ? active : inactive} color={color as string} size={size} />;
  };
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: tabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="discover"
        options={{ title: "Discover", tabBarIcon: tabIcon("compass", "compass-outline") }}
      />
      <Tabs.Screen
        name="lists"
        options={{ title: "My Lists", tabBarIcon: tabIcon("albums", "albums-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: tabIcon("person-circle", "person-circle-outline") }}
      />
    </Tabs>
  );
}
