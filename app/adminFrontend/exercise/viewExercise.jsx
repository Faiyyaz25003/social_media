import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://YOUR_PC_IP:5000/api/exercises";

export default function ExerciseViewScreen() {
  const [exerciseId, setExerciseId] = useState("");
  const [singleExercise, setSingleExercise] = useState(null);
  const [allExercises, setAllExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  /* GET ALL */
  const getAllExercises = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setAllExercises(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* GET BY ID */
  const getExerciseById = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/${exerciseId}`);
      setSingleExercise(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSingleExercise(null);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exercise Viewer</Text>

      {/* GET BY ID SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get Exercise By ID</Text>

        <TextInput
          placeholder="Enter Exercise ID"
          style={styles.input}
          value={exerciseId}
          onChangeText={setExerciseId}
        />

        <TouchableOpacity style={styles.btn} onPress={getExerciseById}>
          <Text style={styles.btnText}>Get Exercise</Text>
        </TouchableOpacity>

        {singleExercise && (
          <View style={styles.card}>
            <Text style={styles.name}>{singleExercise.exerciseName}</Text>
            <Text>{singleExercise.shortDescription}</Text>
            <Text>Muscle: {singleExercise.muscleGroup}</Text>
            <Text>Difficulty: {singleExercise.difficultyLevel}</Text>
            <Text>Type: {singleExercise.exerciseType}</Text>
          </View>
        )}
      </View>

      {/* GET ALL SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get All Exercises</Text>

        <TouchableOpacity style={styles.btn} onPress={getAllExercises}>
          <Text style={styles.btnText}>Load All Exercises</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" />}

        <FlatList
          data={allExercises}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.exerciseName}</Text>
              <Text>{item.muscleGroup}</Text>
              <Text>{item.difficultyLevel}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
