import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, Colors, darkTheme, lightTheme } from '../../utils';
import { Input } from '@rneui/themed';
import { useSelector } from 'react-redux';

function Inputs({
  title = '',
  placeholder = '',
  titleStyle = {},
  inputStyle= {},
  onChangeText = () => { },
  onFocus= () => { },
  onBlur = () => { },
  value = '',
  textprops = {},
  inputprops = {},
  inputType = null,
  autoCompleteType = '',
  onEndEditing = () => { },
  multiline,
  autoFocus,
  secureTextEntry,
  maxLength,
  leftIcon = {},
  rightIcon = {},
  errorMessage = "",
  disabled = false,
  required = false,
  containerStyle,
  inputContainerStyle,
  numberOfLines,
  textAlignVertical
}) {
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%', ...containerStyle, marginBottom: SH(0), },
        inputContainerStyle: {
          width: "100%",
          ...inputContainerStyle,
          borderColor: Colors.light_gray_text_color,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: SH(10),
        },
        input_style: {
          width: '100%',
          fontSize: SF(15),
          fontFamily: Fonts.Fonts_Medium,
          color: Colors.black_text_color,
          paddingVertical: 10,
          paddingHorizontal: SH(10),
          borderRadius: 8,
          textAlignVertical: 'center',
          ...inputStyle,
        },
        inputContainer: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(18),
          color: Colors.black_text_color,
          fontFamily: Fonts.Poppins_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(19),
          color: Colors.theme_background,
          fontFamily: Fonts.Poppins_Medium
        },
        errorStyle: {
          color: Colors.theme_background,
          fontFamily: Fonts.Fonts_Regular,
          margin: 0,
          height: 0,
        },
      }),
    [title, titleStyle, inputStyle],
  );
  
  return (
    <View style={styles.container}>
        <Input
          label={title + (required ? "*" : "")}
          placeholder={placeholder}
          onChangeText={(text) => onChangeText(text)}
          leftIcon={leftIcon}
          multiline={multiline}
          placeholderTextColor={Colors.gray_text_color}
          rightIcon={rightIcon}
          numberOfLines={numberOfLines}
          containerStyle={styles.inputContainer}
          errorMessage={errorMessage}
          disabled={disabled}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          autoFocus={autoFocus}
          keyboardType={!inputType ? 'default' : inputType}
          secureTextEntry={secureTextEntry}
          value={value}
          selectionColor={Colors.theme_background}
          maxLength={maxLength}
          {...inputprops}
          errorStyle={styles.errorStyle}
          inputStyle={styles.input_style}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          onEndEditing={(e) => onEndEditing(e)}
          disabledInputStyle={{ background: "#ddd" }}
          textAlignVertical={textAlignVertical}
      
        />
    </View>
  );
}

export default Inputs;
