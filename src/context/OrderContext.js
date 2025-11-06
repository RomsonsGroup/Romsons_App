import React, { createContext, useReducer, useContext } from 'react';
import { orderReducer } from './OrderReducer';

// Initial state
const initialState = {
  unitInputs: {},
  totalUnits: 0,
  orderValue: 0,
};

// Create the context
const OrderContext = createContext();

// Create the provider to share the state
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the context
export const useOrderContext = () => {
  return useContext(OrderContext);
};
