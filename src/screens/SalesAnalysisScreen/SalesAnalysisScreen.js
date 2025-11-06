import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { darkTheme, lightTheme, Fonts, SF, SH } from "../../utils";
import { SalesAnalysisStyle } from "../../styles/SalesAnalysisStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DatePicker} from '../../components';
import { useSelector } from "react-redux";
import { HomeDropDownPicker } from '../../components';
import { useTranslation } from 'react-i18next';
import SalesList from "./SalesList";

const SalesAnalysis = () => {
  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const currentColors = isDarkMode ? darkTheme : lightTheme;
  const SalesAnalysisStyles = useMemo(() => SalesAnalysisStyle(currentColors), [currentColors]);
  const [fromDate, setFromDate] = useState(null);
  const [salesAnalysisCode, setSalesAnalysisCode] = useState([]);  // This stores the list of sales codes
  const [salesGroups, setSalesGroups] = useState([]);  // Assuming this is populated elsewhere
  const [toDate, setToDate] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState("");  // To store selected sales group code

  //take variable for show and hide picker
  let [pickerShow, setPickerShow] = useState(false)

  useEffect(() => {
    salesAnalysisCodeList();  
  }, []);

  const [totals, setTotals] = useState({
    order: { qty: 0, value: 0 },
    sale: { qty: 0, value: 0 },
    open: { qty: 0, value: 0 },
  });

  // Calculate totals for Order, Sale, Open
  useEffect(() => {
    const calculateTotals = () => {
      let orderQty = 0, orderValue = 0;
      let saleQty = 0, saleValue = 0;
      let openQty = 0, openValue = 0;

      salesData.forEach((item) => {
        const incomingQty = parseFloat(item.incoming_qty) || 0;
        const salesQty = parseFloat(item.sales_qty) || 0;
        const openQtyItem = parseFloat(item.open_qty) || 0;
        const incomingPrice = parseFloat(item.incoming_price) || 0;
        const salesPrice = parseFloat(item.sales_price) || 0;
        const openPrice = parseFloat(item.open_price) || 0;

        // Summing the values
        orderQty += openQtyItem + incomingQty;
        orderValue += openPrice + incomingPrice;

        saleQty += salesQty;
        saleValue += salesPrice;

        openQty += openQtyItem;
        openValue += openPrice;
      });

      // Convert **only values** to lakhs (divide by 100000)
      orderValue = (orderValue / 100000).toFixed(2);
      saleValue = (saleValue / 100000).toFixed(2);
      openValue = (openValue / 100000).toFixed(2);

      // Update the state with the correct values
      setTotals({
        order: { qty: orderQty, value: parseFloat(orderValue) },
        sale: { qty: saleQty, value: parseFloat(saleValue) },
        open: { qty: openQty, value: parseFloat(openValue) },
      });
    };

    // Only calculate totals if there's data to work with
    if (salesData.length > 0) {
      calculateTotals();
    }
  }, [salesData]);







  const salesAnalysisCodeList = async () => {
    setSelectedService(""); // empty the variable initially
    setPickerShow(false);

    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const sg_code = empid[0].sg_code;
    console.log('Sending SG Code:', sg_code);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic SU5DX1JvbXNvbnNfVFA6ckwrMiUmNzM8NjVB");

    // 🔁 Decide whether to use sm_code or zm_code dynamically
    const paramType = sg_code?.startsWith("ZM") ? "zm_code" : "sm_code";
    const apiUrl = `https://prismcore.romsons.com/romsons_incentive_core/v1/process/salesPerList?${paramType}=${sg_code}`;
    console.log("API URL: ", apiUrl);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 0) {
          console.log('Sales Analysis Codes:', result.data);
          setSalesAnalysisCode(result.data);
        } else {
          setSelectedService(sg_code);
          setPickerShow(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const salesAnalysisList = async (selectedService) => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic SU5DX1JvbXNvbnNfVFA6ckwrMiUmNzM8NjVB");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };


    const formattedFromDate = fromDate ? fromDate.toISOString().split('T')[0] : '';
    const formattedToDate = toDate ? toDate.toISOString().split('T')[0] : '';

    console.log(selectedService, "selectedService");
    // console.log(salesGroups,"salesGroups");
    // console.log(salesAnalysisCode,"jij");



    const sgroups = selectedService === "all"
      ? salesAnalysisCode.map(group => group.code).join(',')
      : selectedService;
    // console.log(sgroups,"71")
    // console.log( `https://ssdemocore.romsons.com/romsons_incentive_core/v1/process/salesPerRpt?from_date=${formattedFromDate}&to_date=${formattedToDate}&sgroups=${sgroups}`,"Line 72");

    try {
      const response = await fetch(
        `https://prismcore.romsons.com/romsons_incentive_core/v1/process/salesPerRpt?from_date=${formattedFromDate}&to_date=${formattedToDate}&sgroups=${sgroups}`,
        requestOptions
      );

      const result = await response.json();
      console.log('Full API response:', result);

      if (result && result.status === 0 && result.data && Array.isArray(result.data.ex_analysis)) {
        console.log('Sales Data:', result.data.ex_analysis);
        setSalesData(result.data.ex_analysis);

      } else {
        console.error('No valid data found for ex_return or result status is not 0');
        setSalesData([]);
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error);
      setSalesData([]);

    }
  };


  const handlePickerChange = (itemValue) => {
    console.log(itemValue, "itemValue");

    setSelectedService(itemValue);
  };

  const handleFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDate(currentDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToDate(currentDate);
  };

  const handleSubmit = () => {
    if (!fromDate || !toDate || !selectedService) {
      alert("Please select all fields: Sales Group, From Date, To Date");
      return;
    }

    const formattedFromDate = fromDate ? fromDate.toISOString().split('T')[0] : '';
    const formattedToDate = toDate ? toDate.toISOString().split('T')[0] : '';

    // Log the formatted dates and selected sales group code to the console
    console.log("From Date:", formattedFromDate);
    console.log("To Date:", formattedToDate);
    console.log("Selected Sales Group Code:", selectedService);

    salesAnalysisList(selectedService);  // Call the function to fetch sales data
  };




  return (
    <View style={[SalesAnalysisStyles.container, { padding: SF(10) }]}>
      {/* Picker for Sales Group */}
      {/* <View style={[SalesAnalysisStyles.pickerContainer]}>
        {pickerShow ? (
          <Picker
            selectedValue={selectedService}
            onValueChange={handlePickerChange}
            style={{ color: currentColors.text }}
            dropdownIconColor={currentColors.text}
          >
            <Picker.Item label="Please Select Sales Group" />
            
        
              <Picker.Item
                key={1}
                label={selectedService}
                 value={selectedService}
              />
           
          </Picker>
        ):  <Picker
        selectedValue={selectedService}
        onValueChange={handlePickerChange}
        style={{ color: currentColors.text }}
        dropdownIconColor={currentColors.text}
      >
        <Picker.Item label="Please Select Sales Group" />
        <Picker.Item label="All Sales Group" value="all" />
        {salesAnalysisCode.map((item, index) => (
          <Picker.Item
            key={index}
            label={`${item.code} - ${item.name} (${item.headQuarter})`}
            value={item.code} 
          />
        ))}
      </Picker>}

      </View> */}

{/* <View style={[SalesAnalysisStyles.pickerContainer]}> */}
  {pickerShow ? (
    <HomeDropDownPicker
      value={selectedService}
      setValue={handlePickerChange}
      data={[
        {
          label: selectedService,
          value: selectedService,
        },
      ]}
      placeholder="Please Select Sales Group"
      style={{ width: '100%' }}
    />
  ) : (
    <HomeDropDownPicker
      value={selectedService}
      setValue={handlePickerChange}
      data={[
        { label: 'All Sales Group', value: 'all' },
        ...salesAnalysisCode.map((item) => ({
          label: `${item.spCode} - ${item.spName} (${item.headQuarter})`,
          value: item.spCode,
        })),
      ]}
      placeholder="Please Select Sales Group"
      style={{ width: '100%' }}
    />
  )}
{/* </View> */}


      {/* Date Pickers */}
      <View style={SalesAnalysisStyles.row}>
        <View style={SalesAnalysisStyles.datePickerWrapper}>
          <View style={SalesAnalysisStyles.datePickerContainer}>
            <DatePicker
              handleName={<Text style={SalesAnalysisStyles.label}>{t("From Date")}</Text>}
              selectedDate={handleFromDateChange}
              setDate={setFromDate}
              style={SalesAnalysisStyles.datePicker}
            />
          </View>

          <View style={SalesAnalysisStyles.datePickerContainer}>
            <DatePicker
              handleName={<Text style={SalesAnalysisStyles.label}>{t("To Date")}</Text>}
              selectedDate={handleToDateChange}
              setDate={setToDate}
              style={SalesAnalysisStyles.datePicker}
            />
          </View>
        </View>

        <TouchableOpacity style={SalesAnalysisStyles.goButton} onPress={handleSubmit}>
          <Text style={SalesAnalysisStyles.goButtonText}>{t("Go")}</Text>
        </TouchableOpacity>
      </View>

      <View style={SalesAnalysisStyles.moduleContainer}>
        <View style={SalesAnalysisStyles.row1}>
          <View style={SalesAnalysisStyles.moduleBoxContainer}>
            <Text style={SalesAnalysisStyles.headingText}>Order</Text>
            <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
              <View style={SalesAnalysisStyles.moduleContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.order.qty}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Val: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.order.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={SalesAnalysisStyles.moduleBoxContainer}>
            <Text style={SalesAnalysisStyles.headingText}>Sale</Text>
            <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
              <View style={SalesAnalysisStyles.moduleContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.sale.qty}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Val: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.sale.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={SalesAnalysisStyles.moduleBoxContainer}>
            <Text style={SalesAnalysisStyles.headingText}>Open</Text>
            <TouchableOpacity style={SalesAnalysisStyles.moduleBox1}>
              <View style={SalesAnalysisStyles.moduleContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Qty: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.open.qty}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Val: </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{totals.open.value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>




      {/* Display Sales Data */}
      <SalesList salesData={salesData} />

      {/* </ScrollView> */}
    </View>
  );
};




export default SalesAnalysis;