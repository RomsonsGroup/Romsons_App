import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    Text,
    View,
    FlatList,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    loading, ScrollView
} from "react-native";
import { HomeDropDown } from "../../components";
import { MtpTourPlanStyle } from '../../styles/MtpTourPlanStyle'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../utils';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const endYear = currentYear + 10; // aage ke 10 years bhi

const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
    label: (startYear + i).toString(),
    value: startYear + i,
}));


const MtpTourPlanScreen = () => {
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const navigation = useNavigation();
    const MtpTourPlanStyles = useMemo(() => MtpTourPlanStyle(currentColors), [currentColors]);
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [calendarData, setCalendarData] = useState([]);
    const [assignedBeatData, setAssignedBeatData] = useState([]);
    const [showBeatModal, setShowBeatModal] = useState(false);
    const [activeRowId, setActiveRowId] = useState(null);
    const [showWorkingModal, setShowWorkingModal] = useState(false);
    const [workingRowId, setWorkingRowId] = useState(null);
    const [showJointModal, setShowJointModal] = useState(false);
    const [jointMembers, setJointMembers] = useState([]);
    const [loadingJoint, setLoadingJoint] = useState(false);
    const [showRemarksModal, setShowRemarksModal] = useState(false);
    const [activeRemarksId, setActiveRemarksId] = useState(null);
    const [tempRemarks, setTempRemarks] = useState("");
    const [currentStatus, setCurrentStatus] = useState("P");
    const [modalVisible1, setModalVisible1] = useState(false);
    const [teamLists, setTeamLists] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    useEffect(() => {
        const initCalendar = async () => {
            const user = await AsyncStorage.getItem("userInfor");
            const employee_state_id = JSON.parse(user)[0].state_id;  // ✅ Get state_id from login
            const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            const monthName = new Date(selectedYear, selectedMonth).toLocaleString("en-US", { month: "short" });

            const data = Array.from({ length: daysInMonth }, (_, i) => {
                const date = new Date(selectedYear, selectedMonth, i + 1);
                const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
                let disabled = false;

                // Disable logic based on state_id
                if ((employee_state_id === 39 && dayName === "Saturday") ||
                    (employee_state_id !== 39 && dayName === "Sunday")) {
                    disabled = true;
                }

                return {
                    id: i + 1,
                    date: `${i + 1} ${monthName}`,
                    day: dayName.slice(0, 3), // Short day name like Mon, Tue
                    beat: "",
                    working: "",
                    remarks: "",
                    disabled, // ✅ mark row as disabled
                };
            });

            setCalendarData(data);
            fetchSubmittedPlans();
            await fetchHolidays(employee_state_id, selectedYear, selectedMonth + 1, selectedTeamId); // ✅ new function

        };

        initCalendar();
    }, [selectedMonth, selectedYear, selectedTeamId]);

    useEffect(() => {
        const fetchLeaves = async () => {
            const user = await AsyncStorage.getItem("userInfor");
            let empid = JSON.parse(user)[0].emp_id;

            // ✅ selectedTeamId agar choose hua ho to use karo
            if (selectedTeamId) {
                empid = selectedTeamId;
            }

            const response = await fetch(
                `https://devcrm.romsons.com:8080/GetEmployeeLeaves?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`
            );
            const result = await response.json();

            if (!result.error && result.data.length) {
                const leaveDates = result.data.map(ld => {
                    const d = new Date(ld.leave_date); // ensure Date object
                    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                });

                setCalendarData(prev =>
                    prev.map(day => {
                        const isLeave = leaveDates.includes(
                            `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day.id).padStart(2, '0')}`
                        );
                        return {
                            ...day,
                            leave: isLeave,
                            disabled: day.disabled || isLeave  // touchables disable
                        };
                    })
                );

            }
        };

        fetchLeaves();
    }, [selectedMonth, selectedYear, selectedTeamId]);

    useEffect(() => {
        fetchSubmittedPlans();
    }, [selectedMonth, selectedYear, selectedTeamId]);

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

    const fetchHolidays = async (state_id, year, month) => {
        try {
            // 🔹 Agar manager ne team member select kiya hai, to uska state_id use karein
            let effectiveStateId = state_id;
            if (selectedTeamId && teamLists?.length) {
                const teamMember = teamLists.find(t => t.emp_id === selectedTeamId);
                if (teamMember?.state_id) {
                    effectiveStateId = teamMember.state_id;
                }
            }

            const response = await fetch(
                `https://devcrm.romsons.com:8080/GetHolidays?state_id=${effectiveStateId}&month=${month}&year=${year}`
            );
            const result = await response.json();
            console.log(result, "holidays comeee");

            if (!result.error && result.data.length) {
                const holidayDates = result.data.map(h => h.date); // YYYY-MM-DD

                setCalendarData(prev =>
                    prev.map(day => {
                        const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(
                            day.id
                        ).padStart(2, "0")}`;
                        const isHoliday = holidayDates.includes(dayStr);
                        return {
                            ...day,
                            holiday: isHoliday,
                            disabled: day.disabled || isHoliday,
                        };
                    })
                );
            }
        } catch (err) {
            console.error("Error fetching holidays:", err);
        }
    };

    const fetchSubmittedPlans = async () => {
        try {
            const user = await AsyncStorage.getItem("userInfor");
            let empid = JSON.parse(user)[0].emp_id;

            // Agar team member select hua ho, toh uska empid use karo
            if (selectedTeamId) {
                empid = selectedTeamId;
            }

            const response = await fetch(
                `https://devcrm.romsons.com:8080/GetMtpTourPlan?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`
            );
            const result = await response.json();
            console.log(result, "API response");

            if (!result.error && result.data.length) {
                setCalendarData((prev) =>
                    prev.map((day) => {
                        const matched = result.data.find(
                            (plan) =>
                                plan.outlet_date ===
                                `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day.id).padStart(2, "0")}`
                        );

                        return matched
                            ? {
                                ...day,
                                plan_id: matched.id,
                                beat: matched.beat_name || "",
                                working:
                                    matched.plan_type?.toLowerCase() === "self"
                                        ? "Self"
                                        : matched.joint_name || "Joint",
                                joint_id: matched.joint_id || null,
                                remarks: matched.comments || "",
                                status: matched.status,
                                editable: matched.status !== "A",
                            }
                            : { ...day, editable: true };
                    })
                );
            }
        } catch (err) {
            console.error("Error fetching submitted plans:", err);
        }
    };

    const updateField = (id, field, value) => {
        setCalendarData((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    };

    // Beat select
    const handleBeatSelect = (beat) => {
        if (activeRowId) {
            updateField(activeRowId, "beat", beat.beat_name);
        }
        setShowBeatModal(false);
    };

    const handleWorkingSelect = async (type) => {
        if (workingRowId) {
            if (type === "Self") {
                updateField(workingRowId, "working", "Self");
                setShowWorkingModal(false);
            } else if (type === "Joint") {
                setShowWorkingModal(false);
                await fetchJointMembers();
                setShowJointModal(true);
            }
        }
    };


    const fetchJointMembers = async () => {
        try {
            setLoadingJoint(true);
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const response = await fetch("https://devcrm.romsons.com:8080/Reporting_hierarchy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ empid: empid[0].emp_id }),
            });

            const result = await response.json();
            console.log(result, 'joint id show');

            if (!result.error && result.data) {
                setJointMembers(result.data);
            } else {
                setJointMembers([]);
            }
        } catch (error) {
            console.error("Error fetching joint members:", error);
            setJointMembers([]);
        } finally {
            setLoadingJoint(false);
        }
    };

    useEffect(() => {
        AssignedBeat();
    }, []);


    const AssignedBeat = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://devcrm.romsons.com:8080/MtpTourPlanBeat?empidd=${empid[0].emp_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'poohgshshs');

                if (result.error == false) {
                    setAssignedBeatData(result.data)
                }
            })
            .catch((error) => console.error(error));
    }

    const handleJointMemberSelect = (member) => {
        if (workingRowId && member) {
            setCalendarData(prev =>
                prev.map(item =>
                    item.id === workingRowId
                        ? {
                            ...item,
                            working: member.reporting_to_name,
                            joint_id: member.emp_id
                        }
                        : item
                )
            );
        }
        setShowJointModal(false);
    };

    const openRemarksModal = (item) => {
        setActiveRemarksId(item.id);
        setTempRemarks(item.remarks || "");
        setShowRemarksModal(true);
    };

    const saveRemarks = () => {
        updateField(activeRemarksId, "remarks", tempRemarks);
        setShowRemarksModal(false);
    };

    const handleSubmit = async () => {
        try {
            const empid = JSON.parse(await AsyncStorage.getItem("userInfor"))[0].emp_id;
            const rows = calendarData.filter(r => r.beat && r.working);
            if (!rows.length) return alert("Please select at least one valid day.");
            const responses = await Promise.all(
                rows.map(async (row) => {
                    const beat_id =
                        assignedBeatData.find(b => b.beat_name === row.beat)?.beat_id || null;
                    const outlet_date = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(row.id).padStart(2, "0")}`;
                    const plan_type = row.working === "Self" ? "self" : "joint";
                    const selectedMember = jointMembers.find(
                        m => m.reporting_to_name === row.working
                    );
                    const joint_id = plan_type === "joint" ? selectedMember?.reporting_to || null : null;
                    const payload = {
                        id: row.plan_id || null,
                        user_id: empid,
                        beat_id,
                        outlet_date,
                        status: row.plan_id ? row.status : "P",
                        plan_type,
                        joint_id,
                        comments: row.remarks || "",
                    };

                    console.log("Submitting payload carefully:", payload);

                    try {
                        const res = await fetch("https://devcrm.romsons.com:8080/InsertMtpTourPlan", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });

                        const data = await res.json();
                        // Log every response for debugging
                        console.log(`Response for ${outlet_date}:`, data);

                        return { ...data, outlet_date }; // attach date for easier mapping
                    } catch (err) {
                        console.error(`Network error for ${outlet_date}:`, err);
                        return { error: true, message: `Network error for ${outlet_date}` };
                    }
                })
            );

            // Success if *all* responses are non-error
            if (responses.every(r => !r.error)) {
                setCurrentStatus("P");
                await fetchSubmittedPlans();
                const isUpdate = responses.some(r => r.message?.includes("updated"));
                if (isUpdate) {
                    alert("MTP Tour Plan updated successfully!");
                } else {
                    alert("MTP Tour Plans submitted successfully!");
                }
                navigation.goBack();
            } else {
                // Collect all failure reasons from API responses
                const failedMessages = responses
                    .filter(r => r.error)
                    .map(r => `${r.outlet_date || ""}: ${r.message}`)
                    .join("\n");
                alert(`\n${failedMessages}`);
            }
        } catch (err) {
            console.error("Submit error:", err);
            alert("Failed to submit MTP Tour Plan.");
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* Month & Status dropdowns */}
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
                <TouchableOpacity style={[MtpTourPlanStyles.pendingButton, { alignSelf: "flex-start", marginBottom: 8 }]} onPress={openModal}>
                    <Text style={MtpTourPlanStyles.pendingText}>Team</Text>
                </TouchableOpacity>

                <Text style={{ marginBottom: 5, color: '#000000', fontWeight: "bold" }}>{selectedTeam}</Text>
            </View>
            <View
                style={MtpTourPlanStyles.dropdown}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <HomeDropDown
                        style={{ width: 100, marginRight: 1 }}
                        value={selectedMonth}
                        setValue={setSelectedMonth}
                        data={months}
                        placeholder="Month"
                    />
                    <HomeDropDown
                        style={{ width: 100 }}
                        value={selectedYear}
                        setValue={setSelectedYear}
                        data={years}
                        placeholder="Year"
                    />
                    {/* <Text style={{ marginLeft: 10 }}>Status: {currentStatus || ""}</Text> */}
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        MtpTourPlanStyles.smallButton,
                        { backgroundColor: "gray", paddingHorizontal: 20 },
                    ]}
                >
                    <Text style={MtpTourPlanStyles.smallButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={MtpTourPlanStyles.headerRow}>
                <Text style={MtpTourPlanStyles.headerCol}>Date</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Day</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Beat</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Working</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Remarks</Text>
            </View>

            <Modal
                transparent={true}
                visible={modalVisible1}
                animationType="fade"
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={MtpTourPlanStyles.modalOverlay4}>
                    <View style={MtpTourPlanStyles.dropdownContainer4}>

                        {/* Beautiful Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible1(false)}
                            style={MtpTourPlanStyles.modal1}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>×</Text>
                        </TouchableOpacity>
                        
                        {loading ? (
                            <ActivityIndicator size="medium" color="#0000ff" style={{ marginTop: 50 }} />
                        ) : (
                            <ScrollView style={{ marginTop: 50 }}>
                                {teamLists.length > 0 ? (
                                    teamLists.map((team, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={MtpTourPlanStyles.option4}
                                            onPress={() => {
                                                setSelectedTeam(team.reporting_person_name);
                                                setSelectedTeamId(team.emp_id);
                                                setModalVisible1(false);
                                                // fetchSubmittedPlans();
                                            }}

                                        >
                                            <Text style={MtpTourPlanStyles.optionText4}>
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

            <FlatList
                data={calendarData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    let rowStyle = {};

                    // Weekend / leave / holiday coloring for entire row background
                    if (item.disabled) rowStyle = { backgroundColor: "#f5f5f5", opacity: 0.5 };
                    if (item.leave) rowStyle = { backgroundColor: "yellow" };
                    if (item.holiday) rowStyle = { backgroundColor: "#FFB6C1" };

                    // ✅ Decide status color for first two cells only
                    let statusColor = "transparent";
                    if (item.status === "P") statusColor = "orange";   // Pending
                    if (item.status === "R") statusColor = "red";      // Rejected
                    if (item.status === "A") statusColor = "green";    // Approved

                    const isRowDisabled = item.disabled || item.leave || item.status === "A";

                    return (
                        <View style={[MtpTourPlanStyles.row, rowStyle]}>
                            {/* Date column with status color */}
                            <Text style={[MtpTourPlanStyles.col, { backgroundColor: statusColor }]}>
                                {item.date}
                            </Text>

                            {/* Day column with status color */}
                            <Text style={[MtpTourPlanStyles.col, { backgroundColor: statusColor }]}>
                                {item.day}
                            </Text>

                            {/* Beat */}
                            <TouchableOpacity
                                style={[MtpTourPlanStyles.input, { justifyContent: "center" }]}
                                disabled={isRowDisabled}
                                onPress={() => {
                                    if (!isRowDisabled) {
                                        setActiveRowId(item.id);
                                        setShowBeatModal(true);
                                    }
                                }}
                            >
                                <Text>{item.beat || "Beat"}</Text>
                            </TouchableOpacity>

                            {/* Working */}
                            <TouchableOpacity
                                style={[MtpTourPlanStyles.input, { justifyContent: "center" }]}
                                disabled={isRowDisabled}
                                onPress={() => {
                                    if (!isRowDisabled) {
                                        setWorkingRowId(item.id);
                                        setShowWorkingModal(true);
                                    }
                                }}
                            >
                                <Text numberOfLines={1} ellipsizeMode="tail">
                                    {item.working || "Call With"}
                                </Text>
                            </TouchableOpacity>

                            {/* Remarks */}
                            <TouchableOpacity
                                style={[MtpTourPlanStyles.input, { backgroundColor: "#eee" }]}
                                disabled={isRowDisabled}
                                onPress={() => {
                                    if (!isRowDisabled) openRemarksModal(item);
                                }}
                            >
                                <Text numberOfLines={1} ellipsizeMode="tail">
                                    {item.remarks || "Remarks"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />



            <Modal visible={showBeatModal} transparent animationType="slide">
                <View style={MtpTourPlanStyles.modalOverlay}>
                    <View style={MtpTourPlanStyles.modalBox}>
                        <Text style={MtpTourPlanStyles.modalTitle}>Select Beat</Text>

                        {assignedBeatData.map((beat, index) => (
                            <TouchableOpacity
                                key={beat.id || `beat-${index}`}
                                style={MtpTourPlanStyles.modalItem}
                                onPress={() => handleBeatSelect(beat)}
                            >
                                <Text>{beat.beat_name}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={MtpTourPlanStyles.closeButton}
                            onPress={() => setShowBeatModal(false)}
                        >
                            <Text style={MtpTourPlanStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showWorkingModal} transparent animationType="slide">
                <View style={MtpTourPlanStyles.modalOverlay}>
                    <View style={MtpTourPlanStyles.modalBox}>
                        <Text style={MtpTourPlanStyles.modalTitle}>Select Working Type</Text>

                        <TouchableOpacity
                            style={MtpTourPlanStyles.modalItem}
                            onPress={() => handleWorkingSelect("Self")}
                        >
                            <Text>Self</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MtpTourPlanStyles.modalItem}
                            onPress={() => handleWorkingSelect("Joint")}
                        >
                            <Text>Joint</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MtpTourPlanStyles.closeButton}
                            onPress={() => setShowWorkingModal(false)}
                        >
                            <Text style={MtpTourPlanStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showJointModal} transparent animationType="slide">
                <View style={MtpTourPlanStyles.modalOverlay}>
                    <View style={MtpTourPlanStyles.modalBox}>
                        <Text style={MtpTourPlanStyles.modalTitle}>Select Member</Text>

                        {jointMembers.map((member, index) => (
                            <TouchableOpacity
                                key={member.id || `member-${index}`}   // ✅ FIXED
                                style={MtpTourPlanStyles.modalItem}
                                onPress={() => handleJointMemberSelect(member)}
                            >
                                <Text>{member.reporting_to_name}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity
                            style={MtpTourPlanStyles.closeButton}
                            onPress={() => setShowJointModal(false)}
                        >
                            <Text style={MtpTourPlanStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showRemarksModal} transparent animationType="slide">
                <View style={MtpTourPlanStyles.modalOverlay}>
                    <View style={MtpTourPlanStyles.modalBox}>
                        <Text style={MtpTourPlanStyles.modalTitle}>Enter Remarks</Text>
                        <TextInput
                            style={MtpTourPlanStyles.modalInput}
                            placeholder="Type your remarks..."
                            value={tempRemarks}
                            onChangeText={setTempRemarks}
                            multiline
                        />
                        <View style={MtpTourPlanStyles.buttonRow}>
                            <TouchableOpacity
                                style={[MtpTourPlanStyles.smallButton, { backgroundColor: "#4CAF50" }]}
                                onPress={saveRemarks}
                            >
                                <Text style={MtpTourPlanStyles.smallButtonText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[MtpTourPlanStyles.smallButton, { backgroundColor: "gray" }]}
                                onPress={() => setShowRemarksModal(false)}
                            >
                                <Text style={MtpTourPlanStyles.smallButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MtpTourPlanScreen;
