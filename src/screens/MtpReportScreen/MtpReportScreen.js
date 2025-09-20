import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Text,
    View,
    ScrollView
} from "react-native";
import { MtpReportStyle } from '../../styles/MtpReportStyle'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../utils';
import { useTranslation } from 'react-i18next';
import { HomeDropDown } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';


const MtpReportScreen = () => {
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const MtpReportStyles = useMemo(() => MtpReportStyle(currentColors), [currentColors]);

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [getmtpdata, setGetmtpdata] = useState([]);
    const [holidayDates, setHolidayDates] = useState([]);
    const [leaveDates, setLeaveDates] = useState([]);
    const [stateId, setStateId] = useState(null);

    const months = [
        { label: "Jan", value: 0 }, { label: "Feb", value: 1 }, { label: "Mar", value: 2 },
        { label: "Apr", value: 3 }, { label: "May", value: 4 }, { label: "Jun", value: 5 },
        { label: "Jul", value: 6 }, { label: "Aug", value: 7 }, { label: "Sept", value: 8 },
        { label: "Oct", value: 9 }, { label: "Nov", value: 10 }, { label: "Dec", value: 11 },
    ];
    const years = Array.from({ length: 21 }, (_, i) => ({ label: (2000 + i).toString(), value: 2000 + i }));

    useEffect(() => {
        GetMtpMonthWiseData();
        fetchMetaData();
    }, [selectedMonth, selectedYear]);

    const GetMtpMonthWiseData = async () => {
        const empid = JSON.parse(await AsyncStorage.getItem("userInfor"))[0].emp_id;
        const res = await fetch(`http://localhost:8091/GetMtpTourPlan?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`);
        const result = await res.json();
        if (!result.error) setGetmtpdata(result.data);
    };

    const fetchMetaData = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("userInfor"));
        const empid = user[0].emp_id;
        const stId = user[0].state_id;
        setStateId(stId);

        const holRes = await fetch(`http://localhost:8091/GetHolidays?state_id=${stId}&month=${selectedMonth + 1}&year=${selectedYear}`);
        const holData = await holRes.json();
        if (!holData.error) setHolidayDates(holData.data.map(h => h.date));

        const leaveRes = await fetch(`http://localhost:8091/GetEmployeeLeaves?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`);
        const leaveData = await leaveRes.json();
        if (!leaveData.error) {
            setLeaveDates(
                leaveData.data.map(ld => {
                    const d = new Date(ld.leave_date);
                    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                })
            );
        }
    };

    const groupedData = getmtpdata.reduce((acc, item) => {
        const key = new Date(item.outlet_date).toISOString().split("T")[0];
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const getHeaderColor = (isoDate) => {
        const d = new Date(isoDate);
        const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
        if (holidayDates.includes(isoDate)) return "#FFB6C1";
        if (leaveDates.includes(isoDate)) return "yellow";
        if ((stateId === 39 && dayName === "Saturday") || (stateId !== 39 && dayName === "Sunday"))
            return "#d3d3d3";
        return "#ffffff";
    };



    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const allDates = Array.from({ length: daysInMonth }, (_, i) => {
        const iso = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
        return iso;
    });

    return (
        <View style={{ flex: 1, padding: 10 }}>
            {/* Month/Year Dropdown */}
            <View style={MtpReportStyles.dropdown}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <HomeDropDown style={{ width: 100, marginRight: 1 }} value={selectedMonth} setValue={setSelectedMonth} data={months} placeholder="Month" />
                    <HomeDropDown style={{ width: 100 }} value={selectedYear} setValue={setSelectedYear} data={years} placeholder="Year" />
                    <Text style={{ marginLeft: 10, color: "#000", fontWeight: "bold" }}>
                        Status: {getmtpdata.length > 0 ? getmtpdata[0].status : "N/A"}
                    </Text>
                </View>
            </View>

            {/* Scrollable Dates and Records */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {allDates.map((isoDate) => {
                    const dateLabel = new Date(isoDate).toLocaleDateString("en-GB");
                    const records = groupedData[isoDate] || [];
                    return (
                        <View key={isoDate} style={{ marginBottom: 8 }}>
                            {/* 🟢 Header always visible */}
                            <View
                                style={[
                                    MtpReportStyles.infoContainer,
                                    { backgroundColor: getHeaderColor(isoDate) },
                                ]}
                            >
                                <Text style={[MtpReportStyles.hospitalText, { color: "#000" }]}>
                                    {dateLabel} (
                                    {new Date(isoDate).toLocaleDateString("en-US", { weekday: "short" })})
                                </Text>
                            </View>

                            {/* 🔹 Records */}
                            {records.length > 0 ? (
                                records.map((res, ind) => (
                                    <View
                                        key={ind}
                                        style={{
                                            marginBottom: 16,
                                            padding: 12,
                                            backgroundColor: "#fff",
                                            borderRadius: 8,
                                            shadowColor: "#000",
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            shadowOffset: { width: 0, height: 2 },
                                            elevation: 3,
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                            <Text style={{ color: "black", fontSize: 13 }}>Beat Name: </Text>
                                            <Text style={{ color: "green", fontSize: 12 }}>{res.beat_name}</Text>
                                        </Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                                <Text style={{ color: "black", fontSize: 13 }}>Call Type: </Text>
                                                <Text style={{ color: "green", fontSize: 13 }}>{res.plan_type}</Text>
                                            </Text>
                                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                                <Text style={{ color: "black", fontSize: 13 }}>Joint Name: </Text>
                                                <Text style={{ color: "green", fontSize: 13 }}>{res.joint_name}</Text>
                                            </Text>
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 4 }}>
                                            <Text style={{ color: "black", fontSize: 13 }}>Remarks: </Text>
                                            <Text style={{ color: "green", fontSize: 13 }}>{res.comments}</Text>
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                // 🔸 Even if no records, show an empty message or spacer (optional)
                                <View style={{ paddingVertical: 4 }} />
                            )}
                        </View>
                    );
                })}
            </ScrollView>

        </View>
    );
};

export default MtpReportScreen;