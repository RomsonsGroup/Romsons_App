import React, { useState, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, View, Appearance } from "react-native";
import { SF, SH, SW, Colors, widthPercent } from '../../utils';
import { Input, VectorIcon } from '../../components';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { Style } from '../../styles';
import { darkTheme, lightTheme } from '../../utils/Themes';

const SearchScreenset = (props) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const { t } = useTranslation();
    const { placeholder, disabled } = props;
    const colorScheme = Appearance.getColorScheme();
    // const Styles = useMemo(() => Style(colorScheme === 'dark' ? darkTheme : lightTheme), [colorScheme === 'dark' ? darkTheme : lightTheme]);
    const Styles = Style;
    const styles = useMemo(
        () =>
            StyleSheet.create({
                WidthSet: {
                    width: widthPercent(100),

                },
                SearchInputBorder: {
                    fontSize: SF(17),
                    height: SH(50),
                    borderRadius: 310,
                    borderColor: Colors.theme_background,
                    paddingTop: SH(12),
                    backgroundColor: Colors.white_text_color,
                },
                BorderWidth: {
                    borderWidth: SH(0),
                    width: '100%',
                    borderColor: Colors.theme_background,
                    borderRadius: SH(1000),
                },
            }),
        [],
    );
    return (
        <View style={[styles.BorderWidth]}>
            <Input
                placeholder={placeholder}
                onChangeText={(value) => setMobileNumber(value)}
                value={mobileNumber}
                placeholderTextColor={Colors.black}
                //   inputStyle={Styles.SearchInputBorder}
                disabled={disabled}
            />
            <TouchableOpacity style={{
                position: 'absolute', top: SH(15), right: SH(30), borderRadius: 200, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <VectorIcon name="search1" icon="AntDesign" color={Colors.theme_background} size={SF(25)} />
            </TouchableOpacity>
        </View>
    );
};
export default SearchScreenset;
