import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal, ScrollView, ActivityIndicatorm, Alert } from "react-native";
import { SkuOrderStyle } from '../../styles';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { SkuOrderScreen } from '../SkuOrderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SkuOrderHistoryScreen = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const SkuOrderStyles = useMemo(() => SkuOrderStyle(Colors), [Colors]);
  const [checkedStates, setCheckedStates] = useState([]);
  const [skuList, setSkuList] = useState([]);
  const [selectedSKUs, setSelectedSKUs] = useState([]);
  const navigation = useNavigation();

  const skulist = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfor");
      const empid = JSON.parse(user);

      const response = await axios.post(
        "https://crm.romsons.com:8080/skulist",
        {
          division: empid[0].division,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error === false) {
        setSkuList(response.data.data); // Populate the SKU list
      }

    } catch (error) {
      console.error('Error fetching SKU list:', error);
    }
  };

  useEffect(() => {
    skulist();
  }, []);

  // Update selected SKUs when checkbox is clicked
  const handleCheckBoxChange = (index, item) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);

    // Add or remove SKU from selectedSKUs based on checkbox state
    if (updatedCheckedStates[index]) {
      setSelectedSKUs([...selectedSKUs, item.sku_id]); // Store only sku_id
    } else {
      setSelectedSKUs(selectedSKUs.filter(sku => sku !== item.sku_id)); // Remove sku_id
    }
  };

  // Navigate and pass selected SKUs (only sku_ids)
  const goToSkuOrderScreen = () => {
    if (selectedSKUs.length === 0) {
      Alert.alert("Validation Error", "Please select SKU items before proceeding.");
      return;
    }
    navigation.navigate(RouteName.SKUORDER, { selectedSKUs });
  };

  return (
    <View>
      <TouchableOpacity style={SkuOrderStyles.pendingButton} onPress={goToSkuOrderScreen}>
        <Text style={SkuOrderStyles.pendingText}>Sku History</Text>
      </TouchableOpacity>

      <ScrollView>
        {skuList.map((item, index) => (
          <View key={index} style={SkuOrderStyles.taskContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={SkuOrderStyles.taskName}>{item.sku_name || 'No SKU Name Available'}</Text>
              <CheckBox
                value={checkedStates[index] || false}
                onValueChange={() => handleCheckBoxChange(index, item)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



export default SkuOrderHistoryScreen;
