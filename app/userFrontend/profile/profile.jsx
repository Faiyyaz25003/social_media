// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = await AsyncStorage.getItem("token");
//         if (!token) {
//           console.log("No token found");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           "http://localhost:5000/api/users/profile",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         setUser(res.data);
//       } catch (err) {
//         console.log("Profile fetch error:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading)
//     return (
//       <ActivityIndicator size="large" color="#0000ff" style={styles.center} />
//     );
//   if (!user) return <Text style={styles.center}>No profile data found.</Text>;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{user.fullName}</Text>
//       <Text>Email: {user.email}</Text>
//       <Text>Plan: {user.membershipPlan}</Text>
//       {user.qrCode && (
//         <Image
//           source={{ uri: user.qrCode }}
//           style={styles.qr}
//           resizeMode="contain"
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, alignItems: "center" },
//   center: { flex: 1, textAlign: "center", marginTop: 50 },
//   name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   qr: { width: 200, height: 200, marginTop: 20 },
// });

import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("Token not found in storage");
          setLoading(false);
          return;
        }

        console.log("Token found:", token);

        const res = await axios.get(
          "http://localhost:5000/api/users/profile", // ✅ apna IPv4 address
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(res.data);
      } catch (err) {
        console.log("Profile fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.center} />
    );

  if (!user) return <Text style={styles.center}>No profile data found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.fullName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Plan: {user.membershipPlan}</Text>

      {user.qrCode && (
        <Image
          source={{ uri: user.qrCode }}
          style={styles.qr}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  center: { flex: 1, textAlign: "center", marginTop: 50 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  qr: { width: 200, height: 200, marginTop: 20 },
});