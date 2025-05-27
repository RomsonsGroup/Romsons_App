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

  useFocusEffect(
    useCallback(() => {
      // This will be called when the screen comes into focus
      EodNotpunchin();
    }, []) // Empty dependency array means this runs only when the screen is focused
  );


  const EodNotpunchin = async () => {
    setEodd(false)
    const user = JSON.parse(await AsyncStorage.getItem('userInfor'));

    fetch(`https://devcrm.romsons.com:8080/EodNotPunchIn`, {
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

  const handleOutletClick = async () => {
    if (eodd) {
      Alert.alert(
        'Submit Your Pending EOD Report',
        'Do you want to submit EOD?',
        [
          {
            text: 'Yes',
            onPress: () => navigation.navigate(RouteName.EODSCREEN)
          },
          {
            text: 'No',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
    } else {
      // Proceed with normal flow if eodd is false, maybe navigate elsewhere
      navigation.navigate(RouteName.OUTLET);
    }
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

    fetch("https://devcrm.romsons.com:8080/punchInOutTime", requestOptions)
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



  // const handleLogout = () => {
  //   Alert.alert(
  //     "Confirmation",
  //     "Are you sure you want to logout?",
  //     [
  //       {
  //         text: "Cancel",
  //         style: "cancel"
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => performLogout()
  //       }
  //     ]
  //   );
  // };

  // const performLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userInfor");  // Remove user data from storage
  //     navigation.navigate(RouteName.LOGIN_SCREEN); // Navigate to login screen
  //     console.log("User successfully logged out");
  //   } catch (error) {
  //     console.error("Logout Error: ", error);
  //   }
  // };




  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       if (exitConfirm) {
  //         BackHandler.exitApp(); // ✅ Second back press pe app exit karega
  //         return true;
  //       }

  //       Alert.alert("Exit App", "Are you sure you want to exit?", [
  //         {
  //           text: "Cancel",
  //           onPress: () => setExitConfirm(false),
  //           style: "cancel",
  //         },
  //         {
  //           text: "Exit",
  //           onPress: () => {
  //             navigation.navigate(RouteName.LOGIN_SCREEN); // ✅ Pehle Login pe navigate
  //             setExitConfirm(true); // ✅ Agli baar back kare toh exit ho
  //           },
  //         },
  //       ]);

  //       return true; // ✅ Prevent default back action
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", backAction);

  //     return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  //   }, [exitConfirm])
  // )


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
      const response = await fetch("https://devcrm.romsons.com:8080/GetPendingTaskCount", requestOptions);
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

          {/* <TouchableOpacity
            onPress={handleLogout}
            style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'red', borderRadius: 5 }}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>Logout</Text>
          </TouchableOpacity> */}
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



        {/* <Text style={HomeTabStyles.LableText}>{t("Summary")}</Text> */}
        {/* Summary Section */}
        {/* <View style={HomeTabStyles.summarySection}>
          <TouchableOpacity style={HomeTabStyles.summaryBox} >
            <View style={HomeTabStyles.summaryBoxTop}>
              <VectorIcon icon="AntDesign" size={SF(25)} name="exception1" style={HomeTabStyles.InOutIcon3} color={Colors.theme_background} />
              <Text style={HomeTabStyles.summaryText}>25</Text>
            </View>
            <Spacing space={10} />
            <Text style={HomeTabStyles.summaryLabel}>{t("Missed_Attendance")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.summaryBox}>
            <View style={HomeTabStyles.summaryBoxTop}>
              <VectorIcon icon="AntDesign" size={SF(25)} name="unknowfile1" style={HomeTabStyles.InOutIcon3} color={Colors.theme_background} />
              <Text style={HomeTabStyles.summaryText}>06</Text>
            </View>
            <Spacing space={10} />
            <Text style={HomeTabStyles.summaryLabel}>{t("Pending_Approval")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={HomeTabStyles.summaryBox}>
            <View style={HomeTabStyles.summaryBoxTop}>
              <VectorIcon icon="AntDesign" size={SF(25)} name="notification" style={HomeTabStyles.InOutIcon3} color={Colors.theme_background} />
              <Text style={HomeTabStyles.summaryText}>05</Text>
            </View>
            <Spacing space={10} />
            <Text style={HomeTabStyles.summaryLabel}>{t("New_Notices")}</Text>
          </TouchableOpacity>
        </View> */}
        <Text style={HomeTabStyles.LableText}>{t("Task")}</Text>
        <Spacing space={20} />
        {/* Modules Section */}
        <View style={HomeTabStyles.modulesSection}>
          {eodd == true ? (
            <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={handleOutletClick}>
              <VectorIcon icon="AntDesign" size={SF(33)} name="shrink" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
              <Spacing space={10} />
              <Text style={HomeTabStyles.moduleLabel} >{t("Attendance")}</Text>
            </TouchableOpacity>
          ) : <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.PUNCHINOUT)}>
            <VectorIcon icon="AntDesign" size={SF(33)} name="shrink" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel} >{t("Attendance")}</Text>
          </TouchableOpacity>}


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
          {/* <TouchableOpacity style={HomeTabStyles.moduleBox}>
            <VectorIcon icon="AntDesign" size={SF(33)} name="contacts" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Assets")}</Text>
          </TouchableOpacity> */}
          {eodd == true ? (
            <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={handleOutletClick}>
              {/* <VectorIcon icon="AntDesign" size={SF(33)} name="zhihu" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} /> */}
              <Icon name="local-hospital" size={70} color={Colors.theme_background} />

              <Text style={HomeTabStyles.moduleLabel}>{t("Outlet")}</Text>
            </TouchableOpacity>
          ) : <TouchableOpacity style={HomeTabStyles.moduleBox} onPress={() => navigation.navigate(RouteName.OUTLET)}>
            <Icon name="local-hospital" size={70} color={Colors.theme_background} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Outlet")}</Text>
          </TouchableOpacity>}


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

            {/* <Text style={HomeTabStyles.pendingCountText}>
    {pendingCount > 0 ? `${pendingCount} Pending` : "No Pending"}
  </Text> */}
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
            <VectorIcon icon="FontAwesome" size={SF(33)} name="tasks" style={HomeTabStyles.moduleBoxIcon} color={Colors.theme_background} />
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
            <Icon name="handshake" size={60} color={Colors.theme_background} />



            <Spacing space={10} />
            <Text style={HomeTabStyles.moduleLabel}>{t("Regularization")}</Text>
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
        </View>
        <Spacing space={100} />
      </View>

    </ScrollView>
  );
};
export default HomeTab;