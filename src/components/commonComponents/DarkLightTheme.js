import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/action/DarkAction"; // Adjust path as needed
import { lightTheme } from "../../utils"; // Adjust path to where Colors.js is located
import { useTranslation } from "react-i18next";
import VectorIcon from "./VectoreIcons";

const ThemeToggle = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);

  const toggleSwitch = () => {
    dispatch(toggleTheme(!isDarkMode));
  };

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.iconButton}>
    <VectorIcon
      icon={isDarkMode ? "FontAwesome5" : "Entypo"}
      name={isDarkMode ? "moon" : "light-up"} // Moon for dark mode, Sun for light mode
      size={24} // Adjust size as needed
      color={isDarkMode ? "#FFF" : "#FFF"} // Gold for light mode, Blue for dark mode
    />
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemeToggle;
