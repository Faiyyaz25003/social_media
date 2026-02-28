import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://YOUR_PC_IP:5000/api/exercises";

export default function ExerciseScreen() {
  const [exercises, setExercises] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    exerciseName: "",
    video: "",
    shortDescription: "",
    muscleGroup: "",
    equipmentRequired: "",
    difficultyLevel: "",
    exerciseType: "",
  });

  /* FETCH */
  const fetchExercises = async () => {
    const res = await axios.get(BASE_URL);
    setExercises(res.data);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  /* CREATE or UPDATE */
  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`${BASE_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(BASE_URL, form);
    }

    setForm({
      exerciseName: "",
      video: "",
      shortDescription: "",
      muscleGroup: "",
      equipmentRequired: "",
      difficultyLevel: "",
      exerciseType: "",
    });

    fetchExercises();
  };

  /* DELETE */
  const deleteExercise = (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await axios.delete(`${BASE_URL}/${id}`);
          fetchExercises();
        },
      },
    ]);
  };

  /* EDIT */
  const editExercise = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exercise Management</Text>

      {Object.keys(form).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={form[key]}
          style={styles.input}
          onChangeText={(text) => setForm({ ...form, [key]: text })}
        />
      ))}

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {editingId ? "Update Exercise" : "Add Exercise"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.exerciseName}</Text>
            <Text>{item.muscleGroup}</Text>
            <Text>{item.difficultyLevel}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => editExercise(item)}
                style={styles.editBtn}
              >
                <Ionicons name="create" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteExercise(item._id)}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  btn: {
    backgroundColor: "#2ecc71",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  editBtn: {
    backgroundColor: "#3498db",
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 6,
  },
});
