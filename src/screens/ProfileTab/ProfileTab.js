import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { AttendanceTabStyle } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme, SF, SH } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import images from '../../index';
import Moment from 'moment';
import { Spacing, VectorIcon } from '../../components';

const ProfileTab = (props) => {
  const [items, setItems] = useState([]);


  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const AttendanceTabStyles = useMemo(() => AttendanceTabStyle(Colors), [Colors]);
  const { t } = useTranslation();
  const navigation = useNavigation();


  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userInfor', 'authToken']);
      navigation.reset({
        index: 0,
        routes: [{ name: RouteName.LOGIN_SCREEN }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t("Error"), t("Failed to logout"));
    }
  };

  const profileData = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);



      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        empid: empid[0].emp_id

      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("https://crm.romsons.com:8080/profiledata", requestOptions);
      const result = await response.json();

      if (result.error === false) {
        console.log("Profile Data:", result.data);
        setItems(result.data || []);
      } else {
        console.error("API Error:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };




  useEffect(() => {
    profileData();
    // getdata();
  }, []);

  return (
    <ScrollView style={AttendanceTabStyles.container2}>

      <View style={AttendanceTabStyles.header2}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Romsons Group Pvt Ltd</Text>
        <Spacing space={10} />

        <Image style={AttendanceTabStyles.profileImage2} source={images.Sign3} />
        <Spacing space={10} />
        {items.map((res, ind) => {
          return (
            <View key={ind} style={{ marginBottom: 10, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', alignSelf: 'flex-start' }}>Division:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 8, color: 'white' }}>{res.division_name}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>User Name:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.user_name}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Emp Code:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.emp_code}</Text>
              </View>
              <Spacing space={4} />

              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>User Id:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.emp_id}</Text>
              </View>
              <Spacing space={4} />

              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Company Code:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.company_code}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Reporting Name:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.reporting_name}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Email Id:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.email}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Head Quarter:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.Head_Quater_name}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Phone Number:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{res.phone_number}</Text>
              </View>
              <Spacing space={4} />
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>DOJ:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 7, color: 'white' }}>{Moment(res.enter_date).format('DD-MM-YYYY')}</Text>
              </View>
            </View>
          );
        })}

        <Spacing space={20} />
      </View>
      <Spacing space={20} />
      <View style={AttendanceTabStyles.PaddingHorizontal}>
        <View style={AttendanceTabStyles.leaveInfoSectionPro}>
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteName.EDITPROFILE)}
            style={AttendanceTabStyles.timeSection3}
          >
            <View style={AttendanceTabStyles.timeSectionFlexRow}>
              <VectorIcon
                style={AttendanceTabStyles.ProfileIcon}
                icon="AntDesign"
                name="edit"
                size={SF(25)}
                color={Colors.theme_background}
              />
              <Text style={AttendanceTabStyles.dateText3}>{t("Password Change")}</Text>
            </View>
            <VectorIcon icon="AntDesign" name="right" size={SF(20)} color={Colors.theme_background} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                t("Confirm Logout"),
                t("Are you sure you want to logout?"),
                [
                  {
                    text: t("Cancel"),
                    style: "cancel"
                  },
                  {
                    text: t("Logout"),
                    onPress: handleLogout
                  }
                ]
              );
            }}
            style={AttendanceTabStyles.timeSection3}
          >
            <View style={AttendanceTabStyles.timeSectionFlexRow}>
              <VectorIcon
                style={AttendanceTabStyles.ProfileIcon}
                icon="Entypo"
                name="log-out"
                size={SF(25)}
                color={Colors.theme_background}
              />
              <Text style={AttendanceTabStyles.dateText3}>{t("log_out")}</Text>
            </View>
            <VectorIcon icon="AntDesign" name="right" size={SF(20)} color={Colors.theme_background} />
          </TouchableOpacity>
        </View>
      </View>
      <Spacing space={70} />
    </ScrollView>
  );
};

export default ProfileTab;
