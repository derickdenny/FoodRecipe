import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // ✅ FIXED SELECTOR
  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriteRecipes
  );

  // ✅ Empty State
  if (!favoriteRecipes || favoriteRecipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("RecipeDetail", item)}
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={styles.recipeImage}
      />

      <View>
        <Text style={styles.recipeTitle}>{item.recipeName}</Text>
        <Text style={styles.recipeCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      
      <Text style={styles.heading}>My Favorite Recipes</Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonTop}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.idFood.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    marginTop: hp(5),
    marginLeft: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },

  backButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 120,
    alignItems: "center",
  },

  backButtonTop: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 120,
    alignItems: "center",
    marginLeft: 20,
  },

  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },

  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3,
  },

  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },

  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
  },

  recipeCategory: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },
});