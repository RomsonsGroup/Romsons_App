import React, { useMemo } from "react";
import { ScrollView, View, Text } from "react-native";
import {  PaystubDetailsStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import { Spacing } from "../../components";

const PaystubDetailsScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const PaystubDetailsStyles = useMemo(() => PaystubDetailsStyle(Colors), [Colors]);
  // const PaystubDetailsStyles =PaystubDetailsStyle;
  return (
    <ScrollView style={PaystubDetailsStyles.container}>
       <View style={PaystubDetailsStyles.footer}>
        <Text style={PaystubDetailsStyles.footerTime}>{t("Dat_time")}</Text>
      </View>
      <Spacing space={20}/>
      {/* {/ Summary Section /} */}
      <View style={PaystubDetailsStyles.section}>
        <Text style={PaystubDetailsStyles.sectionTitle}>{t("Summary")}</Text>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Gross_pay")}</Text>
          <Text style={PaystubDetailsStyles.value}>$800.00</Text>
          <Text style={PaystubDetailsStyles.value}>$7,280.00</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Employee_Taxes")}</Text>
          <Text style={PaystubDetailsStyles.value}>$94.26</Text>
          <Text style={PaystubDetailsStyles.value}>$1,370.46</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Net_pay")}</Text>
          <Text style={PaystubDetailsStyles.valueBold}>$653.26</Text>
          <Text style={PaystubDetailsStyles.valueBold}>$5,879.54</Text>
        </View>
      </View>

      {/* {/ Payroll Cost Section /} */}
      <View style={PaystubDetailsStyles.section}>
        <Text style={PaystubDetailsStyles.sectionTitle}>{t("Payroll_cost")}</Text>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Gross_pay")}</Text>
          <Text style={PaystubDetailsStyles.value}>$800.00</Text>
          <Text style={PaystubDetailsStyles.value}>$7,280.00</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Employer_Taxes")}</Text>
          <Text style={PaystubDetailsStyles.value}>$100.18</Text>
          <Text style={PaystubDetailsStyles.value}>$1,102.78</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Payroll_total")}</Text>
          <Text style={PaystubDetailsStyles.valueBold}>$900.00</Text>
          <Text style={PaystubDetailsStyles.valueBold}>$8,282.80</Text>
        </View>
      </View>

      {/* {/ Earnings Section /} */}
      <View style={PaystubDetailsStyles.section}>
        <Text style={PaystubDetailsStyles.sectionTitle}>{t("Earnings")}</Text>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Regular_hours")}</Text>
          <Text style={PaystubDetailsStyles.value}>40h</Text>
          <Text style={PaystubDetailsStyles.value}>$20.00/h</Text>
          <Text style={PaystubDetailsStyles.value}>$800.00</Text>
        </View>
      </View>

      {/* {/ Employee Taxes Section /} */}
      <View style={PaystubDetailsStyles.section}>
        <Text style={PaystubDetailsStyles.sectionTitle}>{t("Employee_taxes_withheld")}</Text>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Federal_Income_Tax")}</Text>
          <Text style={PaystubDetailsStyles.value}>$59.41</Text>
          <Text style={PaystubDetailsStyles.value}>$536.27</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Social_Security")}</Text>
          <Text style={PaystubDetailsStyles.value}>$49.48</Text>
          <Text style={PaystubDetailsStyles.value}>$442.46</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("Medicare")}</Text>
          <Text style={PaystubDetailsStyles.value}>$11.60</Text>
          <Text style={PaystubDetailsStyles.value}>$104.42</Text>
        </View>
        <View style={PaystubDetailsStyles.row}>
          <Text style={PaystubDetailsStyles.label}>{t("CA_Income_Tax")}</Text>
          <Text style={PaystubDetailsStyles.value}>$18.53</Text>
          <Text style={PaystubDetailsStyles.value}>$166.79</Text>
        </View>
      </View>
      <Spacing space={20}/>
      {/* {/ Footer Section /} */}
     
    </ScrollView>
  );
};
export default PaystubDetailsScreen;