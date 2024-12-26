/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favorisReducer from "./favorisSlice";
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import persistReducer from "redux-persist/es/persistReducer";




/* const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
}); */

const rootReducer = combineReducers({
  cart: cartReducer,
  favoris: favorisReducer,
});
export type RootReducer = ReturnType<typeof rootReducer>;
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    //Ne stocke pas réellement les données mais retourne une promesse résolue
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    //Ne fait rien, mais retourne une promesse résolue.
    removeItem(_key: any) {
      return Promise.resolve();
    },
  }
}
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()
const persistConfig: PersistConfig<RootReducer> /*<any>*/ = {
  key: "root",
  //key: "cart",
  storage,
  whitelist: ["cart", "favoris"],
  //whitelist: ["totalPrice", "items"],

}
//const persistreducer = persistReducer(persistConfig, cartReducer);
const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);


//export const store = configureStore({ reducer: { cart: persistreducer } });
export const store = configureStore({
  reducer: { root: persistedReducer }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;


// OTHER METHODE
/*
const storage=typeof window !=='undefined' ? createWebStorage('local'):createNoopStorage()





8 h 18
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favorisReducer from "./fovorisSlice"
import {FLUSH, PAUSE, PERSIST, PersistConfig, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
//import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
//Définit un stockage fictif (sans effet) pour les environnements où localStorage n'est pas disponible (comme le côté serveur).
const createNoopStorage=()=>{
  return{
      getItem(_key:any){
          return Promise.resolve(null)
      },
      //Ne stocke pas réellement les données mais retourne une promesse résolue
      setItem(_key: any, value: any) {
          return Promise.resolve(value);
       },
       //Ne fait rien, mais retourne une promesse résolue.
       removeItem(_key: any) {
          return Promise.resolve();
       },
  }
}
const storage=typeof window !=='undefined' ? createWebStorage('local'):createNoopStorage()
const persistConfig : PersistConfig<any>= {
  key: "cart",
  storage,
  whitelist: ["totalPrice", "items"],
}
const favorisPersistConfig:PersistConfig<any>={
  //key est la meme dans slice dans interface
  key:'favoris',
  storage,
  whitelist:["favoris"]
}
const persistreducer = persistReducer(persistConfig, cartReducer);
const persistedFavorisReducer=persistReducer(favorisPersistConfig,favorisReducer)
const rootReducer=combineReducers({
  cart:persistreducer,
  favoris:persistedFavorisReducer
})
export const store = configureStore({ reducer: rootReducer ,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),});
export const persistor = persistStore(store);
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
 */
