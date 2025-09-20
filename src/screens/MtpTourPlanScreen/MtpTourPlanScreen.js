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
            await fetchHolidays(employee_state_id, selectedYear, selectedMonth + 1); // ✅ new function

        };

        initCalendar();
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        const fetchLeaves = async () => {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user)[0].emp_id;

            const response = await fetch(
                `http://localhost:8091/GetEmployeeLeaves?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`
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
    }, [selectedMonth, selectedYear]);

    useEffect(() => {
        fetchSubmittedPlans();
    }, [selectedMonth, selectedYear]);

    const fetchHolidays = async (state_id, year, month) => {
        try {
            const response = await fetch(
                `http://localhost:8091/GetHolidays?state_id=${state_id}&month=${month}&year=${year}`
            );
            const result = await response.json();
            console.log(result,'holidays comeee');
            
    
            if (!result.error && result.data.length) {
                const holidayDates = result.data.map(h => h.date); // YYYY-MM-DD
    
                setCalendarData(prev =>
                    prev.map(day => {
                        const dayStr = `${year}-${String(month).padStart(2, '0')}-${String(day.id).padStart(2, '0')}`;
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
            const empid = JSON.parse(await AsyncStorage.getItem("userInfor"))[0].emp_id;

            const response = await fetch(
                `http://localhost:8091/GetMtpTourPlan?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`
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
                            }
                            : day;
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

            const response = await fetch("http://localhost:8091/Reporting_hierarchy", {
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

        fetch(`http://localhost:8091/MtpTourPlanBeat?empidd=${empid[0].emp_id}`, requestOptions)
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
                        id: row.plan_id || null, // ✅ Agar ID hai to update karo
                        user_id: empid,
                        beat_id,
                        outlet_date,
                        status: "P",
                        plan_type,
                        joint_id,
                        comments: row.remarks || "",
                    };

                    console.log("Submitting payload carefully:", payload);

                    try {
                        const res = await fetch("http://localhost:8091/InsertMtpTourPlan", {
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
                    alert("All MTP Tour Plans submitted successfully!");
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
                    <Text style={{ marginLeft: 10 }}>Status: {currentStatus || ""}</Text>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        MtpTourPlanStyles.smallButton,
                        { backgroundColor: "gray", paddingHorizontal: 14 },
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


            <FlatList
                data={calendarData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    let rowStyle = {};

                    if (item.disabled) {
                        // Agar row already disabled (weekend), gray
                        rowStyle = { backgroundColor: "#f5f5f5", opacity: 0.5 };
                    }

                    if (item.leave) {
                        // Leave row, yellow
                        rowStyle = { backgroundColor: "yellow" };
                    }
                    if (item.holiday) {
                        rowStyle = { backgroundColor: "#FFB6C1" }; // Light red for holiday
                    }

                    return (
                        <View style={[MtpTourPlanStyles.row, rowStyle]}>
                            <Text style={MtpTourPlanStyles.col}>{item.date}</Text>
                            <Text style={MtpTourPlanStyles.col}>{item.day}</Text>

                            {/* Beat */}
                            <TouchableOpacity
                                style={[MtpTourPlanStyles.input, { justifyContent: "center" }]}
                                disabled={item.disabled || item.leave}
                                onPress={() => {
                                    if (!item.disabled && !item.leave) {
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
                                disabled={item.disabled || item.leave}
                                onPress={() => {
                                    if (!item.disabled && !item.leave) {
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
                                disabled={item.disabled || item.leave}
                                onPress={() => {
                                    if (!item.disabled && !item.leave) openRemarksModal(item);
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
