import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import logger from 'redux-logger';
import authReducer from "./reducers/authReducer";
import subscriptionSlice from "./reducers/subscriptionSlice";
import { ssmApi }  from './api/ssmApi';



const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageSession,
  blacklist: [ssmApi.reducerPath]
}

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: subscriptionSlice,
  [ssmApi.reducerPath]: ssmApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  }}).concat(ssmApi.middleware, logger),
});

export default store;