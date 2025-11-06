// import { combineReducers } from 'redux';
// import DarkReducer from './DarkReducer';
// import { orderReducer } from './orderReducer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//   key: 'DarkReducer',
//   storage: AsyncStorage,
//   whitelist: ['DarkReducer'],
// };

// const rootReducers = combineReducers({
//   DarkReducer: persistReducer(persistConfig, DarkReducer),
// });

// export default rootReducers;



import { combineReducers } from 'redux';
import DarkReducer from './DarkReducer';
import { orderReducer } from './orderReducer'; // Remove SET_SALE_RETURN import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

// Configuration for redux-persist to persist DarkReducer
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['DarkReducer'],
  whitelist: ['orderReducer'], // Persist only the DarkReducer
};

// Persisted DarkReducer
const persistedDarkReducer = persistReducer(persistConfig, DarkReducer);

// Combine all reducers
const rootReducer = combineReducers({
  DarkReducer: persistedDarkReducer,
  order: orderReducer, // Handle order & saleReturnData in the same orderReducer
});

export default rootReducer;
