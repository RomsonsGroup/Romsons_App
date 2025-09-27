import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from '@rneui/base';
import { OutletStyle } from '../../styles/OutletStyle';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../utils';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SH, SF } from '../../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon1 from 'react-native-vector-icons/Entypo';


const OutletScreen = () => {
  const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
  const currentColors = isDarkMode ? darkTheme : lightTheme;
  const OutletStyles = useMemo(() => OutletStyle(currentColors), [currentColors]);
  //   const { t } = useTranslation();
  const navigation = useNavigation();
  const [outletDates, setOutletDates] = useState([]); 
  const [selectedButton, setSelectedButton] = useState(null); 
  const [count, setCount] = useState('');
  const [beatName, setBeatName] = useState('');
  const [remainingOutlets, setRemainingOutlets] = useState(0);  
  const [minOutletCoverage, setMinOutletCoverage] = useState('');
  const [outletData, setOutletData] = useState([]); 

  const fetchOutletDates = async () => {
    const user = await AsyncStorage.getItem('userInfor');
    const empid = JSON.parse(user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "empid": empid[0].emp_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://devcrm.romsons.com:8080/dateWiseOutlet", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error === false) {
          // console.log("outlet date:", result.data);
          setOutletDates(result.data);
          const defaultDate = Moment().format('YYYY-MM-DD');
          handleDateSelection(defaultDate, 0); // Default date selection
        } else {
          console.error("API Error:", result.data || "Unknown error");
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchOutletData = async (currentDate) => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);

      const payload = { empid: empid[0].emp_id, outletDate: currentDate };

      const response = await axios.post('https://devcrm.romsons.com:8080/DatewiseOutlet_data', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data && !response.data.error) {
        // console.log('Outlet data:', response.data.data);
        setOutletData(response.data.data); // Update outlet data for the selected date
      } else {
        console.error('API Error:', response.data.data || 'Unknown error');
      }
    } catch (error) {
      console.error('Fetch error:', error.message || error);
    }
  };

  const countOutlets = async (currentDate) => {
    try {
      const user = await AsyncStorage.getItem('userInfor');
      const empid = JSON.parse(user);
      const payload = { empid: empid[0].emp_id, outletDate: currentDate };

      const response = await axios.post('https://devcrm.romsons.com:8080/countOutlet', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        // console.log("Response:", response.data);
        const result = response.data;

        const minRequired = result[0]?.min_outlet_coverage || 0; // Minimum required outlets
        setMinOutletCoverage(minRequired);
        setCount(result[0]?.Totaloutlet || '');
        setBeatName(result[0]?.beat_name || '');

        // ✅ Count how many outlets are already covered (order_status === 'Red')
        if (result[0]?.outletData) {
          setOutletData(result[0].outletData);
        }
      } else {
        console.error('API returned no data');
      }
    } catch (error) {
      console.error('API Error:', error.message || error);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    countOutlets(today);
  }, []);


  useEffect(() => {
    if (outletData.length > 0) {
      const coveredOutlets = outletData.filter((res) => res.order_status === 'Green' || res.activity_status === 'Green').length;
      let remaining = coveredOutlets;
      setRemainingOutlets(remaining);
      console.log("Updated Remaining Outlets:", remaining);
    }
  }, [outletData, minOutletCoverage]);




  useEffect(() => {
    fetchOutletDates(); // Initial fetch of outlet dates
  }, []);

  const handleDateSelection = (date, index) => {
    setSelectedButton(index); // Set the selected button index
    setOutletData([]);
    fetchOutletData(Moment(date).format('YYYY-MM-DD')); // Fetch data for the selected date
    countOutlets(Moment(date).format('YYYY-MM-DD')); // Count outlets for the selected date
  };



  return (
    <ScrollView style={OutletStyles.container}>
      {/* Date Box */}
      <View style={OutletStyles.dateBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {outletDates.map((item, index) => (
            <View key={index} style={{ paddingHorizontal: 3 }}>
              <TouchableOpacity
                onPress={() => handleDateSelection(item.outlet_date, index)} // Handle date selection
                style={{
                  backgroundColor:
                    Moment().format('YYYY-MM-DD') === Moment(item.outlet_date).format('YYYY-MM-DD')
                      ? '#d49306'
                      : selectedButton === index
                        ? 'green'
                        : '#D3D3D3',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'black' }}>
                  {Moment(item.outlet_date).format('DD-MM-YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Header Section */}
      <View style={OutletStyles.headerRow}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={OutletStyles.label}>Outlet Count: </Text>
          <Text style={OutletStyles.count}>{count}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Text style={OutletStyles.label}>MOC: </Text>
          <Text style={OutletStyles.count}>{minOutletCoverage} / {remainingOutlets}</Text>
        </View>
      </View>

      <View style={OutletStyles.header}>
        <Text style={OutletStyles.label}>Beat Name:</Text>
        <Text style={OutletStyles.beatName}>{beatName}</Text>
      </View>

      <Divider style={OutletStyles.divider} />

      {/* Outlet Details */}
      {outletData.map((res, ind) => {
        console.log(res, 'hrhyruss');
        console.log(res.outlet_lat, res.outlet_long, 'hthuytjt');
        // Determine the color based on order status
        // const outletNameColor = res.order_status === 'Red' ? 'red' : 'black';
        const outletNameColor = res.order_status === 'Green'
          ? 'green'  // If order exists, color it red
          : res.activity_status === 'Green'
            ? 'green'  // If activity exists, color it green
            : 'black'; // Default color
        const locationPinColor = res.icon_color === 'Red' ? 'red' : 'green'; 

        return (
          <TouchableOpacity
            key={ind}
            style={OutletStyles.PaddingHorizontal}
            onPress={() => {
              const locationPinColor = res.icon_color === 'Red' ? 'red' : 'green';  // Calculate locationPinColor
              navigation.navigate(RouteName.OUTLETDETAIL, {
                itemId: res,  // Pass the entire 'res' object as 'itemId' to the next page
                icon_color: res.icon_color,  // Optionally pass other data
                locationPinColor: locationPinColor,  // Pass locationPinColor to the next page
              });
            }}
          >
            <View style={OutletStyles.taskContainer}>
              {/* Location Icon */}
              <Icon1
                style={OutletStyles.TaskIcon}
                name="location-pin"
                size={30}
                color={locationPinColor} // Based on location
              />
              <View style={OutletStyles.taskDetails}>
                {/* Outlet Name with Dynamic Color */}
                <Text
                  style={[
                    OutletStyles.taskName,
                    { color: outletNameColor, flex: 1, flexWrap: 'wrap' }
                  ]}
                >
                  {res.outlet_name}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={OutletStyles.taskDate}>ID: {res.outlet_id}</Text>
                  <Text style={OutletStyles.taskTime}>{res.customer_type_name}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}




    </ScrollView>
  );
};

export default OutletScreen;
