import React, { useState, useMemo, useEffect } from 'react';
import { View, Text } from 'react-native'
import { SkuHistoryStyle } from '../../styles/SkuHistoryStyle';
import { useSelector } from 'react-redux';
import { Button, Input, Spacing, DatePicker, VectorIcon } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../../utils';
import { useTranslation } from 'react-i18next';

const SkuOrderScreen = ({ route }) => {
    const selectedSKUs = route.params?.selectedSKUs || [];
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const { t } = useTranslation();
    const [skuSelectedlist, setSkuSelectedlist] = useState([]);
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const SkuHistoryStyles = useMemo(() => SkuHistoryStyle(currentColors), [currentColors]);
  
    // UseEffect to call selectedSkuList when fromDate or toDate is set
    useEffect(() => {
      if (selectedSKUs.length > 0 && fromDate && toDate) {
        selectedSkuList(); // Call the function when both dates are valid
      }
    }, [selectedSKUs, fromDate, toDate]); // Dependencies: runs when selectedSKUs, fromDate, or toDate change
  
    const handleFromDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || fromDate;
      setFromDate(currentDate); // Update fromDate when a date is selected
    };
  
    const handleToDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || toDate;
      setToDate(currentDate); // Update toDate when a date is selected
    };
  
    const formatDate = (date) => {
      return date ? new Date(date).toISOString().split('T')[0] : null; // Format date to YYYY-MM-DD
    };
  
    const selectedSkuList = async () => {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);
  
      const formattedFromDate = formatDate(fromDate);
      const formattedToDate = formatDate(toDate);
  
      const raw = JSON.stringify({
        skuids: selectedSKUs,
        fromdate: formattedFromDate,
        todate: formattedToDate,
        enterBy: empid[0].emp_id
      });
  
      console.log('Request Payload:', raw);
  
      fetch("https://devcrm.romsons.com:8080/Totalskuorderwise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw
      })
        .then(response => response.json())
        .then(result => {
          console.log('API Response:', result);
  
          if (!result.error) {
            console.log('Response Data:', result.data);
            setSkuSelectedlist(result.data); // Set the fetched data to the state
          } else {
            setSkuSelectedlist([]); // Clear the data if there's an error
          }
        })
        .catch(error => {
          console.error('Fetch Error:', error);
        });
    };
  
    return (
      <View style={{ flex: 1 }}>
        {/* Date Pickers */}
        <View style={SkuHistoryStyles.row}>
          <View style={SkuHistoryStyles.datePickerContainer}>
            <DatePicker
              handleName={<Text style={{ fontSize: 14 }}>{t("From Date")}</Text>}
              selectedDate={handleFromDateChange}  
              setDate={setFromDate}
              style={SkuHistoryStyles.datePicker}
            />
          </View>
  
          <View style={SkuHistoryStyles.datePickerContainer}>
            <DatePicker
              handleName={<Text style={{ fontSize: 14 }}>{t("To Date")}</Text>}
              selectedDate={handleToDateChange}  // Pass the date change handler
              setDate={setToDate}  // Pass the date setter function
              style={SkuHistoryStyles.datePicker}
            />
          </View>
        </View>
  
        {/* Display Results */}
        {skuSelectedlist.length > 0 ? (
          skuSelectedlist.map((res, ind) => (
            <View key={ind} style={{
              marginTop: 16, padding: 12, backgroundColor: '#ffffff', borderRadius: 8,
              shadowColor: '#000', marginHorizontal: 20, shadowOpacity: 0.1,
              shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 3,
            }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                <Text style={{ color: 'black', fontSize: 13 }}>Sku Name: </Text>
                <Text style={{ color: 'green', fontSize: 12 }}>{res.sku_name}</Text>
              </Text>
  
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                <Text style={{ color: 'black', fontSize: 13 }}>Total Quantity: </Text>
                <Text style={{ color: 'green', fontSize: 13 }}>{res.TotalQTY}</Text>
              </Text>
  
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                <Text style={{ color: 'black', fontSize: 13 }}>Total Amount: </Text>
                <Text style={{ color: 'green', fontSize: 13 }}>{res.TotalAMT}</Text>
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No data available</Text>
        )}
      </View>
    );
  };
  



export default SkuOrderScreen