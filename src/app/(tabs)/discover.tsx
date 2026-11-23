import { router } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import AnimeCard from "@/components/AnimeCard";
import { colors, fontSize, spacing } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";
import type { Anime } from "@/types/anime";

const trendingAnime = catalogue.filter((anime) => anime.trending);
const popularAnime = catalogue.filter((anime) => anime.popular);

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
            <AnimeCard
              anime={item}
              onPress={() =>
                router.push({
                  pathname: "/anime/[id]",
                  params: { id: item.id },
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

export default function DiscoverScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <AnimeRow title="Trending" data={trendingAnime} />
      <AnimeRow title="Popular" data={popularAnime} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.medium,
    gap: spacing.large,
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
    width: 200,
  },
  empty: {
    color: colors.textMuted,
  },
});