import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Exercise() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise</Text>
      <Text style={styles.subtitle}>Manage workout exercises</Text>

      {/* Create Exercise Card */}
      <TouchableOpacity
        style={[styles.card, styles.createCard]}
        onPress={() => router.push("/adminFrontend/exercise/createExercise")}
      >
        <Ionicons name="add-circle" size={34} color="#ffffff" />
        <Text style={styles.cardTitle}>Create Exercise</Text>
        <Text style={styles.cardText}>Add new exercise with video</Text>
      </TouchableOpacity>

      {/* View Exercise Card */}
      <TouchableOpacity
        style={[styles.card, styles.viewCard]}
        onPress={() => router.push("/adminFrontend/exercise/viewExercise")}
      >
        <Ionicons name="eye" size={34} color="#ffffff" />
        <Text style={styles.cardTitle}>View Exercise</Text>
        <Text style={styles.cardText}>See all exercises & videos</Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // ✅ white background
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 30,
  },

  card: {
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    alignItems: "center",
    elevation: 5,
  },

  createCard: {
    backgroundColor: "#22c55e",
  },

  viewCard: {
    backgroundColor: "#3b82f6",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#ffffff",
  },

  cardText: {
    fontSize: 14,
    marginTop: 6,
    color: "#f8fafc",
    textAlign: "center",
  },
});
