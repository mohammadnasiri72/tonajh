import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/category';


export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})