import React, { useMemo } from 'react';
import { View, Text, ScrollView } from "react-native";
import {  SettingsScreenStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import {  darkTheme, lightTheme } from '../../utils';
import {  Spacing, VectorIcon } from '../../components';
import { useSelector } from "react-redux";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const SettingsScreenStyles = useMemo(() => SettingsScreenStyle(Colors), [Colors]);
  // const SettingsScreenStyles =  SettingsScreenStyle;
  return (
    <ScrollView style={SettingsScreenStyles.container}>
      <View>
      </View>
      <Spacing space={17} />
      <View style={SettingsScreenStyles.PaddingHorizontal}>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="notification" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Notification_Setting")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="lock1" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Password_manager")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="deleteuser" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Delete_account")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="edit" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Manage_Account")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="staro" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Rate_us")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="unlock" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("App_lock")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="Entypo" color={Colors.theme_background} name="language" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Langauge_k")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="AntDesign" color={Colors.theme_background} name="questioncircleo" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Privacy_policy")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
        <View style={SettingsScreenStyles.task}>
          <View style={SettingsScreenStyles.taskRow}>
            <VectorIcon style={SettingsScreenStyles.SettingIcon} icon="Fontisto" color={Colors.theme_background} name="preview" size={20} />
            <View style={SettingsScreenStyles.taskTitleView}>
              <Text style={SettingsScreenStyles.taskTitle}>{t("Feedback")}</Text>
            </View>
          </View>
          <View style={SettingsScreenStyles.taskDetails}>
            <VectorIcon  icon="AntDesign" color={Colors.theme_background} name="right" size={17} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SettingsScreen;