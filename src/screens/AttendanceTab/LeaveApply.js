import React, { useState, useMemo, useEffect } from 'react';
import {
    View, Text, ScrollView, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Modal
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
import API_URL from '../../config/api_url';

const LeaveApply = () => {
    const [el_balance, setElBalance] = useState(0);
    const [cl_balance, setClBalance] = useState(0);
    const [sl_balance, setSlBalance] = useState(0);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveType, setLeaveType] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
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

    // Check if selected leave type is FH or SH
    const isHalfDayLeave = leaveType === 'FH' || leaveType === 'SH';
    const [showHalfDayModal, setShowHalfDayModal] = useState(false);
    const [selectedBaseLeave, setSelectedBaseLeave] = useState('');


    useEffect(() => {
        fetchLeaveTypes();
        fetchLeaveBalanceData();
    }, []);

    const handleFromDateChange = (event, selectedDate) => {
        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentYearEnd = new Date(now.getFullYear(), 11, 31);

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

        setShowDatePicker(false);

        // ✅ Maternity Leave (ML) -> auto 6 months
        if (leaveType === "ML") {
            const toDateML = new Date(currentDate);
            toDateML.setMonth(toDateML.getMonth() + 6); // 6 months ahead

            setFromDate(currentDate);
            setToDate(toDateML);

            // Days count
            const startDate = Moment(currentDate, "YYYY-MM-DD");
            const endDate = Moment(toDateML, "YYYY-MM-DD");
            const daysDifference = endDate.diff(startDate, "days") + 1;
            setNumberOfdays(daysDifference);
            return;
        }

        // ✅ Normal Leave
        setFromDate(currentDate);
        // Reset toDate when fromDate changes for non-ML leaves
        if (toDate && currentDate > toDate) {
            setToDate(null);
            setNumberOfdays(0);
        }
    };

    const handleToDateChange = (event, selectedDate) => {
        if (leaveType === "ML") {
            // ML ke liye simple alert
            Alert.alert("Not Allowed", "For Maternity Leave, end date is automatically calculated as 6 months from start date.");
            return;
        }

        const now = new Date();
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const currentYearEnd = new Date(now.getFullYear(), 11, 31);

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

        // Check if toDate is before fromDate
        if (fromDate && currentDate < fromDate) {
            Alert.alert("Invalid Date", "To date cannot be before from date.");
            return;
        }

        setShowDatePicker(false);
        setToDate(currentDate);
    };

    // Update toDate when leaveType changes to ML and fromDate exists
    useEffect(() => {
        if (leaveType === "ML" && fromDate) {
            const toDateML = new Date(fromDate);
            toDateML.setMonth(toDateML.getMonth() + 6);
            setToDate(toDateML);

            // Recalculate days
            const startDate = Moment(fromDate, "YYYY-MM-DD");
            const endDate = Moment(toDateML, "YYYY-MM-DD");
            const daysDifference = endDate.diff(startDate, "days") + 1;
            setNumberOfdays(daysDifference);
        }
    }, [leaveType, fromDate]);

    const fetchLeaveTypes = async () => {
        try {
            const response = await axios.get(API_URL.LEAVE_URL.LEAVE_TYPE_URL, {
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
            if (isHalfDayLeave) {
                // ✅ Half day leave
                setNumberOfdays(0.5);
            }
            else if (leaveType === "ML") {
                // ✅ Maternity Leave (6 months auto)
                const startDate = Moment(start, "YYYY-MM-DD");
                const endDate = Moment(end, "YYYY-MM-DD");
                const daysDifference = endDate.diff(startDate, "days");
                setNumberOfdays(daysDifference > 0 ? daysDifference : 0);
            }
            else {
                // ✅ Normal Leave
                const startDate = Moment(start, "YYYY-MM-DD");
                const endDate = Moment(end, "YYYY-MM-DD");
                const daysDifference = endDate.diff(startDate, "days") + 1;
                setNumberOfdays(daysDifference > 0 ? daysDifference : 0);
            }
        }
    };

    useEffect(() => {
        calculateNumberOfDays(fromDate, toDate);
    }, [fromDate, toDate, isHalfDayLeave]);

    const handleSubmit = async () => {
        if (!leaveType) {
            Alert.alert("Error", "Please select a leave type before submitting.");
            return;
        }

        if (isHalfDayLeave && !selectedBaseLeave) {
            Alert.alert("Error", "Please select a base leave type (EL, CL, or SL) for half-day leave.");
            return;
        }

        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const leavePayload = {
                empID: empid[0].emp_id,
                rpPerson: empid[0].reporting_to,
                leaveType: leaveType,
                fromDate: Moment(fromDate).format("YYYY-MM-DD"),
                toDate: isHalfDayLeave
                    ? Moment(fromDate).format("YYYY-MM-DD")
                    : Moment(toDate).format("YYYY-MM-DD"),
                numofdays: Number(numberOfdays),
                leavereason: reason,
                enterBy: empid[0].emp_id,
                baseLeaveType: isHalfDayLeave ? selectedBaseLeave : null, // ✅ added
            };

            console.log("📨 Payload being sent:", leavePayload);

            const response = await axios.post(API_URL.LEAVE_URL.LEAVE_SUBMIT_URL, leavePayload, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.error) {
                Alert.alert("Error", response.data.data || "Something went wrong");
            } else {
                Alert.alert("Success", response.data.msg || "Leave request submitted successfully");
                // Reset form
                setNumberOfdays(0);
                setFromDate(null);
                setToDate(null);
                setReason("");
                setLeaveType("");
                setSelectedBaseLeave(""); // ✅ reset
            }
        } catch (error) {
            console.error("Error during leave submission:", error);
            Alert.alert("Error", "An error occurred while submitting the leave request.");
        }
    };


    const fetchLeaveBalanceData = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);
            const response = await axios.get(API_URL.LEAVE_URL.LEAVE_HISTORY_URL, {
                params: {
                    emp_id: empid[0].emp_id
                }
            });

            console.log('Leave Balance Data:', response.data);
            await setLeaveBalance(response.data.data[0])
            setElBalance(response.data.data[0]?.el_balance || 0);
            setClBalance(response.data.data[0]?.cl_balance || 0);
            setSlBalance(response.data.data[0]?.sl_balance || 0);
        } catch (error) {
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
                            setValue={(itemValue) => {
                                const upper = itemValue?.toUpperCase().trim();

                                // EL/CL/SL select → open half-day modal
                                if (['EL', 'CL', 'SL'].includes(upper)) {
                                    setSelectedBaseLeave(upper); // store base leave
                                    setShowHalfDayModal(true);
                                    return;
                                }

                                // Other leaves (ML, etc.)
                                setLeaveType(upper);
                                setFromDate(null);
                                setToDate(null);
                                setNumberOfdays(0);
                            }}
                            data={leaveTypes.map((item) => ({
                                label: item.label,
                                value: item.value?.toUpperCase().trim(),
                            }))}
                            placeholder="Select Leave Type"
                            style={LeaveApplyStyles.picker}
                        />

                        {showHalfDayModal && (
                            <Modal
                                transparent
                                animationType="fade"
                                visible={showHalfDayModal}
                                onRequestClose={() => setShowHalfDayModal(false)}
                            >
                                <View style={{
                                    flex: 1,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        padding: 20,
                                        width: '80%',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15 }}>
                                            Select Leave Duration
                                        </Text>

                                        <TouchableOpacity
                                            style={{ marginVertical: 8 }}
                                            onPress={() => {
                                                setLeaveType('FH');             // final leave type = First Half
                                                setShowHalfDayModal(false);
                                                setNumberOfdays(0.5);           // half day
                                                setFromDate(null);              // optional reset
                                                setToDate(null);
                                            }}
                                        >
                                            <Text style={{ fontSize: 16 }}>First Half</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ marginVertical: 8 }}
                                            onPress={() => {
                                                setLeaveType('SH');             // final leave type = Second Half
                                                setShowHalfDayModal(false);
                                                setNumberOfdays(0.5);
                                                setFromDate(null);
                                                setToDate(null);
                                            }}
                                        >
                                            <Text style={{ fontSize: 16 }}>Second Half</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ marginVertical: 8 }}
                                            onPress={() => {
                                                setLeaveType(selectedBaseLeave); // Full day = EL/CL/SL
                                                setShowHalfDayModal(false);
                                                setNumberOfdays(1);             // full day
                                                setFromDate(null);
                                                setToDate(null);
                                            }}
                                        >
                                            <Text style={{ fontSize: 16 }}>Full Day</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        )}



                        <View style={LeaveApplyStyles.row}>
                            <View style={LeaveApplyStyles.datePickerContainer}>
                                <DatePicker
                                    handleName={<Text style={{ fontSize: 16 }}>{t("From Date")}</Text>}
                                    selectedDate={handleFromDateChange}
                                    setDate={setFromDate}
                                    value={fromDate}
                                    style={LeaveApplyStyles.datePicker}
                                />
                            </View>

                            <View style={LeaveApplyStyles.datePickerContainer}>
                                <DatePicker
                                    handleName={<Text style={{ fontSize: 16 }}>{t("To Date")}</Text>}
                                    selectedDate={handleToDateChange}
                                    setDate={setToDate}
                                    value={toDate}
                                    style={LeaveApplyStyles.datePicker}
                                    disabled={leaveType === "ML"} // Disable for ML
                                />
                            </View>
                        </View>

                        {/* Show calculated end date for ML */}
                        {leaveType === "ML" && fromDate && (
                            <View style={LeaveApplyStyles.mlInfoContainer}>
                                <Text style={{ color: "green", fontWeight: "bold" }}>
                                    Maternity Leave End Date: {Moment(toDate).format("DD-MM-YYYY")}
                                </Text>
                                <Text style={LeaveApplyStyles.mlInfoText}>
                                    (Automatically calculated as 6 months from start date)
                                </Text>
                            </View>
                        )}

                        <Spacing space={20} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={LeaveApplyStyles.label}>
                                {t("Number of Days")}: {numberOfdays}
                            </Text>
                            <View style={LeaveApplyStyles.statusContainer}>
                                <Text style={LeaveApplyStyles.statusText}>
                                    {t("Leave_Type")}: {leaveType || ""}
                                </Text>
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

