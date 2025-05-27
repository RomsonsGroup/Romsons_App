import React, { useState, useMemo, useEffect } from 'react';
import {
    View, Text, ScrollView, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity
} from 'react-native';
import { Button, Input, Spacing, DatePicker, VectorIcon, HomeDropDown } from '../../components';
import { Picker } from '@react-native-picker/picker';
import { HomeTabStyle } from '../../styles';
import { SH, SF } from '../../utils';
import { LeaveApplyStyle } from '../../styles/LeaveApplyStyle';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../../utils';
import Moment from 'moment';
import axios from 'axios';

const LeaveApply = () => {
    const [el_balance, setElBalance] = useState(0); // Initialize state for EL balance
    const [cl_balance, setClBalance] = useState(0);
    const [sl_balance, setSlBalance] = useState(0);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    let [numberOfdays, setNumberOfdays] = useState(0);
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const LeaveApplyStyles = useMemo(() => LeaveApplyStyle(currentColors), [currentColors]);
    const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
    const { t } = useTranslation();
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [leaveBalance, setLeaveBalance] = useState(new Date());

    useEffect(() => {
        fetchLeaveTypes();
        fetchLeaveBalanceData();
    }, []);



    const handleFromDateChange = (event, selectedDate) => {
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentYearEnd = new Date(now.getFullYear(), 11, 31); // 31 Dec 2025
    
        const currentDate = selectedDate || new Date();
    
        if (currentDate < currentMonthStart) {
            Alert.alert("Invalid Date", "You can't select a date from the previous month.");
            setShowDatePicker(false);
            return;
        }
    
        if (currentDate > currentYearEnd) {
            Alert.alert("Invalid Date", "You can't select a date beyond the current year.");
            setShowDatePicker(false);
            return;
        }
    
        setFromDate(null);
        setShowDatePicker(false);
        setFromDate(currentDate);
    };
    


    // Handle To date change
    const handleToDateChange = (event, selectedDate) => {
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentYearEnd = new Date(now.getFullYear(), 11, 31); // 31 Dec 2025
    
        const currentDate = selectedDate || new Date();
    
        if (currentDate < currentMonthStart) {
            Alert.alert("Invalid Date", "You can't select a date from the previous month.");
            setShowDatePicker(false);
            return;
        }
    
        if (currentDate > currentYearEnd) {
            Alert.alert("Invalid Date", "You can't select a date beyond the current year.");
            setShowDatePicker(false);
            return;
        }
    
        setToDate(null);
        setShowDatePicker(false);
        setToDate(currentDate);
    };
    


    const fetchLeaveTypes = async () => {

        try {
            const response = await axios.get("https://devcrm.romsons.com:8080/leave_type", {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.data.error) {
                const mappedLeaveTypes = response.data.data.map((item) => ({
                    label: item.leave_description,
                    value: item.leave_type,
                }));
                setLeaveTypes(mappedLeaveTypes);
            }
        } catch (error) {
            console.error("Error fetching leave types:", error.message);
        }
    };

    const calculateNumberOfDays = (start, end) => {
        if (start && end) {
            const startDate = Moment(start, 'YYYY-MM-DD');
            const endDate = Moment(end, 'YYYY-MM-DD');

            const daysDifference = endDate.diff(startDate, 'days') + 1; // Include the start date
            setNumberOfdays(daysDifference > 0 ? daysDifference : 0);
        }
    };

    useEffect(() => {
        calculateNumberOfDays(fromDate, toDate);
    }, [fromDate, toDate]);



    const handleSubmit = async () => {
        try {
            // Get user data from AsyncStorage
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            // **15 days validation (frontend check)**
            if (numberOfdays > 15) {
                Alert.alert("Error", "You cannot apply for more than 15 leaves at a time.");
                return;
            }

            // Prepare payload for the API request
            const leavePayload = {
                empID: empid[0].emp_id,
                rpPerson: empid[0].reporting_to,
                leaveType: leaveType,
                fromDate: Moment(fromDate).format('YYYY-MM-DD'),
                toDate: Moment(toDate).format('YYYY-MM-DD'),
                numofdays: numberOfdays,
                leavereason: reason,
                enterBy: empid[0].emp_id,
            };

            console.log("Payload being sent:", leavePayload);

            // Send POST request
            const response = await axios.post("https://devcrm.romsons.com:8080/LeaveApp", leavePayload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check for error in the response
            if (response.data.error) {
                Alert.alert("Error", response.data.data || "Something went wrong");
            } else {
                Alert.alert("Success", response.data.msg || "Leave request submitted successfully");
            }
            setNumberOfdays(0);
            setFromDate('');
            setToDate('');
            setReason('');

        } catch (error) {
            // Handle error if request fails
            console.error("Error during leave submission:", error);
            Alert.alert("Error", "An error occurred while submitting the leave request.");
        }
    };

    const fetchLeaveBalanceData = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);
            // Send a GET request to the API endpoint with the emp_id query parameter
            const response = await axios.get('https://devcrm.romsons.com:8080/leave_history', {
                params: {
                    emp_id: empid[0].emp_id // Pass the emp_id parameter dynamically if needed
                }
            });

            // Log or process the data received
            console.log('Leave Balance Data:', response.data);
            await setLeaveBalance(response.data.data[0])
            setElBalance(response.data.data[0]?.el_balance || 0);
            setClBalance(response.data.data[0]?.cl_balance || 0);
            setSlBalance(response.data.data[0]?.sl_balance || 0);
            // You can update your state here with the response data
        } catch (error) {
            // Handle errors, such as network issues or invalid response
            console.error('Error fetching leave balance data:', error);
        }
    };



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={LeaveApplyStyles.keyboardAvoidingContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={LeaveApplyStyles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={LeaveApplyStyles.formContainer}>
                        <Spacing space={8} />
                        <View style={HomeTabStyles.moduleContainer}>
                            <View style={HomeTabStyles.row}>
                                {/* Leave Allocated */}
                                <View style={HomeTabStyles.moduleBoxContainer}>
                                    <Text style={HomeTabStyles.headingText}>Allocate</Text>
                                    <TouchableOpacity style={HomeTabStyles.moduleBox1}>
                                        <View style={HomeTabStyles.moduleContent}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>EL: </Text>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.el_allocated}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>CL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.cl_allocated}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>SL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.sl_allocated}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Leave Availed */}
                                <View style={HomeTabStyles.moduleBoxContainer}>
                                    <Text style={HomeTabStyles.headingText}>Availed</Text>
                                    <TouchableOpacity style={HomeTabStyles.moduleBox1}>
                                        <View style={HomeTabStyles.moduleContent}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>EL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.el_availed}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>CL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.cl_availed}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>SL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.sl_availed}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Leave Balance */}
                                <View style={HomeTabStyles.moduleBoxContainer}>
                                    <Text style={HomeTabStyles.headingText}>Balance</Text>
                                    <TouchableOpacity style={HomeTabStyles.moduleBox1}>
                                        <View style={HomeTabStyles.moduleContent}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>EL: </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                        color: leaveBalance?.el_balance === 0 ? 'red' : 'white'
                                                    }}
                                                >
                                                    {leaveBalance?.el_balance}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>CL: </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        fontWeight: 'bold',
                                                        color: leaveBalance?.cl_balance === 0 ? 'red' : 'white'
                                                    }}
                                                >
                                                    {leaveBalance?.cl_balance}
                                                </Text>

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>SL: </Text>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{leaveBalance?.sl_balance}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>


                        <Text style={LeaveApplyStyles.label}>{t("Leave Type")}</Text>
                        <HomeDropDown
                            value={leaveType}
                            setValue={(itemValue) => setLeaveType(itemValue)}  // Set the selected value for leaveType
                            data={leaveTypes.map((item) => ({
                                label: item.label,
                                value: item.value,
                            }))}
                            placeholder="Select Leave Type"  // You can replace this with your own placeholder text
                            style={LeaveApplyStyles.picker}
                        />


                        <View style={LeaveApplyStyles.row}>
                            <View style={LeaveApplyStyles.datePickerContainer}>
                                <DatePicker
                                    handleName={<Text style={{ fontSize: 16 }}>{t("From Date")}</Text>}  // Adjust fontSize here
                                    selectedDate={handleFromDateChange}
                                    setDate={setFromDate}
                                    style={LeaveApplyStyles.datePicker}
                                />

                            </View>

                            <View style={LeaveApplyStyles.datePickerContainer}>
                                <DatePicker
                                    handleName={<Text style={{ fontSize: 16 }}>{t("To Date")}</Text>}
                                    selectedDate={handleToDateChange}
                                    setDate={setToDate}
                                    style={LeaveApplyStyles.datePicker}
                                />
                            </View>
                        </View>
                        <Spacing space={20} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={LeaveApplyStyles.label}>
                                {t("Number of Days")}: {numberOfdays}
                            </Text>
                            <View style={LeaveApplyStyles.statusContainer}>
                                {numberOfdays == 0 ? (
                                    <Text style={LeaveApplyStyles.statusText}>
                                        {t("Leave_Type")}:
                                    </Text>
                                ) : numberOfdays > 2 ? (
                                    <Text style={LeaveApplyStyles.statusText}>
                                        {t("Leave_Type")}: EL
                                    </Text>
                                ) : numberOfdays < 2 ? (
                                    <Text style={LeaveApplyStyles.statusText}>
                                        {t("Leave_Type")}: SL
                                    </Text>
                                ) : numberOfdays == 2 ? (
                                    <Text style={LeaveApplyStyles.statusText}>
                                        {t("Leave_Type")}: CL
                                    </Text>) : null}

                            </View>
                        </View>


                        <Text style={LeaveApplyStyles.label}>{t("Reason")}</Text>
                        <Input
                            placeholder={t("Enter reason for leave")}
                            onChangeText={setReason}
                            value={reason}
                            placeholderTextColor={currentColors.gray_text_color}
                        />

                        <Spacing space={15} />
                        <Button
                            buttonStyle={LeaveApplyStyles.ButtonView}
                            title={t("Submit")}
                            onPress={handleSubmit}
                        />
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default LeaveApply;

