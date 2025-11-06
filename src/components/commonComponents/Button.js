import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet , Platform} from 'react-native';
import { Fonts, SF, SH, SW, Colors, hexToRgba, darkTheme, lightTheme } from '../../utils';
import { Button} from '@rneui/themed';
import { useSelector } from 'react-redux';
function Buttons(props) {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  // const SettingsScreenStyles = useMemo(() => SettingsScreenStyle(Colors), [Colors]);
  const { title, onPress, buttonStyle,iconContainerStyle, disable, buttonTextStyle, icon, spacedImages,linearGradientProps } = props;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        buttonStyle: {
          backgroundColor: Colors.theme_background,
          borderRadius: 8,
          width: '100%'
        },
        buttonTextStyle: {
          color: Colors.white_color,
          fontFamily: Fonts.Poppins_Medium,
          fontSize: SF(17),
        },
        buttonViewStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: spacedImages ? 'space-around' : 'center',
          width: '100%'
        }
      }),
    [disable, spacedImages],
  );


  
  return (
      <Button
        title={title}
        onPress={onPress}
        icon={icon}
        iconContainerStyle={iconContainerStyle}
        linearGradientProps={linearGradientProps}
        buttonStyle={[styles.buttonStyle, { ...buttonStyle }]}
        titleStyle={[styles.buttonTextStyle, { ...buttonTextStyle }]}
      />
  );
}


export default Buttons;
