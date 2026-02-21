import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProgressComparison() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress Comparison</Text>
      <Text style={styles.subtitle}>See your transformation journey 💪</Text>

      {/* Image Comparison Section */}
      <View style={styles.imageContainer}>
        {/* Before Image */}
        <View style={styles.imageBox}>
          <Text style={styles.imageLabel}>Before</Text>
          <Image
            source={{ uri: "https://i.imgur.com/5u2KxXK.jpg" }}
            style={styles.image}
          />
        </View>

        {/* After Image */}
        <View style={styles.imageBox}>
          <Text style={styles.imageLabel}>After</Text>
          <Image
            source={{ uri: "https://i.imgur.com/8Km9tLL.jpg" }}
            style={styles.image}
          />
        </View>
      </View>

      {/* Difference Section */}
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>
          <Ionicons name="analytics" size={20} color="#fff" /> Transformation
          Summary
        </Text>

        <Text style={styles.resultText}>🔥 Weight Loss: 6 kg</Text>
        <Text style={styles.resultText}>💪 Muscle Gain: +3 kg Lean Mass</Text>
        <Text style={styles.resultText}>📏 Waist Reduced: -4 inches</Text>
        <Text style={styles.resultText}>🏃 Stamina Improved: +40%</Text>
        <Text style={styles.resultText}>⚡ Body Fat Reduced: -8%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#111",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBox: {
    width: "48%",
  },
  imageLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
  },
  resultCard: {
    marginTop: 25,
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 15,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 6,
  },
});
