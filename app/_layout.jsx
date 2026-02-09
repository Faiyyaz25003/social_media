// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { View } from "react-native";
// import TopNavbar from "../components/TopNavbar/TopNavbar";

// export default function Layout() {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* 🔝 TOP NAVBAR (ALL SCREENS) */}
//       <TopNavbar />

//       {/* 🔽 BOTTOM TABS */}
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarStyle: { backgroundColor: "#000" },
//           tabBarActiveTintColor: "#1DA1F2",
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Home",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="home" size={24} color={color} />
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="search"
//           options={{
//             title: "Search",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="search" size={24} color={color} />
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="create"
//           options={{
//             title: "Create",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="add-circle" size={28} color={color} />
//             ),
//           }}
//         />

//         <Tabs.Screen
//           name="profile"
//           options={{
//             title: "Profile",
//             tabBarIcon: ({ color }) => (
//               <Ionicons name="person" size={24} color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </View>
//   );
// }

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import TopNavbar from "../components/TopNavbar/TopNavbar";

function AnimatedIcon({ name, color, focused }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
}

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* 🔝 TOP NAVBAR */}
      <TopNavbar />

      {/* 🔽 BOTTOM TABS */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000",
            borderTopColor: "#111",
            height: 60,
          },
          tabBarActiveTintColor: "#1DA1F2",
          tabBarInactiveTintColor: "#777",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon
                name={focused ? "home" : "home-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon
                name={focused ? "search" : "search-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <Animated.View
                style={{
                  transform: [{ scale: focused ? 1.3 : 1 }],
                }}
              >
                <Ionicons
                  name="add-circle"
                  size={30}
                  color={focused ? "#1DA1F2" : color}
                />
              </Animated.View>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIcon
                name={focused ? "person" : "person-outline"}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
