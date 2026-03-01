import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ScheduleCard = ({ item, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isActive = item.status === "Active";

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Accent bar */}
      <View
        style={[
          styles.accentBar,
          isActive ? styles.accentActive : styles.accentInactive,
        ]}
      />

      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.className} numberOfLines={1}>
            {item.className}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            isActive ? styles.activeBadge : styles.inactiveBadge,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              isActive ? styles.dotActive : styles.dotInactive,
            ]}
          />
          <Text
            style={[
              styles.statusText,
              isActive ? styles.statusTextActive : styles.statusTextInactive,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Info Grid */}
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>📅</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Days</Text>
            <Text style={styles.infoValue}>
              {item.days?.join(", ") || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>⏰</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>
              {item.startTime} – {item.endTime}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>👨‍🏫</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Trainer</Text>
            <Text style={styles.infoValue}>
              {item.trainer?.fullName || "Not Assigned"}
            </Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>👥</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Capacity</Text>
            <Text style={styles.infoValue}>{item.maxMembers} Members</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default function ScheduleListScreen() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const headerAnim = useRef(new Animated.Value(0)).current;

  const fetchSchedules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/schedules");
      setSchedules(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSchedules();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Loading schedules...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerAnim,
            transform: [
              {
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerSub}>YOUR FITNESS PLAN</Text>
            <Text style={styles.headerTitle}>Class Schedules</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{schedules.length}</Text>
            <Text style={styles.countLabel}>Classes</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {schedules.filter((s) => s.status === "Active").length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {schedules.filter((s) => s.status !== "Active").length}
            </Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {schedules.reduce((sum, s) => sum + (s.maxMembers || 0), 0)}
            </Text>
            <Text style={styles.statLabel}>Total Spots</Text>
          </View>
        </View>
      </Animated.View>

      {/* List */}
      <FlatList
        data={schedules}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6C63FF"
            colors={["#6C63FF"]}
          />
        }
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ScheduleCard item={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🏋️</Text>
            <Text style={styles.emptyTitle}>No Schedules Yet</Text>
            <Text style={styles.emptyText}>
              Check back later for upcoming classes
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  /* Header */
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EAF0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  headerSub: {
    fontSize: 10,
    color: "#6C63FF",
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: "#6C63FF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 60,
  },
  countText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 22,
  },
  countLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 1,
  },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#F4F6FA",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E8EAF0",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A2E",
  },
  statLabel: {
    fontSize: 10,
    color: "#9A9AB0",
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E8EAF0",
    marginVertical: 4,
  },

  /* Card */
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8EAF0",
    shadowColor: "#6C63FF",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  accentBar: {
    height: 3,
    width: "100%",
  },
  accentActive: {
    backgroundColor: "#6C63FF",
  },
  accentInactive: {
    backgroundColor: "#E0E0EE",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
  },
  className: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1A2E",
    letterSpacing: -0.3,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  activeBadge: {
    backgroundColor: "#EDFAF4",
    borderWidth: 1,
    borderColor: "#A7EDD0",
  },
  inactiveBadge: {
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFBEBE",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: "#22C37E",
  },
  dotInactive: {
    backgroundColor: "#F76C6C",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusTextActive: {
    color: "#22C37E",
  },
  statusTextInactive: {
    color: "#F76C6C",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F1F7",
    marginHorizontal: 18,
  },

  /* Info Grid */
  infoGrid: {
    padding: 18,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    backgroundColor: "#F4F6FA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8EAF0",
  },
  iconEmoji: {
    fontSize: 16,
  },
  infoLabel: {
    fontSize: 10,
    color: "#9A9AB0",
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 14,
    color: "#333355",
    fontWeight: "600",
    marginTop: 1,
  },

  /* Loader */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 14,
    fontSize: 13,
    color: "#9A9AB0",
    fontWeight: "500",
    letterSpacing: 1,
  },

  /* Empty */
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#9A9AB0",
    textAlign: "center",
    lineHeight: 20,
  },
});
