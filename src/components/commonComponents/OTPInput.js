// CustomOtpInput.js

import React, { useState, useRef, useMemo } from 'react';
import { View, TextInput } from 'react-native';
import { darkTheme, hexToRgba, lightTheme, SH } from '../../utils';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CustomOtpInput = ({ numberOfInputs = 4 }) => {
    const [otp, setOtp] = useState(Array(numberOfInputs).fill('9'));
    const inputRefs = useRef([]);
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;

    const handleInputChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;

        setOtp(newOtp);

        // Move to the next input
        if (text !== '' && index < numberOfInputs - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleInputDelete = (index) => {
        if (index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].focus();
        }
    };
    const Otpstyle = StyleSheet.create({
        CustomeInputView: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap:SH(20),
            backgroundColor:Colors.white_text_color
            // Add other styles you need for the container
        },
        CustomeInput: {
            width: 40, // Adjust as necessary
            height: 40, // Adjust as necessary
            textAlign: 'center',
            fontSize: 18,
            borderRadius:SH(10),
           borderColor:Colors.theme_background,
           borderWidth:SH(0.5),
           paddingBottom:SH(8),
           backgroundColor:Colors.white_text_color,
           color:Colors.black_text_color
        },
    });
    return (
        <View style={Otpstyle.CustomeInputView}>
            {Array.from({ length: numberOfInputs }).map((_, index) => (
                <View
                key={index}
                    style={{
                        backgroundColor:hexToRgba(Colors.white_text_color,1)
                    }}
                >
                    <TextInput
                        key={index}
                        style={Otpstyle.CustomeInput}
                        value={otp[index]}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace') {
                                handleInputDelete(index);
                            }
                        }}
                    />
                </View>
            ))}
        </View>
    );
};
export default CustomOtpInput;
