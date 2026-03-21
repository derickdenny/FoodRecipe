import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function RecipeDetailScreen(props) {
    const recipe = props.route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const favoriteRecipes = useSelector(
      (state) => state.favorites.favoriteRecipes
    );
  
    const isFavourite = favoriteRecipes?.some(
      (item) => item.idFood === recipe.idFood
    );
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe));
    };
  
    // ✅ Fallback Ingredients
    const ingredients = recipe.ingredients || [
      "Chicken - 500g",
      "Onion - 2 chopped",
      "Tomato - 2 pureed",
      "Ginger Garlic Paste - 1 tbsp",
      "Yogurt - 1/2 cup",
      "Spices (turmeric, chili, garam masala)",
      "Oil - 2 tbsp",
      "Salt to taste",
    ];
  
    // ✅ Fallback Instructions
    const instructions =
      recipe.recipeInstructions ||
      `1. Heat oil in a pan and sauté onions until golden brown.
  
  2. Add ginger garlic paste and cook for 1 minute.
  
  3. Add tomato puree and cook until oil separates.
  
  4. Add spices and mix well.
  
  5. Add chicken and cook for 5-7 minutes.
  
  6. Add yogurt and mix properly.
  
  7. Cover and cook for 15-20 minutes.
  
  8. Garnish and serve hot.`;
  
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Image */}
        <View style={styles.imageContainer} testID="imageContainer">
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
          />
        </View>
  
        {/* Top Buttons */}
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavourite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Content */}
        <View style={styles.contentContainer}>
  
          {/* Title & Category */}
          <View>
            <Text style={styles.recipeTitle} testID="recipeTitle">
              {recipe.recipeName}
            </Text>
  
            <Text style={styles.recipeCategory} testID="recipeCategory">
              {recipe.category}
            </Text>
          </View>
  
          {/* Misc Info */}
          <View style={styles.miscContainer} testID="miscContainer">
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>⏱</Text>
              <Text style={styles.miscText}>35 Mins</Text>
            </View>
  
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>👨‍🍳</Text>
              <Text style={styles.miscText}>3 Servings</Text>
            </View>
  
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🔥</Text>
              <Text style={styles.miscText}>103 Cal</Text>
            </View>
  
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>⚡</Text>
              <Text style={styles.miscText}>Medium</Text>
            </View>
          </View>
  
          {/* Ingredients */}
          <View style={styles.sectionContainer} testID="sectionContainer">
            <Text style={styles.sectionTitle}>Ingredients</Text>
  
            <View style={styles.ingredientsList} testID="ingredientsList">
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
  
          {/* Instructions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Instructions</Text>
  
            {instructions.split("\n").map((step, index) => (
              <Text key={index} style={styles.instructionsText}>
                {step}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  
    imageContainer: {
      alignItems: "center",
    },
  
    recipeImage: {
      width: wp(98),
      height: hp(40),
      borderRadius: 20,
      marginTop: 5,
    },
  
    topButtonsContainer: {
      position: "absolute",
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: hp(5),
      paddingHorizontal: wp(5),
    },
  
    backButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
    },
  
    backButtonText: {
      fontWeight: "bold",
    },
  
    favoriteButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
    },
  
    favoriteButtonText: {
      fontSize: 18,
    },
  
    contentContainer: {
      paddingHorizontal: wp(5),
      paddingTop: hp(3),
    },
  
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#374151",
    },
  
    recipeCategory: {
      fontSize: hp(2),
      color: "#6B7280",
      marginBottom: 10,
    },
  
    miscContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 15,
    },
  
    miscItem: {
      alignItems: "center",
      backgroundColor: "#F3F4F6",
      padding: 10,
      borderRadius: 10,
    },
  
    miscIcon: {
      fontSize: hp(2.5),
    },
  
    miscText: {
      fontSize: hp(1.8),
      fontWeight: "600",
    },
  
    sectionContainer: {
      marginVertical: 10,
    },
  
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      marginBottom: 8,
    },
  
    ingredientsList: {
      marginTop: 5,
    },
  
    ingredientItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FEF3C7",
      padding: 10,
      borderRadius: 10,
      marginBottom: 6,
    },
  
    ingredientBullet: {
      width: 8,
      height: 8,
      borderRadius: 10,
      backgroundColor: "#F59E0B",
      marginRight: 10,
    },
  
    ingredientText: {
      fontSize: hp(1.8),
    },
  
    instructionsText: {
      fontSize: hp(2),
      color: "#374151",
      marginBottom: 6,
      lineHeight: hp(3),
    },
  });