import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Spacing, VectorIcon } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Checkbox from "expo-checkbox";
import CheckBox from '@react-native-community/checkbox';

const TeamLeaveScreen = () => {
    const [status, setStatus] = useState("Pending"); // Default status is "Pending"
    const [checkedStates, setCheckedStates] = useState([]);
    const [teamLeave, setTeamLeave] = useState([]);

    const LeaveList = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "empidd": empid[0].emp_id,

        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://devcrm.romsons.com:8080/Leaveapproval", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'leaveeee');
                if (result.error == false) {
                    console.log('hbuhugugg', result.data);
                    setTeamLeave(result.data)

                }

            })
            .catch((error) => console.error(error));
    }

    const Leaveapproval = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "empidd": empid[0].emp_id,
            "leaveIds": [
                "36"
            ]
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://devcrm.romsons.com:8080/Leaveidapproval", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result.error == false) {
                    console.log('byrrrr', result.data);


                }
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        LeaveList();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).replace(/ /g, "-");
    };

    const handleCheckBoxChange = (index) => {
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[index] = !updatedCheckedStates[index];
        setCheckedStates(updatedCheckedStates);
    };

    const handleApproveReject = (action) => {
        const updatedTeamLeave = [...teamLeave];
        checkedStates.forEach((checked, index) => {
            if (checked) {
                if (action === 'approve') {
                    updatedTeamLeave[index].status = 'Accepted';
                } else if (action === 'reject') {
                    updatedTeamLeave[index].status = 'Rejected';
                }
            }
        });
        setTeamLeave(updatedTeamLeave);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Picker - Select Dropdown */}
                <Picker
                    style={styles.picker}
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item label="-Status-" value="status" />
                    <Picker.Item label="pending" value="pending" />
                    <Picker.Item label="accepted" value="accepted" />
                    <Picker.Item label="rejected" value="rejected" />
                </Picker>

                {/* Search Bar */}
                <View style={styles.inputContainer}>
                    <Icon name="search" size={20} color="#000" style={styles.icon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#aaa"
                    />
                </View>
            </View>

            {/* Show Approve/Reject Buttons when any checkbox is checked */}
            {checkedStates.some((checked) => checked) && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => handleApproveReject('reject')}
                    >
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleApproveReject('approve')}
                    >
                        <Text style={styles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Spacing space={10} />

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Actions</Text>
                <Text style={styles.headerText}>State</Text>
                <Text style={styles.headerText}>Emp ID</Text>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Leave From-To</Text>
                <Text style={styles.headerText}>Days</Text>
                <Text style={styles.headerText}>Type</Text>
                <Text style={styles.headerText}>Remarks</Text>
            </View>

            {/* Table Row */}
            <ScrollView style={{ flex: 1 }}>
                {teamLeave.map((res, ind) => (
                    <View style={styles.tableRow} key={ind}>
                        <View style={styles.cell}>
                            <CheckBox
                                value={checkedStates[ind]}
                                onValueChange={() => handleCheckBoxChange(ind)}
                            />
                        </View>

                        {/* State - Dynamic Button */}
                        <View style={styles.cell}>
                            <TouchableOpacity style={styles.statusButton}>
                                <Text style={styles.statusText}>
                                    {res.status || "Pending"} {/* Show "Pending" as default */}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Employee Data */}
                        <Text style={styles.cellText}>{res.emp_id}</Text>
                        <Text style={[styles.cellText, styles.boldText]}>{res.user_name}</Text>
                        <Text style={styles.cellText}>{formatDate(res.start_date)} - {formatDate(res.end_date)}</Text>
                        <Text style={[styles.cellText, styles.boldText]}>{res.leave_days}</Text>
                        <Text style={[styles.cellText, styles.blueText]}>{res.leave_type}</Text>
                        <Text style={[styles.cellText, styles.grayText]}>{res.leave_reason}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 7,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between",
    },
    picker: {
        flex: 1,
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        marginRight: 10, // Space between dropdown and search bar
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 1, // Ensure it takes available space
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingLeft: 30, // Add space for the icon
    },
    icon: {
        position: 'absolute',
        left: 10, // Positioning the icon to the left
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#065f46",
        padding: 5,
        borderRadius: 6,
    },
    headerText: {
        flex: 1,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        fontSize: 12,
    },
    tableRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
        backgroundColor: "#ffffff",
    },
    cell: {
        flex: 1,
        alignItems: "center",
    },
    cellText: {
        flex: 1,
        textAlign: "center",
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 10
    },
    blueText: {
        color: "#007bff",
        fontWeight: "bold",
    },
    grayText: {
        color: "#555",
    },
    statusButton: {
        backgroundColor: "#9c8b21",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    statusText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },

    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },

    actionButton: {
        width: '38%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    approveButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TeamLeaveScreen;
