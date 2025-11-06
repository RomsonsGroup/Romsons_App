import React, { useMemo, useState } from 'react';
import { View,  TouchableOpacity,  Text, Image } from 'react-native';
import { Button, Input, Spacing } from '../../../components';
import { LoginStyle } from '../../../styles';
import { SH } from '../../../utils';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { useSelector } from 'react-redux';
import images from '../../../index';
const RegisterScreen = () => {
    const navigation = useNavigation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const LoginStyles = useMemo(() => LoginStyle(Colors), [Colors]);
    // const LoginStyles = LoginStyle;
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [TextInputPassword, setTextInputPassword] = useState('');
    const { t } = useTranslation();

    return (
        <View style={LoginStyles.Container}>
            <View>
                <View style={LoginStyles.TopView}>
                    <Spacing space={20} />
                    <Image source={images.SignUp} resizeMode="center" style={LoginStyles.LoginImage} />
                    <Spacing space={0} />
                    <Text style={LoginStyles.Welcome_back_Text}>{t("Create_an_account")}</Text>
                    {/* <Text style={LoginStyles.Log_in_Text}>{t("Log_in")}</Text> */}
                </View>
                <Spacing space={10} />
                <View style={LoginStyles.SetPadding}>
                    <Input
                        placeholder={t("Enter_user_name")}
                        onChangeText={(value) => setName(value)}
                        value={Name}
                        placeholderTextColor={Colors.gray_text_color}
                    />
                    <Spacing space={SH(20)} />
                    <Input
                        placeholder={t("Enter_your_email")}
                        onChangeText={(value) => setEmail(value)}
                        value={Email}
                        placeholderTextColor={Colors.gray_text_color}
                    />
                    <Spacing space={SH(20)} />
                    <Input
                        placeholder={t("Enter_your_password")}
                        onChangeText={(TextInputPassword) => setTextInputPassword(TextInputPassword)}
                        value={TextInputPassword}
                        secureTextEntry={true}
                        placeholderTextColor={Colors.gray_text_color}
                    />
                </View>
                <Spacing space={SH(10)} />
                <View style={LoginStyles.PaddingHorizontal}>
                    <View style={[LoginStyles.LineTextcontainer, LoginStyles.PaddingHorizontal]}>
                        <View style={LoginStyles.line} />
                        <Text style={LoginStyles.text}>{t("Or_signup_with")}</Text>
                        <View style={LoginStyles.line} />
                    </View>
                    <Spacing space={SH(10)} />
                    <View style={LoginStyles.FlexRowSignUp}>
                        <TouchableOpacity style={LoginStyles.BackGroundColorSet}>
                            <Image source={images.googleicon} resizeMode="contain" style={LoginStyles.GoogleImage} />
                            <Text style={LoginStyles.LogoText}>{t("Google")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={LoginStyles.BackGroundColorSet}>
                            <Image source={images.apple} resizeMode="contain" style={LoginStyles.GoogleImage} />
                            <Text style={LoginStyles.LogoText}>{t("Apple")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Spacing space={SH(20)} />
                    <Button onPress={() => navigation.navigate(RouteName.REGISTRATIONSUCCESSFUL)} buttonStyle={LoginStyles.ButtonView} title={t("Sign_Up")} />
                    <Spacing space={20} />
                    <TouchableOpacity style={LoginStyles.CenterCenter} onPress={() => { navigation.navigate(RouteName.LOGIN_SCREEN) }}>
                        <Text style={LoginStyles.linkText}>{t("Already_Member")}<Text style={LoginStyles.link}>{t("Sign_In")}</Text></Text>
                    </TouchableOpacity>
                    <Spacing space={10} />
                </View>
            </View>
        </View>
    );
};
export default RegisterScreen;