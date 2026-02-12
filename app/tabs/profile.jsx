import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

const STATS = [
  { label: "Members", value: "1,284", icon: "👥" },
  { label: "Active Today", value: "347", icon: "🔥" },
  { label: "Revenue", value: "₹2.4L", icon: "💰" },
  { label: "Classes", value: "18", icon: "🏋️" },
];

const QUICK_ACTIONS = [
  { label: "Add Member", icon: "➕", color: "#FF4D00" },
  { label: "Schedule", icon: "📅", color: "#FF9500" },
  { label: "Reports", icon: "📊", color: "#00C2FF" },
  { label: "Settings", icon: "⚙️", color: "#A259FF" },
];

const RECENT_ACTIVITY = [
  {
    name: "Rohan Mehta",
    action: "Renewed membership",
    time: "2m ago",
    avatar: "💪",
  },
  {
    name: "Priya Sharma",
    action: "Joined Premium plan",
    time: "14m ago",
    avatar: "🧘",
  },
  { name: "Arjun Singh", action: "Checked in", time: "22m ago", avatar: "🏃" },
  {
    name: "Kavya Nair",
    action: "PT session booked",
    time: "1h ago",
    avatar: "🥊",
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER BAND ── */}
        <View style={styles.headerBand}>
          <View style={styles.accentStripe} />
          <View style={styles.headerContent}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarRing}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarEmoji}>⚡</Text>
                </View>
              </View>
              <View style={styles.onlineBadge} />
            </View>

            {/* Name block */}
            <View style={styles.nameBlock}>
              <Text style={styles.roleTag}>GYM ADMINISTRATOR</Text>
              <Text style={styles.adminName}>Vikram Rathore</Text>
              <Text style={styles.gymName}>
                🏆 IronCore Fitness — Andheri West
              </Text>
            </View>

            {/* Edit button */}
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── STATS GRID ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TODAYS OVERVIEW</Text>
          <View style={styles.statsGrid}>
            {STATS.map((s, i) => (
              <View
                key={i}
                style={[styles.statCard, i % 2 === 0 && styles.statCardAccent]}
              >
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
          <View style={styles.actionsRow}>
            {QUICK_ACTIONS.map((a, i) => (
              <TouchableOpacity
                key={i}
                style={styles.actionBtn}
                activeOpacity={0.75}
              >
                <View style={[styles.actionIconBox, { borderColor: a.color }]}>
                  <Text style={styles.actionIcon}>{a.icon}</Text>
                </View>
                <Text style={[styles.actionLabel, { color: a.color }]}>
                  {a.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── ADMIN INFO CARD ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADMIN DETAILS</Text>
          <View style={styles.infoCard}>
            {[
              { icon: "📧", label: "Email", value: "vikram@ironcore.in" },
              { icon: "📱", label: "Phone", value: "+91 98765 43210" },
              { icon: "📍", label: "Branch", value: "Andheri West, Mumbai" },
              { icon: "🗓️", label: "Member Since", value: "March 2021" },
              { icon: "🔑", label: "Role", value: "Super Admin" },
            ].map((item, i) => (
              <View
                key={i}
                style={[styles.infoRow, i !== 0 && styles.infoRowBorder]}
              >
                <Text style={styles.infoIcon}>{item.icon}</Text>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── PERFORMANCE BAR ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MONTHLY TARGETS</Text>
          <View style={styles.perfCard}>
            {[
              { label: "New Members", pct: 78, color: "#FF4D00" },
              { label: "Revenue Goal", pct: 65, color: "#FF9500" },
              { label: "Retention Rate", pct: 91, color: "#00C2FF" },
            ].map((p, i) => (
              <View key={i} style={styles.perfItem}>
                <View style={styles.perfHeaderRow}>
                  <Text style={styles.perfLabel}>{p.label}</Text>
                  <Text style={[styles.perfPct, { color: p.color }]}>
                    {p.pct}%
                  </Text>
                </View>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${p.pct}%`, backgroundColor: p.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── RECENT ACTIVITY ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
          <View style={styles.activityCard}>
            {RECENT_ACTIVITY.map((a, i) => (
              <View
                key={i}
                style={[styles.activityRow, i !== 0 && styles.activityBorder]}
              >
                <View style={styles.activityAvatar}>
                  <Text style={{ fontSize: 20 }}>{a.avatar}</Text>
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityName}>{a.name}</Text>
                  <Text style={styles.activityAction}>{a.action}</Text>
                </View>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── SIGN OUT ── */}
        <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
          <Text style={styles.signOutText}>🚪 SIGN OUT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  /* ── HEADER ── */
  headerBand: {
    backgroundColor: "#111111",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#1E1E1E",
    overflow: "hidden",
  },
  accentStripe: {
    height: 4,
    backgroundColor: "#FF4D00",
    marginBottom: 0,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 14,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#FF4D00",
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 30,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#00E676",
    borderWidth: 2,
    borderColor: "#111111",
  },
  nameBlock: {
    flex: 1,
  },
  roleTag: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#FF4D00",
    marginBottom: 2,
  },
  adminName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  gymName: {
    fontSize: 12,
    color: "#888888",
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FF4D00",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
  },
  editBtnText: {
    color: "#FF4D00",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  /* ── SECTIONS ── */
  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2.5,
    color: "#555555",
    marginBottom: 12,
  },

  /* ── STATS ── */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#141414",
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  statCardAccent: {
    borderColor: "#FF4D0033",
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
    fontWeight: "600",
  },

  /* ── QUICK ACTIONS ── */
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionBtn: {
    alignItems: "center",
    gap: 8,
  },
  actionIconBox: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#141414",
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* ── INFO CARD ── */
  infoCard: {
    backgroundColor: "#111111",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  infoRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  infoIcon: {
    fontSize: 18,
    width: 28,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#555555",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#DDDDDD",
    fontWeight: "600",
  },

  /* ── PERFORMANCE ── */
  perfCard: {
    backgroundColor: "#111111",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    padding: 16,
    gap: 16,
  },
  perfItem: {
    gap: 8,
  },
  perfHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  perfLabel: {
    fontSize: 13,
    color: "#AAAAAA",
    fontWeight: "700",
  },
  perfPct: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  barTrack: {
    height: 6,
    backgroundColor: "#1E1E1E",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },

  /* ── ACTIVITY ── */
  activityCard: {
    backgroundColor: "#111111",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    overflow: "hidden",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  activityBorder: {
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  activityAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222222",
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#EEEEEE",
  },
  activityAction: {
    fontSize: 12,
    color: "#666666",
    marginTop: 1,
  },
  activityTime: {
    fontSize: 11,
    color: "#444444",
    fontWeight: "600",
  },

  /* ── SIGN OUT ── */
  signOutBtn: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 42,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#111111",
  },
  signOutText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#FF4D4D",
  },
});
