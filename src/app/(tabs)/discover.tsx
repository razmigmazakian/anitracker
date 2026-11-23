import { router } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text>Discover</Text>
      <Button title="View anime #1" onPress={() => router.push("/anime/1")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
