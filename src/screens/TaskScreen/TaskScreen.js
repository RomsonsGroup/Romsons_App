import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import {  TasksStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme,lightTheme } from "../../utils";
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from "../../image";
import { Spacing } from "../../components";

const TaskScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const TasksStyles = useMemo(() => TasksStyle(Colors), [Colors]);
  // const TasksStyles =  TasksStyle;
  const tasks = [
    {
      id:'1',
      name: t("Task_1"),
      date: t("date_1"),
      time: t("Task_1"),
      icon: 'call'
    },
    {
      id: '2',
      name: t("Task_2"),
      date: t("date_2"),
      time: t("Task_2"),
      icon: 'event'
    },
    {
      id: '3',
      name: t("Task_3"),
      date: t("date_3"),
      time: t("Task_3"),
      icon: 'group'
    },
  ];
  const renderItem = ({ item }) => (
    <View style={TasksStyles.PaddingHorizontal}>
      <View style={TasksStyles.taskContainer}>
        <Icon style={TasksStyles.TaskIcon} name={item.icon} size={30} color={Colors.theme_background} />
        <View style={TasksStyles.taskDetails}>
          <Text style={TasksStyles.taskName}>{item.name}</Text>
          <Spacing space={5} />
          <Text style={TasksStyles.taskDate}>{item.date}</Text>
          <Text style={TasksStyles.taskTime}>{item.time}</Text>
        </View>
      </View>
    </View >
  );
  return (
    <View style={TasksStyles.container}>
      <View style={TasksStyles.profileSection}>
        <Image resizeMode='contain'
          source={images.Image_3}
          style={TasksStyles.profileImage}
        />
      </View>
      <Spacing space={20} />
      <View style={TasksStyles.PaddingHorizontal}>
        <View style={TasksStyles.newTaskContainer}>
          <Text style={TasksStyles.newTaskText}>{t("Create_New_Task")}</Text>
          <TouchableOpacity style={TasksStyles.newTaskButton}>
            <Icon name="add" size={30} color={Colors.white_color} />
          </TouchableOpacity>
        </View>
        <Spacing space={20} />
        <Text style={TasksStyles.ongoingTaskText}>{t("Ongoing_Task")}</Text>
      </View>
      <Spacing space={20} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
export default TaskScreen;