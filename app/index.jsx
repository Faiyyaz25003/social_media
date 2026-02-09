import { FlatList } from "react-native";
import PostCard from "../components/PostCard";

const posts = [
  {
    id: "1",
    user: "harshit_rana_06",
    profilePic: "https://i.pravatar.cc/150?img=11",
    image: "https://picsum.photos/500/500?random=1",
    caption: "Surgery done right ✅ now focused on recovery 💪",
    likes: 268600,
  },
  {
    id: "2",
    user: "faiyyaz_khan",
    profilePic: "https://i.pravatar.cc/150?img=12",
    image: "https://picsum.photos/500/500?random=2",
    caption: "Learning React Native 📱🔥",
    likes: 1540,
  },
  {
    id: "3",
    user: "travel_diaries",
    profilePic: "https://i.pravatar.cc/150?img=13",
    image: "https://picsum.photos/500/500?random=3",
    caption: "Mountains calling 🏔️",
    likes: 9870,
  },
  {
    id: "4",
    user: "food_lovers",
    profilePic: "https://i.pravatar.cc/150?img=14",
    image: "https://picsum.photos/500/500?random=4",
    caption: "Pizza is life 🍕❤️",
    likes: 4320,
  },
  {
    id: "5",
    user: "gym_freak",
    profilePic: "https://i.pravatar.cc/150?img=15",
    image: "https://picsum.photos/500/500?random=5",
    caption: "No pain no gain 💪",
    likes: 8120,
  },
  {
    id: "6",
    user: "coder_world",
    profilePic: "https://i.pravatar.cc/150?img=16",
    image: "https://picsum.photos/500/500?random=6",
    caption: "Debugging at 2 AM 😵‍💫",
    likes: 2300,
  },
];

export default function Home() {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCard post={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
