import { TextInput, View } from "react-native";

export default function Search() {
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search users or posts..."
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 12,
        }}
      />
    </View>
  );
}
