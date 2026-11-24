import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AnimeCard from "@/components/AnimeCard";
import EmptyState from "@/components/EmptyState";
import StatusChip from "@/components/StatusChip";
import { colors, fontSize, radius, spacing, touchTarget } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";
import type { Anime } from "@/types/anime";

const trendingAnime = catalogue.filter((anime) => anime.trending);
const popularAnime = catalogue.filter((anime) => anime.popular);
const genres = [...new Set(catalogue.flatMap((anime) => anime.genres))].sort();
const typeLabels = { all: "All", series: "Series", movie: "Movies" } as const;
const types = ["all", "series", "movie"] as const;

const openAnime = (anime: Anime) =>
  router.push({ pathname: "/anime/[id]", params: { id: anime.id } });

function AnimeRow({ title, data }: { title: string; data: Anime[] }) {
  if (data.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.heading}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(anime) => anime.id}
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.rowCard}>
            <AnimeCard anime={item} onPress={() => openAnime(item)} />
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

  function clearAll() {
    setSearch("");
    setTypeFilter("all");
    setGenreFilter(null);
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.gridRow}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      numColumns={2}
      data={results}
      keyExtractor={(anime) => anime.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <View style={styles.controls}>
            <View style={styles.searchRow}>
              <View style={styles.searchBox}>
                <Ionicons name="search" size={18} color={colors.textMuted} accessibilityElementsHidden />
                <TextInput
                  accessibilityLabel="Search anime"
                  placeholder="Search anime"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="search"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.searchInput}
                />
                {search ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Clear search"
                    onPress={() => setSearch("")}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                  </Pressable>
                ) : null}
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={filterCount ? `Filters, ${filterCount} active` : "Filters"}
                accessibilityState={{ expanded: showFilters }}
                onPress={() => setShowFilters((shown) => !shown)}
                style={({ pressed }) => [
                  styles.filterButton,
                  (showFilters || filterCount > 0) && styles.filterButtonActive,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="options-outline" size={22} color={colors.primary} />
                {filterCount > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{filterCount}</Text>
                  </View>
                ) : null}
              </Pressable>
            </View>
            {showFilters ? (
              <View style={styles.filterPanel}>
                <Text style={styles.filterTitle}>Type</Text>
                <View style={styles.chips}>
                  {types.map((type) => (
                    <StatusChip
                      key={type}
                      label={typeLabels[type]}
                      selected={typeFilter === type}
                      onPress={() => setTypeFilter(type)}
                    />
                  ))}
                </View>
                <Text style={styles.filterTitle}>Genre</Text>
                <View style={styles.chips}>
                  {genres.map((genre) => (
                    <StatusChip
                      key={genre}
                      label={genre}
                      selected={genreFilter === genre}
                      onPress={() => setGenreFilter((current) => current === genre ? null : genre)}
                    />
                  ))}
                </View>
                {filterCount > 0 ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => { setTypeFilter("all"); setGenreFilter(null); }}
                    style={styles.resetButton}
                  >
                    <Text style={styles.resetLabel}>Reset filters</Text>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </View>
          {showFeatured ? (
            <>
              <AnimeRow title="Trending now" data={trendingAnime} />
              <AnimeRow title="Popular" data={popularAnime} />
              <Text accessibilityRole="header" style={styles.heading}>All anime</Text>
            </>
          ) : (
            <Text style={styles.resultCount} accessibilityLiveRegion="polite">
              {results.length} {results.length === 1 ? "result" : "results"}
            </Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.gridCell}>
          <AnimeCard anime={item} onPress={() => openAnime(item)} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.result}>
          <EmptyState
            icon="search-outline"
            message={query ? `No anime match "${search.trim()}".` : "No anime match your filters."}
            actionLabel="Clear search and filters"
            onAction={clearAll}
          />
        </View>
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
    paddingTop: spacing.medium,
    paddingBottom: spacing.xlarge,
    gap: spacing.large,
  },
  header: {
    gap: spacing.large,
  },
  controls: {
    paddingHorizontal: spacing.medium,
    gap: spacing.medium - 4,
  },
  searchRow: {
    flexDirection: "row",
    gap: spacing.small,
  },
  searchBox: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    paddingLeft: spacing.medium - 4,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  searchInput: {
    flex: 1,
    alignSelf: "stretch",
    color: colors.text,
    fontSize: fontSize.medium,
  },
  clearButton: {
    width: touchTarget,
    height: touchTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  filterButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  pressed: {
    opacity: 0.8,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.onPrimary,
    fontSize: fontSize.xsmall,
    fontWeight: "800",
  },
  filterPanel: {
    gap: spacing.small,
    padding: spacing.medium,
    borderRadius: radius.large,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTitle: {
    color: colors.textMuted,
    fontSize: fontSize.small,
    fontWeight: "600",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
    marginBottom: spacing.small,
  },
  resetButton: {
    alignSelf: "flex-start",
    minHeight: touchTarget,
    justifyContent: "center",
  },
  resetLabel: {
    color: colors.primary,
    fontSize: fontSize.medium,
    fontWeight: "600",
  },
  section: {
    gap: spacing.medium - 4,
  },
  heading: {
    paddingHorizontal: spacing.medium,
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: "700",
  },
  resultCount: {
    paddingHorizontal: spacing.medium,
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
  row: {
    paddingHorizontal: spacing.medium,
    gap: spacing.medium - 4,
  },
  rowCard: {
    width: 128,
  },
  gridRow: {
    paddingHorizontal: spacing.medium - 6,
  },
  // Padding instead of gap keeps an odd last item the same width as the others.
  gridCell: {
    flex: 1,
    maxWidth: "50%",
    paddingHorizontal: 6,
  },
  result: {
    paddingHorizontal: spacing.medium,
  },
});
