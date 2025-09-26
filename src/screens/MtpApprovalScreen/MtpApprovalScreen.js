
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Modal, loading, ScrollView } from "react-native";
import { MtpApprovalStyle } from '../../styles/MtpApprovalStyle';
import { darkTheme, lightTheme } from "../../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import { Spacing } from "../../components";
import { HomeDropDown } from "../../components";

const MtpApprovalScreen = () => {
    const { t } = useTranslation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const MtpApprovalStyles = useMemo(() => MtpApprovalStyle(Colors), [Colors]);
    const [selectedTab, setSelectedTab] = useState("Pending");
    const [MtpPendingData, setMtpPendingData] = useState([]);
    const [checkedStates, setCheckedStates] = useState([]);
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [modalVisible1, setModalVisible1] = useState(false);
    const [teamLists, setTeamLists] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [MtpApprovedData, setMtpApprovedData] = useState([]);
    const [MtpRejectedData, setMtpRejectedData] = useState([]);
    const [outlets, setOutlets] = useState([]);
    const [outletModalVisible, setOutletModalVisible] = useState(false);


    const months = [
        { label: "Jan", value: 0 },
        { label: "Feb", value: 1 },
        { label: "Mar", value: 2 },
        { label: "Apr", value: 3 },
        { label: "May", value: 4 },
        { label: "Jun", value: 5 },
        { label: "Jul", value: 6 },
        { label: "Aug", value: 7 },
        { label: "Sept", value: 8 },
        { label: "Oct", value: 9 },
        { label: "Nov", value: 10 },
        { label: "Dec", value: 11 },
    ];

    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const endYear = currentYear + 10;

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
        label: (startYear + i).toString(),
        value: startYear + i,
    }));

    useEffect(() => {
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const monthName = new Date(selectedYear, selectedMonth).toLocaleString("en-US", { month: "short" });

        const data = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(selectedYear, selectedMonth, i + 1);
            const isSunday = date.getDay() === 0;
            return {
                id: i + 1,
                date: `${i + 1} ${monthName}`,
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                beat: "",
                working: "",
                remarks: "",

            };
        });
    }, [selectedMonth, selectedYear]);

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

        fetch("https://crm.romsons.com:8080/ManagerTeam", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.error == false) {
                    // console.log('listttt', result.data);
                    setTeamLists(result.data)

                }
            })
            .catch((error) => console.error(error));
    }

    const MtpPendingList = async (teamEmpId, month = selectedMonth, year = selectedYear) => {
        if (!teamEmpId) return;

        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const response = await fetch(
                `https://crm.romsons.com:8080/MtpPendingList?empidd=${empid[0].emp_id}&month=${month + 1}&year=${year}`
            );
            const result = await response.json();

            if (!result.error) {
                setMtpPendingData(result.data);
                setCheckedStates(new Array(result.data.length).fill(false));
            }
        } catch (err) {
            console.error("MtpPendingList Error:", err);
        }
    };

    const handleApprove = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const selectedIds = checkedStates
            .map((checked, index) => (checked ? MtpPendingData[index].id : null))
            .filter(Boolean);

        if (selectedIds.length === 0) return alert("Please select at least one MTP to approve.");

        try {
            const response = await fetch("https://crm.romsons.com:8080/MtpApprovedIdBy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ids: selectedIds,
                    approverId: empid[0].emp_id,
                    month: selectedMonth + 1,
                    year: selectedYear
                })
            });

            const result = await response.json();
            if (!result.error) {
                alert(result.data);
                MtpPendingList(selectedTeamId, selectedMonth, selectedYear);
            } else {
                alert(result.data);
            }
        } catch (err) {
            console.error("Approve MTP Error:", err);
            alert("Something went wrong while approving MTPs.");
        }
    };

    useEffect(() => {
        MtpApprovalList()
    }, [])

    const MtpApprovalList = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const raw = "";

        const requestOptions = {
            method: "GET",
            body: raw,
            redirect: "follow"
        };

        fetch(`https://crm.romsons.com:8080/MtpApprovedList?empidd=${empid[0].emp_id}&month=${selectedMonth + 1}&year=${selectedYear}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'approved list');

                if (result.error == false) {
                    setMtpApprovedData(result.data)
                }
            })
            .catch((error) => console.error(error));
    }

    const handleRejected = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const selectedIds = checkedStates
            .map((checked, index) => (checked ? MtpPendingData[index].id : null))
            .filter(Boolean);

        if (selectedIds.length === 0) return alert("Please select at least one MTP to approve.");

        try {
            const response = await fetch("https://crm.romsons.com:8080/MtpRejectedIdBy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ids: selectedIds,
                    approverId: empid[0].emp_id,
                    month: selectedMonth + 1,
                    year: selectedYear
                })
            });

            const result = await response.json();
            if (!result.error) {
                alert(result.data);
                MtpPendingList(selectedTeamId, selectedMonth, selectedYear);
            } else {
                alert(result.data);
            }
        } catch (err) {
            console.error("Approve MTP Error:", err);
            alert("Something went wrong while approving MTPs.");
        }
    };

    const MtpRejectedlList = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const raw = "";

        const requestOptions = {
            method: "GET",
            body: raw,
            redirect: "follow"
        };

        fetch(`https://crm.romsons.com:8080/MtpRejectedList?empidd=${empid[0].emp_id}&month=${selectedMonth + 1}&year=${selectedYear}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'approved list');

                if (result.error == false) {
                    setMtpRejectedData(result.data)
                }
            })
            .catch((error) => console.error(error));
    }

    const fetchOutletsForBeat = async (beatId) => {
        try {
            const response = await fetch(`https://crm.romsons.com:8080/MtpBeatidOutlet?beat_id=${beatId}`);
            const result = await response.json();
            if (!result.error) {
                setOutlets(result.data[0].outlet_names.split(","));
                setOutletModalVisible(true);
            }
        } catch (err) {
            console.error("Error fetching outlets:", err);
        }
    };


    useEffect(() => {
        // Tab change ya filter change pe pehle data clear karo
        setMtpPendingData([]);
        setCheckedStates([]);

        if (selectedTab === "Pending" && selectedTeamId) {
            // ✅ Pending list fetch karo
            MtpPendingList(selectedTeamId, selectedMonth, selectedYear);
        }

        if (selectedTab === "Accepted") {
            // ✅ Accepted list fetch karo
            MtpApprovalList();
        }
        if (selectedTab === "Rejected") {
            MtpRejectedlList();
        }
    }, [selectedMonth, selectedYear, selectedTab, selectedTeamId]);

    const handleCheckBoxChange = (index) => {
        const updatedCheckedStates = [...checkedStates];
        updatedCheckedStates[index] = !updatedCheckedStates[index];
        setCheckedStates(updatedCheckedStates);
    };

    const renderApprovalItem = ({ item, index }) => (
        <View style={MtpApprovalStyles.PaddingHorizontal}>
            <View style={MtpApprovalStyles.approvalCard}>
                {/* 🔹 Header */}
                <View style={MtpApprovalStyles.approvalHeader}>
                    <Text style={MtpApprovalStyles.employeeId}>
                        {item.user_id} | {item.user_name}
                    </Text>

                    {/* ✅ Checkbox sirf Pending tab me */}
                    {selectedTab === "Pending" && (
                        <View style={MtpApprovalStyles.cell}>
                            <CheckBox
                                value={checkedStates[index]}
                                onValueChange={() => handleCheckBoxChange(index)}
                            />
                        </View>
                    )}
                </View>

                <Spacing space={10} />

                {/* 🔹 Common Fields */}
                <Text style={MtpApprovalStyles.moduleName}>
                    Beat:{" "}
                    <TouchableOpacity onPress={() => fetchOutletsForBeat(item.beat_id)}>
                        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                            {item.beat_name}
                        </Text>
                    </TouchableOpacity>
                </Text>

                <Text style={MtpApprovalStyles.moduleName}>Outlet Date: {item.outlet_date}</Text>
                <Text style={MtpApprovalStyles.moduleName}>Comments: {item.comments}</Text>

                {/* ✅ Accepted tab ke liye extra fields */}
                {selectedTab === "Accepted" && (
                    <>
                        <Text style={MtpApprovalStyles.moduleName}>
                            Approved By: {item.approved_by}
                        </Text>
                        <Text style={MtpApprovalStyles.moduleName}>
                            Approved Date: {item.approved_date}
                        </Text>
                    </>
                )}

                {selectedTab === "Rejected" && (
                    <>
                        <Text style={MtpApprovalStyles.moduleName}>
                            Rejected By: {item.approved_by}
                        </Text>
                        <Text style={MtpApprovalStyles.moduleName}>
                            Rejected Date: {item.approved_date}
                        </Text>
                    </>
                )}
            </View>
        </View>
    );


    return (
        <View style={MtpApprovalStyles.PaddingHorizontal}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginLeft: 5, color: "#000" }}>Select All</Text>
                <CheckBox
                    value={checkedStates.length > 0 && checkedStates.every(Boolean)}
                    onValueChange={(newValue) => {
                        setCheckedStates(new Array(MtpPendingData.length).fill(newValue));
                    }}
                />

            </View>
            <View style={MtpApprovalStyles.dropdown}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <HomeDropDown style={{ width: 100, marginRight: 1 }} value={selectedMonth} setValue={setSelectedMonth} data={months} placeholder="Month" />
                    <HomeDropDown style={{ width: 100 }} value={selectedYear} setValue={setSelectedYear} data={years} placeholder="Year" />
                    <TouchableOpacity style={[MtpApprovalStyles.pendingButton, { marginLeft: 15 }]} onPress={openModal}>
                        <Text style={MtpApprovalStyles.pendingText}>Team</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Spacing space={10} /> */}

            <Modal
                transparent={true}
                visible={modalVisible1}
                animationType="fade"
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={MtpApprovalStyles.modalOverlay4}>
                    <View style={MtpApprovalStyles.dropdownContainer4}>
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible1(false)}
                            style={MtpApprovalStyles.modal1}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>×</Text>
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
                                            style={MtpApprovalStyles.option4}
                                            onPress={() => {
                                                setSelectedTeam(team.reporting_person_name);
                                                setSelectedTeamId(team.emp_id);
                                                setModalVisible1(false);

                                                // ✅ Purana data clear
                                                setMtpPendingData([]);
                                                setMtpApprovedData([]);
                                                setCheckedStates([]);

                                                // ✅ Tab ke according data fetch karo
                                                if (selectedTab === "Pending") {
                                                    MtpPendingList(team.emp_id, selectedMonth, selectedYear);
                                                } else if (selectedTab === "Accepted") {
                                                    MtpApprovalList(team.emp_id, selectedMonth, selectedYear);
                                                } else if (selectedTab === "Rejected") {
                                                    MtpRejectedlList(team.emp_id, selectedMonth, selectedYear)
                                                }
                                            }}
                                        >
                                            <Text style={MtpApprovalStyles.optionText4}>
                                                {team.reporting_person_name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text style={{ textAlign: "center", padding: 10 }}>
                                        No Team Members Found
                                    </Text>
                                )}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>

            <Text style={{ marginBottom: 5, color: '#000000', fontWeight: "bold" }}>{selectedTeam}</Text>

            <Modal
                visible={outletModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setOutletModalVisible(false)}
            >
                <View style={{
                    flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center", alignItems: "center"
                }}>
                    <View style={{
                        backgroundColor: "#fff", padding: 20,
                        borderRadius: 8, width: "60%", maxHeight: "70%"
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
                            Outlets
                        </Text>
                        <ScrollView>
                            {outlets.length > 0 ? (
                                outlets.map((outlet, idx) => (
                                    <Text key={idx} style={{ marginBottom: 5, color: "#333" }}>
                                        {outlet.trim()}
                                    </Text>
                                ))
                            ) : (
                                <Text>No Outlets Found</Text>
                            )}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => setOutletModalVisible(false)}
                            style={{
                                marginTop: 10, backgroundColor: "#1f7a2b",
                                padding: 10, borderRadius: 5, alignSelf: "flex-end"
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


            {/* ✅ Approve & Reject Buttons */}
            {selectedTab === "Pending" && checkedStates.some((checked) => checked) && (
                <View style={MtpApprovalStyles.buttonContainer}>
                    <TouchableOpacity
                        style={[MtpApprovalStyles.actionButton, MtpApprovalStyles.rejectButton]}
                        onPress={handleRejected}
                    >
                        <Text style={MtpApprovalStyles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[MtpApprovalStyles.actionButton, MtpApprovalStyles.approveButton]}
                        onPress={handleApprove}

                    >
                        <Text style={MtpApprovalStyles.buttonText}>Approve</Text>
                    </TouchableOpacity>
                </View>
            )}

            <Spacing space={15} />
            <View style={MtpApprovalStyles.tabContainer}>
                {["Pending", "Accepted", "Rejected"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            MtpApprovalStyles.tabButton,
                            selectedTab === tab && MtpApprovalStyles.selectedTabButton,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                MtpApprovalStyles.tabText,
                                selectedTab === tab && MtpApprovalStyles.selectedTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* ✅ Pending MTP List */}
            {/* ✅ Pending List */}
            {selectedTab === "Pending" && (
                <FlatList
                    data={MtpPendingData}
                    renderItem={renderApprovalItem}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                />
            )}

            {/* ✅ Accepted List */}
            {selectedTab === "Accepted" && (
                <FlatList
                    data={MtpApprovedData}
                    renderItem={renderApprovalItem}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                />
            )}

            {/* ✅ Future: Rejected List */}
            {selectedTab === "Rejected" && (
                <FlatList
                    data={MtpRejectedData}
                    renderItem={renderApprovalItem}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                />
            )}

        </View>
    )
};

export default MtpApprovalScreen;
