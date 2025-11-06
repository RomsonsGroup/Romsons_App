import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../utils';
import { Input } from '@rneui/themed';
import { VectorIcon } from '../../components';

function PasswordInput({
  title = '',
  placeholder = '',
  titleStyle = {},
  inputStyle = {},
  onChangeText = () => { },
  onFocus = () => { },
  onBlur = () => { },
  value = '',
  textprops = {},
  inputprops = {},
  inputType = null,
  autoCompleteType = '',
  onEndEditing = () => { },
  label,
  containerStyle,
  inputContainerStyle,
  errorMessage = "",
  name,
  onPress,
  secureTextEntry,
  leftIcon
}) {

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%', position: 'relative',
           ...containerStyle, marginBottom: SH(0),
        },
        inputContainerStyle: {
          width: "100%",
          ...inputContainerStyle,
          borderColor: Colors.light_gray_color,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: SH(10),
        },
        inputContainer: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        input_style: {
          width: '100%',
          fontSize: SF(15),
          fontFamily: Fonts.Fonts_Medium,
          color: Colors.black_color,
          paddingVertical: 0,
          paddingHorizontal: SH(10),
          borderRadius: 8,
          textAlignVertical: 'center',
          ...inputStyle,
        },
        labelStyle: {
          width: '100%',
          fontSize: SF(17),
          color: Colors.black_color,
          fontFamily: Fonts.Fonts_Medium,
          paddingHorizontal: SW(5),
          ...titleStyle,
          fontWeight: '500',
          paddingVertical: SH(2),
        },
        placeholderStyle: {
          fontSize: SF(19),
          color: Colors.white_color,
          fontFamily: Fonts.Fonts_Medium
        },
        errorStyle: {
          color: Colors.red,
          fontFamily: Fonts.Fonts_Regular,
          height: errorMessage == "" && SH(0),
          margin: 0,
        },
        IconPostionAboluteTwo: {
        },
      }),
    [title, titleStyle, inputStyle, Colors],
  );
  return (
    <View style={styles.container}>
      <Input
        name="password"
        rightIcon={
          <TouchableOpacity style={styles.IconPostionAboluteTwo} onPress={() => onPress()}>
            <VectorIcon
              name={name}
              size={SF(25)}
              color={Colors.theme_background}
              icon="Ionicons"
            />
          </TouchableOpacity>
        }
        leftIcon={leftIcon}
        label={label}
        value={value}
        placeholder={placeholder}
        errorProps={{}}
        labelProps={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        autoCorrect={false}
        errorStyle={styles.errorStyle}
        inputStyle={styles.input_style}
        containerStyle={styles.inputContainer}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        placeholderTextColor={Colors.black_text_color}
        textContentType="newPassword"
        secureTextEntry={secureTextEntry}
        enablesReturnKeyAutomatically
        onChangeText={(text) => onChangeText(text)}
      />
    </View>
  );
}

export default PasswordInput;
