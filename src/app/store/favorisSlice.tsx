import { createSlice } from "@reduxjs/toolkit";
interface Entreprise {
  _id: string;
  name: string;
}
interface FavorisItem {
  publicationId: string;
  titre: string;
  prix: number;
  entrepriseId: Entreprise;
  clientId: string;
}

interface FavorisState {
  items: FavorisItem[];
}

const initialState: FavorisState = {
  items: [],
};

const favorisSlice = createSlice({
  name: "favoris",
  initialState,
  reducers: {
    addToFavoris(state, action) {
      const exists = state.items.find((item) => item.publicationId === action.payload.publicationId);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavoris(state, action) {
      state.items = state.items.filter(
        (item) => item.publicationId !== action.payload.publicationId
      );
    },
    clearFavoris(state) {
      state.items = [];
    },
  },
});

export const { addToFavoris, removeFromFavoris, clearFavoris } = favorisSlice.actions;
export default favorisSlice.reducer;
