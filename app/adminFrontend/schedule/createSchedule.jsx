// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";

// const BASE_URL = "http://localhost:5000"; // Change if needed

// const daysList = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// export default function ScheduleScreen() {
//   const [className, setClassName] = useState("");
//   const [days, setDays] = useState([]);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [trainer, setTrainer] = useState("");
//   const [maxMembers, setMaxMembers] = useState("");
//   const [status, setStatus] = useState("Active");

//   const [trainers, setTrainers] = useState([]);
//   const [schedules, setSchedules] = useState([]);

//   useEffect(() => {
//     fetchTrainers();
//     fetchSchedules();
//   }, []);

//   const fetchTrainers = async () => {
//     const res = await axios.get(`${BASE_URL}/api/trainers/all`);
//     setTrainers(res.data);
//   };

//   const fetchSchedules = async () => {
//     const res = await axios.get(`${BASE_URL}/api/schedules`);
//     setSchedules(res.data);
//   };

//   const toggleDay = (day) => {
//     if (days.includes(day)) {
//       setDays(days.filter((d) => d !== day));
//     } else {
//       setDays([...days, day]);
//     }
//   };

//   const createSchedule = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/schedules`, {
//         className,
//         days,
//         startTime,
//         endTime,
//         trainer,
//         maxMembers,
//         status,
//       });

