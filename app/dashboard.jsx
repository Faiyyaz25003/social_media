import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🏋️ Gym Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Total Members</Text>
        <Text style={styles.value}>124</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Active Members</Text>
        <Text style={styles.value}>98</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Total Trainers</Text>
        <Text style={styles.value}>6</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Today’s Stats</Text>
        <Text style={styles.sub}>• 5 New Joins</Text>
        <Text style={styles.sub}>• 12 Check-ins</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
  },
  card: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  value: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 6,
  },
  sub: {
    fontSize: 14,
    marginTop: 4,
  },
});
