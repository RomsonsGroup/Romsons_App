import React, { useEffect,  useMemo,  useRef } from "react";
import { View, Animated, Easing, Text, Image} from "react-native";
import {  LoginStyle } from '../../../styles';
import { Button, Spacing } from '../../../components';
import images from '../../../index';
import RouteName from '../../../routes/RouteName';
import { darkTheme, lightTheme, SH } from '../../../utils';
import { useTranslation } from "react-i18next";
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSelector } from "react-redux";

const RegistrationSuccessful = () => {
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  // const LoginStyles = LoginStyle;
  const LoginStyles = useMemo(() => LoginStyle(Colors), [Colors]);
  const animationProgress = useRef(new Animated.Value(0))
  const { t } = useTranslation();
  const OnLoginsPress = () => {
    navigation.replace(RouteName.HOME_SCREEN);
  }

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [])

  return (
    <View style={LoginStyles.MinViewScreen}>
      {/* <View style={LoginStyles.KeyBordTopViewStyle}> */}
        <Image source={images.Check} resizeMode='center'  style={LoginStyles.CheckImg} />
        <Spacing space={SH(10)} />
        <Text style={LoginStyles.resignationsuccessfullyText}>{t("resignationsuccessfullyText")}</Text>
        <Spacing space={SH(20)} />
        <View style={LoginStyles.AccountButton}>
          <Button
            title={t("Get_Started")}
            onPress={() => OnLoginsPress()}
          />
        </View>
      {/* </View> */}
    </View>
  );
};
export default RegistrationSuccessful;
