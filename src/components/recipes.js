import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          renderItem={renderItem}
          keyExtractor={(item) => item.idFood.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[styles.cardContainer, { paddingLeft: 10, paddingRight: 10 }]}
      testID="articleDisplay"
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", item)}
        style={styles.card}
      >
        {/* Image */}
        <Image
          source={{ uri: item.recipeImage }}
          style={[styles.articleImage, { height: hp(18) }]}
        />

        {/* Title */}
        <Text style={styles.articleText} numberOfLines={1}>
          {item.recipeName}
        </Text>

        {/* Description */}
        <Text style={styles.articleDescription} numberOfLines={2}>
          {item.recipeInstructions}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },

  cardContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: hp(2),
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },

  articleImage: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#52525B",
    marginTop: hp(1),
  },

  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280",
    marginTop: hp(0.5),
  },

  row: {
    justifyContent: "space-between",
  },
});