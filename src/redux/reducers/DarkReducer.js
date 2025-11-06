// themeReducer.js
import { TOGGLE_THEME } from '../actiontypes/DarkActionType';
import { lightTheme, darkTheme } from '../../utils';

const initialState = {
  isDarkMode: false,
  Colors: lightTheme, // Update to use lightTheme directly
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = !state.isDarkMode ? darkTheme : lightTheme; // Use darkTheme and lightTheme directly
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        Colors: newTheme,
      };
    default:
      return state;
  }
};

export default themeReducer;
