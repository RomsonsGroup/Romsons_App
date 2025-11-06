import React, {  useState,useMemo } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { Button, ConfirmationAlert, OTPInput, Spacing } from '../../../components';
import { LoginStyle } from '../../../styles';
import { SH } from '../../../utils';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { useSelector } from 'react-redux';
import images from '../../../index';
const OtpVerifyScreen = () => {
    const navigation = useNavigation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const LoginStyles = useMemo(() => LoginStyle(Colors), [Colors]);
    // const LoginStyles = LoginStyle;
    const { t } = useTranslation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [okbutton, Setokbutton] = useState('');
    var alertdata = {
        'logout': t("Resand_Otp_Text_Modal"),
        'loginSuccess': t("Login_Successfull"),
    }
    const onoknutton = () => {
        if (okbutton === false) okbutton;
        if (okbutton === true) navigation.navigate(RouteName.HOME_SCREEN)
    }
    return (
        <ScrollView style={LoginStyles.Container}>
            <View>
                <View style={LoginStyles.TopView}>
                    <Spacing space={60} />
                    <Text style={LoginStyles.Welcome_back_Text}>{t("Verification")}</Text>
                    <Text style={LoginStyles.Log_in_Text}>{t("OTP PIN")}</Text>
                </View>
                <View style={LoginStyles.TopView}>
                    <Spacing space={40} />
                    <Image source={images.verify} resizeMode="center" style={LoginStyles.OtpImage} />
                    <Spacing space={40} />
                </View>
                <Spacing space={20} />
                <View style={LoginStyles.PaddingHorizontal}>
                    <Text style={LoginStyles.pin_Text}>{t("Enter_your_pin")}</Text>
                    <Spacing space={20} />
                    <OTPInput />
                    <Spacing space={20} />
                    <Text style={LoginStyles.pin_Text}>{t("Didn't recive OTP code!")}   <Text style={LoginStyles.pin_Text_2}>{t("resend_text")}</Text></Text>
                </View>
                <View style={LoginStyles.PaddingHorizontal}>
                    <Spacing space={SH(40)} />
                    <Button onPress={() => {
                                setAlertVisible(true);
                                setAlertMessage(alertdata.loginSuccess);
                                Setokbutton(true);
                            }}  buttonStyle={LoginStyles.ButtonView} title='VERIFyY' />
                </View>
            </View>
            <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
                buttonminview={LoginStyles.buttonotp}
                iconVisible={true}
                buttonText={t("Ok")}
            />
        </ScrollView>
    );
};
export default OtpVerifyScreen;
