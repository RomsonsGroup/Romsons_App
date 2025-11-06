// ThemeProvider.js
import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const Colors = useSelector(state => state.Colors);

  return (
    <ThemeContext.Provider value={Colors}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
