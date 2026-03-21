import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch recipes
  useEffect(() => {
    const fetchrecipes = async () => {
      try {
        const data = await AsyncStorage.getItem("customrecipes");
        if (data) {
          setrecipes(JSON.parse(data));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchrecipes();
  }, []);

  // ✅ Add new recipe
  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  // ✅ Open recipe
  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  // ✅ Delete recipe
  const deleterecipe = async (index) => {
    try {
      const updatedrecipes = [...recipes];
      updatedrecipes.splice(index, 1);

      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(updatedrecipes)
      );

      setrecipes(updatedrecipes);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Edit recipe
  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New recipe</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {recipes.length === 0 ? (
            <Text style={styles.norecipesText}>
              No recipes added yet.
            </Text>
          ) : (
            recipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard} testID="recipeCard">

                {/* CLICKABLE CARD */}
                <TouchableOpacity
                  testID="handlerecipeBtn"
                  onPress={() => handlerecipeClick(recipe)}
                >
                  
                  {/* ✅ IMAGE */}
                  {recipe.image && (
                    <Image
                      source={{ uri: recipe.image }}
                      style={styles.recipeImage}
                    />
                  )}

                  {/* TITLE */}
                  <Text style={styles.recipeTitle}>
                    {recipe.title}
                  </Text>

                  {/* ✅ DESCRIPTION (50 chars) */}
                  <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.description
                      ? recipe.description.slice(0, 50) + "..."
                      : ""}
                  </Text>
                </TouchableOpacity>

                {/* ✅ EDIT & DELETE BUTTONS */}
                <View
                  style={styles.actionButtonsContainer}
                  testID="editDeleteButtons"
                >
                  <TouchableOpacity
                    onPress={() => editrecipe(recipe, index)}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleterecipe(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },

  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
    marginBottom: hp(1),
  },

  addButton: {
    backgroundColor: "#4F75FF",
    padding: wp(1),
    alignItems: "center",
    borderRadius: 5,
    marginBottom: hp(2),
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },

  scrollContainer: {
    paddingBottom: hp(2),
    alignItems: "center",
  },

  norecipesText: {
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },

  recipeCard: {
    width: 350,
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 10,
    marginBottom: hp(2),
    elevation: 3,
  },

  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: hp(1),
  },

  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
  },

  recipeDescription: {
    fontSize: hp(1.6),
    color: "#6B7280",
  },

  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },

  editButton: {
    backgroundColor: "#34D399",
    padding: wp(1),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },

  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(1),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});