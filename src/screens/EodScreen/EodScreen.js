import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal, Alert, Linking } from 'react-native';
import { SH, SF } from '../../utils';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../../utils';
import { EodStyle } from '../../styles/EodStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import RNFS from "react-native-fs";
// import Share from 'react-native-share';


const EodScreen = () => {
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const [eodData, setEodData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(Moment().format('YYYY-MM-DD')); // Default is current date
    let [imageUri, setImageUri] = useState('')
    let [activitydata, setActivitydata] = useState([]);
    let [punchinDates, setPunchinDates] = React.useState([]);
    let [dates, setDates] = React.useState([]);
    const [eodreturnData, setEodreturnData] = useState([]);
    const [eodreturnDate, setEodreturnDate] = useState([]);
    let [statuspunch, setStatuspunch] = useState([]);
    let [activitydatas, setActivitydatas] = useState([]);
    let [flagDate, setFlagDate] = React.useState([]);
    const EodStyles = useMemo(() => EodStyle(currentColors), [currentColors]);
    const viewShotRef = useRef(null);



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        EodNotpunchin();
    };

    const captureScreenAndShare = async () => {
        try {
            // Take a screenshot
            const uri = await viewShotRef.current.capture();

            // Convert image to base64
            const base64Data = await RNFS.readFile(uri, "base64");

            // Fetch API data
            const apiData = await flag();

            // Prepare WhatsApp message with API data
            const message = `Attendance Report:\nDate: ${Moment(flagDate).format('YYYY-MM-DD')}`;

            // Share via WhatsApp
            const shareOptions = {
                message: message,
                url: `data:image/png;base64,${base64Data}`,
                social: Share.Social.WHATSAPP,
            };

            await Share.shareSingle(shareOptions);
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to share screenshot!");
        }
    };


    // Modified flag() function to return API data
    const flag = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "punchdate": Moment(flagDate).format('YYYY-MM-DD'),
                "enterBy": empid[0].emp_id
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://crm.romsons.com:8080/EodShareUpdate", requestOptions);
            const result = await response.json();

            // Return API data to use in WhatsApp message
            return result;

        } catch (error) {
            throw new Error("API Error: " + error.message);
        }
    };




    const statusAttendance = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EODAttendance", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //result, 'punchhhhhhhh');
                if (result.error == false) {
                    //"puchhhiiii", result.data);
                    setStatuspunch(result.data)

                }

            })
            .catch((error) => console.error(error));
    }

    //today complete return
    const Eodreturndata = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodReturn", requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (!result.error) {
                    setEodreturnData(result.data);
                }
            })
            .catch((error) => console.error("Fetch Error:", error));

    }

    //date complete wise return
    const EodDateReturndata = async (dd) => {
        //"hey")
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id,
            "enterDate": Moment(dd).format('YYYY-MM-DD')
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodReturnbutton", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //result,"result Line 189");

                if (!result.error) {
                    setEodreturnData(result.data);
                }
            })
            .catch((error) => console.error("Fetch Error:", error));

    }


    //today date wise return
    const Eodreturndate = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodDateReturn", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //result, 'returndatataat');
                if (!result.error) {
                    //'dataaa', result.data);
                    setEodreturnDate(result.data)
                }

            })
            .catch((error) => console.error(error));
    }

    //date wise date

    const EodDateWiseReturndate = async (dd) => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id,
            "enterDate": Moment(dd).format('YYYY-MM-DD')
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodDateReturnbutton", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //result, 'returndatataat');

                if (!result.error) {
                    //'dataaa', result.data);
                    setEodreturnDate(result.data)
                    EodDateReturndata(dd);
                }

            })
            .catch((error) => console.error(error));
    }

    //date wise
    const activitydatebutton = async (dd) => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "enterDate": Moment(dd).format('YYYY-MM-DD'),
            "enterBy": empid[0].emp_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://crm.romsons.com:8080/EODActivityDatebutton", requestOptions)
            .then(response => response.text())
            .then(result => {

                let parsedResult = JSON.parse(result);
                if (parsedResult.error === false) {

                    //"Attendance poojajaj:", parsedResult.data);
                    setActivitydata(parsedResult.data);
                    activityDatabutton(dd);
                } else {
                    console.error("API returned an error:", parsedResult.data || "Unknown error");
                }
            })
            .catch(error => console.log('error', error));
    }

    const activityDatabutton = async (dd) => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "enterDate": Moment(dd).format('YYYY-MM-DD'),
            "enterBy": empid[0].emp_id
        });
        //raw, " activityDatabutton");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://crm.romsons.com:8080/ActivityDatabutton", requestOptions)
            .then(response => response.text())
            .then(result => {
                let parsedResult = JSON.parse(result);

                //parsedResult,"parsedResult");

                if (parsedResult.error === false) {
                    setActivitydatas(parsedResult.data);  // Set state with fetched data
                } else {
                    console.error("Error in API response:", parsedResult.message);
                }
            })
            .catch(error => console.log('error', error));
    }

    ///


    // today date order date
    const EodTodayOrderDate = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "enterBy": empid[0].emp_id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://crm.romsons.com:8080/EodDate", requestOptions);
            const result = await response.json();

            if (result.error === false) {
                setDates(result.data);
                // EodData();
            } else {
                console.error("Error fetching data:", result.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // today order date
    const EodTodayOrderData = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodOrder", requestOptions)
            .then((response) => response.json())  // Convert response to JSON
            .then((result) => {

                //result, 'API result');
                if (result && !result.error) {

                    //"Attendance Data:", result.data);
                    setEodData(result.data);
                } else {
                    console.error("Error in API response:", result);
                }
            })
            .catch((error) => console.error("Fetch error:", error));
    };


    //today activity
    const EodTodayactivity = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EODActivityDate", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                //result, 'API result');
                const parsedResult = JSON.parse(result);
                if (parsedResult.error === false) {
                    //"Attendance poojajaj:", parsedResult.data);
                    setActivitydata(parsedResult.data);
                } else {
                    console.error("API returned an error:", parsedResult.message || "Unknown error");
                }
            })
            .catch((error) => console.error("Error:", error));
    };


    //today activity data
    const Eodactivitydata = async () => {
        //"hey i'm not date");

        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "enterBy": empid[0].emp_id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://crm.romsons.com:8080/ActivityData", requestOptions);
            const result = await response.json();  // Parse JSON response


            if (result.error === false) {
                setActivitydatas(result.data);  // Set state with fetched data
            } else {
                console.error("Error in API response:", result.message);
            }
        } catch (error) {
            console.error("API request failed:", error);
        }
    };




    const EodNotpunchin = async () => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodNotPunchIn", requestOptions)
            .then((response) => response.json()) // Ensure JSON response
            .then((result) => {
                //"API Response:", result);
                if (!result.error) {
                    //"Setting punchinDates:", result.data);
                    setPunchinDates(result.data);
                }
            })
            .catch((error) => console.error("Fetch error:", error));

    }

    //date wise data
    const Eodorderbutton = async (dd) => {

        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id,
            "enterDate": Moment(dd).format('YYYY-MM-DD')
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodDatebutton", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                //result,"==========>Line 471")
                let results = JSON.parse(result);
                if (results.error === false) {

                    setDates(results.data);
                    Eodorderdatabutton(dd);
                    // EodData();
                } else {
                    console.error("Error fetching data:", results.data);
                }

            })
            .catch((error) => console.error(error));
    }

    //date wise order
    const Eodorderdatabutton = async (dd) => {
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id,
            "enterDate": Moment(dd).format('YYYY-MM-DD')
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EodOrderbutton", requestOptions)
            .then((response) => response.json()) // Parse JSON instead of text
            .then((result) => {
                if (result && !result.error) {
                    //"Attendance Data:", result.data);
                    setEodData(result.data);
                } else {
                    console.error("Error in API response:", result);
                }
            })
            .catch((error) => console.error("Error in fetch:", error));

    }


    useEffect(() => {
        EodTodayOrderDate();//today  order date
        EodTodayOrderData(); // today order data
        EodTodayactivity(); // today activity
        Eodactivitydata(); //today data

        statusAttendance();
        Eodreturndata();
        Eodreturndate();
        // Eodorderdatabutton();
        // Eodall();
    }, []);

    const handlePunchinPunchoutData = async (dd) => {
        // EODAttendancebutton api
        const user = await AsyncStorage.getItem('userInfor');
        const empid = JSON.parse(user);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "enterBy": empid[0].emp_id,
            "enterDate": Moment(dd).format('YYYY-MM-DD')
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://crm.romsons.com:8080/EODAttendancebutton", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //result, 'punchhhhhhhh');
                if (result.error == false) {
                    //"puchhhiiii", result.data);
                    setStatuspunch(result.data)

                }

            })
            .catch((error) => console.error(error));
    }

    ///date wise data

    const dateWiseData = async (date) => {
        setModalVisible(!isModalVisible);
        setFlagDate(date)
        activitydatebutton(date);
        Eodorderbutton(date);
        EodDateWiseReturndate(date);
        handlePunchinPunchoutData(date)


    }


    return (

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <ViewShot
                ref={viewShotRef}
                options={{
                    format: 'png',
                    quality: 1,
                    // result: 'tmpfile',
                    width: 1080,
                    height: 1920
                }}
            >

                <View style={EodStyles.container}>
                    {/* Pending EOD Button */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={EodStyles.pendingButton} onPress={toggleModal}>
                            <Text style={EodStyles.pendingText}>Pending EOD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={captureScreenAndShare}>
                            <Icon name="share" size={30} color="#000" />

                        </TouchableOpacity>

                    </View>

                    {/* Date Display */}
                    <>
                        <Text style={EodStyles.dateText1}>{Moment(flagDate).format('DD-MMM-YYYY')}</Text>


                        {statuspunch.map((res, ind) => (
                            <View style={EodStyles.datesContainer} key={ind}>
                                <Text style={EodStyles.dateText1}>
                                    {Moment(res.punch_in).format(' hh:mm:ss a')}
                                </Text>
                                <Text style={EodStyles.dateText1}>
                                    {res.punch_out ? Moment(res.punch_out).format(' hh:mm:ss a') : 'Not punched out'}
                                </Text>
                            </View>
                        ))}




                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={isModalVisible}
                            onRequestClose={toggleModal}
                        >
                            <View style={EodStyles.modalOverlay}>
                                <View style={EodStyles.modalContainer}>
                                    <Text style={EodStyles.modalTitle}>Select Pending EOD Date</Text>
                                    <View style={EodStyles.divider} />

                                    {/* Date Container */}
                                    {punchinDates.map((res, ind) => (
                                        <TouchableOpacity style={EodStyles.dateContainer} key={ind} onPress={() => { dateWiseData(res.punch_date) }}>
                                            <Text style={EodStyles.dateText}>
                                                {Moment(res.punch_date).format('DD-MMM-YYYY')}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}


                                    {/* Close Button */}
                                    <TouchableOpacity
                                        style={EodStyles.closeButton}
                                        onPress={toggleModal}
                                    >
                                        <Text style={EodStyles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* Hospital Info */}
                        {dates
                            ?.filter(
                                (res, index, self) =>
                                    index === self.findIndex((item) => item.outlet_id === res.outlet_id)
                            ) // Filter to remove duplicates based on outlet_id
                            .map((res, ind) => {
                                // Filter data for the current outlet_id
                                const outletData = eodData?.filter((item) => item.outlet_id === res.outlet_id);

                                // Calculate total amount for the filtered data
                                const totalAmount = outletData?.reduce((sum, item) => sum + (item.order_amt || 0), 0);

                                return (
                                    <View key={ind}>
                                        {/* Outlet Info */}
                                        <View style={EodStyles.infoContainer}>
                                            <Text style={EodStyles.hospitalText}>
                                                {res.outlet_id}, {res.outlet_name || 'N/A'}
                                            </Text>
                                        </View>

                                        {/* Order Info */}
                                        <View style={EodStyles.orderContainer}>
                                            <Text style={EodStyles.orderType}>Type: Order</Text>
                                            <Text style={EodStyles.orderId}>OrderID: {res.order_id || 'N/A'}</Text>
                                        </View>
                                        <View style={EodStyles.orderContainer}>
                                            <Text style={EodStyles.orderType}>Call Status</Text>
                                            <Text style={EodStyles.orderId}>
                                                {res.call_type ? res.call_type : 'N/A'} ({res.joined_name ? res.joined_name : 'N/A'})
                                            </Text>

                                        </View>

                                        <View style={EodStyles.orderContainer}>
                                            <Text style={EodStyles.orderType}>Dealer Name</Text>
                                            <Text style={EodStyles.orderId}>
                                                {res.dealer_name ? res.dealer_name : 'N/A'}
                                            </Text>

                                        </View>

                                        {/* SKU Data */}
                                        <View style={EodStyles.skuContainer}>
                                            <View style={EodStyles.skuHeaderRow}>
                                                <Text style={EodStyles.skuHeaderText}>SKU Name</Text>
                                                <Text style={EodStyles.skuHeaderText}>Unit Price</Text>
                                                <Text style={EodStyles.skuHeaderText}>Unit</Text>
                                                <Text style={EodStyles.skuHeaderText}>Amount</Text>
                                            </View>

                                            {outletData?.map((item, index) => (
                                                <View key={index} style={EodStyles.skuDataRow}>
                                                    <Text style={EodStyles.skuText}>{item.sku_name || 'N/A'}</Text>
                                                    <Text style={EodStyles.skuText1}>{item.item_price_unit || '0'}</Text>
                                                    <Text style={EodStyles.skuText1}>{item.item_qty || '0'}</Text>
                                                    <Text style={EodStyles.skuText1}>{item.order_amt || '0'}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        {/* Total Amount */}
                                        <View style={[EodStyles.totalContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                            <Text style={EodStyles.totalText}>Total:</Text>
                                            <Text style={EodStyles.totalText}>₹{totalAmount?.toFixed(2) || '0.00'}</Text>
                                        </View>

                                    </View>
                                );
                            })}

                        {eodreturnDate
                            ?.filter((res, index, self) =>
                                index === self.findIndex((t) => t.outlet_id === res.outlet_id)
                            )
                            .map((res, ind) => {
                                const returnData = eodreturnData?.filter((t) => t.outlet_id === res.outlet_id);

                                return (
                                    <View key={ind}>

                                        <View style={EodStyles.infoContainer} key={ind}>
                                            <Text style={EodStyles.hospitalText}>
                                                {res.outlet_id}, {res.outlet_name}
                                            </Text>
                                        </View>

                                        <View style={EodStyles.orderContainer}>
                                            <Text style={EodStyles.orderType}>Type: Return</Text>
                                            {/* <Text>{JSON.stringify(eodreturnDate)}</Text> */}
                                            <Text style={EodStyles.orderId}>OrderID: {res.m_return_orderID || 'N/A'}</Text>
                                        </View>


                                        <View style={EodStyles.skuContainer}>
                                            <View style={EodStyles.skuHeaderRow}>
                                                <Text style={EodStyles.skuHeaderText}>SKU Name</Text>
                                                <Text style={EodStyles.skuHeaderText}>Unit Price</Text>
                                                <Text style={EodStyles.skuHeaderText}>Unit</Text>
                                                <Text style={EodStyles.skuHeaderText}>Amount</Text>
                                            </View>
                                            {returnData.map((res, ind) => (
                                                <View style={EodStyles.skuDataRow} key={ind}>
                                                    <Text style={EodStyles.skuText}>{res.sku_name}</Text>
                                                    <Text style={EodStyles.skuText}>{res.item_price_unit}</Text>
                                                    <Text style={EodStyles.skuText}>{res.item_qty}</Text>
                                                    <Text style={EodStyles.skuText}>{res.return_order_amt}</Text>
                                                </View>
                                            ))}
                                        </View>

                                    </View>
                                )

                            })
                        }

                        {/* Additional Info */}
                        {activitydata?.map((outlet, outletIndex) => {
                            // Filter activities for the current outlet_id
                            const activitiesForOutlet = activitydatas?.filter(
                                (activity) => activity.outlet_id === outlet.outlet_id
                            );
                            const callType = activitiesForOutlet?.length ? activitiesForOutlet[0].call_type : 'N/A';
                            const joinedName = activitiesForOutlet?.length ? activitiesForOutlet[0].joined_name : 'N/A';


                            // Skip rendering outlets with no activities
                            if (!activitiesForOutlet?.length) return null;

                            return (
                                <View key={outletIndex}>
                                    {/* Outlet Info */}
                                    <View style={EodStyles.infoContainer}>
                                        <Text style={EodStyles.hospitalText}>
                                            {outlet.outlet_id}, {outlet.outlet_name}
                                        </Text>
                                    </View>

                                    {/* Activity Type */}
                                    <View style={EodStyles.orderContainer}>
                                        <Text style={EodStyles.orderType}>Type: Activity</Text>
                                    </View>

                                    <View style={EodStyles.orderContainer}>
                                        <Text style={EodStyles.orderType}>Call Status</Text>
                                        <Text style={EodStyles.orderId}>{callType} ({joinedName})</Text>
                                    </View>


                                    {/* Activity Data */}
                                    {activitiesForOutlet.map((activity, activityIndex) => (
                                        <View
                                            style={{
                                                marginBottom: 16,
                                                padding: 12,
                                                backgroundColor: '#ffffff',
                                                borderRadius: 8,
                                                shadowColor: '#000',
                                                shadowOpacity: 0.1,
                                                shadowRadius: 4,
                                                shadowOffset: { width: 0, height: 2 },
                                                elevation: 3,
                                            }}
                                            key={activityIndex}
                                        >
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>Customer Name: </Text>
                                                <Text style={{ color: 'green', fontSize: 12 }}>{activity.hospital_customer_name}</Text>
                                            </Text>

                                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>SKU Name: </Text>
                                                <Text style={{ color: 'green', fontSize: 13 }}>{activity.sku_name}</Text>
                                            </Text>

                                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                                                <Text style={{ color: 'black', fontSize: 13 }}>Remarks: </Text>
                                                <Text style={{ color: 'green', fontSize: 13 }}>{activity.remark}</Text>
                                            </Text>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', flex: 1 }}>
                                                    <Text style={{ color: 'black', fontSize: 13 }}>Follow-up Date: </Text>
                                                    <Text style={{ color: 'green', fontSize: 12 }}>
                                                        {activity.follow_up && !isNaN(new Date(activity.follow_up).getTime())
                                                            ? new Date(activity.follow_up).toLocaleDateString('en-IN', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                            })
                                                            : ''}
                                                    </Text>
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            );
                        })}
                    </>
                </View>
            </ViewShot>
        </ScrollView>

    );
};




export default EodScreen;



