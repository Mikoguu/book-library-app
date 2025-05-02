import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  author: "",
  isFavorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      //ppssible to mutate state due to Immer library
      state.title = action.payload;

      // also possible to returna new object in a traditional way
      // {...state, title: action.payload}
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setOnlyFavoriteFilter: (state) => {
      state.isFavorite = !state.isFavorite;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.isFavorite;

export default filterSlice.reducer;
