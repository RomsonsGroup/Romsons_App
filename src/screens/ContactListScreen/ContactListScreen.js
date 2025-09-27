import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ContactListStyle } from '../../styles/ContactListStyle'
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../utils";
import { Spacing } from "../../components";
import { SH, SF, Fonts } from '../../utils';
import { RouteName } from '../../routes';
import { use } from "i18next";
import { useNavigation } from '@react-navigation/native';


const ContactListScreen = ({ route }) => {
    const { t } = useTranslation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const ContactListStyles = useMemo(() => ContactListStyle(Colors), [Colors]);
    const [hospitalData, setHospitalData] = useState([]);
    const { outletDetail } = route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
        contactList();
    }, [])



    const contactList = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            outletID: outletDetail?.outlet_id,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://devcrm.romsons.com:8080/hospitalContact", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                let arr = JSON.parse(result);
                setHospitalData(arr.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };


    return (


        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={ContactListStyles.scrollContainer}>
                {hospitalData.map((res, ind) => (
                    <View key={ind} style={ContactListStyles.taskContainer}>
                        {/* Wrap the whole card in TouchableOpacity to handle the onPress */}
                        <TouchableOpacity
                            style={ContactListStyles.taskDetails}
                            onPress={() => navigation.navigate(RouteName.MSDACTIVITY, {
                                outletDetail,
                                user_type: res.customer_type,
                                customer_name: res.customer_name,
                                customer_contact_no: res.customer_contact_no,
                                hospital_name: res.hospital_name, // Corrected this line
                                outlet_category_name: res.outlet_category_name,
                                outlet_id: res.outlet_id,
                                customer_department: res.customer_department
                            })}
                        >

                            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'nowrap' }}>
                                <Text
                                    style={[ContactListStyles.taskDate, { flex: 3, flexShrink: 1 }]}
                                    numberOfLines={1}
                                >
                                    {res.customer_name}
                                </Text>
                                <Text
                                    style={[
                                        ContactListStyles.taskTime1,
                                        { flex: 2, textAlign: 'right', flexShrink: 1 }
                                    ]}
                                    numberOfLines={1}
                                >
                                    {res.customer_type}
                                </Text>
                            </View>
                            <Text style={ContactListStyles.taskTime}>{res.customer_department}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>
                                    {res.customer_contact_no}
                                </Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>
                                    {res.email}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>


    );
};

export default ContactListScreen;











{/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text style={[ContactListStyles.taskTime, { marginRight: 10 }]}>9699678965</Text>
  <Text style={ContactListStyles.taskTime}>poojakesari123@gmail.com</Text>
</View> */}