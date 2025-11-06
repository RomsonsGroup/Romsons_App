import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet, Platform, ScrollView, Alert, loading } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { darkTheme, Fonts, lightTheme, SF, SH } from "../../utils";
import { ActivityHistoryStyle } from '../../styles/ActivityHistoryStyle';
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { HomeDropDown } from '../../components';


const ActivityHistoryScreen = () => {

    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const ActivityHistoryStyles = useMemo(() => ActivityHistoryStyle(currentColors), [currentColors]);
    const [isBeatModalVisible, setBeatModalVisible] = useState(false);
    const [isOutletModalVisible, setOutletModalVisible] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState([]);
    let [selectbtname, setSelectbtname] = React.useState('');
    let [selectbtid, setSelectbtid] = React.useState('');
    const [selectedMonth, setSelectedMonth] = useState(" ");
    const [months, setMonths] = useState([]);
    const [selectot, setSelectot] = useState('');
    let [history, setHistory] = useState([]);
    const [historyOrderData, setHistoryOrderData] = useState([]);
    const [selectoutlets, setSelectoutlets] = useState([]);
    let [selectedOutletname, setSelectedOutletname] = useState('');
    const [modalVisible1, setModalVisible1] = useState(false);
    const [teamLists, setTeamLists] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState(null);


    useEffect(() => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();

        const currentMonthShort = currentDate.toLocaleString('default', { month: 'short' });
        const currentMonthFull = currentDate.toLocaleString('default', { month: 'long' });

        const prevDate = new Date(currentDate);
        prevDate.setMonth(currentMonthIndex - 1);
        const previousMonthShort = prevDate.toLocaleString('default', { month: 'short' });
        const previousMonthFull = prevDate.toLocaleString('default', { month: 'long' });

        const formattedMonths = [
            { label: previousMonthFull, value: previousMonthShort },
            { label: currentMonthFull, value: currentMonthShort },
        ];

        setMonths(formattedMonths);
        setSelectedMonth(currentMonthShort); // default
        handleMonthSelection(currentMonthShort); // default call
    }, []);

    const handleMonthSelection = (month) => {
        if (!selectoutlets) {
            Alert.alert(
                "Please Select Outlet",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
            return;
        }
        setSelectedMonth(month);


        const currentYear = moment().year();
        const monthsAbbrev = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = monthsAbbrev.indexOf(month);

        if (monthIndex === -1) {
            console.warn("Invalid month selected:", month);
            return;
        }

        const fromDate = moment(`${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}-01`).format("YYYY-MM-DD");
        const toDate = moment(fromDate).endOf("month").format("YYYY-MM-DD");

        // Call the OrderHistory_MIS API only if valid dates exist
        if (fromDate && toDate) {
            ActivityHistory_MIS(fromDate, toDate);
        } else {
            console.error("Error: Invalid dates generated.");
        }
    };


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

    useEffect(() => {
        console.log("Updated teamLists:", teamLists);
    }, [teamLists]);



    const selectBeat = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);
            const empIdToUse = selectedTeamId || empid[0].emp_id;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ "empID": empIdToUse });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://crm.romsons.com:8080/SelectedBeat", requestOptions);
            const result = await response.json();

            if (result.data.length > 0) {
                setSelectedBeat(result.data.map(beat => ({ beat_id: beat.beat_id, beat_name: beat.beat_name })));
            } else {
                setSelectedBeat([]);
            }

            setBeatModalVisible(true);
        } catch (error) {
            console.error("Error fetching beats:", error);
        }
    };


    const handleBeatSelect = (beat) => {
        setSelectbtname(beat.beat_name);
        setSelectbtid(beat.beat_id);
        console.log("Selected Beat Name:", beat.beat_name);
        console.log("Selected Beat ID:", beat.beat_id);
        setBeatModalVisible(false);
    };

    const selectOutlet = async () => {
        console.log('Selected Beat ID:', selectbtid);

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ "BeatID": selectbtid });
            console.log('Request Body:', raw);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://crm.romsons.com:8080/SelectOutlet_OrderHistory", requestOptions);
            const result = await response.json();

            if (result.error === false) {
                setSelectoutlets(result.data);
                setOutletModalVisible(true);
            }
        } catch (error) {
            console.error("Error fetching outlets:", error);
        }
    };

    const handleOutletSelect = (outletId, outletName) => {
        setSelectot(outletId);
        setSelectedOutletname(outletName);
        setOutletModalVisible(false);
    };

    const ActivityHistory_MIS = async (fromDate, toDate) => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "fromDate": fromDate,
                "toDate": toDate,
                "Outletid": selectot,
                "enterBy": selectedTeamId || empid[0].emp_id
            });

            console.log('Request payload:', raw);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://crm.romsons.com:8080/ActivityHistory_MIS", requestOptions);
            const result = await response.json();

            console.log('API Response:', result);

            if (result?.error === false) {
                console.log('Order history data:', result.data);
                setHistoryOrderData(result.data);
            } else {
                console.log('No data found for the selected period');
                setHistoryOrderData([]);
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
        }
    };

    return (
        <View style={ActivityHistoryStyles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 50 }}>
                <TouchableOpacity style={[ActivityHistoryStyles.pendingButton, { marginRight: 10 }]} onPress={openModal}>
                    <Text style={ActivityHistoryStyles.pendingText}>Team</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[ActivityHistoryStyles.pendingButton, { marginRight: 10 }]} onPress={selectBeat}>
                    <Text style={ActivityHistoryStyles.pendingText}>Beat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ActivityHistoryStyles.pendingButton}
                    onPress={() => {
                        if (!selectbtid) {
                            alert("Firstly Select Beat");
                        } else {
                            selectOutlet(selectbtid);
                        }
                    }}
                >
                    <Text style={ActivityHistoryStyles.pendingText}>Outlet</Text>
                </TouchableOpacity>

            </View>




            <Modal
                animationType="slide"
                transparent={true}
                visible={isBeatModalVisible}
                onRequestClose={() => setBeatModalVisible(false)}
            >
                <View style={ActivityHistoryStyles.modalOverlay}>
                    <View style={ActivityHistoryStyles.modalContainer}>
                        <Text style={ActivityHistoryStyles.modalTitle}>Select Beat</Text>
                        <View style={ActivityHistoryStyles.divider} />

                        {selectedBeat.length > 0 ? (
                            selectedBeat.map((beat, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={ActivityHistoryStyles.dateContainer}
                                    onPress={() => handleBeatSelect(beat)}
                                >
                                    <Text style={ActivityHistoryStyles.dateText}>{beat.beat_name}</Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={ActivityHistoryStyles.dateText}>No Beats Available</Text>
                        )}

                        {/* Close Button */}
                        <TouchableOpacity
                            style={ActivityHistoryStyles.closeButton}
                            onPress={() => setBeatModalVisible(false)}
                        >
                            <Text style={ActivityHistoryStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



            <Text style={ActivityHistoryStyles.selectedText}>Selected Beat :
                <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>
                    {selectbtname}
                </Text>
            </Text>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isOutletModalVisible}
                onRequestClose={() => setOutletModalVisible(false)}
            >
                <View style={ActivityHistoryStyles.modalOverlay}>
                    <View style={ActivityHistoryStyles.modalContainer}>
                        <Text style={ActivityHistoryStyles.modalTitle}>Select Outlet</Text>
                        <View style={ActivityHistoryStyles.divider} />

                        <ScrollView>
                            {selectoutlets.length > 0 ? (
                                selectoutlets.map((outlet, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={ActivityHistoryStyles.dateContainer}
                                        onPress={() => handleOutletSelect(outlet.outlet_id, outlet.outlet_name)}
                                    >
                                        <Text style={ActivityHistoryStyles.dateText}>{outlet.outlet_name}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text style={ActivityHistoryStyles.dateText}>Firstly Select Beat</Text>
                            )}
                        </ScrollView>

                        <TouchableOpacity
                            style={ActivityHistoryStyles.closeButton}
                            onPress={() => setOutletModalVisible(false)}
                        >
                            <Text style={ActivityHistoryStyles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {selectedTeam && (
                <Text style={ActivityHistoryStyles.selectedTeamText}>{selectedTeam}</Text>
            )}
            <Modal
                transparent={true}
                visible={modalVisible1}
                animationType="fade"
                onRequestClose={() => setModalVisible1(false)}
            >
                <View style={ActivityHistoryStyles.modalOverlay4}>
                    <View style={ActivityHistoryStyles.dropdownContainer4}>

                        {/* Beautiful Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible1(false)}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: '#f2f2f2',
                                justifyContent: 'center',
                                alignItems: 'center',
                                elevation: 5, // for Android shadow
                                shadowColor: '#000', // for iOS shadow
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>×</Text>
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
                                            style={ActivityHistoryStyles.option4}
                                            onPress={() => {
                                                setSelectedTeam(team.reporting_person_name);
                                                setSelectedTeamId(team.emp_id);
                                                setModalVisible1(false);
                                            }}

                                        >
                                            <Text style={ActivityHistoryStyles.optionText4}>
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


            <Text style={ActivityHistoryStyles.selectedText}>
                Selected Outlet:
                <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>
                    {selectedOutletname}
                </Text>
            </Text>




            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <HomeDropDown
                    value={selectedMonth}
                    setValue={handleMonthSelection}
                    data={months}
                    placeholder="Choose Month"
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
                <View style={{ flex: 1, padding: 0 }}>
                    {historyOrderData && Object.keys(historyOrderData).length > 0 ? (
                        Object.entries(historyOrderData).map(([date, activities]) => {
                            return (
                                <View key={date}>
                                    {/* Date Header */}
                                    <View style={ActivityHistoryStyles.infoContainer}>
                                        <Text style={ActivityHistoryStyles.hospitalText}>{date}</Text>
                                    </View>

                                    {/* Activity Data */}
                                    {activities.map((res, ind) => (
                                        <View key={ind}
                                            style={{
                                                marginTop: 16,
                                                padding: 12,
                                                backgroundColor: '#ffffff',
                                                borderRadius: 8,
                                                shadowColor: '#000',
                                                shadowOpacity: 0.1,
                                                shadowRadius: 4,
                                                shadowOffset: { width: 0, height: 2 },
                                                elevation: 3,
                                            }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>Customer Name: </Text>
                                                <Text style={{ color: 'green', fontSize: 12 }}>{res.hospital_customer_name} ({res.user_type})</Text>
                                            </Text>

                                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>SKU Name: </Text>
                                                <Text style={{ color: 'green', fontSize: 13 }}>{res.sku_name}</Text>
                                            </Text>

                                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>Remarks: </Text>
                                                <Text style={{ color: 'green', fontSize: 13 }}>{res.remark}</Text>
                                            </Text>

                                            {res.follow_up && !isNaN(new Date(res.follow_up).getTime()) && (
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                                                    <Text style={{ color: 'black', fontSize: 13 }}>Follow Up: </Text>
                                                    <Text style={{ color: 'green', fontSize: 13 }}>
                                                        {new Date(res.follow_up).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </Text>
                                                </Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            );
                        })
                    ) : (
                        <Text style={ActivityHistoryStyles.skuText}>No Data Available</Text>
                    )}
                </View>
            </ScrollView>

        </View>
    );
};


export default ActivityHistoryScreen