//       Alert.alert("Success", "Schedule Created");
//       fetchSchedules();
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   const deleteSchedule = async (id) => {
//     await axios.delete(`${BASE_URL}/api/schedules/${id}`);
//     fetchSchedules();
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Create Schedule</Text>

//       <TextInput
//         placeholder="Class Name"
//         style={styles.input}
//         value={className}
//         onChangeText={setClassName}
//       />

//       <Text style={styles.label}>Select Days</Text>
//       {daysList.map((day) => (
//         <TouchableOpacity
//           key={day}
//           onPress={() => toggleDay(day)}
//           style={[
//             styles.dayButton,
//             days.includes(day) && { backgroundColor: "#4CAF50" },
//           ]}
//         >
//           <Text style={{ color: "#fff" }}>{day}</Text>
//         </TouchableOpacity>
//       ))}

//       <TextInput
//         placeholder="Start Time"
//         style={styles.input}
//         value={startTime}
//         onChangeText={setStartTime}
//       />

//       <TextInput
//         placeholder="End Time"
//         style={styles.input}
//         value={endTime}
//         onChangeText={setEndTime}
//       />

//       <Text style={styles.label}>Select Trainer</Text>
//       <Picker
//         selectedValue={trainer}
//         onValueChange={(itemValue) => setTrainer(itemValue)}
//       >
//         <Picker.Item label="Select Trainer" value="" />
//         {trainers.map((t) => (
//           <Picker.Item key={t._id} label={t.fullName} value={t._id} />
//         ))}
//       </Picker>

//       <TextInput
//         placeholder="Max Members"
//         style={styles.input}
//         value={maxMembers}
//         onChangeText={setMaxMembers}
//         keyboardType="numeric"
//       />

//       <Picker
//         selectedValue={status}
//         onValueChange={(itemValue) => setStatus(itemValue)}
//       >
//         <Picker.Item label="Active" value="Active" />
//         <Picker.Item label="Inactive" value="Inactive" />
//       </Picker>

//       <TouchableOpacity style={styles.button} onPress={createSchedule}>
//         <Text style={{ color: "#fff" }}>Create Schedule</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 15 },
//   title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: "#2196F3",
//     padding: 12,
//     alignItems: "center",
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   card: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   deleteBtn: {
//     backgroundColor: "red",
//     padding: 8,
//     marginTop: 5,
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   dayButton: {
//     backgroundColor: "#888",
//     padding: 8,
//     marginVertical: 3,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   label: { marginTop: 10, fontWeight: "bold" },
// });

import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL = "http://localhost:5000";

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_SHORT = {
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WED",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
  Sunday: "SUN",
};

export default function ScheduleScreen() {
  const [className, setClassName] = useState("");
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [status, setStatus] = useState("Active");

  const [trainers, setTrainers] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchTrainers();
    fetchSchedules();
  }, []);

  const fetchTrainers = async () => {
    const res = await axios.get(`${BASE_URL}/api/trainers/all`);
    setTrainers(res.data);
  };

  const fetchSchedules = async () => {
    const res = await axios.get(`${BASE_URL}/api/schedules`);
    setSchedules(res.data);
  };

  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const createSchedule = async () => {
    try {
      await axios.post(`${BASE_URL}/api/schedules`, {
        className,
        days,
        startTime,
        endTime,
        trainer,
        maxMembers,
        status,
      });
      Alert.alert("Success", "Schedule Created");
      fetchSchedules();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const deleteSchedule = async (id) => {
    await axios.delete(`${BASE_URL}/api/schedules/${id}`);
    fetchSchedules();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEyebrow}>GYM MANAGER</Text>
        <Text style={styles.headerTitle}>NEW{"\n"}SCHEDULE</Text>
        <View style={styles.headerAccent} />
      </View>

      {/* Form Card */}
      <View style={[styles.card, { marginTop: 20 }]}>
        {/* Class Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>CLASS NAME</Text>
          <TextInput
            placeholder="e.g. Power Yoga, HIIT, Boxing"
            placeholderTextColor="#555"
            style={styles.input}
            value={className}
            onChangeText={setClassName}
          />
        </View>

        {/* Days */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>SELECT DAYS</Text>
          <View style={styles.daysGrid}>
            {daysList.map((day) => {
              const selected = days.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(day)}
                  style={[styles.dayChip, selected && styles.dayChipActive]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayChipText,
                      selected && styles.dayChipTextActive,
                    ]}
                  >
                    {DAY_SHORT[day]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time Row */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.fieldLabel}>START TIME</Text>
            <TextInput
              placeholder="09:00 AM"
              placeholderTextColor="#555"
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
            />
          </View>
          <View style={[styles.fieldGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.fieldLabel}>END TIME</Text>
            <TextInput
              placeholder="10:00 AM"
              placeholderTextColor="#555"
              style={styles.input}
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>
        </View>

        {/* Trainer */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>TRAINER</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={trainer}
              onValueChange={(itemValue) => setTrainer(itemValue)}
              style={styles.picker}
              dropdownIconColor="#E8FF3B"
            >
              <Picker.Item label="— Select Trainer —" value="" color="#555" />
              {trainers.map((t) => (
                <Picker.Item
                  key={t._id}
                  label={t.fullName}
                  value={t._id}
                  color="#fff"
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Max Members */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>MAX MEMBERS</Text>
          <TextInput
            placeholder="e.g. 20"
            placeholderTextColor="#555"
            style={styles.input}
            value={maxMembers}
            onChangeText={setMaxMembers}
            keyboardType="numeric"
          />
        </View>

        {/* Status */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>STATUS</Text>
          <View style={styles.statusRow}>
            {["Active", "Inactive"].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s)}
                style={[
                  styles.statusChip,
                  status === s && styles.statusChipActive,
                ]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: s === "Active" ? "#E8FF3B" : "#FF4D4D" },
                  ]}
                />
                <Text
                  style={[
                    styles.statusChipText,
                    status === s && styles.statusChipTextActive,
                  ]}
                >
                  {s.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={createSchedule}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>CREATE SCHEDULE</Text>
          <View style={styles.submitArrow}>
            <Text style={styles.submitArrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  headerEyebrow: {
    color: "#4F8EF7",
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: "700",
    marginBottom: 8,
  },
  headerTitle: {
    color: "#1A1A2E",
    fontSize: 52,
    fontWeight: "900",
    lineHeight: 52,
    letterSpacing: -1,
  },
  headerAccent: {
    position: "absolute",
    right: 24,
    top: 60,
    width: 4,
    height: 80,
    backgroundColor: "#4F8EF7",
    borderRadius: 2,
  },

  // Card
  card: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ECECEC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  // Fields
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: "#9B9BAA",
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8F9FC",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    borderRadius: 12,
    padding: 14,
    color: "#1A1A2E",
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
  },

  // Days Grid
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F8F9FC",
    borderWidth: 1,
    borderColor: "#E8EAF0",
  },
  dayChipActive: {
    backgroundColor: "#4F8EF7",
    borderColor: "#4F8EF7",
  },
  dayChipText: {
    color: "#9B9BAA",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  dayChipTextActive: {
    color: "#FFFFFF",
  },

  // Picker
  pickerWrapper: {
    backgroundColor: "#F8F9FC",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    color: "#1A1A2E",
    height: 52,
  },

  // Status
  statusRow: {
    flexDirection: "row",
    gap: 10,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F8F9FC",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    gap: 8,
  },
  statusChipActive: {
    borderColor: "#4F8EF7",
    backgroundColor: "#4F8EF710",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusChipText: {
    color: "#9B9BAA",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  statusChipTextActive: {
    color: "#1A1A2E",
  },

  // Submit
  submitButton: {
    backgroundColor: "#4F8EF7",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
  },
  submitArrow: {
    width: 32,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitArrowText: {
    color: "#4F8EF7",
    fontSize: 16,
    fontWeight: "bold",
  },

  // List Section
  listSection: {
    marginHorizontal: 16,
    marginTop: 28,
  },
  listTitle: {
    color: "#4F8EF7",
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: "700",
    marginBottom: 14,
  },
  scheduleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ECECEC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  scheduleCardLeft: {
    flex: 1,
  },
  scheduleClassName: {
    color: "#1A1A2E",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  scheduleMeta: {
    color: "#9B9BAA",
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "600",
    marginBottom: 4,
  },
  scheduleTime: {
    color: "#4F8EF7",
    fontSize: 12,
    fontWeight: "700",
  },
  scheduleCardRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  deleteBtn: {
    backgroundColor: "#FF4D4D10",
    borderWidth: 1,
    borderColor: "#FF4D4D44",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: "#FF4D4D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
});