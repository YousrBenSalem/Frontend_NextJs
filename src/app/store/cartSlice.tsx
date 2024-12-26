import { createSlice } from "@reduxjs/toolkit";
interface Entreprise {
  _id: string;
  name: string;
}
interface cartItem {
  publicationId: string;
  titre:string ;
  quantite: number;
  prix: number;
  entrepriseId: Entreprise;
  clientId: string
}

interface cartState {
  items: cartItem[]
  totalPrice: number
}

const initialState: cartState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingPub = state.items.find((pub) => {
        return pub.publicationId === action.payload.publicationId

      })
      if (existingPub) {
        existingPub.quantite += action.payload.quantite
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.quantite * item.prix, 0)



    },
    removeFromCart(state, action) {
      /*   const index = state.items.findIndex(
          (item) => item.publicationId === action.payload.publicationId
        );
  
        if (index !== -1) {
          state.items.splice(index, 1); 
              } */

      state.items = state.items.filter(
        (item) => { return item.publicationId !== action.payload.publicationId }
      );


      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.quantite * item.prix,
        0
      );

    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;

    },
    decrementFromCart(state, action) {
      const existingPub = state.items.find((pub) => {
        return pub.publicationId === action.payload.publicationId

      })
      if (existingPub) {
        if (existingPub.quantite > 1) {
          existingPub.quantite = action.payload.quantite - 1

        }
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.quantite * item.prix, 0)



    },
    IncrementFromCart(state, action) {
      const existingPub = state.items.find((pub) => {
        return pub.publicationId === action.payload.publicationId

      })
      if (existingPub) {
      
          existingPub.quantite = action.payload.quantite + 1

        
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.quantite * item.prix, 0)



    },
  },
});

export const { addToCart, clearCart, removeFromCart, decrementFromCart, IncrementFromCart } = cartSlice.actions;
export default cartSlice.reducer;
