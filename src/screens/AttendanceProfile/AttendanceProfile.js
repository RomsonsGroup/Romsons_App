import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { AttendanceTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import images from '../../index';
import { Spacing } from '../../components';
const AttendanceProfile = (props) => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const AttendanceTabStyles = useMemo(() => AttendanceTabStyle(Colors), [Colors]);
  // const AttendanceTabStyles = AttendanceTabStyle;
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <ScrollView style={AttendanceTabStyles.container2}>
      <View style={AttendanceTabStyles.header2}>
        <Spacing space={20} />
        <Image
          style={AttendanceTabStyles.profileImage2}
          source={images.user_3}
        />
        <Spacing space={10} />
        <Text style={AttendanceTabStyles.empId2}>{t("Emp_Id")}</Text>
        <Spacing space={4} />
        <Text style={AttendanceTabStyles.empName2}>{t("Name_3")}</Text>
        <Spacing space={20} />
      </View>
      <Spacing space={20} />
      <View style={AttendanceTabStyles.PaddingHorizontal}>
        {/* Time Section */}

        <View style={AttendanceTabStyles.timeSection2}>
          <Text style={AttendanceTabStyles.timeText2}>09:00:06</Text>
          <Text style={AttendanceTabStyles.dateText2}>{t("ToDay")}</Text>
          <Text style={AttendanceTabStyles.timeText2}>07:03:05</Text>
        </View>
        {/* Personal Statistics */}
        <View style={AttendanceTabStyles.statisticsSection2}>
          <Text style={AttendanceTabStyles.statisticsTitle2}>{t("Personal_Statistics")}</Text>
          <Spacing space={20} />
          <View style={AttendanceTabStyles.statisticsSectionFlex2}>
            <View style={AttendanceTabStyles.statsContainer2}>
              <Text style={AttendanceTabStyles.statsText2}>91%</Text>
              <Text style={AttendanceTabStyles.statsLabel2}>{t("Present")}</Text>
            </View>
            <View style={AttendanceTabStyles.statsContainer2}>
              <Text style={AttendanceTabStyles.statsText2}>05%</Text>
              <Text style={AttendanceTabStyles.statsLabel2}>{t("Absent")}</Text>
            </View>
            <View style={AttendanceTabStyles.statsContainer2}>
              <Text style={AttendanceTabStyles.statsText2}>04%</Text>
              <Text style={AttendanceTabStyles.statsLabel2}>{t("Leave")}</Text>
            </View>
          </View>
        </View>
        <Spacing space={20} />
        {/* Leave Request Section */}
        <TouchableOpacity style={AttendanceTabStyles.leaveRequest2}>
          <Text style={AttendanceTabStyles.leaveRequestText2}>TAP TO VIEW LEAVE REQUESTS</Text>
        </TouchableOpacity>
        {/* Leave Info */}
        <View style={AttendanceTabStyles.leaveInfoSection2}>
          <Spacing space={10}/>
          <Text style={AttendanceTabStyles.leaveInfoText2}>{t("leaveInfoText1")}</Text>
          <Text style={AttendanceTabStyles.leaveInfoText2}>{t("leaveInfoText2")}</Text>
          <Text style={AttendanceTabStyles.leaveInfoText2}>{t("leaveInfoText3")}</Text>
          <Text style={AttendanceTabStyles.leaveInfoText2}>{t("leaveInfoText4")}</Text>
        </View>
      </View>
      <Spacing space={20}/>
    </ScrollView>
  );
};
export default AttendanceProfile;