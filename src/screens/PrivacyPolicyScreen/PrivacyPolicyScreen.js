import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { PolicyStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";

const HelpScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const PolicyStyles = useMemo(() => PolicyStyle(Colors), [Colors]);

  const openPrivacyPolicy = () => {
    Linking.openURL("https://crm.romsons.com/privacy-policy.html");
  };

  return (
    <View style={PolicyStyles.container}>
      <ScrollView style={PolicyStyles.content}>

        {/* 🔹 Heading */}
        <Text style={[PolicyStyles.sectionTitle, { marginBottom: 10 }]}>
          Privacy Policy
        </Text>

        {/* 🔸 Subtext */}
        <Text style={[PolicyStyles.text, { marginBottom: 20 }]}>
          Click below to view our full privacy policy.
        </Text>

        {/* 🔗 Clickable Link */}
        <TouchableOpacity onPress={openPrivacyPolicy}>
          <Text style={[PolicyStyles.text, { color: 'blue', textDecorationLine: 'underline' }]}>
            https://crm.romsons.com/privacy-policy.html
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default HelpScreen;
