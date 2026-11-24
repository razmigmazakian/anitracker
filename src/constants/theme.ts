import type { ListStatus } from "@/types/anime";

// Dark-first palette. All text tokens meet WCAG AA (4.5:1) on background and surface.
export const colors = {
  background: "#0E0F16",
  card: "#181A25",
  cardRaised: "#222536",
  text: "#F5F6FA",
  textMuted: "#A9ADBF",
  primary: "#A78BFA",
  onPrimary: "#14101F",
  primarySoft: "rgba(167, 139, 250, 0.16)",
  danger: "#F87171",
  dangerSoft: "rgba(248, 113, 113, 0.12)",
  rating: "#FBBF24",
  border: "#2E3144",
  track: "#2E3144",
};

export const statusColors: Record<ListStatus, string> = {
  watching: "#A78BFA",
  planned: "#7DD3FC",
  completed: "#4ADE80",
  onHold: "#FBBF24",
  dropped: "#F87171",
};

// 4/8pt rhythm.
export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const radius = {
  small: 8,
  medium: 12,
  large: 16,
  pill: 999,
};

export const fontSize = {
  xsmall: 12,
  small: 14,
  medium: 16,
  title: 20,
  large: 24,
  display: 32,
};

export const touchTarget = 44;
