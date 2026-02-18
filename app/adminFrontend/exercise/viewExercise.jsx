import { Video } from "expo-av";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ViewExercise() {
  const exercises = [
    {
      id: 1,
      name: "Push Ups",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Chest, shoulders aur triceps strong banata hai.",
    },
    {
      id: 2,
      name: "Squats",
      video: "https://www.w3schools.com/html/movie.mp4",
      description: "Legs aur glutes ke liye best exercise.",
    },
    {
      id: 3,
      name: "Plank",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Core strength improve karta hai.",
    },
    {
      id: 4,
      name: "Jumping Jacks",
      video: "https://www.w3schools.com/html/movie.mp4",
      description: "Full body cardio exercise.",
    },
    {
      id: 5,
      name: "Lunges",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Leg balance aur strength ke liye.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {exercises.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Video */}
          <Video
            source={{ uri: item.video }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
          />

          {/* Name */}
          <Text style={styles.name}>{item.name}</Text>

          {/* Description */}
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 4, // Android shadow
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#000",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
