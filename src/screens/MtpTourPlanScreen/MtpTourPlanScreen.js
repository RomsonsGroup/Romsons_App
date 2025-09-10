import React, { useState, useEffect, useMemo } from "react";
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
    { label: "January", value: 0 },
    { label: "February", value: 1 },
    { label: "March", value: 2 },
    { label: "April", value: 3 },
    { label: "May", value: 4 },
    { label: "June", value: 5 },
    { label: "July", value: 6 },
    { label: "August", value: 7 },
    { label: "September", value: 8 },
    { label: "October", value: 9 },
    { label: "November", value: 10 },
    { label: "December", value: 11 },
];

const statusOptions = [
    { label: "P", value: "P" },
    { label: "A", value: "A" },
    { label: "R", value: "R" },
];

// Dummy beat data (API se aayega later)
const beatOptions = [
    { id: 1, name: "Beat 1" },
    { id: 2, name: "Beat 2" },
    { id: 3, name: "Beat 3" },
];

// Dummy joint members (API se aayega later)
const jointMembers = [
    { id: 1, name: "PRAGATI SHARMA" },
    { id: 2, name: "Sneha" },
    { id: 3, name: "Amit" },
];

const MtpTourPlanScreen = () => {
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const navigation = useNavigation();
    const MtpTourPlanStyles = useMemo(() => MtpTourPlanStyle(currentColors), [currentColors]);
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear] = useState(currentDate.getFullYear());
    const [calendarData, setCalendarData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("P");
    const [highlightedName, setHighlightedName] = useState("");

    // Beat Modal state
    const [showBeatModal, setShowBeatModal] = useState(false);
    const [activeRowId, setActiveRowId] = useState(null);

    // Working Modal state
    const [showWorkingModal, setShowWorkingModal] = useState(false);
    const [workingRowId, setWorkingRowId] = useState(null);

    // Joint Modal state
    const [showJointModal, setShowJointModal] = useState(false);

    // Joint Modal state
    const [jointMembers, setJointMembers] = useState([]);
    const [loadingJoint, setLoadingJoint] = useState(false);

    useEffect(() => {
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const data = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(selectedYear, selectedMonth, i + 1);
            return {
                id: i + 1,
                date: i + 1,
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                beat: "",
                working: "",
                remarks: "",
            };
        });
        setCalendarData(data);
    }, [selectedMonth, selectedYear]);

    const updateField = (id, field, value) => {
        setCalendarData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // Beat select
    const handleBeatSelect = (beat) => {
        if (activeRowId) {
            updateField(activeRowId, "beat", beat.name);
        }
        setShowBeatModal(false);
    };

    // Working select - Self/Joint
    const handleWorkingSelect = async (type) => {
        if (workingRowId) {
            if (type === "Self") {
                updateField(workingRowId, "working", "Self");
                setShowWorkingModal(false);
            } else if (type === "Joint") {
                setShowWorkingModal(false);
                await fetchJointMembers(); // 👈 API call here
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
            console.log(result,'poihdhdjh');
            
            if (!result.error && result.data) {
                setJointMembers(result.data); // 👈 API data set
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

    // Joint member select
    const handleJointMemberSelect = (member) => {
        if (workingRowId) {
            updateField(workingRowId, "working", member.reporting_to_name);
        }
        setShowJointModal(false);
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* Month & Status dropdowns */}
            <View
                style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <HomeDropDown
                    style={{ width: "60%" }}
                    value={selectedMonth}
                    setValue={setSelectedMonth}
                    data={months}
                    placeholder="Select Month"
                />

                <HomeDropDown
                    style={{ width: "35%" }}
                    value={selectedStatus}
                    setValue={setSelectedStatus}
                    data={statusOptions}
                    placeholder="Status"
                />
            </View>

            {/* Table Header */}
            <View style={MtpTourPlanStyles.headerRow}>
                <Text style={MtpTourPlanStyles.headerCol}>Date</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Day</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Beat</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Working</Text>
                <Text style={MtpTourPlanStyles.headerCol}>Remarks</Text>
            </View>

            {/* Calendar Data */}
            <FlatList
                data={calendarData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={MtpTourPlanStyles.row}>
                        <Text style={MtpTourPlanStyles.col}>{item.date}</Text>
                        <Text style={MtpTourPlanStyles.col}>{item.day}</Text>

                        {/* Beat - popup open karega */}
                        <TouchableOpacity
                            style={[MtpTourPlanStyles.input, { justifyContent: "center" }]}
                            onPress={() => {
                                setActiveRowId(item.id);
                                setShowBeatModal(true);
                            }}
                        >
                            <Text>{item.beat || "Select Beat"}</Text>
                        </TouchableOpacity>

                        {/* Working - Self/Joint */}
                        <TouchableOpacity
                            style={[
                                MtpTourPlanStyles.input,
                                { justifyContent: "center", alignItems: "center", height: 40, width: 90 } // ✅ fix size
                            ]}
                            onPress={() => {
                                setWorkingRowId(item.id);
                                setShowWorkingModal(true);
                            }}
                        >
                            <Text numberOfLines={1} ellipsizeMode="tail">
                                {item.working || "Call With"}
                            </Text>
                        </TouchableOpacity>

                        <TextInput
                            style={MtpTourPlanStyles.input}
                            placeholder="Remarks"
                            value={item.remarks}
                            onChangeText={(text) => updateField(item.id, "remarks", text)}
                        />
                    </View>
                )}
            />

            {/* Beat Modal */}
            <Modal visible={showBeatModal} transparent animationType="slide">
                <View style={MtpTourPlanStyles.modalOverlay}>
                    <View style={MtpTourPlanStyles.modalBox}>
                        <Text style={MtpTourPlanStyles.modalTitle}>Select Beat</Text>

                        {beatOptions.map((beat, index) => (
                            <TouchableOpacity
                                key={beat.id || `beat-${index}`}   // ✅ FIXED
                                style={MtpTourPlanStyles.modalItem}
                                onPress={() => handleBeatSelect(beat)}
                            >
                                <Text>{beat.name}</Text>
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

            {/* Working Modal (Self/Joint) */}
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

            {/* Joint Members Modal */}
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
        </View>
    );
};


export default MtpTourPlanScreen;
