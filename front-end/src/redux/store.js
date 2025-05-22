import { configureStore } from '@reduxjs/toolkit';
import { orderSlice } from './OrderSlice';
import { userSlice } from './UserSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Cấu hình persist cho order reducer
const orderPersistConfig = {
  key: 'order',
  storage,
  whitelist: ['orders'] // chỉ lưu trữ orders trong state
};

// Tạo persisted reducer
const persistedOrderReducer = persistReducer(orderPersistConfig, orderSlice.reducer);

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    order: persistedOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);