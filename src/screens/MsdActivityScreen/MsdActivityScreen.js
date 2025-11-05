import React, { useEffect, useMemo, useState, useRef } from "react";
import { ApprovalStyle } from '../../styles/ApprovalStyle';
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import { Platform, PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { OrderStyle } from '../../styles/OrderStyle';
import { Button, Input, Spacing, DatePicker, VectorIcon, HomeDropDown } from '../../components';
import { MsdActivityStyle } from '../../styles/MsdActivityStyle';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';  // Import FlatList
import { darkTheme, lightTheme } from "../../utils";
import { useTranslation } from "react-i18next";
import Geolocation from '@react-native-community/geolocation';
import { RouteName } from '../../routes';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/MaterialIcons";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import { msdActivity, setResetMsdActivity } from "../../redux/action/orderActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../../config/api_url';

const MsdActivityScreen = ({ route }) => {
    const { customer_name, customer_contact_no, hospital_name, outlet_category_name, outlet_id, customer_department, user_type } = route.params;
    const { outletDetail } = route.params; // Assuming outletDetail is passed in route.params
    const { callerName, callType, reportingTo } = outletDetail || {};
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(null);
    const dispatch = useDispatch();
    const ApprovalStyles = useMemo(() => ApprovalStyle(Colors), [Colors]);
    const OrderStyles = useMemo(() => OrderStyle(Colors), [Colors]);
    const msdActivityData = useSelector((state) => state.order.msdActivityData || []);
    const MsdActivityStyles = useMemo(() => MsdActivityStyle(Colors), [Colors]);
    const [selectedFilter, setSelectedFilter] = useState('Activity');
    const [selectedService, setSelectedService] = useState({});
    const [services, setServices] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [Itemlist, setItemlist] = useState([]);
    const [dates, setDates] = useState([]);
    const [fromDate, setFromDate] = useState(new Date());
    const viewShotRef = useRef(null);
    const [dummy, setDummy] = useState(false);

    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');


    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, [dummy]);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            (position) => {
                setLocationStatus('You are Here');
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
    
                setCurrentLongitude(currentLongitude);
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    useEffect(() => {
        skuListHospital();
        activity();
    }, []);


    const captureAndShare = async () => {
        try {
            const uri = await viewShotRef.current.capture();  // Screenshot Capture
            const shareOptions = {
                title: "Order Summary",
                message: "Here is the Activity Summary:",
                url: `file://${uri}`,  // Local Image Path
                social: Share.Social.WHATSAPP,
            };
            await Share.shareSingle(shareOptions);  // Share via WhatsApp
        } catch (error) {
            console.error("Sharing failed:", error);
        }
    };


    const handleDateChange = (event, selectedDate, skuId) => {
        if (selectedDate) {
            setDates((prevDates) => ({
                ...prevDates,
                [skuId]: selectedDate,
            }));
        }

        setShowDatePicker(null); // Close the date picker
    };

    const fetchLocation = () => {
        getOneTimeLocation();   // yahin call karo
        setTimeout(() => {
            if (currentLatitude !== '...' && currentLongitude !== '...') {
                Alert.alert("Success", "Location fetch successfully, Please submit your activity.");
            } else {
                Alert.alert("Error", "Please turn on location and try again.");
            }
        }, 2000);
    };
    

    const msdActivitySubmit = async () => {
        if (isSubmitting) return; // Prevent multiple submissions

        // 🔒 Location Validation
        if (currentLatitude === "..." || currentLongitude === "...") {
            Alert.alert("Error", "Please turn on your location and click on refresh icon.");
            // setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true); // ✅ Start loader

        try {
            const user = await AsyncStorage.getItem("userInfor");
            const empid = JSON.parse(user);

            const outlet_id = outlet_id ?? 0;

            const raw = JSON.stringify({
                activitydetails: msdActivityData,
                enterbyy: empid[0].emp_id,
                zone: empid[0].zone_id,
                joinedName: outletDetail.callerName,
                joinedcallid: outletDetail.reportingTo,
                callType: outletDetail.callType,
                div: empid[0].division,
                lat: currentLatitude,
                lag: currentLongitude
            });

            console.log(raw, 'Line 81');

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch(API_URL.MSD_ACTIVITY_URLS.ACTIVITY_HOSTIPTAL_URL, requestOptions);
            const result = await response.json();

            if (result.error === false) {
                alert(result.data);
                dispatch(setResetMsdActivity());
                navigation.navigate(RouteName.CONTACTLIST, { outletDetail });
            } else {
                alert("Something Went Wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false); // ✅ Always stop loader
        }
    };


    const activitySave = () => {
        // Check if at least one remark is selected
        const anyRemarkSelected = Itemlist.some((sku) => selectedService[sku.sku_id]);

        // Check if fromDate is selected
        if (!fromDate || !anyRemarkSelected) {
            alert('Please choose at least one remark and date before saving.');
            return;
        }

        console.log("From Date before save: ", fromDate);

        const data = Itemlist
            .filter((sku) => selectedService[sku.sku_id])
            .map((sku) => ({
                custype: user_type,
                itemId: sku.sku_id,
                sku_name: sku.sku_name,
                Outletid: outlet_id,
                customer_department: customer_department,
                segment_code: sku.segment_code,
                customername: customer_name,
                Hosname: hospital_name,
                customer_contact_no: customer_contact_no,

                value: selectedService[sku.sku_id] ?? '',         // ✅ Use sku_id as key
                followup: dates[sku.sku_id] ?? '',                // ✅ Use sku_id here too
            }));

        // Dispatch to Redux to save the data
        dispatch(msdActivity(data));
        alert('Activity saved in draft', 'Activity has been saved successfully!');
        // console.log('Saved Dataaaaa: ', data);

        // Resetting the fields
        setSelectedService({});
        setFromDate({});
    };

    const handlePickerChange = (value, skuId) => {
        setSelectedService((prev) => ({ ...prev, [skuId]: value }));
    };

    const activity = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "divid": empid[0].division
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL.MSD_ACTIVITY_URLS.OUTLET_ACTIVITY_URL, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setServices(result.data || []);
            })
            .catch((error) => console.error(error));
    }



    const skuListHospital = async () => {
        const user = await AsyncStorage.getItem("userInfor");
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "division": empid[0].division
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(API_URL.MSD_ACTIVITY_URLS.SKU_LIST_HOSTIPTAL_URL, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                let arr = JSON.parse(result);
                console.log("Fetched data:", arr.data); // Logs the fetched data in the console
                setItemlist(arr.data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Filter Buttons */}
            <View style={ApprovalStyles.filterContainer}>
                <TouchableOpacity
                    style={[
                        ApprovalStyles.filterButton,
                        selectedFilter === 'Activity' && ApprovalStyles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedFilter('Activity')}
                >
                    <Text
                        style={[
                            ApprovalStyles.filterButtonText,
                            selectedFilter === 'Activity' && ApprovalStyles.selectedFilterButtonText
                        ]}
                    >
                        {t("Activity")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        ApprovalStyles.filterButton,
                        selectedFilter === 'Summary' && ApprovalStyles.selectedFilterButton
                    ]}
                    onPress={() => setSelectedFilter('Summary')}
                >
                    <Text
                        style={[
                            ApprovalStyles.filterButtonText,
                            selectedFilter === 'Summary' && ApprovalStyles.selectedFilterButtonText
                        ]}
                    >
                        {t("Summary")}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Activity List with Scrolling using FlatList */}
            {selectedFilter === 'Activity' && Itemlist?.length > 0 && (
                <FlatList
                    data={Itemlist}
                    renderItem={({ item, index }) => (
                        <View style={MsdActivityStyles.taskContainer} key={index}>
                            <TouchableOpacity style={MsdActivityStyles.taskDetails}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}>
                                    <Text
                                        style={[MsdActivityStyles.taskDate, { flex: 2, flexShrink: 1 }]}
                                        numberOfLines={1}
                                    >
                                        {item.sku_name}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowDatePicker(showDatePicker === item.sku_id ? null : item.sku_id);
                                        }}
                                        style={MsdActivityStyles.taskTime1}
                                    >
                                        <Text style={MsdActivityStyles.dateButtonText}>
                                            <Text style={{ fontSize: 20 }}>📅 </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                {dates[item.sku_id] ? dates[item.sku_id].toLocaleDateString() : t()}
                                            </Text>
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Date Picker */}
                                    {showDatePicker === item.sku_id && (
                                        <DateTimePicker
                                            value={dates[item.sku_id] || new Date()}
                                            mode="date"
                                            display="default"
                                            minimumDate={new Date()}
                                            onChange={(event, selectedDate) => handleDateChange(event, selectedDate, item.sku_id)}
                                        />
                                    )}
                                </View>

                                <View style={MsdActivityStyles.rowContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1 }}>
                                            <HomeDropDown
                                                value={selectedService[item.sku_id] || ''}
                                                setValue={(itemValue) => handlePickerChange(itemValue, item.sku_id)}
                                                data={[
                                                    { label: 'Post Call Remarks', value: '' },
                                                    ...services.map((reason) => ({
                                                        label: reason.remarks_m,
                                                        value: reason.remarks_m,
                                                    })),
                                                ]}
                                                placeholder="Post Call Remarks"
                                                style={{ width: '100%' }}
                                            />
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.sku_id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}


            {/* Move the Save button inside the selectedFilter === 'Activity' condition */}
            {selectedFilter === 'Activity' && (
                <View style={OrderStyles.saleReturnFooterContainer}>
                    <TouchableOpacity
                        onPress={activitySave}
                        style={OrderStyles.footerButton1}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={OrderStyles.footerButtonText1}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}



            {selectedFilter === "Summary" && (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>

                    <TouchableOpacity onPress={fetchLocation}>
                        <Icon name="refresh" size={30} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={captureAndShare}>
                        <Icon name="share" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            )}
            {selectedFilter === 'Summary' && (
                <View style={{ flex: 1 }}>
                    <ViewShot ref={viewShotRef} options={{
                        format: 'png',
                        quality: 1,
                        // result: 'tmpfile',
                        width: 1080,
                        height: 1920

                    }} style={{ flex: 1, padding: 16 }}>
                        {/* Header Section */}
                        <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                <Text style={{ color: 'black' }}>Outlet Name: </Text>
                                <Text style={{ color: 'green', fontSize: 12 }}>{hospital_name}</Text>
                            </Text>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                <Text style={{ color: 'black' }}>Contact: </Text>
                                <Text style={{ color: 'green', fontSize: 12 }}>{customer_contact_no}</Text>
                            </Text>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                <Text style={{ color: 'black' }}>Call Type: </Text>
                                <Text style={{ color: '#1c3978', fontSize: 12 }}>{callerName}</Text>
                            </Text>

                        </View>

                        <View style={{ height: 1, backgroundColor: '#ddd', marginVertical: 12 }} />

                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>Activity Summary</Text>

                        <FlatList
                            data={msdActivityData}
                            renderItem={({ item, index }) => (
                                <View
                                    key={index}
                                    style={{
                                        marginBottom: 16,
                                        padding: 12,
                                        backgroundColor: '#ffffff',
                                        borderRadius: 8,
                                        shadowColor: '#000',
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        shadowOffset: { width: 0, height: 2 },
                                        elevation: 3
                                    }}
                                >

                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}> */}
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>
                                        <Text style={{ color: 'black' }}>Customer Name: </Text>
                                        <Text style={{ color: 'green', fontSize: 12, }}>{item.customername}</Text>
                                    </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                        <Text style={{ color: 'black' }}>Customer Dept: </Text>
                                        <Text style={{ color: 'green', fontSize: 12 }}>{customer_department}</Text>
                                    </Text>
                                    {/* </View> */}

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                        <Text style={{ color: 'black' }}>SKU Name: </Text>
                                        <Text style={{ color: 'green', fontSize: 13 }}>{item.sku_name}</Text>
                                    </Text>

                                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                        <Text style={{ color: 'black' }}>Remarks: </Text>
                                        <Text style={{ color: 'green', fontSize: 13 }}>{item.value}</Text>
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>
                                            <Text style={{ color: 'black' }}>Follow_up Date: </Text>
                                            <Text style={{ color: 'green', fontSize: 12 }}>
                                                {item.followup
                                                    ? new Date(item.followup).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                                    : ''}
                                            </Text>
                                        </Text>
                                    </View>


                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </ViewShot>
                </View>
            )}

            {selectedFilter === 'Summary' && (
                <View style={OrderStyles.saleReturnFooterContainer}>
                    <TouchableOpacity
                        style={[OrderStyles.footerButton1, isSubmitting && { opacity: 0.5 }]}
                        activeOpacity={0.7}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        onPress={msdActivitySubmit}
                        disabled={isSubmitting} // Disable button when submitting
                    >
                        <Text style={OrderStyles.footerButtonText1}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Text>
                    </TouchableOpacity>

                </View>
            )}


        </View>
    );
};

export default MsdActivityScreen;
