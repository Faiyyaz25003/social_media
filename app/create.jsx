import { Button, TextInput, View } from "react-native";
import TopNavbar from "../components/TopNavbar/TopNavbar";

export default function CreatePost() {
  return (
    <View style={{ flex: 1 }}>
      <TopNavbar />

      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="What's on your mind?"
          multiline
          style={{
            height: 120,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
        />
        <Button title="Post" />
      </View>
    </View>
  );
}
