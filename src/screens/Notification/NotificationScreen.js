import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { Spacing, VectorIcon } from '../../components';
import { useTranslation } from "react-i18next";
import { NotificationStyle } from "../../styles";
import {  darkTheme,  lightTheme } from "../../utils";
import { useSelector } from "react-redux";

const NotificationScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const NotificationStyles = useMemo(() => NotificationStyle(Colors), [Colors]);
  // const NotificationStyles =NotificationStyle;
  const notifications = [
    {
      id: '1',
      title: t("Notification_title_1"),
      description: t("Lorem_text"),
      time: '1h',
      icon: 'md-calendar',
    },
    {
      id: '2',
      title:  t("Notification_title_2"),
      description: t("Lorem_text"),
      time: '8h',
      icon: 'md-time',
    },
    {
      id: '3',
      title:  t("Notification_title_3"),
      description:  t("Lorem_text"),
      time: '9h',
      icon: 'md-star',
    },
    {
      id: '4',
      title:  t("Notification_title_4"),
      description:  t("Lorem_text"),
      time: '1d',
      icon: 'md-calendar',
    },
    {
      id: '5',
      title:  t("Notification_title_5"),
      description:  t("Lorem_text"),
      time: '1d',
      icon: 'md-card',
    },
    {
      id: '6',
      title:  t("Notification_title_6"),
      description:  t("Lorem_text"),
      time: '1d',
      icon: 'md-time',
    },
  ];
  
  return (
<View style={NotificationStyles.container}>
  <Spacing space={20}/>
      <Text style={NotificationStyles.sectionHeader}>{ t("Today")}</Text>
      <FlatList
        data={notifications.slice(0, 3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={NotificationStyles.notificationItem}>
            <VectorIcon style={NotificationStyles.NotificationIcon} icon="Ionicons" color={Colors.theme_background} name={item.icon} size={24} />
            <View style={NotificationStyles.textContainer}>
              <Text style={NotificationStyles.title}>{item.title}</Text>
              <Text style={NotificationStyles.description}>{item.description}</Text>
            </View>
            <Text style={NotificationStyles.time}>{item.time}</Text>
          </View>
        )}
      />
      <Text style={NotificationStyles.sectionHeader}>{ t("Yesterday")}</Text>
      <FlatList
        data={notifications.slice(3)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={NotificationStyles.notificationItem}>
            <VectorIcon style={NotificationStyles.NotificationIcon} icon="Ionicons" color={Colors.theme_background} name={item.icon} size={24} />
            <View style={NotificationStyles.textContainer}>
              <Text style={NotificationStyles.title}>{item.title}</Text>
              <Text style={NotificationStyles.description}>{item.description}</Text>
            </View>
            <Text style={NotificationStyles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};
export default NotificationScreen;

