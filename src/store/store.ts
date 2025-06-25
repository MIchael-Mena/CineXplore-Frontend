import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
