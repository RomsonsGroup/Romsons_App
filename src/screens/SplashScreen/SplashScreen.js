import React, { useEffect, useMemo } from 'react';
import { View, StatusBar,  Image } from 'react-native';
import { Style } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteName } from '../../routes';
import {  darkTheme, lightTheme } from '../../utils';
import { useSelector } from "react-redux";
import images from '../../index';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(RouteName.SWIPER_SCREEN)
            );
        }, 2500);
    }, []);
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const Styles = useMemo(() => Style(Colors), [Colors]);
    StatusBar.setBackgroundColor(Colors.theme_background);
    return (
        <View style={Styles.SplashMinView}>
            <View style={Styles.MinViewStyleSplash}>
                <Image source={images.Image_5} resizeMode="contain" style={Styles.SplashImage} />
            </View>
        </View>
    );
};
export default SplashScreen;
