import React, { useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { Sidemenu } from '../../styles';
import { RouteName } from '../../routes';
import { ConfirmationAlert, Spacing, VectorIcon } from '../../components';
import { SF, darkTheme, lightTheme } from '../../utils';
import Translation from '../../Language/i18n';
import { useSelector } from "react-redux";
import images from "../../image";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomSidebarMenu = (props) => {
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  var alertdata = {
    'logout': Translation("Are_You_Sure_logout"),
  }
  const onoknutton = async() => {
    try {
      await AsyncStorage.multiRemove(['userInfor', 'authToken']);
      // navigation.navigate(RouteName.SWIPER_SCREEN);
         navigation.reset({
              index: 0,
              routes: [{ name: RouteName.SWIPER_SCREEN }],
            });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t("Error"), t("Failed to logout"));
    }
   
  }
  const Onpressfunction = (e) => {
    navigation.toggleDrawer();
    navigation.navigate(e)
  };
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const Sidemenus = useMemo(() => Sidemenu(Colors), [Colors]);
  // const Sidemenus = Sidemenu;
  return (
    <ScrollView>
      <View style={Sidemenus.customslidebarmenu}>
        <View style={Sidemenus.customslidebarTopView}>
          <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.HOME_SCREEN)}>
            {/* <VectorIcon style={Sidemenus.customslidebarmenuIcon} icon="AntDesign" size={SF(23)} name="menufold" color={Colors.theme_background} /> */}
              <Image source={images.App_logo} resizeMode='center' style={Sidemenus.ImageStyle} />
            <Text style={Sidemenus.homeHeadetextstyle}>{Translation("HR_Management")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.HOME_SCREEN)}>
            <VectorIcon style={Sidemenus.customslidebarmenuIcon2} icon="AntDesign" size={SF(23)} name="menufold" color={Colors.black_text_color} />
          </TouchableOpacity>
        </View>
        <Spacing space={10} />
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.HOME_SCREEN)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="home" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Home")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.ATTENDANCETAB)}>
          <VectorIcon icon="Feather" size={SF(18)} name="activity" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Attendance")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.SERVICESTAB)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="customerservice" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Services")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.PROFILETAB)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="profile" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Profile")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.TASKSSCREEN)}>
          <VectorIcon icon="Octicons" size={SF(18)} name="tasklist" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Tasks")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.CHECKINOUTSCREEN)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="arrowsalt" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("CheckInOut")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.APPROVALSCREEN)}>
          <VectorIcon icon="Entypo" size={SF(18)} name="cycle" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Approval")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.HOLIDAYSSCREEN)}>
          <VectorIcon icon="Entypo" size={SF(18)} name="add-to-list" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Holidays")}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.PAYROLLSCREEN)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="dotchart" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Payroll")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.PAYSTUBDETAILSSCREEN)}>
          <VectorIcon icon="Entypo" size={SF(18)} name="documents" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Paystub_details")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.LEAVEREQUESTSSCREEN)}>
          <VectorIcon icon="Entypo" size={SF(18)} name="export" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Leave_Requests")}</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.ATTENDANCEPROFILE)}>
          <VectorIcon icon="FontAwesome" size={SF(18)} name="user-o" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Attendance_Profile")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.SETTING_SCREEN)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="setting" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Settings")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.REVIEWS_SCREEN)}>
          <VectorIcon icon="Fontisto" size={SF(18)} name="preview" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Reviews")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.NOTIFICTION_SCREEN)}>
          <VectorIcon icon="Ionicons" size={SF(18)} name="notifications-outline" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Notification")}</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.PRIVACY_POLICY_SCREEN)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="questioncircleo" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Privacy_policy")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => Onpressfunction(RouteName.EDITPROFILE)}>
          <VectorIcon icon="AntDesign" size={SF(18)} name="edit" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} />
          <Text style={Sidemenus.hometextstyle}>{Translation("Edit_Profile")}</Text>
        </TouchableOpacity>
        <View style={Sidemenus.settingandlogout}>
          <TouchableOpacity style={Sidemenus.flexrowset} onPress={() => {
            setAlertVisible(true);
            setAlertMessage(alertdata.logout);
          }}>
            <VectorIcon
              icon="Entypo" name="log-out" style={Sidemenus.customslidebarmenuIcon} color={Colors.theme_background} size={SF(16)} />
            <Text style={Sidemenus.hometextstyle}>{Translation("log_out")}</Text>
          </TouchableOpacity>
        </View>
        <Spacing space={20}/>
        <ConfirmationAlert
          message={alertMessage}
          modalVisible={alertVisible}
          setModalVisible={setAlertVisible}
          onPressCancel={() => setAlertVisible(!alertVisible)}
          onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
          cancelButtonText={Translation("Cancel_Button")}
          buttonText={Translation("Ok")}
          buttonStyle={{ width: '45%' }}
        />
      </View>
     
    </ScrollView>
  );
};
export default CustomSidebarMenu;

