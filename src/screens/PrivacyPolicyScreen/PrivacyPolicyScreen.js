import React, { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { PolicyStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";

const HelpScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const PolicyStyles = useMemo(() => PolicyStyle(Colors), [Colors]);
  return (
    <View style={PolicyStyles.container}>
      <ScrollView style={PolicyStyles.content}>
        <Text style={PolicyStyles.sectionTitle}>{t("Help_1")}</Text>
        <Text style={PolicyStyles.text}>{t("Help_2")}
        </Text>
        <Text style={PolicyStyles.text}>{t("Help_3")}
        </Text>
        <Text style={PolicyStyles.sectionTitle}>{t("Help_4")}</Text>
        <Text style={PolicyStyles.text}>{t("Help_2")}
        </Text>
        <Text style={PolicyStyles.text}>{t("Help_2")}
        </Text>
        <Text style={PolicyStyles.text}>{t("Help_2")}
        </Text>
        <Text style={PolicyStyles.text}>{t("Help_2")}
        </Text>
      </ScrollView>
    </View>
  );
};
export default HelpScreen;