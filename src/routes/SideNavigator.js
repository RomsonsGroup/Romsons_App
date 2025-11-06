import React, { useState, useEffect } from 'react';
import RouteName from './RouteName';
import { CustomSidebarMenu } from '../components';
import { Colors } from '../utils';
import { DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TabNavigator } from '../routes';

const SideNavigator = (props) => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const { detailsStore } = useSelector(state => state.DataReducer) || { detailsStore };
  const { t } = useTranslation();
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors
  };
 
  const [colorValue, setColorValue] = useState(MyTheme)
  useEffect(() => {
    if (Colors.length != 0 && colorrdata != "") {
      Colors.theme_background = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors
      };
      setColorValue(MyThemeNew)
    }

  }, [colorrdata, Colors])
  return (
    <Drawer.Navigator theme={colorValue} drawerContent={(props) => <CustomSidebarMenu {...props} />} screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={RouteName.TAB_NAVIGATOR} component={TabNavigator} />
    </Drawer.Navigator>
  );
}
export default SideNavigator;