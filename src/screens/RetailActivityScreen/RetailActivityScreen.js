import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import { RetailActivityStyle } from '../../styles/RetailActivityStyle'
import { darkTheme, lightTheme } from '../../utils';
import Geolocation from '@react-native-community/geolocation';
import { SH } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';
import { use } from 'i18next';


const RetailActivityScreen = ({route}) => {
  const { outletDetail } = route.params || {};
  const [reasons, setReasons] = useState([]); // State to store reasons from API
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const RetailActivityStyles = useMemo(() => RetailActivityStyle(Colors), [Colors]);
  const [selectedReason, setSelectedReason] = useState('');

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
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
  
        // Getting the Longitude and Latitude from the position object
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
  
        // Log the values before updating the state
        console.log("Longitude:", longitude);
        console.log("Latitude:", latitude);
  
        // Setting the states
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
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

  // useEffect(()=>{
  //   selectActivity();
  // }, [])

  useEffect(() => {
    const selectActivity = async () => {
      try {
        const user = await AsyncStorage.getItem("userInfor");
        const loginData = JSON.parse(user);
  
        const raw = JSON.stringify({
          divid: loginData[0].division,
        });
  
        const response = await fetch("https://crm.romsons.com:8080/outlet_activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: raw,
          redirect: "follow",
        });
  
        const result = await response.json();
        console.log("API Response:", result);
  
        const activities = Array.isArray(result.data) ? result.data : [];
        setReasons(activities);
      } catch (error) {
        console.error("Error fetching reasons:", error);
        setReasons([]); // prevent .map crash
      }
    };
  
    selectActivity();
  }, [outletDetail.division_id]);
   // Dependency on division_id

  // useEffect(()=>{
  //   handleSubmit();
  // }, [])


   const handleSubmit = async() => {
    const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);
      console.log("Latitude: ", currentLatitude);
  console.log("Longitude: ", currentLongitude);
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "outletid": outletDetail.outlet_id,
  "remark": selectedReason,
  "empid": empid[0].emp_id,
  "zoneid": outletDetail.zone_id,
  "divid": outletDetail.division_id,
  "lat": currentLatitude,
  "lag": currentLongitude,
  "hospitalname": outletDetail.outlet_name
});



const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://crm.romsons.com:8080/retail_activity", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result, 'sennnnddddd');
    Alert.alert("Success", "Activity submitted successfully!");
  })
  .catch((error) => console.error(error));
     
   };

  return (
    <View style={RetailActivityStyles.container}>
      {/* Heading */}
      <Text style={RetailActivityStyles.heading}>Please select reason for zero order</Text>

      {/* Dropdown Picker */}
      <View style={RetailActivityStyles.pickerContainer}>
      <Picker
        selectedValue={selectedReason}
        onValueChange={(itemValue) => setSelectedReason(itemValue)}
        style={RetailActivityStyles.picker}
      >
        <Picker.Item label="Please Select for Zero Order" value="" />
        {reasons.map((reason, index) => (
          <Picker.Item key={index} label={reason.remarks_m} value={reason.remarks_m} />
        ))}
      </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={RetailActivityStyles.submitButton} onPress={handleSubmit}>
        <Text style={RetailActivityStyles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RetailActivityScreen;
