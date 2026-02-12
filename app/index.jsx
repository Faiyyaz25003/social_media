import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.title}>Dashboard Overview</Text>
        <Text style={styles.sub}>Todays Stats</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() => router.push("/achievements")}
      >
        <Text style={styles.title}>Achievements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() => router.push("/exercise")}
      >
        <Text style={styles.title}>Exercise Reference</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.box}
        onPress={() => router.push("/schedule")}
      >
        <Text style={styles.title}>Weekly Schedule</Text>
        <Text style={styles.sub}>Recent Members (Last 3 Days)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  box: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sub: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
});
