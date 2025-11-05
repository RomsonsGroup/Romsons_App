import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LeaveRequestsStyle, PolicyStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { HolidaysStyle } from '../../styles';
import { useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import { darkTheme, Fonts, lightTheme, SF, SH } from "../../utils";
import { Spacing } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from "../../config/api_url";

const LeaveRequestsScreen = () => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [leaveData, setLeaveData] = useState([]);
  const LeaveRequestsStyles = useMemo(() => LeaveRequestsStyle(Colors), [Colors]);
  const HolidaysStyles = useMemo(() => HolidaysStyle(Colors), [Colors]);

  // ✅ Call API when selectedYear changes
  useEffect(() => {
    if (selectedYear) {
      LeaveStatusCheck();
    }
  }, [selectedYear]);

  const LeaveStatusCheck = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "empidd": empid[0].emp_id,
          "year": selectedYear

        }),
      };

      const response = await fetch(API_URL.LEAVE_STATUS_URL.LEAVE_STATUS_LIST_URL, requestOptions);
      const result = await response.json();

      if (!result.error) {
        setLeaveData(result.data);
      }
    } catch (error) {
      console.error("Error fetching leave status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "-");
  };

  const toggleExpand = (id) => {
    setLeaveData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <View style={LeaveRequestsStyles.container}>
      {/* ✅ Year Picker */}
      <View style={[HolidaysStyles.pickerBorder, {
        width: 200,
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.border,
        marginTop: 20,
        backgroundColor: Colors.cardBackground,
        paddingHorizontal: 5
      }]}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(year) => {
            setSelectedYear(year);
          }}
          style={HolidaysStyles.picker}
        >
          <Picker.Item label="Choose Year" value="" />
          <Picker.Item label="2024" value="2024" />
          <Picker.Item label="2025" value="2025" />
        </Picker>
      </View>


      <FlatList
        data={leaveData}
        renderItem={({ item, index }) => (
          <View style={LeaveRequestsStyles.PaddingHorizontal}>
            <View style={LeaveRequestsStyles.card}>
              <View style={LeaveRequestsStyles.header}>
                <View style={LeaveRequestsStyles.headerLeft}>
                  <Text style={LeaveRequestsStyles.leaveId}>{t("Leave_ID")} - {index + 1}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={LeaveRequestsStyles.appliedOn}>{formatDate(item.enter_date)}</Text>
                    <Text style={LeaveRequestsStyles.detailText}>

                      <View style={[LeaveRequestsStyles.statusContainer, {
                        backgroundColor: item.leave_status === 'P' ? 'black' :
                          item.leave_status === 'A' ? 'green' :
                            item.leave_status === 'R' ? 'red' : 'gray',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 30,
                        flex: 1,
                        marginLeft: 20,
                      }]}>
                        <Text style={[LeaveRequestsStyles.statusText, {
                          color: 'white', // White text on the colored background
                          fontWeight: 'bold',
                        }]}>
                          {item.leave_status === 'P' ? 'P' :
                            item.leave_status === 'A' ? 'A' :
                              item.leave_status === 'R' ? 'R' : 'Unknown'}
                        </Text>
                      </View>
                    </Text>
                  </View>

                </View>
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                  <Text style={LeaveRequestsStyles.viewDetails}>
                    {item.expanded ? "Hide Details" : "View Details"}{' '}
                    <MaterialIcons name={item.expanded ? "expand-less" : "expand-more"} size={24} color={Colors.theme_background} />
                  </Text>
                </TouchableOpacity>
              </View>

              {item.expanded && (
                <View style={LeaveRequestsStyles.details}>
                  <Text style={LeaveRequestsStyles.detailText}>Leave Type: {item.leave_type}</Text>
                  <Text style={LeaveRequestsStyles.detailText}>Start Date: {formatDate(item.start_date)}</Text>
                  <Text style={LeaveRequestsStyles.detailText}>End Date: {formatDate(item.end_date)}</Text>
                  <Text style={LeaveRequestsStyles.detailText}>Leave Days: {item.leave_days}</Text>
                  <Text style={LeaveRequestsStyles.detailText}>Approved Date: {formatDate(item.approved_date)}</Text>
                  <Text style={LeaveRequestsStyles.detailText}>Approved By: {item.approved_by || "N/A"}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


export default LeaveRequestsScreen;