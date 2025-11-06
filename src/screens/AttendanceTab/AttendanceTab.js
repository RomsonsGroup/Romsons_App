import React, { useMemo } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AttendanceTabStyle, HomeTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { Colors, darkTheme, Fonts, lightTheme, SF, SH } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import images from '../../index';
import { Spacing } from '../../components';
const AttendanceTab = (props) => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const AttendanceTabStyles = useMemo(() => AttendanceTabStyle(Colors), [Colors]);
  // const AttendanceTabStyles = AttendanceTabStyle;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const employees = [
    {
      id: 1,
      name: t("Name_1"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_1,
    },
    {
      id: 2,
      name: t("Name_2"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_2,
    },
    {
      id: 3,
      name: t("Name_3"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_3,
    },
    {
      id: 4,
      name: t("Name_4"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_4,
    },
    {
      id: 5,
      name: t("Name_5"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_5,
    },
    {
      id: 6,
      name: t("Name_6"),
      empId: '1412DA043',
      role: 'UI/UX Designer',
      inTime: '09:00:00',
      outTime: '17:02:53',
      profilePic: images.user_6,
    },
  ];
  const EmployeeListItem = ({ employee }) => (
    <TouchableOpacity onPress={() => navigation.navigate(RouteName.ATTENDANCEPROFILE)} style={AttendanceTabStyles.PaddingHorizontal}>
      <View style={AttendanceTabStyles.employeeItem}>
        <Image source={employee.profilePic} style={AttendanceTabStyles.profileImage} />
        <View style={AttendanceTabStyles.employeeInfo}>
          <Text style={AttendanceTabStyles.employeeName}>{employee.name}</Text>
          <Text style={AttendanceTabStyles.employeeDetails}>{employee.empId}</Text>
          <Text style={AttendanceTabStyles.employeeDetails}>{employee.role}</Text>
        </View>
        <View style={AttendanceTabStyles.timeInfo}>
          <Text style={AttendanceTabStyles.timeText}>{employee.inTime}</Text>
          <TouchableOpacity style={AttendanceTabStyles.outTimeButton}>
            <Text style={AttendanceTabStyles.buttonText}>{t("In")}</Text>
          </TouchableOpacity>
        </View>
        <View style={AttendanceTabStyles.buttonContainer}>
          <Text style={AttendanceTabStyles.timeText}>{employee.outTime}</Text>
          <TouchableOpacity style={AttendanceTabStyles.outTimeButton}>
            <Text style={AttendanceTabStyles.buttonText}>{t("Out")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  const ListHeaderComponent = () => (
    <View>
      <Spacing space={20} />
      <View style={AttendanceTabStyles.header}>
        <Text style={AttendanceTabStyles.headerDate}>{t("TodayDate")}</Text>
        <Text style={AttendanceTabStyles.totalEmployees}>{t("Total_employees")}</Text>
        <Text style={AttendanceTabStyles.employeeCount}>590</Text>
      </View>
      <Spacing space={20} />
    </View>
  );

  return (
    <FlatList
      data={employees}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <EmployeeListItem employee={item} />}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={AttendanceTabStyles.listContainer}
    />
  );
};
export default AttendanceTab;