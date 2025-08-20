import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import authReducer from './slices/authSlice';
import chefsReducer from './slices/chefsSlice';
import jobsReducer from './slices/jobsSlice';
import applicationsReducer from './slices/applicationsSlice';
import favoritesReducer from './slices/favoritesSlice';
import uiReducer from './slices/uiSlice';

import { rootPersistConfig } from './persist';

const rootReducer = combineReducers({
  auth: authReducer,
  chefs: chefsReducer,
  jobs: jobsReducer,
  applications: applicationsReducer,
  favorites: favoritesReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
