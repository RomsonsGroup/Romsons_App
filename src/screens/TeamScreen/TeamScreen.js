import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TeamStyle } from '../../styles/TeamStyle';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../utils';
import { SH, SF } from '../../utils';
import { useTranslation } from 'react-i18next';

const TeamScreen = () => {
    const isDarkMode = useSelector((state) => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const { t } = useTranslation();
    const TeamStyles = useMemo(() => TeamStyle(currentColors), [currentColors]);
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        try {
            const user = await AsyncStorage.getItem('userInfor');
            const empid = JSON.parse(user);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "empidd": empid[0].emp_id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://devcrm.romsons.com:8080/Teamlink", requestOptions);

            const result = await response.json();  // Use response.json() instead of text()

            console.log(result, 'team data response');  // Debugging log

            if (result.error === false) {
                setTeamData(result.data);
            } else {
                console.log('Error in fetching data: ', result);
            }

            setLoading(false);  // Set loading to false once data is fetched
        } catch (error) {
            console.error('Error in fetchTeamData:', error);
            setLoading(false);  // Set loading to false on error
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB').format(date);
    };

    const renderItem = ({ item }) => (
        <View style={TeamStyles.teamMemberCard}>
            {/* <Text style={TeamStyles.name}>Name: {item.user_name}</Text> */}
            <Text style={TeamStyles.detail}>
                <Text style={TeamStyles.label}>Name: </Text>
                <Text style={TeamStyles.value}>{item.user_name}</Text>
            </Text>
            <Text style={TeamStyles.detail}>
                <Text style={TeamStyles.label}>Designation: </Text>
                <Text style={TeamStyles.value}>{item.designation_name}</Text>
            </Text>

            {/* <Text style={TeamStyles.detail}>Head-Quarter: {item.Head_Quater_name}</Text> */}
            <Text style={TeamStyles.detail}>
                <Text style={TeamStyles.label}>HQ: </Text>
                <Text style={TeamStyles.value}>{item.Head_Quater_name}</Text>
            </Text>

            {/* <Text style={TeamStyles.detail}>Division: {item.division}</Text> */}
            <Text style={TeamStyles.detail}>
                <Text style={TeamStyles.label}>Division: </Text>
                <Text style={TeamStyles.value}>{item.division_name}</Text>
            </Text>

            {/* <Text style={TeamStyles.detail}>EOD Date: {formatDate(item.last_eod_date)}</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={TeamStyles.detail}>
                    <Text style={TeamStyles.label}>EOD Date: </Text>
                    <Text style={TeamStyles.value}>{formatDate(item.last_eod_date)}</Text>
                </Text>

                <Text style={TeamStyles.detail}>
                    {item.last_eod} -
                    <Text
                        style={[
                            item.eod_status === 'Submitted' ? TeamStyles.submitted : TeamStyles.notSubmitted
                        ]}
                    >
                        {item.eod_status}
                    </Text>
                </Text>
            </View>

        </View>
    );

    return (
        <View style={TeamStyles.container}>
            <Text style={TeamStyles.header}>Team Members</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />  // Show a loading spinner
            ) : (
                // <FlatList
                //     data={teamData}
                //     keyExtractor={(item) => item.emp_id.toString()} 
                //     renderItem={renderItem}
                // />

                <FlatList
                    data={teamData}
                    keyExtractor={(item, index) => index.toString()}  // Using index if no unique ID
                    renderItem={renderItem}
                />


            )}
        </View>
    );
};



export default TeamScreen;
