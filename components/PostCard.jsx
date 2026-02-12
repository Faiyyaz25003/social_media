// import { AntDesign, Feather } from "@expo/vector-icons";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// export default function PostCard({ post }) {
//   return (
//     <View style={styles.card}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: post.profilePic }} style={styles.avatar} />
//           <Text style={styles.user}>{post.user}</Text>
//         </View>
//         <Feather name="more-vertical" size={20} color="#000" />
//       </View>

//       {/* Post Image */}
//       <Image source={{ uri: post.image }} style={styles.image} />

//       {/* Actions */}
//       <View style={styles.actions}>
//         <View style={styles.leftActions}>
//           <TouchableOpacity>
//             <AntDesign name="hearto" size={24} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Feather name="message-circle" size={24} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Feather name="send" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity>
//           <Feather name="bookmark" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Likes */}
//       <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>

//       {/* Caption */}
//       <Text style={styles.caption}>
//         <Text style={styles.user}>{post.user} </Text>
//         {post.caption}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginBottom: 25,
//     backgroundColor: "#fff", // ✅ White background
//     borderRadius: 10,
//     overflow: "hidden",
//     elevation: 3, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//   },

//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   avatar: {
//     width: 35,
//     height: 35,
//     borderRadius: 20,
//     marginRight: 10,
//   },

//   user: {
//     color: "#000", // ✅ Dark text
//     fontWeight: "bold",
//   },

//   image: {
//     width: "100%",
//     height: 350,
//   },

//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },

//   leftActions: {
//     flexDirection: "row",
//     gap: 15,
//   },

//   likes: {
//     color: "#000",
//     fontWeight: "600",
//     paddingHorizontal: 10,
//   },

//   caption: {
//     color: "#333",
//     paddingHorizontal: 10,
//     paddingTop: 4,
//     paddingBottom: 10,
//   },
// });

import { AntDesign, Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.profilePic }} style={styles.avatar} />
        <Text style={styles.username}>{post.user}</Text>
      </View>

      {/* 🔹 POST IMAGE (IMPORTANT PART) */}
      <Image
        source={{ uri: post.image }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* 🔹 Actions */}
      <View style={styles.actions}>
        <AntDesign name="hearto" size={24} />
        <Feather name="message-circle" size={24} />
        <Feather name="send" size={24} />
      </View>

      {/* 🔹 Likes */}
      <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>

      {/* 🔹 Caption */}
      <Text style={styles.caption}>
        <Text style={{ fontWeight: "bold" }}>{post.user} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },

  /* 🔴 IMAGE STYLE (MOST IMPORTANT) */
  postImage: {
    width: "100%",
    height: 400, // 👈 WITHOUT THIS IMAGE WILL NOT SHOW
    backgroundColor: "#eee",
  },

  actions: {
    flexDirection: "row",
    padding: 10,
    gap: 15,
  },
  likes: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  caption: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
