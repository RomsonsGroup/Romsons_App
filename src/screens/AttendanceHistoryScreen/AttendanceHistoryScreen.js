import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal, ScrollView, ActivityIndicator } from "react-native";
import { AttendanceHistoryStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { darkTheme, lightTheme } from "../../utils";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from "../../image";
import { Spacing, DatePicker, VectorIcon } from "../../components";

const AttendanceHistoryScreen = () => {
    const { t } = useTranslation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const AttendanceHistoryStyles = useMemo(() => AttendanceHistoryStyle(Colors), [Colors]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible1, setModalVisible1] = useState(false); // State for Modal visibility
    const [getAttendance, setGetAttendance] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(""); // Selected team name state
    const [getOrderActivity, setGetOrderActivity] = useState([]);
    const [teamLists, setTeamLists] = useState([]);
    const [fieldHours, setFieldHours] = useState("0.00"); // State to store FH
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTeamData, setShowTeamData] = useState(false);
    


    const getAttendanceHistory = async (teamData) => {
        console.log(teamData, "lione 30");

        if (!selectedDate) {
            alert("Please select date")
            console.log('No date selected!');
            return;
        }

        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        console.log('Sending emp_id:', empid[0].emp_id);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const formattedDate = selectedDate.toISOString().split('T')[0];
        const raw = JSON.stringify({
            "enterBy": (teamData == undefined || teamData == null) ? empid[0].emp_id : teamData.emp_id,
            "enter_date": formattedDate
        });

        console.log(raw, 'getAttendanceHistory');

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // console.log('Sending request with date:', formattedDate); // Log to check the date format

        fetch("https://crm.romsons.com:8080/getAttendanceHistory", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.error === false) {
                    // console.log('Attendance History:', result.data);
                    setGetAttendance(result.data);
                } else {
                    console.log('Error fetching attendance:', result.errorMessage || 'Unknown error');
                }
            })
            .catch(error => console.error(error));
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


    const openModal = async () => {


        setModalVisible1(true);
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);


        await teamList();

    };

    useEffect(() => {
        console.log("Updated teamLists:", teamLists);
    }, [teamLists]);



    const getOrderActivityData = async (teamData) => {
        if (!selectedDate) {
            console.log("No date selected!");
            return;
        }

        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formattedDate = selectedDate.toISOString().split("T")[0];

        const raw = JSON.stringify({
            enterBy: teamData == undefined || teamData == null ? empid[0].emp_id : teamData.emp_id,
            enter_date: formattedDate,
        });

        console.log(raw, "getOrderActivityData");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        try {
            const response = await fetch("https://crm.romsons.com:8080/getOrdersAndActivitiesByDate", requestOptions);
            const result = await response.json();

            if (result.error === false) {
                // Convert "03:09 PM" format to 24-hour time
                const parseTime = (timeStr) => {
                    const [time, modifier] = timeStr.split(" ");
                    let [hours, minutes] = time.split(":");
                    if (modifier === "PM" && hours !== "12") {
                        hours = String(Number(hours) + 12);
                    } else if (modifier === "AM" && hours === "12") {
                        hours = "00";
                    }
                    return `${hours}:${minutes}`;
                };

                // Convert date strings to JavaScript Date objects
                const timeArray = result.data.map(item => {
                    const parsedTime = parseTime(item.date); // Convert to 24-hour format
                    return new Date(`${formattedDate}T${parsedTime}:00`);
                });

                if (timeArray.length > 0) {
                    const minTime = new Date(Math.min(...timeArray));
                    const maxTime = new Date(Math.max(...timeArray));
                
                    const durationInMinutes = Math.floor((maxTime - minTime) / (1000 * 60));
                    const hours = Math.floor(durationInMinutes / 60);
                    const minutes = durationInMinutes % 60;
                
                    const formattedDuration = `${hours} hr ${minutes} min`;
                
                    console.log("Total Field Duration:", formattedDuration);
                    setFieldHours(formattedDuration);
                } else {
                    console.log("No time data available.");
                }

                // Fetch addresses for each item
                const updatedData = await Promise.all(
                    result.data.map(async (item) => {
                        const address = await getAddress(item.lat, item.lng);
                        return { ...item, address }; // Update item with fetched address
                    })
                );

                setGetOrderActivity(updatedData);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const getAddress = async (lat, long) => {
        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyC4cMHPr8PdH18gyzIJ6YMlTJSHEDGwvNM`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                return data.results[0].formatted_address;
            }
            return "Address not found";
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Error fetching address";
        }
    };



    // Fetch Data on Date Selection
    useEffect(() => {
        if (selectedDate) {
            getAttendanceHistory(selectedTeamData ? selectedTeamData : undefined);
            getOrderActivityData(selectedTeamData ? selectedTeamData : undefined);
        }
    }, [selectedDate]);

    // const calculateFieldingHours = (activities) => {
    //     if (activities.length === 0) return "0h 0m"; // No data case

    //     // Sabhi time ko minutes me convert karo
    //     const timesInMinutes = activities.map(res => {
    //         const [time, modifier] = res.date.split(" "); // "10:02 AM" => ["10:02", "AM"]
    //         let [hours, minutes] = time.split(":").map(Number); // "10:02" => [10, 2]

    //         // AM/PM ka conversion
    //         if (modifier === "PM" && hours !== 12) hours += 12;
    //         if (modifier === "AM" && hours === 12) hours = 0;

    //         return hours * 60 + minutes; // Convert to total minutes
    //     });

    //     // First & last time entry find karo
    //     const minTime = Math.min(...timesInMinutes); // Sabse pehla time
    //     const maxTime = Math.max(...timesInMinutes); // Sabse last time

    //     // Total Fielding Time Calculate Karo
    //     const totalMinutes = maxTime - minTime;
    //     const h = Math.floor(totalMinutes / 60);
    //     const m = totalMinutes % 60;

    //     return `${h}h ${m}m`; // Short format
    // };


    const [selectedTeamData, setSelectedTeamData] = useState(null); // Store selected team object

    const teamData = async (team) => {
        console.log("Selected team data:", team);
        setSelectedTeamData(team); // Store selected team data
        await getAttendanceHistory(team);
        await getOrderActivityData(team);
    };

    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.toLocaleString('en-us', { month: 'short' })}-${date.getFullYear()}`;

    // Handle Date Change 
    const handleDateChange = (event, newDate) => {
        if (newDate) {
            setSelectedDate(newDate);

            // Call functions with selected team's emp_id (if available)
            getAttendanceHistory(selectedTeamData ? selectedTeamData : undefined);
            getOrderActivityData(selectedTeamData ? selectedTeamData : undefined);
        }
        setShowDatePicker(false);
    };


    const renderItem = ({ item }) => (
        <View style={AttendanceHistoryStyles.PaddingHorizontal}>
            {/* Card for Punch Out */}
            <View style={AttendanceHistoryStyles.taskContainer}>
                <View style={AttendanceHistoryStyles.taskDetails}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.punch_out}</Text>

                        {/* Vertical Divider */}
                        <View style={{ height: '90%', width: 1, backgroundColor: 'gray', marginHorizontal: 10 }} />

                        <Text style={AttendanceHistoryStyles.taskName}>Punch Out</Text>
                    </View>

                    <Spacing space={5} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={AttendanceHistoryStyles.taskDate}>{item.out_address}</Text>
                    </View>
                </View>
            </View>


            {getOrderActivity.map((res, ind) => (
                <View key={ind} style={AttendanceHistoryStyles.taskContainer}>
                    <View style={AttendanceHistoryStyles.taskDetails}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{res.date}</Text>

                            {/* Vertical Divider */}
                            <View style={{ height: '90%', width: 1, backgroundColor: 'gray', marginHorizontal: 6 }} />

                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={AttendanceHistoryStyles.taskName}>
                                    {res.outlet_name} ({res.source})
                                </Text>
                            </View>


                        </View>
                        <Spacing space={5} />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={AttendanceHistoryStyles.taskDate}>{res.address}</Text>
                        </View>
                    </View>
                </View>
            ))}

            {/* Card for Punch In */}
            <View style={AttendanceHistoryStyles.taskContainer}>
                <View style={AttendanceHistoryStyles.taskDetails}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.punch_in}</Text>

                        {/* Vertical Divider */}
                        <View style={{ height: '90%', width: 1, backgroundColor: 'gray', marginHorizontal: 10 }} />

                        <Text style={AttendanceHistoryStyles.taskName}>Punch In</Text>
                    </View>

                    <Spacing space={5} />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={AttendanceHistoryStyles.taskDate}>{item.in_address}</Text>
                    </View>
                </View>
            </View>
        </View>
    );





    return (
        <View style={AttendanceHistoryStyles.container}>
            <View style={AttendanceHistoryStyles.profileSection}>
                <Image
                    resizeMode='contain'
                    source={images.Image_3}
                    style={AttendanceHistoryStyles.profileImage}
                />
            </View>
            <Spacing space={20} />
            <View style={AttendanceHistoryStyles.PaddingHorizontal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[AttendanceHistoryStyles.ongoingTaskText, { fontSize: 15 }]}>
                        Team:
                    </Text>

                    {/* Button next to Manager Team */}
                    <TouchableOpacity style={AttendanceHistoryStyles.button} onPress={openModal}>
                        <Text style={AttendanceHistoryStyles.buttonText}>Select Team</Text>

                    </TouchableOpacity>
                    <Text style={{ color: 'brown', fontSize: 12, fontWeight: 'bold' }}> {selectedTeam}</Text>


                </View>

                <Modal
                    transparent={true}
                    visible={modalVisible1}
                    animationType="fade"
                    onRequestClose={() => setModalVisible1(false)}
                >
                    <View style={AttendanceHistoryStyles.modalOverlay4}>
                        <View style={AttendanceHistoryStyles.dropdownContainer4}>
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
                      elevation: 10,
                      zIndex: 999, // ensure it's above all other elements
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>×</Text>
                  </TouchableOpacity>
                            {loading ? (
                                <ActivityIndicator size="medium" color="#0000ff" />
                            ) : (
                                <ScrollView>
                                    {teamLists.length > 0 ? (
                                        teamLists.map((team, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={AttendanceHistoryStyles.option4}
                                                onPress={async () => {
                                                    // console.log("Selected team:", team.reporting_person_name);
                                                    setSelectedTeam(team.reporting_person_name);
                                                    await teamData(team)
                                                    setModalVisible1(false);
                                                }}
                                            >
                                                <Text style={AttendanceHistoryStyles.optionText4}>{team.reporting_person_name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text style={{ textAlign: "center", padding: 10 }}>
                                            No Dealers Available
                                        </Text>
                                    )}
                                </ScrollView>
                            )}
                        </View>
                    </View>
                </Modal>

                <Spacing space={10} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={AttendanceHistoryStyles.ongoingTaskText}>{t("History")}</Text>

                    {/* Display selected date */}
                    {/* <Text style={[AttendanceHistoryStyles.ongoingTaskText, { marginLeft: 30, fontSize: 13 }]}>
                        {formattedDate}
                    </Text> */}

                    <View style={{ flex: 1, marginLeft: 35 }}>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)} // Open date picker
                            style={AttendanceHistoryStyles.taskTime1}
                        >
                            <Text style={AttendanceHistoryStyles.dateButtonText}>
                                <Text style={{ fontSize: 20 }}>📅 </Text>
                                <Text style={{ fontSize: 12 }}>
                                    {selectedDate.toLocaleDateString()}
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Date Picker */}
                        {showDatePicker && (
                            <View style={{ alignItems: 'flex-end' }}>
                                <DateTimePicker
                                    value={selectedDate || new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            </View>
                        )}
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                        <Text style={{ color: 'gray' }}>FH :</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}> {fieldHours}</Text>
                    </View>
                </View>
            </View>

            <Spacing space={20} />
            <FlatList
                data={getAttendance}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id ? item.id.toString() : `${item.emp_id}-${index}`}
            />


        </View>


    );
};


export default AttendanceHistoryScreen;