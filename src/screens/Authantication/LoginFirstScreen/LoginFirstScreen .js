import React, { useMemo,  } from 'react';
import { View, Text, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  Spacing } from '../../../components';
import { useTranslation } from "react-i18next";
import { darkTheme, lightTheme } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import { LoginStyle } from '../../../styles';
import { useSelector } from 'react-redux';
const LoginScreen = () => {
    const navigation=useNavigation();
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const LoginStyles = useMemo(() => LoginStyle(Colors), [Colors]);
    const { t } = useTranslation();
    return (
        <View style={LoginStyles.container}>
            <Text style={LoginStyles.title}>CRMgggf</Text>
            <Spacing space={40} />
            <Text style={LoginStyles.signUpText}>{t("Sign_Up")}</Text>
            <Spacing space={10} />
            <Text style={LoginStyles.description}>{t("easier")}</Text>
            <Spacing space={40} />
            <TouchableOpacity style={LoginStyles.facebookButton}>
                <Icon name="facebook" size={20} color="#fff" />
                <Text style={LoginStyles.facebookButtonText}>{t("Continue_with_Facebook")}</Text>
            </TouchableOpacity>
            <Spacing space={30} />
            <TouchableOpacity onPress={()=>navigation.navigate(RouteName.REGISTER_SCREEN)} style={LoginStyles.emailButton}>
                <Text style={LoginStyles.emailButtonText}>{t("use_email_or_phone")}</Text>
            </TouchableOpacity>
            <Spacing space={30} />
            <View style={LoginStyles.socialIcons}>
                <Icon name="twitter" size={30} color="#1DA1F2" style={LoginStyles.icon} />
                <Icon name="google" size={30} color="#DB4437" style={LoginStyles.icon} />
                <Icon name="linkedin" size={30} color="#0077B5" style={LoginStyles.icon} />
            </View>
            <Spacing space={40} />
            <TouchableOpacity onPress={()=>navigation.navigate(RouteName.LOGIN_SCREEN)}>
            <Text style={LoginStyles.loginText}>{t("Already_account")}
                 <Text style={LoginStyles.loginLink}>{t("Login")}</Text>
            </Text>
            </TouchableOpacity>
        </View>
    );
};
export default LoginScreen;