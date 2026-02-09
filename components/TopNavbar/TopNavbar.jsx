import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function TopNavbar() {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#000",
        justifyContent: "center",
      }}
    >
      {/* Left (Post) */}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 15,
        }}
      >
        <Ionicons name="add-circle-outline" size={26} color="white" />
      </TouchableOpacity>

      {/* Center (Title) */}
      <Text
        style={{
          color: "#1DA1F2",
          fontSize: 22,
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        Talkify
      </Text>

      {/* Right (Chat) */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 15,
        }}
      >
        <Ionicons name="chatbubble-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
