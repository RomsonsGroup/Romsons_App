import React, { useMemo } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { HomeTabStyle, ServicesTabStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import {  darkTheme, Fonts, lightTheme, SF, SH} from '../../utils';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Spacing } from '../../components';
const ServicesTab = (props) => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const ServicesTabStyles = useMemo(() => ServicesTabStyle(Colors), [Colors]);
  // const ServicesTabStyles = ServicesTabStyle;
  const { t } = useTranslation();
  return (
    <ScrollView style={ServicesTabStyles.container}>
    <TextInput
      style={ServicesTabStyles.searchInput}
      placeholder={t("Search_Services")}
      placeholderTextColor={Colors.light_gray_text_color}
    />
    <Spacing space={20}/>
    <View style={ServicesTabStyles.grid}>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="star" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_1")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="folder" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_2")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="event-available" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_3")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="flight-takeoff" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_4")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="access-time" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_5")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="brightness-auto" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_6")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="burst-mode" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_7")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="cancel-schedule-send" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_8")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="category" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_2")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ServicesTabStyles.serviceCard}>
        <Icon name="connect-without-contact" size={35} color={Colors.theme_background} style={ServicesTabStyles.cardIcon} />
        <Text style={ServicesTabStyles.cardTitle}>{t("Services_3")}</Text>
      </TouchableOpacity>

    </View>
    <Spacing space={70}/>
  </ScrollView>
  );
};
export default ServicesTab;