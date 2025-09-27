import React, { useMemo, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileTabStyle } from '../../styles';
import { RouteName } from '../../routes';
import { Button, ConfirmationAlert, Input, Spacing } from "../../components";
import { useTranslation } from "react-i18next";
import images from "../../index";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";

const EditProfile = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertOtpVisible, setAlertOtpVisible] = useState(false);
  const [alertOtpMessage, setAlertOtpMessage] = useState('');

  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const ProfileTabStyles = useMemo(() => ProfileTabStyle(Colors), [Colors]);

  const updatePassword = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "empid": empid[0].emp_id,
        "Password": newPassword
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://devcrm.romsons.com:8080/changepassword", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.userData.error === false) {
            setAlertOtpMessage(t("Password_has_been_Change_Successfully"));
            setAlertOtpVisible(true);
          } else {
            console.error("Error:", result.userData.error.data);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={ProfileTabStyles.container1}>
      <ScrollView style={ProfileTabStyles.PaddingHorizontal}>
        <Spacing space={20} />
        <View style={ProfileTabStyles.profileSection}>
          <View>
            <Image
              source={images.profile}
              style={ProfileTabStyles.profileImage}
            />
          </View>
        </View>
        <Spacing space={20} />
        <View style={ProfileTabStyles.SetPaddingd}>
          <Input
            title={t("Enter New Password")}
            placeholder={t("Enter Here...")}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            placeholderTextColor={Colors.gray_text_color}
            titleStyle={ProfileTabStyles.titleStyle}
            inputStyle={ProfileTabStyles.input_style}
          />
          <Spacing space={20} />
          <Input
            title={t("Confirm New Password")}
            placeholder={t("Enter Here...")}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholderTextColor={Colors.gray_text_color}
            titleStyle={ProfileTabStyles.titleStyle}
            inputStyle={ProfileTabStyles.input_style}
          />
        </View>
        <Spacing space={70} />
      </ScrollView>

      <View style={ProfileTabStyles.BotttomAbs}>
        <Button
          title={t("Update")}
          onPress={() => {
            if (newPassword !== confirmPassword) {
              setAlertOtpMessage(t("Passwords_do_not_match"));
              setAlertOtpVisible(true);
            } else {
              updatePassword();
            }
          }}
        />
      </View>
      <ConfirmationAlert
        iconVisible={true}
        message={alertOtpMessage}
        modalVisible={alertOtpVisible}
        setModalVisible={setAlertOtpVisible}
        onPress={() => {
          setAlertOtpVisible(false);
          if (alertOtpMessage === t("Password_has_been_Change_Successfully")) {
            navigation.navigate(RouteName.LOGIN_SCREEN);
          }
        }}
        buttonText={t("Ok")}
        source={images.loginsuccessful}
        Lottiewidthstyle={Style.logoutStyel}
        buttonminview={ProfileTabStyle.centerBtn}
      />
    </View>
  );
};

export default EditProfile;
