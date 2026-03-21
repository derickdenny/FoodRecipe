import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipes: [], // ✅ FIXED NAME
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;

      const exists = state.favoriteRecipes.find(
        (item) => item.idFood === recipe.idFood
      );

      if (exists) {
        state.favoriteRecipes = state.favoriteRecipes.filter(
          (item) => item.idFood !== recipe.idFood
        );
      } else {
        state.favoriteRecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;