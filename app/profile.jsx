import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Pressable,
} from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 3;
const SIDEBAR_WIDTH = width * 0.7;

/* ---------------- DATA ---------------- */

const stories = [
  { id: "1", title: "islamic", image: "https://picsum.photos/100?1" },
  { id: "2", title: "songs", image: "https://picsum.photos/100?2" },
  { id: "3", title: "bestie", image: "https://picsum.photos/100?3" },
  { id: "4", title: "me", image: "https://picsum.photos/100?4" },
  { id: "5", title: "cricket", image: "https://picsum.photos/100?5" },
];

const posts = Array.from({ length: 12 }).map((_, i) => ({
  id: i.toString(),
  image: `https://picsum.photos/400?random=${i + 10}`,
}));

/* ---------------- MAIN ---------------- */

export default function InstagramProfile() {
  const [selectedTab, setSelectedTab] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const translateX = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(translateX, {
      toValue: SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSidebarOpen(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ---------------- PROFILE FEED ---------------- */}
      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* TOP BAR */}
            <View style={styles.topBar}>
              <Text style={styles.username}>__alone_boy__256</Text>
              <TouchableOpacity onPress={openSidebar}>
                <Text style={styles.menuIcon}>☰</Text>
              </TouchableOpacity>
            </View>

            {/* PROFILE */}
            <View style={styles.profileSection}>
              <LinearGradient
                colors={["#f09433", "#dc2743", "#bc1888"]}
                style={styles.avatarRing}
              >
                <Image
                  source={{ uri: "https://i.pravatar.cc/150" }}
                  style={styles.avatar}
                />
              </LinearGradient>

              <View style={styles.stats}>
                <Stat count="28" label="Posts" />
                <Stat count="704" label="Followers" />
                <Stat count="73" label="Following" />
              </View>
            </View>

            {/* BIO */}
            <View style={styles.bio}>
              <Text style={styles.name}>Khan Faiyyaz</Text>
              <Text style={styles.bioText}>💻 Software Developer</Text>
              <Text style={styles.bioText}>✨ Dream in code</Text>
              <Text style={styles.link}>github.com/alone_boy_256</Text>
            </View>

            {/* BUTTONS */}
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.btnText}>View Archive</Text>
              </TouchableOpacity>
            </View>

            {/* STORIES */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {stories.map((s) => (
                <View key={s.id} style={styles.story}>
                  <Image source={{ uri: s.image }} style={styles.storyImg} />
                  <Text style={styles.storyText}>{s.title}</Text>
                </View>
              ))}
            </ScrollView>

            {/* TABS */}
            <View style={styles.tabs}>
              {["grid", "reels", "tagged"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, selectedTab === tab && styles.activeTab]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text style={styles.tabText}>{tab}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.post} />
        )}
      />

      {/* ---------------- SIDEBAR ---------------- */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <Pressable style={styles.overlay} onPress={closeSidebar} />

          {/* Sidebar */}
          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX }] }]}
          >
            <Text style={styles.sidebarTitle}>Menu</Text>

            <SidebarItem title="Change Password" />
            <SidebarItem title="Settings" />
            <SidebarItem title="Your Activity" />
            <SidebarItem title="Switch Account" />

            <TouchableOpacity onPress={closeSidebar}>
              <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </View>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Stat = ({ count, label }) => (
  <View style={styles.stat}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const SidebarItem = ({ title }) => (
  <TouchableOpacity style={styles.sidebarItem}>
    <Text style={styles.sidebarText}>{title}</Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  username: { fontSize: 20, fontWeight: "700" },
  menuIcon: { fontSize: 26 },

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatarRing: {
    padding: 3,
    borderRadius: 50,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },

  stats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  stat: { alignItems: "center" },
  statCount: { fontWeight: "700", fontSize: 18 },
  statLabel: { color: "#777" },

  bio: { paddingHorizontal: 16 },
  name: { fontWeight: "700" },
  bioText: { marginTop: 2 },
  link: { color: "#00376b", marginTop: 4 },

  buttons: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: "#efefef",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { fontWeight: "600" },

  story: { alignItems: "center", margin: 8 },
  storyImg: { width: 60, height: 60, borderRadius: 30 },
  storyText: { fontSize: 12 },

  tabs: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  tab: { flex: 1, padding: 12, alignItems: "center" },
  activeTab: { borderBottomWidth: 2 },
  tabText: { fontWeight: "600" },

  post: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 9,
  },

  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#fff",
    padding: 20,
    zIndex: 10,
    elevation: 10, // ANDROID FIX
  },

  sidebarTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  sidebarItem: {
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  sidebarText: { fontSize: 16 },
  closeBtn: {
    marginTop: 30,
    color: "#3897f0",
    fontWeight: "700",
  },
});
