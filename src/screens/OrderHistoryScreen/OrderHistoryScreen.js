import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, Platform, ScrollView, loading } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { darkTheme, Fonts, lightTheme, SF, SH } from "../../utils";
import { OrderHistoryStyle } from '../../styles/OrderHistoryStyle';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { format, parseISO } from "date-fns";

const OrderHistoryScreen = () => {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const currentColors = isDarkMode ? darkTheme : lightTheme;
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const OrderHistoryStyles = useMemo(() => OrderHistoryStyle(currentColors), [currentColors]);
  const [isBeatModalVisible, setBeatModalVisible] = useState(false);
  const [isOutletModalVisible, setOutletModalVisible] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState([]);
  let [selectbtname, setSelectbtname] = React.useState('');
  let [selectbtid, setSelectbtid] = React.useState('');
  const [selectedOutlet, setSelectedOutlet] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(" ");
  const [userBeatId, setUserBeatId] = useState(null);
  let [selectedOutletname, setSelectedOutletname] = useState('');
  const [selectot, setSelectot] = useState('');
  const [selectoutlets, setSelectoutlets] = useState([]);
  const [historyOrderData, setHistoryOrderData] = useState([]);
  const [months, setMonths] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [teamLists, setTeamLists] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Manager’s selected team member ID


  useEffect(() => {
    // Get the current date and calculate the current and previous month
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();  // 0 is Jan, 1 is Feb, ..., 11 is Dec

    // Get the current month (e.g., "Mar")
    const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

    // Calculate the previous month (we need to create a new date object for this to avoid modifying currentDate)
    const previousMonthDate = new Date(currentDate);
    previousMonthDate.setMonth(currentMonthIndex - 1);
    const previousMonth = previousMonthDate.toLocaleString('default', { month: 'short' });

    // Set the months to be displayed in the picker
    setMonths([previousMonth, currentMonth]);
  }, []);

  const openModal = async () => {
    setModalVisible1(true);
    const user = await AsyncStorage.getItem("userInfor");
    const empid = JSON.parse(user);
    await teamList();

  };



  const teamList = async () => {
    const user = await AsyncStorage.getItem("userInfor");
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "enterBy": empid[0].emp_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://devcrm.romsons.com:8080/ManagerTeam", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error == false) {
          // console.log('listttt', result.data);
          setTeamLists(result.data)

        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    console.log("Updated teamLists:", teamLists);
  }, [teamLists]);


  const handleMonthSelection = (month) => {
    setSelectedMonth(month);

    const currentYear = moment().year();

    // Months array (abbreviations)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get index of the selected month
    const monthIndex = months.indexOf(month);

    if (monthIndex === -1) {
      console.warn("Invalid month selected:", month);
      return;
    }

    // Get first and last date of the selected month using Moment.js
    const fromDate = moment(`${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}-01`, "YYYY-MM-DD").format("YYYY-MM-DD");
    const toDate = moment(fromDate).endOf("month").format("YYYY-MM-DD");

    console.log("Selected Month:", month);
    console.log("Request Payload:", { fromDate, toDate });

    // Call the OrderHistory_MIS API only if valid dates exist
    if (fromDate && toDate) {
      OrderHistory_MIS(fromDate, toDate);
    } else {
      console.error("Error: Invalid dates generated.");
    }
  };






  const selectBeat = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);
      const empIdToUse = selectedTeamId || empid[0].emp_id; // ✅ Use team ID if manager selected


      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "empID": empIdToUse
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://devcrm.romsons.com:8080/SelectedBeat", requestOptions);
      const result = await response.json();

      if (result.data.length > 0) {
        setSelectedBeat(result.data.map(beat => ({ beat_id: beat.beat_id, beat_name: beat.beat_name })));
      } else {
        setSelectedBeat([]);
      }

      setBeatModalVisible(true);
    } catch (error) {
      console.error("Error fetching beats:", error);
    }
  };


  const handleBeatSelect = (beat) => {
    setSelectbtname(beat.beat_name);
    setSelectbtid(beat.beat_id);
    console.log("Selected Beat Name:", beat.beat_name);
    console.log("Selected Beat ID:", beat.beat_id);
    setBeatModalVisible(false);
  };


  const selectOutlet = async () => {
    console.log('Selected Beat ID:', selectbtid);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({ "BeatID": selectbtid });
      console.log('Request Body:', raw);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch("https://devcrm.romsons.com:8080/SelectOutlet_OrderHistory", requestOptions);
      const result = await response.json();

      if (result.error === false) {
        setSelectoutlets(result.data);
        setOutletModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };



  const handleOutletSelect = (outletId, outletName) => {
    setSelectot(outletId);
    setSelectedOutletname(outletName);
    setOutletModalVisible(false);
  };






  const OrderHistory_MIS = async (fromDate, toDate) => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "fromDate": fromDate,
        "toDate": toDate,
        "Outletid": selectot,
        "enterBy": selectedTeamId || empid[0].emp_id
      });

      console.log('Request payload:', raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://devcrm.romsons.com:8080/OrderHistory_MIS", requestOptions);
      const result = await response.json();

      console.log('API Response:', result);

      if (result?.error === false) {
        console.log('Order history data:', result.data);
        setHistoryOrderData(result.data);
      } else {
        console.log('No data found for the selected period');
        setHistoryOrderData([]);
      }
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };




  return (
    <View style={OrderHistoryStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={[OrderHistoryStyles.pendingButton, { marginRight: 10 }]} onPress={openModal}>
          <Text style={OrderHistoryStyles.pendingText}>Team</Text>
        </TouchableOpacity>
        {/* {selectedTeam && (
    <Text style={OrderHistoryStyles.selectedTeamText}>{selectedTeam}</Text>
  )} */}

        <TouchableOpacity style={[OrderHistoryStyles.pendingButton, { marginRight: 10 }]} onPress={selectBeat}>
          <Text style={OrderHistoryStyles.pendingText}>Beat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={OrderHistoryStyles.pendingButton}
          onPress={() => {
            if (!selectbtid) {
              alert("Firstly Select Beat");
            } else {
              selectOutlet(selectbtid);
            }
          }}
        >
          <Text style={OrderHistoryStyles.pendingText}>Outlet</Text>
        </TouchableOpacity>
      </View>


      {/* Beat Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBeatModalVisible}
        onRequestClose={() => setBeatModalVisible(false)}
      >
        <View style={OrderHistoryStyles.modalOverlay}>
          <View style={OrderHistoryStyles.modalContainer}>
            <Text style={OrderHistoryStyles.modalTitle}>Select Beat</Text>
            <View style={OrderHistoryStyles.divider} />

            {selectedBeat.length > 0 ? (
              selectedBeat.map((beat, index) => (
                <TouchableOpacity
                  key={index}
                  style={OrderHistoryStyles.dateContainer}
                  onPress={() => handleBeatSelect(beat)}
                >
                  <Text style={OrderHistoryStyles.dateText}>{beat.beat_name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={OrderHistoryStyles.dateText}>No Beats Available</Text>
            )}

            <TouchableOpacity
              style={OrderHistoryStyles.closeButton}
              onPress={() => setBeatModalVisible(false)}
            >
              <Text style={OrderHistoryStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text>{selectedTeam}</Text>
      <Text style={OrderHistoryStyles.selectedText}>
        Selected Beat :
        <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>
          {selectbtname}
        </Text>
      </Text>

      {/* Outlet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOutletModalVisible}
        onRequestClose={() => setOutletModalVisible(false)}
      >
        <View style={OrderHistoryStyles.modalOverlay}>
          <View style={OrderHistoryStyles.modalContainer}>
            <Text style={OrderHistoryStyles.modalTitle}>Select Outlet</Text>
            <View style={OrderHistoryStyles.divider} />

            <ScrollView>
              {selectoutlets.length > 0 ? (
                selectoutlets.map((outlet, index) => (
                  <TouchableOpacity
                    key={index}
                    style={OrderHistoryStyles.dateContainer}
                    onPress={() => handleOutletSelect(outlet.outlet_id, outlet.outlet_name)}
                  >
                    <Text style={OrderHistoryStyles.dateText}>{outlet.outlet_name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={OrderHistoryStyles.dateText}>Firstly Select Beat</Text>
              )}
            </ScrollView>

            <TouchableOpacity
              style={OrderHistoryStyles.closeButton}
              onPress={() => setOutletModalVisible(false)}
            >
              <Text style={OrderHistoryStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        transparent={true}
        visible={modalVisible1}
        animationType="fade"
        onRequestClose={() => setModalVisible1(false)}
      >
        <View style={OrderHistoryStyles.modalOverlay4}>
          <View style={OrderHistoryStyles.dropdownContainer4}>

            {/* Beautiful Close Button */}
            <TouchableOpacity
              onPress={() => setModalVisible1(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: '#f2f2f2',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5, // for Android shadow
                shadowColor: '#000', // for iOS shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>×</Text>
            </TouchableOpacity>

            {/* Modal Content */}
            {loading ? (
              <ActivityIndicator size="medium" color="#0000ff" style={{ marginTop: 50 }} />
            ) : (
              <ScrollView style={{ marginTop: 50 }}>
                {teamLists.length > 0 ? (
                  teamLists.map((team, index) => (
                    <TouchableOpacity
                      key={index}
                      style={OrderHistoryStyles.option4}
                      onPress={() => {
                        setSelectedTeam(team.reporting_person_name);
                        setSelectedTeamId(team.emp_id);  // ✅ Store selected team member’s ID
                        setModalVisible1(false);
                      }}

                    >
                      <Text style={OrderHistoryStyles.optionText4}>
                        {team.reporting_person_name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={{ textAlign: 'center', padding: 10 }}>

                  </Text>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>




      <Text style={OrderHistoryStyles.selectedText}>
        Selected Outlet:
        <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>
          {selectedOutletname}
        </Text>
      </Text>

      {/* Month Picker */}
      <View>
        <View style={[OrderHistoryStyles.pickerBorder, { width: 200, alignSelf: "center", borderRadius: 10, overflow: "hidden", borderWidth: 1, borderColor: Colors.border, marginTop: 20, backgroundColor: Colors.cardBackground, paddingHorizontal: 5 }]}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={handleMonthSelection}
            style={OrderHistoryStyles.picker}
          >
            <Picker.Item label="Choose Month" value="" />
            {months.length > 0 &&
              months.map((month, index) => (
                <Picker.Item key={index} label={month} value={month} />
              ))}
          </Picker>
        </View>
      </View>

      {/* Order History Section (Corrected) */}
      <ScrollView contentContainerStyle={{ paddingBottom: 5 }}>
        <View>
          {historyOrderData && Object.keys(historyOrderData).length > 0 ? (
            Object.entries(historyOrderData).map(([date, orders]) => {
              const totalTaxableValue = orders
                .reduce((total, order) => total + parseFloat(order.taxable_value), 0)
                .toFixed(2);

              return (
                <View key={date} style={{ marginTop: 10 }}>
                  <View style={OrderHistoryStyles.infoContainer}>
                    <Text style={OrderHistoryStyles.hospitalText}>
                      {date} ({orders[0].order_id})
                    </Text>
                  </View>

                  <View style={OrderHistoryStyles.skuContainer}>
                    <View style={OrderHistoryStyles.skuHeaderRow}>
                      <Text style={OrderHistoryStyles.skuHeaderText}>SKU Name</Text>
                      <Text style={OrderHistoryStyles.skuHeaderText}>Unit Price</Text>
                      <Text style={OrderHistoryStyles.skuHeaderText}>Unit</Text>
                      <Text style={OrderHistoryStyles.skuHeaderText}>Amount</Text>
                    </View>

                    {orders.map((order, index) => (
                      <View style={OrderHistoryStyles.skuDataRow} key={index}>
                        <Text style={OrderHistoryStyles.skuText}>{order.sku_name}</Text>
                        <Text style={OrderHistoryStyles.skuText1}>{order.unit_price}</Text>
                        <Text style={OrderHistoryStyles.skuText1}>{order.unit}</Text>
                        <Text style={OrderHistoryStyles.skuText1}>{order.taxable_value}</Text>
                      </View>
                    ))}

                    {/* Total row aligned like SKU rows */}
                    <View style={OrderHistoryStyles.skuDataRow}>
                      <Text style={[OrderHistoryStyles.skuText, { fontWeight: 'bold' }]}>Total</Text>
                      <Text style={OrderHistoryStyles.skuText1}></Text>
                      <Text style={OrderHistoryStyles.skuText1}></Text>
                      <Text style={[OrderHistoryStyles.skuText1, { color: 'green', fontWeight: 'bold' }]}>
                        {totalTaxableValue}
                      </Text>
                    </View>
                  </View>
                </View>
              );

            })
          ) : (
            <Text style={OrderHistoryStyles.skuText}>No Data Available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};




export default OrderHistoryScreen;
