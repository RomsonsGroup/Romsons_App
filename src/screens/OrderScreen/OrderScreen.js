import React, { useEffect, useMemo, useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, FlatList, Alert } from "react-native";
import { Spacing, Button, HomeDropDown } from '../../components';
import { ApprovalStyle } from "../../styles";
import { Platform, PermissionsAndroid } from 'react-native';
import { useTranslation } from "react-i18next";
import { OrderStyle } from '../../styles/OrderStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { darkTheme, lightTheme, SH } from "../../utils";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import { RouteName } from '../../routes';
import { setOrder, setSaleReturn, setResetOrder, setResetReturn } from "../../redux/action/orderActions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from '@react-native-picker/picker';
import { PickerIOS } from './PickerIOS';
import { Divider } from "react-native-elements";

const OrderScreen = ({ route }) => {
  const { outletDetail } = route.params || {};
  const { callerName } = outletDetail;
  const { callType } = outletDetail;
  const { reportingTo } = outletDetail;
  const { dealerName } = outletDetail;
  const { dealerId } = outletDetail;
  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const orderData = useSelector((state) => state.order.orderData || []);
  const saleReturnData = useSelector((state) => state.order.saleReturnData || []);
  const ApprovalStyles = useMemo(() => ApprovalStyle(Colors), [Colors]);
  const OrderStyles = useMemo(() => OrderStyle(Colors), [Colors]);
  const { t } = useTranslation();
  const [disable, setDisable] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Item Order");
  const [selectedService, setSelectedService] = useState({});
  const [unitValue, setUnitValue] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const viewShotRef = useRef(null);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [ locationStatus,setLocationStatus] = useState('');
  const [dummy, setDummy] = useState(false);

  const alertdata = {
    'loginSuccess': t("Login_Successfull"),
    'invalid': t("Enter Valid Emp ID & Password")
  };

  const captureAndShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();  // Screenshot Capture
      const shareOptions = {
        title: "Order Summary",
        message: "Here is the order summary:",
        url: `file://${uri}`,  // Local Image Path
        social: Share.Social.WHATSAPP,
      };
      await Share.shareSingle(shareOptions);  // Share via WhatsApp
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };



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
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        Alert.alert("Success", "Location fetch successfully,Please submit your order.");
      },
      (error) => {
        setLocationStatus(error.message);
        Alert.alert("Error", "Please try again to fetch the location.");
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

  /////////////////////Item Order//////////////////////////////////////////////

  useEffect(() => {
    console.log(orderData);

  }, [])


  const handleSaveOrder = () => {
    const isEmptyUnit = Object.values(unitInputs).every(unit => unit === "" || unit === 0);

    if (isEmptyUnit) {
      alert('Please enter unit fields');
      return;
    }

    const orderData = skuList
      .map((sku) => ({
        skuName: sku.sku_name,
        sku_price: sku.sku_price,
        itemvalue: unitInputs[sku.sku_id] || 0,
        amount: (unitInputs[sku.sku_id] || 0) * sku.sku_price,
        sku_gst: sku.sku_gst,
        sku_id: sku.sku_id
      }))
      .filter(order => order.itemvalue > 0);

    const totalOrderValue = orderData.reduce((total, item) => total + item.amount, 0).toFixed(2);

    console.log('Order Data:', orderData);

    setUnitInputs({});
    dispatch(setOrder(orderData));
    alert('Order saved in draft', 'Order has been saved successfully!');
  };


  const handleUnitChanges = (skuId, value) => {
    const updatedUnits = { ...unitInputs, [skuId]: value };

    const amount = (value || 0) * (skuList.find(s => s.sku_id === skuId)?.sku_price || 0);

    const totalOrderValue = Object.entries(updatedUnits).reduce((total, [id, unit]) => {
      const price = skuList.find(s => s.sku_id === id)?.sku_price || 0;
      return total + (unit || 0) * price;
    }, 0).toFixed(2);

    setUnitInputs(updatedUnits);
    console.log(`SKU ID: ${skuId}, Amount: ${amount}`);
    console.log(`Updated Total Order Value: ${totalOrderValue}`);
  };



  //////////////////////////////////Return order////////////////////////////////
  const handleSaveReturn = () => {
    try {
      const isAnyUnitEntered = Object.values(unitValue).some((value) => value > 0);

      if (!isAnyUnitEntered) {
        alert('Please enter units');
        return; // Exit if no unit is entered
      }

      // Check if reason is missing for any entered unit
      const isReasonMissing = skuList.some(
        (sku) => (unitValue[sku.sku_id] > 0) && !selectedService[sku.sku_id]
      );


      if (isReasonMissing) {
        alert('Please select a reason for all entered units.');
        return; // Exit if any unit is entered without a reason
      }

      // Filter and map relevant items only
      const filteredData = skuList
        .filter((sku) => unitValue[sku.sku_id] > 0 || selectedService[sku.sku_id])
        .map((sku) => ({
          skuName: sku.sku_name,
          unit: parseInt(unitValue[sku.sku_id], 10) || 0,
          ITM: selectedService[sku.sku_id] || '',
          itmgst: sku.sku_gst,
          value: (parseInt(unitValue[sku.sku_id], 10) || 0) * sku.sku_price,
          price: sku.sku_price,
          itemId: sku.sku_id
        }));


      console.log('Order Data:', filteredData);

      // Dispatch to Redux
      dispatch(setSaleReturn(filteredData));

      // Reset inputs
      setUnitValue({});
      setSelectedService({});

      // Alert success message
      alert('Sale return data saved successfully');
    } catch (error) {
      console.error("Error saving sale return data:", error);
      alert('An error occurred while saving the sale return data.');
    }
  };

  const fetchLocation = () => {
    setDummy(prev => !prev)
  }

  const HandleSaveOrderSummury = () => {
    setLoading(true);  // Loader ko show karein
    setDisable(true);
    setDisable(true);
    if (currentLongitude != '...' && currentLatitude != '...') {
      if (orderData.length > 0) {
        orderSubmit()
      } else {
        returnSubmit()
      }
    } else {
      Alert.alert("Error", "Please turn on your location and click on refresh icon.");
      setLoading(false);
    }

  }



  const orderSubmit = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      console.log(outletDetail, "outletDetail");


      const raw = JSON.stringify({
        outletID: outletDetail.outlet_id,
        pnumber: outletDetail.phone_number,
        joinedName: outletDetail.callerName,
        callType: outletDetail.callType,
        employeeID: empid[0].emp_id,
        enterBy: empid[0].emp_id,
        joinedid: outletDetail.reportingTo,
        schemdiscount: "10",
        totalquantity: orderData.reduce((total, item) => Number(total) + Number(item.itemvalue), 0),
        discountamount: orderData.reduce((total, item) => total + item.amount, 0),
        zone: outletDetail.zone_id,
        division: outletDetail.division_id,
        lat: currentLatitude,
        lag: currentLongitude,
        dealer_id: outletDetail.dealerId,
        reporting_to_user_id: empid[0].reporting_to,
        beat_id: outletDetail.beat_id,
        item_discount: "5",
        detail: orderData
      });

      console.log(raw, 'orderrrrrr');



      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("https://devcrm.romsons.com:8080/orderfilleds", requestOptions);
      const result = await response.json();
      console.log("Server Responseffff:", result);
      setLoading(false);
      // Display success alert
      if (saleReturnData.length == 0) {
        setDisable(false);
        Alert.alert("Success", "order submitted successfully!");
        dispatch(setResetOrder(orderData));
        navigation.navigate(RouteName.HOME_SCREEN);
      }



      if (saleReturnData.length > 0) {
        returnSubmit()
      }


    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit order. Please try again.");
      setLoading(false);
    }
  };


  const returnSubmit = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      console.log(outletDetail, "outletDetail");


      const raw = JSON.stringify({
        outletID: outletDetail.outlet_id,
        pnumber: outletDetail.phone_number,
        joinedName: outletDetail.callerName,
        callType: outletDetail.callType,
        employeeID: empid[0].emp_id,
        enterBy: empid[0].emp_id,
        schemdiscountreturn: "10",
        totalquantityreturn: orderData.reduce((total, item) => Number(total) + Number(item.itemvalue), 0),
        discountamountreturn: orderData.reduce((total, item) => total + item.amount, 0),
        zone: outletDetail.zone_id,
        division: outletDetail.division_id,
        lat: currentLatitude,
        lag: currentLongitude,
        dealer_id: outletDetail.dealer_id,
        reporting_to_user_id: empid[0].reporting_to,
        beat_id: outletDetail.beat_id,
        item_discount: "5",
        detail: saleReturnData
      });


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("https://devcrm.romsons.com:8080/orderreturn", requestOptions);
      const result = await response.json();
      setLoading(false);
      // Display success alert
      if (orderData.length == 0) {
        Alert.alert("Success", "return submitted successfully!");
      } else {
        Alert.alert("Success", "order & return submitted successfully!");
      }

      dispatch(setResetReturn(saleReturnData));
      dispatch(setResetOrder(orderData));
      setDisable(false);
      navigation.navigate(RouteName.HOME_SCREEN);


    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit order. Please try again.");
      setLoading(false);
    }
  };





  const handleUnitChange = (value, skuId) => {
    setUnitValue((prev) => ({ ...prev, [skuId]: value }));
  };

  const handlePickerChange = (value, skuId) => {
    setSelectedService((prev) => ({ ...prev, [skuId]: value }));
  };

  // Unit input field value

  const [skuList, setSkuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unitInputs, setUnitInputs] = useState({});
  const allSkuList = async () => {
    setLoading(true); // Start loading
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        division: empid[0].division,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("https://devcrm.romsons.com:8080/skulist", requestOptions);
      const result = await response.json();

      if (result.error === false) {
        setSkuList(result.data);
        // console.log(skuList,"Line 150")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    allSkuList();
  }, [])

  return (
    <View style={ApprovalStyles.container}>

      {/* Tab Selection */}
      <View style={ApprovalStyles.tabContainer}>
        {['Item Order', 'Sale Return', 'Order Summary'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              ApprovalStyles.tabButton,
              selectedTab === tab && ApprovalStyles.selectedTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
            activeOpacity={0.6}
          >
            <Text
              style={[
                ApprovalStyles.tabText,
                selectedTab === tab && ApprovalStyles.selectedTabText,
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {t(tab)}
            </Text>
            {selectedTab === tab && <View style={ApprovalStyles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Item Order UI */}
      {selectedTab === "Item Order" && (
        <>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="xl" color="gray" />
              <Text>Loading...</Text>
            </View>
          ) : (
            <FlatList
              data={skuList}
              keyExtractor={(item) => item.sku_id.toString()} // Use sku_id as the key
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const unit = unitInputs[item.sku_id] || "";
                const amount = unit * item.sku_price;

                return (
                  <TouchableOpacity key={item.sku_id} style={OrderStyles.PaddingHorizontal}>
                    <View style={OrderStyles.taskContainer}>
                      <View style={OrderStyles.taskDetails}>
                        {/* SKU Name */}
                        <Text style={OrderStyles.taskName}>{item.sku_name}</Text>

                        {/* Price, Segment, and Unit input */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={OrderStyles.taskDate}>Price :</Text>
                            <Text style={OrderStyles.taskDate}>
                              <Text style={{ color: 'brown' }}>{item.sku_price}</Text>
                            </Text>
                            <Text style={OrderStyles.taskTime}>Seg :</Text>
                            <Text style={OrderStyles.taskTime}>
                              <Text style={{ color: 'brown' }}>{item.segment_code}</Text>
                            </Text>
                          </View>

                          <TextInput
                            style={[OrderStyles.inputBox, { marginLeft: 10, width: 100, justifyContent: "center", alignItems: "center" }]}
                            placeholder="Enter unit"
                            keyboardType="numeric"
                            value={unit.toString()}
                            onChangeText={(value) => {
                              if (value.length <= 5 && /^[0-9]*$/.test(value)) {
                                handleUnitChanges(item.sku_id, Number(value)); // ✅ sku_id-based update
                              } else {
                                alert('Please enter up to 5 digits only');
                              }
                            }}
                          />
                        </View>

                        {/* Amount */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={OrderStyles.taskTime1}>Amt : </Text>
                          <Text style={OrderStyles.taskTime1}>
                            <Text style={{ color: 'brown' }}>{amount.toFixed(2)}</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

          )}

          <View style={OrderStyles.footerContainer}>
            <View style={OrderStyles.footerItemContainer}>
              <Text style={OrderStyles.footerLabel}>Unit</Text>
              <Text style={OrderStyles.footerValue}>
                {Object.values(unitInputs).reduce((total, unit) => total + (parseFloat(unit) || 0), 0)}
              </Text>
            </View>

            <Divider style={OrderStyles.divider} />

            <View style={OrderStyles.footerItemContainer}>
              <Text style={OrderStyles.footerLabel}>
                Order Value
              </Text>
              <Text style={OrderStyles.footerValue}>
                {skuList.reduce((total, sku) => {
                  const unit = unitInputs[sku.sku_id] || 0;
                  return total + (Number(unit) * Number(sku.sku_price));
                }, 0).toFixed(2)}
              </Text>

            </View>


            <Divider style={OrderStyles.divider1} />

            <TouchableOpacity style={OrderStyles.footerButton} onPress={handleSaveOrder}>
              <Text style={OrderStyles.footerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}





      {/* Sale Return UI */}
      {selectedTab === "Sale Return" && (
        <>
          <FlatList
            data={skuList}
            keyExtractor={(item) => item.sku_id.toString()} // unique identifier use kiya
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={OrderStyles.PaddingHorizontal1} key={item.sku_id}>
                <View style={OrderStyles.taskContainer1}>
                  <View style={OrderStyles.taskDetails}>
                    {/* Product Name */}
                    <Text style={OrderStyles.taskName1}>{item.sku_name}</Text>

                    {/* Unit Input Field & Dropdown in Single Row */}
                    <View style={OrderStyles.rowContainer}>
                      {/* TextInput */}
                      <TextInput
                        style={OrderStyles.inputBox1}
                        placeholder="Enter unit"
                        value={unitValue[item.sku_id] || ''}
                        keyboardType="numeric"
                        onChangeText={(value) => {
                          if (value.length <= 5 && /^[0-9]*$/.test(value)) {
                            handleUnitChange(value, item.sku_id);
                          } else {
                            alert('Please enter up to 5 digits only');
                          }
                        }}
                      />

                      <Spacing space={20} />
                      <View style={OrderStyles.dropdownContainer}>
                        <HomeDropDown
                          value={selectedService[item.sku_id] || ''}
                          setValue={(val) => handlePickerChange(val, item.sku_id)}
                          data={[
                            { label: "Sampling", value: "sampling" },
                            { label: "Damage", value: "damage" },
                            { label: "Non Moving", value: "non_moving" },
                            { label: "Expired", value: "expired" },
                            { label: "Others", value: "others" },
                          ]}
                          placeholder="Choose Service"
                        />

                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Footer for Sale Return with Save Button */}
          <View style={OrderStyles.saleReturnFooterContainer}>
            <TouchableOpacity
              style={OrderStyles.footerButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={handleSaveReturn} // Move onPress here
            >
              <Text style={OrderStyles.footerButtonText}>Save</Text>
            </TouchableOpacity>

          </View>
        </>
      )}

      {selectedTab === "Order Summary" && (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={fetchLocation}>
              <Icon name="refresh" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={captureAndShare}>
              <Icon name="share" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* Order Summary UI */}
      {selectedTab === "Order Summary" && (
        <ScrollView>
          <ViewShot
            ref={viewShotRef}
            style={{ flex: 1 }}
            options={{
              format: 'png',
              quality: 1,
              // result: 'tmpfile',
              width: 1080,
              height: 1920
            }}
          >

            <View style={OrderStyles.PaddingHorizontal6}>
              <View style={OrderStyles.taskContainer2}>

                {/* Outlet Information Section */}
                <View style={OrderStyles.outletInfoContainer}>
                  <View style={OrderStyles.outletRow}>
                    <Text style={OrderStyles.outletLabel}>Outlet:</Text>
                    <Text style={OrderStyles.outletValue}>{outletDetail?.outlet_name}</Text>
                  </View>
                  <View style={OrderStyles.outletRow}>
                    <Text style={OrderStyles.outletLabel}>Call Type: </Text>
                    <Text style={OrderStyles.outletValue}>{outletDetail?.callerName}</Text>
                  </View>
                  <View style={OrderStyles.outletRow}>
                    <Text style={OrderStyles.outletLabel}>Mobile No:</Text>
                    <Text style={OrderStyles.outletValue}>{outletDetail?.phone_number}</Text>
                  </View>
                  <View style={OrderStyles.outletRow}>
                    <Text style={OrderStyles.outletLabel}>Outlet Type:</Text>
                    <Text style={OrderStyles.outletValue}>{outletDetail?.outlet_category_name}</Text>
                  </View>

                  <View style={OrderStyles.outletRow}>
                    <Text style={OrderStyles.outletLabel}>Dealer Name:</Text>
                    <Text style={OrderStyles.outletValue}>{outletDetail?.dealerName}</Text>
                  </View>


                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <Text style={{ fontSize: 14, fontWeight: 'bold'}}> */}
                    <Text style={{ color: 'black', fontSize: 13, fontWeight: 'bold' }}>Total: </Text>
                    <Text style={{ color: 'green', fontSize: 13, marginHorizontal: 70, fontWeight: 'bold' }}>₹{orderData.reduce((total, item) => total + item.amount, 0)}</Text>
                    {/* </Text> */}
                  </View>
                </View>

                <View style={OrderStyles.divider5} />

                {/* Order Summary */}
                <Text style={OrderStyles.summaryHeading}>Order Summary</Text>
                <View>
                  {orderData?.map((res, ind) => (
                    <View
                      key={ind}
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
                        <Text style={{ color: 'black', fontSize: 13 }}>SKU Name: </Text>
                        <Text style={{ color: 'green', fontSize: 13 }}>{res.skuName}</Text>
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Unit: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{res.itemvalue}</Text>
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Price: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{res.sku_price}</Text>
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Amt: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>
                            {(res.amount + '').split('.')[0]}.{((res.amount + '').split('.')[1] || '00').slice(0, 2).padEnd(2, '0')}
                          </Text>
                        </Text>


                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 1 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>GST%: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{res.sku_gst}%</Text>
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                        <Text style={{ color: 'black', fontSize: 13 }}>Net Amt: </Text>
                        <Text style={{ color: 'green', fontSize: 13 }}>
                          {(res.sku_price * res.sku_gst / 100 + res.amount).toFixed(2)}
                        </Text>
                      </Text>
                    </View>
                  ))}

                  {/* Total Row */}
                  <View
                    style={{
                      marginTop: 16,
                      padding: 12,
                      backgroundColor: '#f1f1f1',
                      borderRadius: 8,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 2 },
                      elevation: 3,
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Total Summary</Text>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Total Units: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {orderData.reduce((total, item) => Number(total) + Number(item.itemvalue), 0)}
                      </Text>
                    </Text>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Total Amt: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {orderData.reduce((total, item) => total + Number(item.amount), 0).toFixed(2)}
                      </Text>
                    </Text>


                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Net Total: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {orderData
                          .reduce((total, item) => total + item.sku_price * item.sku_gst / 100 + item.amount, 0)
                          .toFixed(2)}
                      </Text>
                    </Text>
                  </View>
                </View>


                {/* Return Section */}
                <Text style={OrderStyles.summaryHeading}>Return</Text>
                <View>
                  {saleReturnData?.map((response, index) => (
                    <View
                      key={index}
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
                        <Text style={{ color: 'black', fontSize: 13 }}>SKU Name: </Text>
                        <Text style={{ color: 'green', fontSize: 13 }}>{response?.skuName}</Text>
                      </Text>

                      {response?.ITM && (
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Service: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{response?.ITM}</Text>
                        </Text>
                      )}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Unit: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{response?.unit}</Text>
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Price: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{response?.price}</Text>
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>Amount: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{response?.value}</Text>
                        </Text>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                          <Text style={{ color: 'black', fontSize: 13 }}>GST%: </Text>
                          <Text style={{ color: 'green', fontSize: 13 }}>{response?.itmgst}%</Text>
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                        <Text style={{ color: 'black', fontSize: 13 }}>Net Amt: </Text>
                        <Text style={{ color: 'green', fontSize: 13 }}>
                          {(response?.price * response?.itmgst / 100 + response?.value).toFixed(2)}
                        </Text>
                      </Text>
                    </View>
                  ))}

                  {/* Total Row in Activities Style */}
                  <View
                    style={{
                      marginTop: 16,
                      padding: 12,
                      backgroundColor: '#f1f1f1',
                      borderRadius: 8,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 2 },
                      elevation: 3,
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Total Summary</Text>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Total Units: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {saleReturnData.reduce((total, item) => Number(total) + Number(item.unit), 0)}
                      </Text>
                    </Text>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Total Amount: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {saleReturnData.reduce((total, item) => total + item.value, 0)}
                      </Text>
                    </Text>

                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 4 }}>
                      <Text style={{ color: 'black', fontSize: 13 }}>Net Total: </Text>
                      <Text style={{ color: 'green', fontSize: 13 }}>
                        {saleReturnData
                          .reduce((total, item) => total + item.price * item.itmgst / 100 + item.value, 0)
                          .toFixed(2)}
                      </Text>
                    </Text>
                  </View>
                </View>

              </View>
              {saleReturnData.length > 0 || orderData.length > 0 ? (
                <TouchableOpacity style={{ padding: 2, marginVertical: 3 }} activeOpacity={0.9} onPress={HandleSaveOrderSummury}>
                  {loading ? (
                    <ActivityIndicator size="large" color="green" />
                  ) : (
                    <Text style={OrderStyles.footerButtonText8} onPress={HandleSaveOrderSummury} disabled={disable}>
                      Final Submit
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ padding: 2, marginVertical: 3 }}>
                  <Button buttonStyle={OrderStyles.footerButtonText8} title={t("Final Submit")} />
                </TouchableOpacity>
              )}



            </View>
          </ViewShot>
        </ScrollView>
      )}
    </View>
  );
};

export default OrderScreen;