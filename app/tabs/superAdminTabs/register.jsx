import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gymName, setGymName] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [gender, setGender] = useState("");

  const [subscriptionMonths, setSubscriptionMonths] = useState("");
  const [customMonths, setCustomMonths] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  /* ============================= */
  /* ✅ AUTO CALCULATE END DATE */
  /* ============================= */
  useEffect(() => {
    if (!startDate) return;

    let months =
      subscriptionMonths === "custom"
        ? parseInt(customMonths)
        : parseInt(subscriptionMonths);

    if (!months || isNaN(months)) {
      setEndDate(null);
      return;
    }

    const newEndDate = new Date(startDate);
    newEndDate.setMonth(newEndDate.getMonth() + months);
    setEndDate(newEndDate);
  }, [startDate, subscriptionMonths, customMonths]);

  /* ============================= */
  /* 📷 IMAGE PICKER */
  /* ============================= */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  /* ============================= */
  /* 📅 DATE HANDLING */
  /* ============================= */
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS !== "web") {
      setShowCalendar(false);
    }
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleWebDateChange = (e) => {
    const selected = new Date(e.target.value);
    setStartDate(selected);
  };

  /* ============================= */
  /* 📝 REGISTER */
  /* ============================= */
  const handleRegister = () => {
    if (
      !fullName ||
      !email ||
      !mobile ||
      !gymName ||
      !gymAddress ||
      !gender ||
      !subscriptionMonths ||
      !startDate ||
      !endDate
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    Alert.alert(
      "Success",
      `Subscription from ${startDate.toDateString()} to ${endDate.toDateString()}`,
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Gym Registration</Text>

        {/* Profile Photo */}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera" size={40} color="#555" />
          )}
        </TouchableOpacity>

        {/* Inputs */}
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="numeric"
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          placeholder="Gym Name"
          style={styles.input}
          value={gymName}
          onChangeText={setGymName}
        />
        <TextInput
          placeholder="Gym Address"
          style={styles.input}
          value={gymAddress}
          onChangeText={setGymAddress}
        />

        {/* Gender */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Subscription */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subscriptionMonths}
            onValueChange={(itemValue) => setSubscriptionMonths(itemValue)}
          >
            <Picker.Item label="Select Subscription Months" value="" />
            <Picker.Item label="1 Month" value="1" />
            <Picker.Item label="3 Months" value="3" />
            <Picker.Item label="6 Months" value="6" />
            <Picker.Item label="12 Months" value="12" />
            <Picker.Item label="Custom" value="custom" />
          </Picker>
        </View>

        {subscriptionMonths === "custom" && (
          <TextInput
            placeholder="Enter Custom Months"
            style={styles.input}
            keyboardType="numeric"
            value={customMonths}
            onChangeText={setCustomMonths}
          />
        )}

        {/* Date Picker */}
        {Platform.OS === "web" ? (
          <input
            type="date"
            onChange={handleWebDateChange}
            style={{
              padding: 12,
              borderRadius: 10,
              marginBottom: 15,
            }}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={styles.dateText}>
                {startDate ? startDate.toDateString() : "Select Start Date"}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        )}

        {/* End Date */}
        {endDate && (
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>
              End Date: {endDate.toDateString()}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ============================= */
/* 🎨 STYLES */
/* ============================= */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  imagePicker: {
    alignSelf: "center",
    marginBottom: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  dateBox: {
    backgroundColor: "#e8f5e9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
