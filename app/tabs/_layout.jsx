import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

/* 🔥 Animated Icon */
function AnimatedTabIcon({ name, color, size, focused }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.2 : 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: focused ? -4 : 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
      }}
    >
      <Ionicons name={name} size={size} color={color} />
      {focused && <View style={styles.activeDot} />}
    </Animated.View>
  );
}

/* 🔻 Bottom Tabs Layout */
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#ff4757",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 4,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 18,
          left: 16,
          right: 16,
          height: 76,
          borderRadius: 28,
          backgroundColor: "#ffffff",
          paddingBottom: 12,
          paddingTop: 12,
          elevation: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
        },
      }}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {/* 👥 Members */}
      <Tabs.Screen
        name="members"
        options={{
          title: "Members",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "people" : "people-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {/* 📚 References */}
      <Tabs.Screen
        name="references"
        options={{
          title: "References",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "book" : "book-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {/* 📅 Schedule */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />

      {/* 👤 Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ff4757",
    marginTop: 4,
  },
});
