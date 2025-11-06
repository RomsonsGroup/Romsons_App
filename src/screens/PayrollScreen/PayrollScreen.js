import React, { useMemo } from "react";
import { View, Text,  TouchableOpacity, ScrollView } from "react-native";
import { PayrollStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme} from "../../utils";
import { Spacing } from "../../components";

const PayrollScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const PayrollStyles = useMemo(() => PayrollStyle(Colors), [Colors]);
  // const PayrollStyles = PayrollStyle;
  return (
    <ScrollView style={PayrollStyles.container}>
      {/* Tabs */}
      <View style={PayrollStyles.tabContainer}>
        <TouchableOpacity style={PayrollStyles.tabButton}>
          <Text style={PayrollStyles.tabText}>{t("Payroll_Structure")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PayrollStyles.tabButton}>
          <Text style={PayrollStyles.tabText}>{t("Download_Payslip")}</Text>
        </TouchableOpacity>
      </View>
      <Spacing space={20} />
      {/* Net Salary Box */}
      <View style={PayrollStyles.netSalaryBox}>
        <Text style={PayrollStyles.netSalaryTitle}>{t("Net_Salary")}</Text>
        <Spacing space={15}/>
        <View style={PayrollStyles.salaryRow}>
          <View style={PayrollStyles.salaryColumn}>
            <Text style={PayrollStyles.salaryValue}>3000</Text>
            <Text style={PayrollStyles.salaryLabel}>{t("Gross_Earning")}</Text>
          </View>
          <View style={PayrollStyles.salaryColumn}>
            <Text style={PayrollStyles.salaryValue}>233.5</Text>
            <Text style={PayrollStyles.salaryLabel}>{t("Total_Deduction")}</Text>
          </View>
          <View style={PayrollStyles.salaryColumn}>
            <Text style={PayrollStyles.salaryValue}>2766.5</Text>
            <Text style={PayrollStyles.salaryLabel}>{t("Total_Earning")}</Text>
          </View>
        </View>
      </View>
      <Spacing space={20}/>
      {/* Details Section */}
      <View style={PayrollStyles.detailSection}>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailTitle}>{t("Earning")}</Text>
          <Text style={PayrollStyles.detailTitle}>{t("Amount")}</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Basic")}</Text>
          <Text style={PayrollStyles.detailText}>3000</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Total")}</Text>
          <Text style={PayrollStyles.detailText}>3000</Text>
        </View>
      </View>
      {/* Employee Contribution */}
      <View style={PayrollStyles.detailSection}>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailTitle}>{t("Employee_Contribution")}</Text>
          <Text style={PayrollStyles.detailTitle}>{t("Amount")}</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Pension")}</Text>
          <Text style={PayrollStyles.detailText}>150</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Health_Insurance")}</Text>
          <Text style={PayrollStyles.detailText}>83.5</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Total")}</Text>
          <Text style={PayrollStyles.detailText}>233.5</Text>
        </View>
      </View>
      {/* Employer Contribution */}
      <View style={PayrollStyles.detailSection}>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailTitle}>{t("Employee_Contribution")}</Text>
          <Text style={PayrollStyles.detailTitle}>{t("Amount")}</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Pension")}</Text>
          <Text style={PayrollStyles.detailText}>150</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Health_Insurance")}</Text>
          <Text style={PayrollStyles.detailText}>83.5</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Total")}</Text>
          <Text style={PayrollStyles.detailText}>233.5</Text>
        </View>
      </View>
      {/* Summary */}
      <View style={PayrollStyles.detailSection}>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailTitle}>{t("Net_Salary")}</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Gross_Earning")}</Text>
          <Text style={PayrollStyles.detailText}>3000</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Total_Deduction")}</Text>
          <Text style={PayrollStyles.detailText}>233.5</Text>
        </View>
        <View style={PayrollStyles.detailRow}>
          <Text style={PayrollStyles.detailText}>{t("Net_Amount")}</Text>
          <Text style={PayrollStyles.detailText}>2766.5</Text>
        </View>
      </View>
      <Spacing space={20} />
    </ScrollView>
  );
};
export default PayrollScreen;