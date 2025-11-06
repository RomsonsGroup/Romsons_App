import React, { useMemo } from 'react';
import { View, Appearance } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Fonts, SF, SH, SW, darkTheme, lightTheme } from '../utils';
import { Style } from '../styles';
import Translation from '../Language/i18n';
import { useTranslation } from "react-i18next";
import { AttendanceTab, ContactsTab, DealsTab, HomeTab, LeadTab, ProfileTab, ServicesTab } from '../screens';
import RouteName from './RouteName';
import { DarkLightTheme, HeaderLeftMenuIcon, VectorIcon } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const HeaderArray = {
  headerShown: true,
  headerShadowVisible: false,
};
export default function TabNavigator(props) {
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;

  const Styles = useMemo(() => Style(Colors), [Colors]);
  return (
    <Tab.Navigator
      initialRouteName={RouteName.HOME_SCREEN}
      screenOptions={({ route }) => ({
        tabBarStyle: { ...Styles.tabContainer },
      })}
    >
      <Tab.Screen name={RouteName.HOME_SCREEN} component={HomeTab}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: SW(15),
          },
          headerRightContainerStyle: {
            paddingRight: SW(20),
          },
          tabBarShowLabel: false,
          title: Translation('Home'),
          headerTitleStyle: {
            fontFamily: Fonts.Fonts_Medium,
            color: Colors.white_color
          },
          tabBarIcon: ({ focused }) => (
            <View style={Styles.buttonWholeContainer}>
              {focused ? (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    color={Colors.theme_background}
                    name="home"
                    icon="Entypo"
                    size={SF(20)}
                    style={Styles.buttonImage}
                  />
                </View>
              ) : (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    style={Styles.buttonImage}
                    color={Colors.black_text_color}
                    name="home"
                    icon="AntDesign"
                    size={SF(20)}
                  />
                </View>
              )}
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerTitleStyle: {
            color: Colors.white_color
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          ),
          headerRight: () => (
            <View style={{ marginRight: SH(0) }}>
              <DarkLightTheme />
            </View>

          ),
        }}
      />
      {/* <Tab.Screen name={RouteName.ATTENDANCETAB} component={AttendanceTab}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: SW(15),
          },
          headerRightContainerStyle: {
            paddingRight: SW(20),
          },
          tabBarShowLabel: false,
          title: Translation('Attendance'),
          headerTitleStyle: {
            fontFamily: Fonts.Fonts_Medium,
            color: Colors.white_color
          },
          tabBarIcon: ({ focused }) => (
            <View style={Styles.buttonWholeContainer}>
              {focused ? (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    color={Colors.theme_background}
                    icon="Feather" size={SF(20)} name="activity"
                    style={Styles.buttonImage}
                  />
                </View>
              ) : (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    style={Styles.buttonImage}
                    color={Colors.black_text_color}
                    icon="Feather" size={SF(20)} name="activity"
                  />
                </View>
              )}
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerTitleStyle: {
            color: Colors.white_color
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          )
        }}
      /> */}
      {/* <Tab.Screen name={RouteName.SERVICESTAB} component={ServicesTab}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: SW(15),
          },
          headerRightContainerStyle: {
            paddingRight: SW(20),
          },
          tabBarShowLabel: false,
          title: Translation('Services'),
          headerTitleStyle: {
            fontFamily: Fonts.Fonts_Medium,
            color: Colors.white_color
          },
          tabBarIcon: ({ focused }) => (
            <View style={Styles.buttonWholeContainer}>
              {focused ? (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    color={Colors.theme_background}
                    icon="AntDesign" name="customerservice"
                    size={SF(20)}
                    style={Styles.buttonImage}
                  />
                </View>
              ) : (
                <View style={Styles.buttonContainer}>
                  <VectorIcon
                    style={Styles.buttonImage}
                    color={Colors.black_text_color}
                    icon="AntDesign" name="customerservice"
                    size={SF(20)}
                  />
                </View>
              )}
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.theme_background,
          },
          headerTitleStyle: {
            color: Colors.white_color
          },
          headerLeft: () => (
            <HeaderLeftMenuIcon {...props} />
          )
        }}
      /> */}
      <Tab.Screen
      name={RouteName.PROFILETAB}
      component={ProfileTab}
      options={{
        headerShown: true,
        headerShadowVisible: false,
        title: t('Profile'),  // ✅ Use Translation Hook
        headerTitleStyle: {
          fontFamily: Fonts.Fonts_Medium,
          color: Colors.white_color,
        },
        headerStyle: {
          backgroundColor: Colors.theme_background,
        },
        headerLeftContainerStyle: {
          paddingLeft: SW(15),
        },
        headerRightContainerStyle: {
          paddingRight: SW(20),
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <View style={Styles.buttonWholeContainer}>
            <View style={Styles.buttonContainer}>
              <VectorIcon
                color={focused ? Colors.theme_background : Colors.black_text_color}
                icon="AntDesign"
                name="profile"
                size={SF(20)}
                style={Styles.buttonImage}
              />
            </View>
          </View>
        ),
        headerLeft: () => <HeaderLeftMenuIcon {...props} />,
      }}
      />
    </Tab.Navigator>
  )
}



