import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://YOUR_PC_IP:5000/api/plans";

export default function ViewPlansScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH PLANS */
  const fetchPlans = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setPlans(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* DELETE PLAN */
  const deletePlan = (id) => {
    Alert.alert("Delete Plan", "Are you sure you want to delete this plan?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchPlans();
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Plans</Text>

      <FlatList
        data={plans}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.planName}>{item.planName}</Text>
              <Text>Duration: {item.duration}</Text>
              <Text>Price: ₹ {item.price}</Text>
              <Text>Status: {item.status}</Text>
              {item.isPopular && <Text style={styles.popular}>🔥 Popular</Text>}
            </View>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deletePlan(item._id)}
            >
              <Ionicons name="trash" size={22} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
  },
  popular: {
    color: "green",
    fontWeight: "bold",
    marginTop: 5,
  },
});
