import React, { useMemo, useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { HolidaysStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import {HomeDropDown } from '../../components';
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import { Picker } from '@react-native-picker/picker';
import { Spacing } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HolidaysScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const HolidaysStyles = useMemo(() => HolidaysStyle(Colors), [Colors]);

  const [selectedYear, setSelectedYear] = useState('');  // Initially no year selected
  const [holidays, setHolidays] = useState([]);
  const [isYearSelected, setIsYearSelected] = useState(false);  // Track if year is selected
  const currentYear = new Date().getFullYear();


  // Fetch holiday list from API based on selected year
  const holidayList = async (year) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "empId": empid[0].emp_id,
      "year": year
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://crm.romsons.com:8080/HolidayList", requestOptions);
      const result = await response.json();
      console.log(result, 'huijgtijhu');
        // Ensure it's in JSON format
      setHolidays(result.data);  // Assuming the response structure has a `data` field
    } catch (error) {
      console.error("Error fetching holiday list:", error);
    }
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearSelected(true);  // Year is selected, now fetch holidays
    holidayList(year);  // Fetch holidays for the selected year
  };

  const renderHolidayItem = ({ item }) => {
    // Format the date in Indian format (DD/MM/YYYY)
    const formattedDate = new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // const shortDayName = new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short' });

    let holidayTypeColor = '#757575';  // Default color for other types
  if (item.holiday_type === 'FH') {
    holidayTypeColor = 'black';  // Color for FH (Full Holiday)
  } else if (item.holiday_type === 'OH') {
    holidayTypeColor = 'brown';  // Color for OH (Optional Holiday)
  }

    return (
      <View style={[HolidaysStyles.row, { borderBottomWidth: 2, borderBottomColor: '#ddd', paddingVertical: 10 }]}>
        <Text style={[HolidaysStyles.cell, { fontSize: 14, fontWeight: 'bold', color: '#3b3b3b', paddingHorizontal: 5, marginRight: 30 }]}>
          {formattedDate}
        </Text>
        <View style={{ flexDirection: 'column', alignItems: 'flex-start',marginRight: 20 }}>
        <Text style={[HolidaysStyles.cell, { fontSize: 14, color: '#757575', paddingHorizontal: 5, fontWeight: 'bold' }]}>
          {item.day_name}
        </Text>
        <Text style={[HolidaysStyles.cell, { fontSize: 12, color: holidayTypeColor, paddingHorizontal: 5, fontWeight: 'bold' }]}>
          {item.holiday_type}
        </Text>
      </View>
        <Text style={[HolidaysStyles.cell, { fontSize: 12, color: '#0077cc', paddingHorizontal: 5,fontWeight: 'bold', }]}>
          {item.holiday_name}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    setSelectedYear(currentYear);  
    holidayList(currentYear); 
    setIsYearSelected(true); 
  }, []);

  return (
    <View style={HolidaysStyles.container}>
      <Text style={HolidaysStyles.title}>{t("Select_year")}</Text>
      
      {/* Year Picker */}
      <View style={HolidaysStyles.pickerBorder}>
  <HomeDropDown
    value={selectedYear}
    setValue={(itemValue) => handleYearSelect(itemValue)}  // Trigger holiday list update
    data={[
      { label: 'Choose Year', value: 'Choose Year' },
      { label: '2024', value: '2024' },
      { label: '2025', value: '2025' },
      // Add more years if needed
    ]}
    placeholder="Choose Year"
    
    style={HolidaysStyles.picker}
  />
</View>

      
      <Spacing space={30} />

      {/* Show holiday list only after year selection */}
     {/* Show holiday list only after year selection */}
{isYearSelected && (
  <>
    <FlatList
      data={holidays}
      renderItem={renderHolidayItem}
      keyExtractor={(item) => item.date}
      ListHeaderComponent={
        <View style={HolidaysStyles.headerRow}>
          <Text style={[HolidaysStyles.cell, HolidaysStyles.header]}>{t("Date")}</Text>
          <Text style={[HolidaysStyles.cell, HolidaysStyles.header]}>{t("Day")}</Text>
          <Text style={[HolidaysStyles.cell, HolidaysStyles.header]}>{t("Holiday_Type")}</Text>
        </View>
      }
    />
    
    <View style={{ alignItems: 'center',  marginBottom: 90 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3b3b3b' }}>
        * OH : Optional Holiday
      </Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3b3b3b' }}>
        * *FH : Fixed Holiday
      </Text>
    </View>
  </>
)}


{/* <View style={{ alignItems: 'center', marginBottom: 90 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3b3b3b' }}>
        * OH : Optional Holiday
      </Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#3b3b3b' }}>
        *FH : Fixed Holiday
      </Text>
    </View> */}

    </View>
  );
};

export default HolidaysScreen;
