import { Clock, Search, TrendingUp } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const cardWidth = (width - CARD_GAP * 3) / 2;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const recentSearches = [
    "Financial Planning",
    "RAG AI",
    "Photo Editing",
    "Travel Destinations",
  ];

const trendingTopics = [
  {
    id: "1",
    title: "Bank Account Tips",
    category: "Finance",
    image: "https://picsum.photos/400/500?random=1",
  },
  {
    id: "2",
    title: "What is RAG?",
    category: "AI / Tech",
    image: "https://picsum.photos/400/500?random=2",
  },
  {
    id: "3",
    title: "February Events",
    category: "Calendar",
    image: "https://picsum.photos/400/500?random=3",
  },
  {
    id: "4",
    title: "GHUSL Guide",
    category: "Religion",
    image: "https://picsum.photos/400/500?random=4",
  },
  {
    id: "5",
    title: "Modern Architecture",
    category: "Design",
    image: "https://picsum.photos/400/500?random=5",
  },
  {
    id: "6",
    title: "Home Decor Ideas",
    category: "Lifestyle",
    image: "https://picsum.photos/400/500?random=6",
  },
  {
    id: "7",
    title: "Street Photography",
    category: "Photography",
    image: "https://picsum.photos/400/500?random=7",
  },
  {
    id: "8",
    title: "Gym Motivation",
    category: "Fitness",
    image: "https://picsum.photos/400/500?random=8",
  },
  {
    id: "9",
    title: "Healthy Food",
    category: "Health",
    image: "https://picsum.photos/400/500?random=9",
  },
  {
    id: "10",
    title: "Travel Vibes",
    category: "Travel",
    image: "https://picsum.photos/400/500?random=10",
  },
  {
    id: "11",
    title: "Coding Setup",
    category: "Programming",
    image: "https://picsum.photos/400/500?random=11",
  },
  {
    id: "12",
    title: "Night City",
    category: "Urban",
    image: "https://picsum.photos/400/500?random=12",
  },
];

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            placeholder="Search with Meta AI"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* 📜 Content */}
      {showSuggestions && searchQuery.length === 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent</Text>

          {recentSearches.map((item, index) => (
            <TouchableOpacity key={index} style={styles.suggestionItem}>
              <Clock size={18} color="#666" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#E91E63" />
            <Text style={styles.sectionTitleTrending}>Trending Now</Text>
          </View>

          {/* 🖼️ 2 Column Grid */}
          <FlatList
            data={trendingTopics}
            keyExtractor={(item) => item.id}
            renderItem={renderCard}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },

  section: {
    padding: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  sectionTitleTrending: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 8,
  },

  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  suggestionText: {
    marginLeft: 12,
    fontSize: 15,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: CARD_GAP,
  },

  card: {
    width: cardWidth,
    height: cardWidth * 1.4,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: CARD_GAP,
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  cardCategory: {
    fontSize: 10,
    color: "#FFF",
    opacity: 0.9,
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFF",
  },
});
