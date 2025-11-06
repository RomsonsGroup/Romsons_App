import React, { useMemo, useState,useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal, TextInput } from "react-native";
import { CheckInOutStyle, PolicyStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from "../../components/commonComponents/DatePicker";
import MonthYearPicker from "../../components/commonComponents/MonthYearPicker"
import { Spacing } from "../../components";
import moment from 'moment';  // Import moment here
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CheckInOutScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const [fromDate, setFromDate] = useState(moment().startOf('month').format("YYYY-MM-DD"));
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceCounts, setAttendanceCounts] = useState({
    present: 0,
    absent: 0,
    halfDay: 0,
    leave: 0,
    totalDays: 0,
    weekoff: 0,
    holiday: 0,
  });
  const [selectedPunchItem, setSelectedPunchItem] = useState(null); 
  const [reasonData, setReasonData] = useState(""); 
  const [modalVisible, setModalVisible] = useState(null); 
  const [regularizedDates, setRegularizedDates] = useState([]);
  const [showInput, setShowInput] = useState(null);

  const CheckInOutStyles = useMemo(() => CheckInOutStyle(Colors), [Colors]);

  const monthlyInOutList = async () => {
    if (!fromDate) return;

    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    // Fetch regularized dates from AsyncStorage when the page refreshes
    const storedRegularizedDates = await AsyncStorage.getItem(`regularizedDates_${empid[0].emp_id}`);
    if (storedRegularizedDates) {
      const parsedDates = JSON.parse(storedRegularizedDates);
      setRegularizedDates(parsedDates); // Update the state with the fetched data
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "selectedDate": moment(fromDate).format("YYYY-MM-DD"),
      "empid": empid[0].emp_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://crm.romsons.com:8080/monthlyAttendance", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error === false) {
          setAttendanceData(result.data);
          calculateAttendanceCounts(result.data);
        } else {
          setAttendanceData([]);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  
  
  


  

  const calculateAttendanceCounts = (data) => {
    let present = 0;
    let absent = 0;
    let halfDay = 0;
    let leave = 0;
    let totalDays = 0;
    let weekoff = 0;
    let holiday = 0;

    data.forEach(item => {
      totalDays++;
      switch(item.attendance_status) {
        case 'P':
          present++;
          break;
        case 'A':
          absent++;
          break;
        case 'ABSHD':
          halfDay++;
          break;
        case 'L':
          leave++;
          break;
        case 'WEO':
          weekoff++;
          break;
        case 'PHY':
          holiday++;
          break;
        default:
          break;
      }
    });

    setAttendanceCounts({
      present,
      absent,
      halfDay,
      leave,
      totalDays,
      weekoff,
      holiday
    });
  };

  useEffect(() => {
    if (fromDate) {
      monthlyInOutList();
    }
  }, [fromDate]);

  const PunchItem = ({ item }) => {
    const formattedDate = new Date(item.punch_date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const handleAbsentClick = () => {
      setSelectedPunchItem(item);  // Store selected item
      setModalVisible(item.punch_date); // Set modal visible for this item
    };

    return (
      <View style={CheckInOutStyles.PaddingHorizontal}>
        <View style={CheckInOutStyles.punchItem}>
          <Text style={CheckInOutStyles.date}>{formattedDate}</Text>
          <Spacing space={7} />
          <View style={CheckInOutStyles.row}>
            <Text style={[CheckInOutStyles.time, CheckInOutStyles.inText]}>
              {'In ⏰ :'} {item.punch_in_time}
            </Text>
            <Text style={[CheckInOutStyles.type, CheckInOutStyles.outText]}>
              {'Out ⏰ :'} {item.punch_out_time}
            </Text>
          </View>
          <Spacing space={4} />
          <View style={CheckInOutStyles.row}>
            <Text style={CheckInOutStyles.createdBy}>{t("Total Hour")}: {item.total_hours}</Text>

            <TouchableOpacity onPress={item.attendance_status === "A" ? handleAbsentClick : null}>
    <View
      style={[
        CheckInOutStyles.statusContainer,
        { backgroundColor: CheckInOutStyles.statusContainerColor(item.attendance_status) },
        item.attendance_status === "A" && regularizedDates.includes(item.punch_date) && { backgroundColor: "lightblue" }
      ]}
    >
      <Text style={CheckInOutStyles.statusText}>
        {item.attendance_status}
      </Text>
    </View>
  </TouchableOpacity>







          </View>
        </View>
      </View>
    );
  };

  const handleModalClose = () => {
    setModalVisible(null); 
    setShowInput(null); 
    setSelectedPunchItem(null); 
  };

  const handleSubmit = async () => {
    if (selectedPunchItem) {
      setReasonData(prevState => ({
        ...prevState,
        [selectedPunchItem.punch_date]: reasonData
      }));

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "emp_id": selectedPunchItem.emp_id,
        "Request_Remarks": reasonData,
        "requestDate": moment(selectedPunchItem.punch_date).format("YYYY-MM-DD")
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://crm.romsons.com:8080/attendance_regulization", requestOptions)
        .then(async (response) => response.json())
        .then(async (result) => {
          if (result.error === false) {
            alert(result.data);

            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            // ✅ Employee-specific date store
            const storedDates = await AsyncStorage.getItem(`regularizedDates_${empid[0].emp_id}`);
            const parsedDates = storedDates ? JSON.parse(storedDates) : [];
            const updatedRegularizedDates = [...new Set([...parsedDates, selectedPunchItem.punch_date])];

            await AsyncStorage.setItem(`regularizedDates_${empid[0].emp_id}`, JSON.stringify(updatedRegularizedDates));

            setRegularizedDates(updatedRegularizedDates);
            monthlyInOutList();
          } else {
            alert(result.data || "Failed to submit regularization request.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while submitting the request.");
        });

      setModalVisible(null);
      setShowInput(null);
    }
  };

  
  

  return (
    <SafeAreaView style={CheckInOutStyles.container}>
      <Spacing space={20} />
      <View style={CheckInOutStyles.PaddingHorizontal}>
        <View style={CheckInOutStyles.header}>
          <View style={CheckInOutStyles.dateRow}>
            <View style={CheckInOutStyles.datePickerWrapper}>
              <MonthYearPicker
                handleName={<Text style={{ fontSize: 12 }}>{t("Selected Month/Year")}</Text>}
                selectedDate={(err, date) => {
                  if (!err) {
                    setFromDate(date);
                  } else {
                    console.error("Error selecting From Date:", err);
                  }
                }}
              />
            </View>
          </View>
          <Spacing space={10} />
        </View>
      </View>
      <Spacing space={10} />

      {/* Displaying the attendance summary */}
      <View style={CheckInOutStyles.attendanceSummary}>
        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.present]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("Present")}: {attendanceCounts.present}
          </Text>
        </View>

        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.absent]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("Absent")}: {attendanceCounts.absent}
          </Text>
        </View>

        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.halfDay]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("Half Day")}: {attendanceCounts.halfDay}
          </Text>
        </View>

        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.leave]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("Leave")}: {attendanceCounts.leave}
          </Text>
        </View>

        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.weekoff]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("WEO")}: {attendanceCounts.weekoff}
          </Text>
        </View>

        <View style={[CheckInOutStyles.statusBadge, CheckInOutStyles.weekoff]}>
          <Text style={CheckInOutStyles.statusText}>
            {t("PHY")}: {attendanceCounts.holiday}
          </Text>
        </View>
      </View>

      <FlatList
        data={attendanceData}
        renderItem={({ item }) => <PunchItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={CheckInOutStyles.listContent}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === selectedPunchItem?.punch_date} // Show modal only for the selected item
        onRequestClose={handleModalClose}
      >
        <View style={CheckInOutStyles.modalContainer}>
          <View style={CheckInOutStyles.modalBox}>
            {!showInput ? (
              <>
                <Text style={CheckInOutStyles.modalText}>
                  Do you want to request attendance regularization?
                </Text>
                <View style={CheckInOutStyles.buttonRow1}>
                  <TouchableOpacity
                    style={CheckInOutStyles.button}
                    onPress={() => setShowInput(true)}
                  >
                    <Text style={CheckInOutStyles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={CheckInOutStyles.button}
                    onPress={handleModalClose}
                  >
                    <Text style={CheckInOutStyles.buttonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={CheckInOutStyles.modalText}>Enter Reason:</Text>
                <TextInput
                  style={CheckInOutStyles.input}
                  placeholder= 'Type your reason here'
                  value={reasonData}
                  onChangeText={(text) => setReasonData(text)}
                />
                <View style={CheckInOutStyles.buttonRow}>
            <TouchableOpacity
              style={CheckInOutStyles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={CheckInOutStyles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={CheckInOutStyles.cancelButton} // New cancel button
              onPress={handleModalClose} // This will close the modal
            >
              <Text style={CheckInOutStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
                
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};









export default CheckInOutScreen;
