import { configureStore } from '@reduxjs/toolkit'
import activeTabReducer from './slices/activeTab';


export const store = configureStore({
  reducer: {
    activeTab: activeTabReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})