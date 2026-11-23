import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AnimeCard from "@/components/AnimeCard";
import { colors, fontSize, spacing } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";

export default function DiscoverScreen() {
  return (
    <FlatList
      data={catalogue}
      keyExtractor={(anime) => anime.id}
      style={styles.screen}
      contentContainerStyle={styles.content}
      ListHeaderComponent={<Text style={styles.heading}>Discover</Text>}
      ListEmptyComponent={<Text style={styles.empty}>No anime in the catalogue.</Text>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <AnimeCard
          anime={item}
          onPress={() =>
            router.push({
              pathname: "/anime/[id]",
              params: { id: item.id },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.medium,
  },
  heading: {
    color: colors.text,
    fontSize: fontSize.large,
    marginBottom: spacing.medium,
  },
  empty: {
    color: colors.textMuted,
  },
  separator: {
    height: spacing.medium,
  },
});