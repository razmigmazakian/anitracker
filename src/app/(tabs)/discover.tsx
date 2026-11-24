import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AnimeCard from "@/components/AnimeCard";
import StatusChip from "@/components/StatusChip";
import { colors, fontSize, spacing } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";
import type { Anime } from "@/types/anime";

const trendingAnime = catalogue.filter((anime) => anime.trending);
const popularAnime = catalogue.filter((anime) => anime.popular);
const genres = [...new Set(catalogue.flatMap((anime) => anime.genres))].sort();
const typeLabels = { all: "All", series: "Series", movie: "Movies" } as const;
const types = ["all", "series", "movie"] as const;

function DiscoverCard({ anime }: { anime: Anime }) {
  return (
    <AnimeCard
      anime={anime}
      onPress={() => router.push({ pathname: "/anime/[id]", params: { id: anime.id } })}
    />
  );
}

type AnimeRowProps = {
  title: string;
  data: Anime[];
};

function AnimeRow({ title, data }: AnimeRowProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(anime) => anime.id}
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No titles yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <DiscoverCard anime={item} />
          </View>
        )}
      />
    </View>
  );
}

export default function DiscoverScreen() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"all" | Anime["type"]>("all");
  const [genreFilter, setGenreFilter] = useState<string | null>(null);

  const query = search.trim().toLowerCase();
  const filterCount = Number(typeFilter !== "all") + Number(genreFilter !== null);
  const showFeatured = query === "" && filterCount === 0;
  const results = catalogue.filter((anime) =>
    anime.title.toLowerCase().includes(query)
    && (typeFilter === "all" || anime.type === typeFilter)
    && (genreFilter === null || anime.genres.includes(genreFilter))
  );

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      data={results}
      keyExtractor={(anime) => anime.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.controls}>
            <View style={styles.searchRow}>
              <TextInput
                accessibilityLabel="Search anime"
                placeholder="Search anime..."
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: showFilters }}
                onPress={() => setShowFilters((shown) => !shown)}
                style={styles.filterButton}
              >
                <Text style={styles.filterLabel}>
                  {filterCount ? `Filters (${filterCount})` : "Filters"}
                </Text>
              </Pressable>
            </View>
            {showFilters && (
              <View style={styles.chips}>
                {types.map((type) => (
                  <StatusChip
                    key={type}
                    label={typeLabels[type]}
                    selected={typeFilter === type}
                    onPress={() => setTypeFilter(type)}
                  />
                ))}
                {genres.map((genre) => (
                  <StatusChip
                    key={genre}
                    label={genre}
                    selected={genreFilter === genre}
                    onPress={() => setGenreFilter((current) => current === genre ? null : genre)}
                  />
                ))}
              </View>
            )}
          </View>
          {showFeatured && (
            <>
              <AnimeRow title="Trending" data={trendingAnime} />
              <AnimeRow title="Popular" data={popularAnime} />
              <Text style={styles.heading}>All anime</Text>
            </>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.result}>
          <DiscoverCard anime={item} />
        </View>
      )}
      ListEmptyComponent={
        <Text style={[styles.result, styles.empty]}>
          {query ? `No anime match '${search.trim()}'` : "No anime match your filters."}
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.medium,
    gap: spacing.medium,
  },
  header: {
    gap: spacing.large,
  },
  controls: {
    paddingHorizontal: spacing.medium,
    gap: spacing.small,
  },
  searchRow: {
    flexDirection: "row",
    gap: spacing.small,
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: fontSize.medium,
  },
  filterButton: {
    justifyContent: "center",
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.small,
    backgroundColor: colors.card,
  },
  filterLabel: {
    color: colors.primary,
    fontSize: fontSize.medium,
    fontWeight: "600",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  section: {
    gap: spacing.small,
  },
  heading: {
    paddingHorizontal: spacing.medium,
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  row: {
    paddingHorizontal: spacing.medium,
    gap: spacing.medium,
  },
  card: {
    width: 160,
  },
  result: {
    paddingHorizontal: spacing.medium,
  },
  empty: {
    color: colors.textMuted,
  },
});
