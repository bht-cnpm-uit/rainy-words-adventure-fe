import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';

// Middleware to save state to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('user', JSON.stringify(state.user));
  return result;
};

// Rehydrate store from localStorage
const reHydrateStore = () => {
  if (localStorage.getItem('user') !== null) {
    return {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }
  return {
    user: {
      isLoggedIn: false,
      userInfo: null,
    },
  };
};

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(localStorageMiddleware),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
export default store;
