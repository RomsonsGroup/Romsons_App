// import React, { useMemo } from "react";
// import { Modal, Text, View } from "react-native";
// import Style from '../../styles/CommonStyle/Style';
// import { Button, Lottie, Spacing, VectorIcon } from '../../components';
// import { Colors, darkTheme, lightTheme, SH } from "../../utils";
// import { useSelector } from "react-redux";

// function ConfirmationAlert(props) {
//     const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
//     const Colors = isDarkMode ? darkTheme : lightTheme;
//     const Styles = useMemo(() => Style(Colors), [Colors]);
//     const { 
//         message = '',
//         messageText = '',
//         setModalVisible = () => { },
//         modalVisible = false,
//         onPress = () => { },
//         onPressCancel = () => { },
//         buttonText = 'Ok',
//         cancelButtonText = '',
//         iconVisible = false,
//         buttonminview,
//         isLottie =false,
//         lottieSource="",
//         buttonStyle
//      } = props;
//     return <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//             setModalVisible(!modalVisible);
//         }}
//     >
//         <View style={Styles.setbgcolorgrsay}>
//             <View style={Styles.CenteredView}>
//                 <View style={Styles.ModalView}>
//                     {
//                         isLottie  &&
//                         <>
//                         <Lottie source={lottieSource} />
//                         <Spacing space={SH(20)} />
//                         </>
//                     }
//                     {iconVisible &&
//                     <>
//                         <View style={Styles.setroundcenter}>
//                             <View style={[Styles.checkiconright, { borderColor: Colors.theme_background }]}>
//                                 <VectorIcon icon="AntDesign" style={Styles.setbackgroundicon} color={Colors.theme_background} name="check" size={45} />
//                             </View>
//                         </View>
//                         <Spacing space={SH(20)} />
//                         </>
//                     }
                        
//                     <Text style={Styles.settext}>{message}</Text>
                    
//                     {messageText != "" && 
//                     <>
//                     <Spacing space={SH(10)} />
//                     <Text style={Styles.setmessagetext}>{messageText}</Text>
//                     </>
//                     }
//                     <View style={[Styles.buttonminview, { ...buttonminview }]} >
//                         <View style={[Styles.setokbutton,{...buttonStyle}]}>
//                             <Button title={buttonText}
//                                 onPress={() => { onPress && onPress() }}
//                             />
//                         </View>
//                         {cancelButtonText ?
//                             <View style={[Styles.setokbutton,{...buttonStyle}]}>
//                                 <Button title={cancelButtonText}
//                                     onPress={() => { onPressCancel() }}
//                                 />
//                             </View>
//                             : null
//                         }
//                     </View>
//                 </View>
//             </View>
//         </View>
//     </Modal>;
// }

// export default ConfirmationAlert;











import React, { useMemo } from "react";
import { Modal, Text, View } from "react-native";
import Style from '../../styles/CommonStyle/Style';
import { Button, Lottie, Spacing, VectorIcon } from '../../components';
import { Colors, darkTheme, lightTheme, SH } from "../../utils";
import { useSelector } from "react-redux";

function ConfirmationAlert(props) {
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const Styles = useMemo(() => Style(Colors), [Colors]);
    const { 
        message = '',
        messageText = '',
        setModalVisible = () => { },
        modalVisible = false,
        onPress = () => { },
        onPressCancel = () => { },
        buttonText = 'Ok',
        cancelButtonText = '',
        iconVisible = false,
        buttonminview,
        isLottie = false,
        lottieSource = "",
        buttonStyle,
        alertType = 'success' // Default to 'success'
    } = props;

    // Set colors based on alert type (success or error)
    const alertIconColor = alertType === 'error' ? Colors.error : Colors.success;
    const alertTextColor = alertType === 'error' ? Colors.error : Colors.success;
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={Styles.setbgcolorgrsay}>
                <View style={Styles.CenteredView}>
                    <View style={Styles.ModalView}>
                        {isLottie && (
                            <>
                                <Lottie source={lottieSource} />
                                <Spacing space={SH(20)} />
                            </>
                        )}
                        {iconVisible && (
                            <>
                                <View style={Styles.setroundcenter}>
                                    <View
                                        style={[
                                            Styles.checkiconright,
                                            { borderColor: alertIconColor }
                                        ]}
                                    >
                                        <VectorIcon
                                            icon="AntDesign"
                                            style={Styles.setbackgroundicon}
                                            color={alertIconColor}
                                            name={alertType === 'error' ? "close" : "check"}
                                            size={45}
                                        />
                                    </View>
                                </View>
                                <Spacing space={SH(20)} />
                            </>
                        )}

                        <Text style={[Styles.settext, { color: alertTextColor }]}>
                            {message}
                        </Text>

                        {messageText !== "" && (
                            <>
                                <Spacing space={SH(10)} />
                                <Text style={Styles.setmessagetext}>{messageText}</Text>
                            </>
                        )}
                        <View style={[Styles.buttonminview, { ...buttonminview }]}>
                            <View style={[Styles.setokbutton, { ...buttonStyle }]}>
                                <Button
                                    title={buttonText}
                                    onPress={() => {
                                        onPress && onPress();
                                    }}
                                />
                            </View>
                            {cancelButtonText && (
                                <View style={[Styles.setokbutton, { ...buttonStyle }]}>
                                    <Button
                                        title={cancelButtonText}
                                        onPress={() => {
                                            onPressCancel();
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ConfirmationAlert;
