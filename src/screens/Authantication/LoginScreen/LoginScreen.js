import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, Modal, Linking, ActivityIndicator } from 'react-native';
import { Button, Input, Spacing, ConfirmationAlert } from '../../../components';
import { LoginStyle } from '../../../styles';
import { SH } from '../../../utils';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { useSelector } from 'react-redux';
import images from '../../../index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import withAuthRedirect from './withAuthRedirect';


const LoginScreen = () => {
    const navigation = useNavigation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const LoginStyles = useMemo(() => LoginStyle(Colors), [Colors]);
    const [empid, setEmpid] = useState('');
    const [TextInputPassword, setTextInputPassword] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userInfo = await AsyncStorage.getItem("userInfor");
                if (userInfo) {
                    navigation.replace(RouteName.HOME_SCREEN);
                } else {
                    setLoading(false);  // Show login screen
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, [navigation]);

    if (loading) {
        return null; // Don't show anything while checking login
    }


    const alertdata = {
        'loginSuccess': t("Login_Successfull"),
        'invalid': t("Enter Valid Emp ID & Password")
    };




    const handleLogin = () => {
        const requestData = {
            empid: empid,
            Password: TextInputPassword
            // empid: "11000126",
            // // empid: "11000185",
            // Password: "1234"
        };

        axios.post("https://devcrm.romsons.com:8080/loginApps", requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const arr = response.data;
                console.log(arr, "login responnse");

                if (arr.userData.error === false) {
                    // Set success message and display alert
                    console.log("Logged in User Data: ", arr.userData.data);
                    await AsyncStorage.setItem("userInfor", JSON.stringify(arr.userData.data));
                    setAlertMessage(alertdata.loginSuccess);
                    navigation.navigate(RouteName.HOME_SCREEN);
                    setAlertVisible(false);
                    setEmpid('');
                    setTextInputPassword('');
                } else {

                    alert(arr.userData.data);
                }
            })
            .catch((error) => {
                console.error("Login Error: ", error);
            });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Confirm button handler for alert
    const handleAlertOk = () => {
        setAlertVisible(false); // Hide the alert

        // Sirf jab login successful ho, navigate karein
        if (alertMessage === alertdata.loginSuccess) {
            // Navigate to Home screen
            navigation.replace(RouteName.HOME_SCREEN);
        }
    };


    // Handle the "Click Me" press to show the modal
    const handleSupportModal = () => {
        setModalVisible(true);  // Show the modal
    };

    // if (isCheckingLogin) {
    //     return (
    //         <View style={[LoginStyles.Container, {justifyContent: 'center', alignItems: 'center'}]}>
    //             <ActivityIndicator size="large" color={Colors.theme_background} />
    //         </View>
    //     );
    // }

    return (
        <View style={LoginStyles.Container}>
            <View>
                <View style={LoginStyles.TopView}>
                    <Spacing space={10} />
                    <Image source={images.Sign1} resizeMode="center" style={LoginStyles.LoginImage} />
                    <Spacing space={0} />
                    <Text style={LoginStyles.Welcome_back_Text}>{t("Let's sign you in")}</Text>
                </View>
                <Spacing space={20} />
                <View style={LoginStyles.SetPadding}>
                    <Input
                        placeholder={t("Enter Emp Id")}
                        onChangeText={(empid) => setEmpid(empid)}
                        value={empid}
                        placeholderTextColor={Colors.gray_text_color}
                    />
                    <Spacing space={SH(20)} />
                    <View style={LoginStyles.PasswordWrapper}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Input
                                placeholder={t("Enter_your_password")}
                                onChangeText={(TextInputPassword) => setTextInputPassword(TextInputPassword)}
                                value={TextInputPassword}
                                secureTextEntry={!passwordVisible}
                                placeholderTextColor={Colors.gray_text_color}
                                containerStyle={{ flex: 1 }} // Allow the input to take up available space
                            />

                            {/* Eye icon for toggling password visibility */}
                            <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10 }}>
                                <Icon
                                    name={passwordVisible ? "visibility-off" : "visibility"}
                                    size={24}
                                    color={Colors.gray_text_color}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={LoginStyles.PaddingHorizontal}>
                    <Spacing space={SH(20)} />
                    <Button onPress={handleLogin} buttonStyle={LoginStyles.ButtonView} title={t("Login")} />
                    <Spacing space={20} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black' }}>Generate Password. </Text>
                        <TouchableOpacity onPress={handleSupportModal}>
                            <Text style={LoginStyles.Forgot_password}>{t("Click Me")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Spacing space={10} />

                    {/* Support Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 10, fontSize: 14 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: 'black' }}>Contact Sales Team Support</Text>
                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ccc', marginBottom: 10 }} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Support Number: </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'green' }} onPress={() => { Linking.openURL('tel:7703840597'); }}>8929746653</Text>
                                </View>
                                <Spacing space={10} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Email: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>sales.data3@romsons.com</Text>
                                </View>
                                <Spacing space={20} />
                                <View style={{ borderBottomWidth: 2, borderBottomColor: '#ccc', marginBottom: 10 }} />
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, alignSelf: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
            </View>
            <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                buttonminview={LoginStyles.buttonotp}
                iconVisible={true}
                buttonText={t("Ok")}
                onOkPress={handleAlertOk} // Trigger appropriate action on confirmation
            />
        </View>
    );
};

export default LoginScreen;





