import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
} from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width / 3;

// Sample data
const stories = [
  {
    id: "1",
    title: "islamic",
    image: "https://picsum.photos/100/100?random=1",
    hasNew: true,
  },
  {
    id: "2",
    title: "favorite songs",
    image: "https://picsum.photos/100/100?random=2",
    hasNew: true,
  },
  {
    id: "3",
    title: "bestie 💙",
    image: "https://picsum.photos/100/100?random=3",
    hasNew: false,
  },
  {
    id: "4",
    title: "Me",
    image: "https://picsum.photos/100/100?random=4",
    hasNew: false,
  },
  {
    id: "5",
    title: "champion 🏆",
    image: "https://picsum.photos/100/100?random=5",
    hasNew: false,
  },
  {
    id: "6",
    title: "cricket",
    image: "https://picsum.photos/100/100?random=6",
    hasNew: false,
  },
  {
    id: "7",
    title: "funny video",
    image: "https://picsum.photos/100/100?random=7",
    hasNew: false,
  },
];

const posts = Array.from({ length: 12 }).map((_, i) => ({
  id: i.toString(),
  image: `https://picsum.photos/400/400?random=${i + 10}`,
  likes: Math.floor(Math.random() * 1000) + 100,
}));

export default function InstagramProfile() {
  const [selectedTab, setSelectedTab] = useState("grid");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={posts}
        numColumns={3}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* Header Section with Gradient */}
            <View style={styles.topBar}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>__alone_boy__256</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              </View>
              <View style={styles.topIcons}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.icon}>➕</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.icon}>☰</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Profile Info with Enhanced Design */}
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={[
                    "#f09433",
                    "#e6683c",
                    "#dc2743",
                    "#cc2366",
                    "#bc1888",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientRing}
                >
                  <View style={styles.avatarWhiteRing}>
                    <Image
                      source={{ uri: "https://i.pravatar.cc/300" }}
                      style={styles.avatar}
                    />
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.statsContainer}>
                <StatItem count="28" label="posts" />
                <StatItem count="704" label="followers" />
                <StatItem count="73" label="following" />
              </View>
            </View>

            {/* Name & Bio with Enhanced Typography */}
            <View style={styles.bioSection}>
              <Text style={styles.name}>Khan Faiyyaz</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>💻 Software Developer</Text>
              </View>
              <Text style={styles.bioText}>
                ✨ Building ideas into reality 💙🌐
              </Text>
              <Text style={styles.bioText}>
                🚀 Dream in code, live in logic
              </Text>
              <Text style={styles.bioText}>
                ♾️ Coding my way to infinity and beyond
              </Text>
              <View style={styles.linkContainer}>
                <Text style={styles.linkIcon}>🔗</Text>
                <Text style={styles.link}>github.com/alone_boy_256</Text>
              </View>
            </View>

            {/* Enhanced Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryBtn}>
                <LinearGradient
                  colors={["#405DE6", "#5B51D8", "#833AB4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientBtn}
                >
                  <Text style={styles.primaryBtnText}>Edit profile</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>View archive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconOnlyBtn}>
                <Text style={styles.iconOnlyText}>👤+</Text>
              </TouchableOpacity>
            </View>

            {/* Story Highlights with Enhanced Design */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.storiesContainer}
            >
              {stories.map((story) => (
                <TouchableOpacity key={story.id} style={styles.storyItem}>
                  <View style={styles.storyCircleContainer}>
                    {story.hasNew ? (
                      <LinearGradient
                        colors={[
                          "#f09433",
                          "#e6683c",
                          "#dc2743",
                          "#cc2366",
                          "#bc1888",
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.storyGradient}
                      >
                        <View style={styles.storyWhiteRing}>
                          <Image
                            source={{ uri: story.image }}
                            style={styles.storyImage}
                          />
                        </View>
                      </LinearGradient>
                    ) : (
                      <View style={styles.storyGrayRing}>
                        <Image
                          source={{ uri: story.image }}
                          style={styles.storyImage}
                        />
                      </View>
                    )}
                  </View>
                  <Text style={styles.storyTitle} numberOfLines={1}>
                    {story.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Tab Bar with Better Design */}
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === "grid" && styles.activeTab]}
                onPress={() => setSelectedTab("grid")}
              >
                <Text
                  style={[
                    styles.tabIcon,
                    selectedTab === "grid" && styles.activeTabIcon,
                  ]}
                >
                  ▦
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "reels" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("reels")}
              >
                <Text
                  style={[
                    styles.tabIcon,
                    selectedTab === "reels" && styles.activeTabIcon,
                  ]}
                >
                  ▶
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  selectedTab === "tagged" && styles.activeTab,
                ]}
                onPress={() => setSelectedTab("tagged")}
              >
                <Text
                  style={[
                    styles.tabIcon,
                    selectedTab === "tagged" && styles.activeTabIcon,
                  ]}
                >
                  👤
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.postContainer}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <View style={styles.postOverlay}>
              <View style={styles.overlayContent}>
                <Text style={styles.overlayText}>❤️ {item.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const StatItem = ({ count, label }) => (
  <TouchableOpacity style={styles.statItem}>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 0.2,
    borderBottomColor: "#dbdbdb",
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  verifiedBadge: {
    backgroundColor: "#3897f0",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  verifiedIcon: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  topIcons: {
    flexDirection: "row",
    gap: 20,
  },
  iconBtn: {
    padding: 4,
  },
  icon: {
    fontSize: 26,
  },
  profileSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 20,
  },
  gradientRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWhiteRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statCount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#262626",
  },
  statLabel: {
    fontSize: 13,
    color: "#8e8e8e",
    marginTop: 2,
  },
  bioSection: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#262626",
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#262626",
    marginBottom: 2,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  linkIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  link: {
    fontSize: 14,
    color: "#00376b",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 6,
  },
  primaryBtn: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientBtn: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#262626",
  },
  iconOnlyBtn: {
    backgroundColor: "#efefef",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  iconOnlyText: {
    fontSize: 16,
  },
  storiesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  storyItem: {
    alignItems: "center",
    marginHorizontal: 6,
    width: 74,
  },
  storyCircleContainer: {
    marginBottom: 6,
  },
  storyGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  storyWhiteRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  storyGrayRing: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#dbdbdb",
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyTitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#262626",
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#dbdbdb",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#262626",
  },
  tabIcon: {
    fontSize: 24,
    color: "#8e8e8e",
  },
  activeTabIcon: {
    color: "#262626",
  },
  postContainer: {
    position: "relative",
  },
  postImage: {
    width: IMAGE_SIZE - 1,
    height: IMAGE_SIZE - 1,
    margin: 0.5,
  },
  postOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0)",
  },
  overlayContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    opacity: 0,
  },
});
