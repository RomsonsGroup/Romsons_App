import React, { useMemo, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Modal, ActivityIndicator, loading } from "react-native";
import { CreateTaskStyle } from '../../styles';
import { darkTheme, lightTheme, SH } from '../../utils';
import { Button, ConfirmationAlert, Input, Spacing } from "../../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HomeDropDown } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateTaskScreen = ({ route }) => {
    const { followupDate } = route.params || {};
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const CreateTaskStyles = useMemo(() => CreateTaskStyle(currentColors), [currentColors]);
    const [modalVisible, setModalVisible] = useState(false);
    const [callType, setCallType] = useState("Call With");
    const [callerName, setCallerName] = useState("");
    const [followupDatewisedata, setFollowupDatewisedata] = useState([]);
    const [reportingModalVisible, setReportingModalVisible] = useState(false);
    const [alertOtpVisible, setAlertOtpVisible] = useState(false);
    const [alertOtpMessage, setAlertOtpMessage] = useState('');
    const [alertOtpType, setAlertOtpType] = useState('success');
    const [reportingPersons, setReportingPersons] = useState([]);
    const [followupDates, setFollowupDates] = useState(null);  // Add this line
    const [loading, setLoading] = useState(false);
    const [selectedReportingTo, setSelectedReportingTo] = useState(null); // To store reporting_to ID
    const [formData, setFormData] = useState({
        taskName: '',
        remarks: '',
    });

    const [followup_status, setFollowupStatus] = useState('Pending');
    const [followup_priority, setFollowupPriority] = useState('High');


    useEffect(() => {
        if (followupDatewisedata.length === 0) {
            setFollowupDatewisedata([{
                followup_status: 'Pending',
                followup_priority: 'High',
            }]);
        }
    }, []);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleReportingPersonSelect = async (person) => {
        console.log("Selected Reporting Person:", person); // Full object
        console.log("Reporting To Name:", person.reporting_to_name);
        console.log("Reporting To ID (jointid):", person.reporting_to);

        // If "Self" is selected, set jointid to null
        if (person.reporting_to_name === "Self") {
            console.log("Self Selected");
            setCallerName("Self");
            setSelectedReportingTo(null); // Null for "Self"
        } else {
            setCallerName(person.reporting_to_name); // Set selected reporting person's name
            setSelectedReportingTo(person.reporting_to); // Set reporting person's ID
        }

        // Close the modal
        setReportingModalVisible(false);
    };


    const reportingPerson = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            empid: empid[0].emp_id, // Extract the first element's emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        try {

            setReportingModalVisible(true);
            setLoading(true);

            const response = await fetch("https://crm.romsons.com:8080/Reporting_hierarchy", requestOptions);
            const result = await response.json();

            if (result.error === false) {
                setReportingPersons(result.data || []);
            } else {
                setReportingPersons([]);
            }
        } catch (error) {
            console.error("Request failed:", error);
            setReportingPersons([]);
        } finally {
            setLoading(false);
        }
    };



    const insertAddNewTask = async () => {
        const missingFields = [];
    
        // Check for missing fields
        if (!formData.taskName) missingFields.push(t("Task Name"));
        if (!formData.remarks) missingFields.push(t("Remarks"));
        if (!callerName) missingFields.push(t("Caller Name"));
    
        // If there are any missing fields, show an alert
        if (missingFields.length > 0) {
            const missingMessage = `${t("Please_fill_the_following_fields")}: ${missingFields.join(", ")}`;
            setAlertOtpType("error");
            setAlertOtpMessage(missingMessage);
            setAlertOtpVisible(true);
            return;
        }
    
        // Validate task name and remarks length
        if (formData.taskName.length > 240) {
            setAlertOtpType("error");
            setAlertOtpMessage(t("Task name cannot exceed 240 characters"));
            setAlertOtpVisible(true);
            return;
        }
    
        if (formData.remarks.length > 100) {
            setAlertOtpType("error");
            setAlertOtpMessage(t("Remarks cannot exceed 100 characters"));
            setAlertOtpVisible(true);
            return;
        }
    
        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);
    
            const raw = JSON.stringify({
                taskname: formData.taskName,
                remarks: formData.remarks,
                status: followup_status,
                priority: followup_priority,
                jointid: selectedReportingTo,
                jointname: callerName,
                followup: followupDate,
                enterBy: empid[0].emp_id,
            });
    
            const response = await fetch("https://crm.romsons.com:8080/AddNewTask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: raw
            });
    
            const result = await response.json();
    
            if (!result.error) {
                setAlertOtpType("success");
                setAlertOtpMessage(t("Task_added_successfully"));
                setAlertOtpVisible(true);
    
                // Reset the form
                setFormData({ taskName: '', remarks: '' });
                setFollowupStatus('Pending');
                setFollowupPriority('High');
                setSelectedReportingTo(null);
                setCallerName('');
                setFollowupDates(null);
            } else {
                setAlertOtpType("error");
                setAlertOtpMessage(t("Failed_to_add_task") + ": " + result.message);
                setAlertOtpVisible(true);
            }
    
        } catch (error) {
            console.error("API Error:", error);
            setAlertOtpType("error");
            setAlertOtpMessage(t("Something_went_wrong"));
            setAlertOtpVisible(true);
        }
    };
    



    return (
        <View style={CreateTaskStyles.container1}>
            <ScrollView style={CreateTaskStyles.PaddingHorizontal}>
                <Spacing space={10} />
                <View style={CreateTaskStyles.SetPaddingd}>

                    <Text style={CreateTaskStyles.callLabel}>{t("Select Call Type")}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={CreateTaskStyles.callButton} onPress={() => setModalVisible(true)}>
                            <Text style={CreateTaskStyles.callButtonText}>
                                {callType || t("Call")}
                            </Text>

                        </TouchableOpacity>
                        <Text style={{ color: 'brown', fontSize: 12 }}> {callerName}</Text>
                    </View>
                    <Spacing space={10} />
                    <Input
                        title={t("Task Name")}
                        value={formData.taskName}
                        onChangeText={(text) => handleChange('taskName', text)}
                        placeholder={t("Enter Here...")}
                        placeholderTextColor={Colors.gray_text_color}
                        titleStyle={CreateTaskStyles.titleStyle}
                        inputStyle={CreateTaskStyles.input_style}
                        multiline={true}
                        scrollEnabled={false}
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                    <Spacing space={10} />

                    <Input
                        title={t(" Status Remarks")}
                        value={formData.remarks}
                        onChangeText={(text) => handleChange('remarks', text)}
                        placeholder={t("Enter Here...")}
                        placeholderTextColor={Colors.gray_text_color}
                        titleStyle={CreateTaskStyles.titleStyle}
                        inputStyle={CreateTaskStyles.input_style}
                        multiline={true}
                        scrollEnabled={false}
                        numberOfLines={4}
                        textAlignVertical="top"
                    />



                    <Spacing space={10} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 1, marginRight: 6 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                                Status
                            </Text>
                            <HomeDropDown
                                value={followup_status}
                                setValue={(value) => {
                                    setFollowupStatus(value);
                                    const updated = [...followupDatewisedata];
                                    updated[0].followup_status = value;
                                    setFollowupDatewisedata(updated);
                                }}
                                data={[
                                    { label: 'Pending', value: 'Pending' },
                                    { label: 'Complete', value: 'Complete' },
                                    { label: 'Hold', value: 'Hold' },
                                    { label: 'Cancelled', value: 'Cancelled' },
                                ]}
                                placeholder="Select Status"
                                style={{ width: '100%' }}
                            />
                        </View>

                        <View style={{ flex: 1, marginLeft: 6 }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black', marginBottom: 4 }}>
                                Priority
                            </Text>
                            <HomeDropDown
                                value={followup_priority}
                                setValue={(value) => {
                                    setFollowupPriority(value);
                                    const updated = [...followupDatewisedata];
                                    updated[0].followup_priority = value;
                                    setFollowupDatewisedata(updated);
                                }}
                                data={[
                                    { label: 'High', value: 'High' },
                                    { label: 'Medium', value: 'Medium' },
                                    { label: 'Low', value: 'Low' },
                                ]}
                                placeholder="Select Priority"
                                style={{ width: '100%' }}
                            />
                        </View>
                    </View>


                    <Spacing space={10} />


                    <Spacing space={10} />

                </View>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={CreateTaskStyles.modalOverlay}>
                        <View style={CreateTaskStyles.dropdownContainer}>
                            {/* Close Button */}
                            <TouchableOpacity
                                style={CreateTaskStyles.closeIcon}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#999' }}>✕</Text>
                            </TouchableOpacity>

                            {/* Options */}
                            <TouchableOpacity
                                style={CreateTaskStyles.option}
                                onPress={() => {
                                    setCallType("Self");
                                    setCallerName("Self");
                                    setSelectedReportingTo(null);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={CreateTaskStyles.optionText}>Self</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={CreateTaskStyles.option}
                                onPress={() => {
                                    setCallType("Joined");
                                    setModalVisible(false);
                                    reportingPerson();
                                }}
                            >
                                <Text style={CreateTaskStyles.optionText}>Joint Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={reportingModalVisible}
                    animationType="fade"
                    onRequestClose={() => setReportingModalVisible(false)}
                >
                    <View style={CreateTaskStyles.modalOverlay4}>
                        <View style={CreateTaskStyles.dropdownContainer4}>
                            {loading ? (
                                <ActivityIndicator size="medium" color="#0000ff" />
                            ) : (
                                <ScrollView>
                                    {reportingPersons.map((person, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={CreateTaskStyles.option4}
                                            onPress={() => handleReportingPersonSelect(person)} // Pass full person object
                                        >
                                            <Text style={CreateTaskStyles.optionText4}>{person.reporting_to_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                    </View>
                </Modal>

                <Spacing space={70} />
            </ScrollView>
            <View style={CreateTaskStyles.BotttomAbs}>
                <Button
                    title={t("Submit")}
                    onPress={insertAddNewTask} />
            </View>
            <ConfirmationAlert
                alertType={alertOtpType} // Pass the dynamic alertType (success or error)
                iconVisible={true}
                message={alertOtpMessage}
                modalVisible={alertOtpVisible}
                setModalVisible={setAlertOtpVisible}
                onPress={() => {
                    setAlertOtpVisible(false);  // Close the modal on press
                }}
            />



        </View>
    );
}

export default CreateTaskScreen