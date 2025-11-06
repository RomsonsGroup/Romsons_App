import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { ApprovalStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Spacing } from "../../components";

const RegulizationScreen = () => {
    const { t } = useTranslation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const ApprovalStyles = useMemo(() => ApprovalStyle(Colors), [Colors]);

    const [selectedTab, setSelectedTab] = useState("Pending");
    const [checkedStates, setCheckedStates] = useState([]);
    const [teamEmpId,setTeamEmpId] = useState("");
    const [teamLeave, setTeamLeave] = useState([]);
    const [approvedLeaves, setApprovedLeaves] = useState([]); // Approved Leaves
    const [rejectedLeaves, setRejectedLeaves] = useState([]);

    // ✅ API Call to Fetch Leave List
    const LeaveList = useCallback(async () => {
        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const response = await fetch("https://crm.romsons.com:8080/getPendingRegularizations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "empidd": empid[0].emp_id

                }),
            });

            const result = await response.json();
            console.log("Leave API Response:", result);

            if (!result.error) {
                setTeamLeave(result.data);
            }
        } catch (error) {
            console.error("Leave API Error:", error);
        }
    }, []);

    // ✅ Approve Selected Leaves
    const Leaveapproval = async () => {
        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);
           

            // ✅ Filter only selected leave IDs
            const selectedLeaveIds = teamLeave
                .filter((_, index) => checkedStates[index])
                .map((item, index) => {
                    console.log(`Leave ${index}: Regular_id = ${item.Regular_id}`);
                    return item.Regular_id;
                })
                .filter(id => id !== undefined);  // Remove undefined IDs if any

            console.log("Selected regulization IDs:", selectedLeaveIds);

            if (selectedLeaveIds.length === 0) {
                Alert.alert("Error", "Please select at least one leave to approve.");
                return;
            }

            // ✅ Log payload before sending request
            const payload = {
                "regulizationIds": selectedLeaveIds,
                "manager_empid": empid[0]?.emp_id,
                "team_empid":teamEmpId
            };
            console.log("Sent payload:", payload);

            const response = await fetch("https://crm.romsons.com:8080/Regulizationidapproval", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("Approval Response:", result); // ✅ Check API response

            if (!result.error) {
                Alert.alert("Success", "Regularizations approved successfully");
                LeaveList(); // ✅ Refresh Leave List
                setCheckedStates(new Array(filteredLeaveList.length).fill(false));
            } else {
                Alert.alert("Error", "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Leave Approval Error:", error);
            Alert.alert("Error", "Error approving leaves.");
        }
    };




    const Leaverejected = async () => {
        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            // ✅ Filter only selected leave IDs for rejection
            const selectedLeaveIds = teamLeave
                .filter((_, index) => checkedStates[index])
                .map((item, index) => {
                    console.log(`Leave ${index}: Regular_id = ${item.Regular_id}`);
                    return item.Regular_id;
                })
                .filter(id => id !== undefined);  // Remove undefined IDs if any

            console.log("Selected regulization IDs:", selectedLeaveIds);

            if (selectedLeaveIds.length === 0) {
                Alert.alert("Error", "Please select at least one leave to reject.");
                return;
            }

            const response = await fetch("https://crm.romsons.com:8080/Regulizationidrejected", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "empidd": empid[0].emp_id,
                    "regulizationIds": selectedLeaveIds,
                }),
            });

            const result = await response.json();
            console.log("Rejection Response:", result);

            if (!result.error) {
                Alert.alert("Success", "Regulization rejected successfully!");
                LeaveList(); // ✅ Refresh Leave List
                setCheckedStates(new Array(teamLeave.length).fill(false)); // Reset checkboxes
            } else {
                Alert.alert("Error", "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Leave Rejection Error:", error);
            Alert.alert("Error", "Error rejecting leaves.");
        }
    };


    const LeaveapprovalList = async () => {
        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const response = await fetch("https://crm.romsons.com:8080/ApprovedRegularizationList", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "empidd": empid[0].emp_id }),
            });

            const result = await response.json();
            if (!result.error) {
                setApprovedLeaves(result.data);
            }
        } catch (error) {
            console.error("Approved Leave API Error:", error);
        }
    };


    const Leaverejectedlist = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "empidd": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/RejectedRegularizationList", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.error == false) {
                    console.log('rejected', result.data);
                    setRejectedLeaves(result.data)

                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        if (selectedTab === "Pending") {
            LeaveList();
        }
    }, [selectedTab]);

    useEffect(() => {
        if (selectedTab === "Accepted") {
            LeaveapprovalList(); 
        }
    }, [selectedTab]);

    useEffect(() => {
        if (selectedTab === "Rejected") {
            Leaverejectedlist();
        }
    }, [selectedTab]);

    // ✅ Handle Checkbox State
    const handleCheckBoxChange = (index,team_empId) => {
        setTeamEmpId("")
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[index] = !updatedCheckedStates[index];
        console.log(updatedCheckedStates,"updatedCheckedStates")
        setTeamEmpId(team_empId)
        setCheckedStates(updatedCheckedStates);

    };

    // ✅ Date Formatter
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, "-");
    };

    // ✅ Filter Leave List based on Selected Tab
    const filteredLeaveList = useMemo(() => {
        if (selectedTab === "Pending") return teamLeave;
        if (selectedTab === "Accepted") return approvedLeaves;
        if (selectedTab === "Rejected") return rejectedLeaves;
        return [];
    }, [selectedTab, teamLeave, approvedLeaves, rejectedLeaves]);

    // ✅ Render Each Leave Item
    const renderApprovalItem = ({ item, index }) => {
        const formatTime = (dateTimeString) => {
            if (!dateTimeString) return 'null';
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        };
    
        return (
            <View style={ApprovalStyles.PaddingHorizontal}>
                <View style={ApprovalStyles.approvalCard}>
                    <View style={ApprovalStyles.approvalHeader}>
                        <Text style={ApprovalStyles.employeeId}>
                            {item.enter_by} | {item.user_name}
                        </Text>
                        {selectedTab === "Pending" && (
                            <View style={ApprovalStyles.cell}>
                                <CheckBox
                                    value={checkedStates[index]}
                                    onValueChange={() => handleCheckBoxChange(index, item.enter_by)}
                                />
                            </View>
                        )}
                    </View>
    
                    <Spacing space={0} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Text style={ApprovalStyles.moduleName}>
                            In:
                            <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                {item.punch_in
                                    ? selectedTab === "Accepted"
                                        ? formatTime(item.punch_in)  // Show only time in Accepted tab
                                        : item.punch_in  // Show full date-time in other tabs
                                    : 'null'}
                            </Text>
                        </Text>
                        <Text style={ApprovalStyles.moduleName}>
                            Out:
                            <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                {item.punch_out ? item.punch_out : 'null'}
                            </Text>
                        </Text>
                    </View>
    
                    <Text style={ApprovalStyles.moduleName}>
                        Punch Date:
                        <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                            {formatDate(item.Request_date)}
                        </Text>
                    </Text>
    
                    {selectedTab === "Accepted" && (
                        <>
                            <Text style={ApprovalStyles.moduleName}>
                                Applied Date:
                                <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                    {formatDate(item.enter_date)}
                                </Text>
                            </Text>
    
                            <Text style={ApprovalStyles.moduleName}>
                                Approved Date:
                                <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                    {formatDate(item.approved_date)}
                                </Text>
                            </Text>
                        </>
                    )}
    
                    {selectedTab === "Rejected" && (
                        <View>
                            <Text style={ApprovalStyles.moduleName}>
                                Rejected Date:
                                <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                    {formatDate(item.approved_date)}
                                </Text>
                            </Text>
                        </View>
                    )}
    
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Text style={ApprovalStyles.moduleName}> Remarks:
                            <Text style={{ color: 'black', fontSize: 11, fontWeight: 'bold' }}>
                                {item.Request_Remarks}
                            </Text>
                        </Text>
                    </View>
    
                    {selectedTab === "Accepted" && (
                        <View style={ApprovalStyles.approvedContainer}>
                            <Text style={ApprovalStyles.approvedText}>Approved</Text>
                        </View>
                    )}
    
                    {selectedTab === "Rejected" && (
                        <View style={ApprovalStyles.rejectedContainer}>
                            <Text style={ApprovalStyles.rejectedText}>Rejected</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };
    
    
    

    return (
        <View style={ApprovalStyles.container}>
            <View style={ApprovalStyles.PaddingHorizontal}>
                <Spacing space={20} />

                {/* ✅ Approve & Reject Buttons */}
                {selectedTab === "Pending" && checkedStates.some((checked) => checked) && (
                    <View style={ApprovalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[ApprovalStyles.actionButton, ApprovalStyles.rejectButton]}
                            onPress={Leaverejected}
                        >
                            <Text style={ApprovalStyles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[ApprovalStyles.actionButton, ApprovalStyles.approveButton]}
                            onPress={Leaveapproval}
                        >
                            <Text style={ApprovalStyles.buttonText}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Spacing space={15} />

                {/* ✅ Tabs */}
                <View style={ApprovalStyles.tabContainer}>
                    {["Pending", "Accepted", "Rejected"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                ApprovalStyles.tabButton,
                                selectedTab === tab && ApprovalStyles.selectedTabButton,
                            ]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[
                                ApprovalStyles.tabText,
                                selectedTab === tab && ApprovalStyles.selectedTabText,
                            ]}>
                                {t(tab)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <Spacing space={10} />

            {/* ✅ Display Only Pending Data */}
            <FlatList
                data={filteredLeaveList}
                renderItem={renderApprovalItem}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                style={ApprovalStyles.approvalsList}
            />
        </View>
    );
};


export default RegulizationScreen