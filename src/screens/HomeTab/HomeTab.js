import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, BackHandler } from "react-native";
import { HomeTabStyle, ServicesTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme, SF, hexToRgba } from '../../utils';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RouteName } from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../index';
import { useSelector } from 'react-redux';
import { Spacing, VectorIcon } from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API_URL from '../../config/api_url';


const HomeTab = (props) => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  const ServicesTabStyles = useMemo(() => ServicesTabStyle(Colors), [Colors]);
  const [punchdates, setPunchdates] = useState([]);
  const [punchinoutTime, setPunchinoutTime] = useState([]);
  const [userName, setUserName] = useState('');
  const [exitConfirm, setExitConfirm] = useState(false); // ✅ Track exit state
  const [division, setDivision] = useState('');
  const [blink, setBlink] = useState(true);
  let [eodd, setEodd] = React.useState(false);
  // const HomeTabStyles = HomeTabStyle;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [pendingCount, setPendingCount] = useState(0);
  const [countPendingRegulization, setCountPendingRegulization] = useState(0);
  const [leavePendingCount, setLeavePendingCount] = useState(0)


  useFocusEffect(
    useCallback(() => {
      EodNotpunchin();
    }, [])
  );


  const EodNotpunchin = async () => {
    setEodd(false)
    const user = JSON.parse(await AsyncStorage.getItem('userInfor'));

    fetch(API_URL.HOMETAB_URL.NOT_PUNCH_IN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "enterBy": user[0].emp_id
      })
    })
      .then(res => res.json())
      .then(result => {
        if (!result.error) {

          let datas = result.data;
          datas.map(res => {
            if (res.eod == "N") {
              setEodd(true);
            } else if (res.eod == "Y") {
              setEodd(false);
            }
          })
        }
      })
      .catch(error => console.error("Fetch error:", error));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userInfor');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log("Parsed User Data: ", parsedData);
          setUserName(parsedData[0].full_name);
          setDivision(parsedData[0].division_name);
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage", error);
      }
    };

    fetchUserData();
  }, []);



  const PunchInOuttime = async () => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "empidd": empid[0].emp_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL.HOMETAB_URL.PUNCH_IN_OUT_TIME_URL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          // console.log('timeeee', result.data);
          setPunchinoutTime(result.data)
        }
      })
      .catch((error) => console.error(error));
  }

  useFocusEffect(
    useCallback(() => {
      PunchInOuttime(); // Fetch data when screen is focused
      RegulizationPendingCount();
      LeavePendingCount();
    }, [])
  );


  useEffect(() => {
    PunchInOuttime();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 800); // Change every 500ms

    return () => clearInterval(interval);
  }, []);


  const fetchPendingCount = async () => {
    const user = await AsyncStorage.getItem("userInfor");
    const empid = JSON.parse(user);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emp_id: empid[0]?.emp_id
      }),
      redirect: "follow"
    };

    try {
      const response = await fetch(API_URL.HOMETAB_URL.PENDING_TASK_COUNT_URL, requestOptions);
      const data = await response.json();
      if (!data.error && data.pendingCount !== undefined) {
        setPendingCount(data.pendingCount);
      } else {
        console.warn("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error fetching pending count:", error);
    }
  };

  const RegulizationPendingCount = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        empidd: empid[0]?.emp_id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        API_URL.HOMETAB_URL.PENDING_REGULIZATION_COUNT_URL,
        requestOptions
      );
      const result = await response.json();
      if (result.error === false) {
        setCountPendingRegulization(result.data.pending_count);
      }
    } catch (error) {
      console.error("Error fetching pending regularization count:", error);
    }
  };


  const LeavePendingCount = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        empidd: empid[0]?.emp_id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        API_URL.HOMETAB_URL.PENDING_LEAVE_COUNT_URL,
        requestOptions
      );
      const result = await response.json();


      if (result.error === false) {
        setLeavePendingCount(result.data.pending_count);
      }
    } catch (error) {
      console.error("Error fetching pending leave count:", error);
    }
  };



  useFocusEffect(
    useCallback(() => {
      fetchPendingCount();
    }, [])
  );


  return (
    <ScrollView style={HomeTabStyles.container}>
      {/* Header */}
      <Spacing space={20} />
      <View style={HomeTabStyles.header}>
        <Text style={HomeTabStyles.greeting}>Hi, {userName}</Text>
        <Spacing space={3} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={HomeTabStyles.subText}>Division: {division}</Text>
        </View>

      </View>
      <Spacing space={10} />
      <View style={HomeTabStyles.white_container}>
        {/* Time Section */}
        {punchinoutTime.map((res, ind) => (
          <View key={ind} style={HomeTabStyles.InOutcontainer}>

            {/* ✅ Punch-In Part */}
            <View style={HomeTabStyles.InOutPart}>
              <VectorIcon
                icon="AntDesign"
                size={SF(18)}
                name="login"
                style={HomeTabStyles.InOutIcon1}
                color={Colors.theme_background}
              />
              <Text style={HomeTabStyles.InOutTextStyle}>{res.punch_in}</Text>
              <View style={HomeTabStyles.InOutIcon2}>
                <VectorIcon
                  icon="AntDesign"
                  size={SF(18)}
                  name="down"
                  color={Colors.theme_background}
                />
              </View>
            </View>

            {/* ✅ Punch-Out Part (Yellow Highlight if Not Done) */}
            <View style={HomeTabStyles.InOutPart}>
              <VectorIcon
                icon="AntDesign"
                size={SF(18)}
                name="logout"
                style={HomeTabStyles.InOutIcon1}
                color={Colors.theme_background}
              />
              <Text
                style={[
                  HomeTabStyles.InOutTextStyle,
                  !res.punch_out && { color: blink ? "#bd9a0d" : "transparent", fontWeight: "bold" }
                ]}
              >
                {res.punch_out ? res.punch_out : 'Punch-Out'}  {/* 🕒 Show Time if Available, Else "Punch-Out" */}
              </Text>
              <VectorIcon
                icon="AntDesign"
                size={SF(18)}
                name="down"
                style={HomeTabStyles.InOutIcon2}
                color={Colors.theme_background}
              />
            </View>

          </View>
        ))}
        <Text style={HomeTabStyles.LableText}>{t("Task")}</Text>
        <Spacing space={20} />
        {/* Modules Section */}
        <View style={HomeTabStyles.modulesSection}>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.PUNCHINOUT)}>
            <VectorIcon icon="AntDesign" size={SF(33)} name="shrink" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel} >{t("Attendance")}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.LEAVEAPPLY)}>
            <Icon name="event-available" size={50} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Leave Apply")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.EXPENSE)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="rupee" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Claim")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeTabStyles.moduleBox}
            onPress={() => navigation.navigate(RouteName.OUTLET)}
          >
            <Icon
              name="local-hospital"
              size={70}
              color={Colors.theme_background}
            />
            <Text style={HomeTabStyles.moduleLabel}>
              {t("Outlet")}
            </Text>
          </TouchableOpacity>



          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.EODSCREEN)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("EOD")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeTabStyles.moduleBox}
            onPress={() => navigation.navigate(RouteName.TASKADD)}
          >
            <View style={{ position: "relative" }}>
              <VectorIcon
                icon="FontAwesome"
                size={SF(33)}
                name="pencil-square-o"
                style={HomeTabStyles.moduleBoxIcon}
                color={Colors.theme_background}
              />

              {pendingCount > 0 && (
                <View style={HomeTabStyles.notificationBadge}>
                  <Text style={HomeTabStyles.badgeText}>{pendingCount}</Text>
                </View>
              )}
            </View>

            <Spacing space={10} />

            <Text style={HomeTabStyles.moduleLabel}>{t("Task")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.MTPTOURPLANSCREEN)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("MTP")}</Text>
          </TouchableOpacity>
        </View>
        <Text style={HomeTabStyles.LableText}>{t("Approvals")}</Text>
        <Spacing space={20} />

        <View style={HomeTabStyles.modulesSection}>
          <Spacing space={30} />
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.TEAMSCREEN)}>
            {/* <VectorIcon icon="Feather" size={SF(33)} name="dollar-sign" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} /> */}
            <Icon name="groups" size={60} color={Colors.theme_background} />

            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel} >{t("Team")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.APPROVALSCREEN)}>
            <View style={{ position: "relative" }}>
              <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
              {leavePendingCount > 0 && (
                <View style={HomeTabStyles.notificationBadge}>
                  <Text style={HomeTabStyles.badgeText}>{leavePendingCount}</Text>
                </View>
              )}

            </View>

            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Leave")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="rupee" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Claim App")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.REGULIZATION)}>
            {/* <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} /> */}
            <View style={{ position: "relative" }}>
              <Icon name="handshake" size={60} color={Colors.theme_background} />
              {countPendingRegulization > 0 && (
                <View style={HomeTabStyles.notificationBadge}>
                  <Text style={HomeTabStyles.badgeText}>{countPendingRegulization}</Text>
                </View>
              )}
            </View>
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Regularization")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.MTPAPPROVALSCREEN)}>
            {/* <VectorIcon icon="Feather" size={SF(33)} name="dollar-sign" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} /> */}
            <Icon name="groups" size={60} color={Colors.theme_background} />

            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel} >{t("MTP APPROVAL")}</Text>
          </TouchableOpacity>
        </View>

        <Spacing space={20} />
        <Text style={HomeTabStyles.LableText}>{t("Reports")}</Text>
        <View style={HomeTabStyles.modulesSection}>
          <Spacing space={30} />
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.LEAVEREQUESTSSCREEN)}>
            <Icon name="event-available" size={70} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel} >{t("Leave Status")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.ATTENDANCEHISTORY)}>
            <VectorIcon icon="FontAwesome" size={SF(50)} name="map-marker" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Tracker")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.CHECKINOUTSCREEN)}>
            <VectorIcon icon="AntDesign" size={SF(38)} name="shrink" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("My Calender")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.HOLIDAYSSCREEN)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Holidays")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.ORDERHISTORY)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Order History")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.ACTIVITYHISTORY)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Activity History")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Claim History")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.SKUORDERHISTORY)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Sku History")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.SALESANALYSIS)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Sales Analysis")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.DAYSUMMARY)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Day Summary")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={()=> navigation.navigate(RouteName.MTPREPORTSCREEN)}>
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("MTP REPORT")}</Text>
          </TouchableOpacity>
        </View>
        <Spacing space={100} />
      </View>

    </ScrollView>
  );
};
export default HomeTab;