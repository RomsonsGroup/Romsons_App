import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { Button, Input, Spacing, ConfirmationAlert } from '../../components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ExpenseHqStyle } from '../../styles';
import { darkTheme, lightTheme } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { SH } from '../../utils';


const HQExpenseScreen = () => {
    const [fromPlace, setFromPlace] = useState('');
    const [toPlaces, setToPlaces] = useState(['']); // Array of toPlace inputs
    const [remarks, setRemarks] = useState('');
    const [travelMode, setTravelMode] = useState('');
    const [showTravelModal, setShowTravelModal] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const ExpenseHqStyles = useMemo(() => ExpenseHqStyle(currentColors), [currentColors]);
    const { t } = useTranslation();

    // Function to add new "To Place" input with a limit
    const addToPlace = () => {
        if (toPlaces.length < 5) {
            setToPlaces([...toPlaces, '']); // Add new empty string to toPlaces array
        } else {
            setAlertMessage(t("You can only add up to 5 'To Place' inputs."));
            setAlertVisible(true); // Show alert when limit is reached
        }
    };

    // Function to handle To Place input change
    const handleToPlaceChange = (index, value) => {
        const updatedPlaces = [...toPlaces];
        updatedPlaces[index] = value; // Update the specific toPlace
        setToPlaces(updatedPlaces);
    };

    // Function to handle form submission (Save)
    const handleSave = () => {
        // Implement your save logic here (e.g., API call)
        console.log({
            dailyAllowance: 200,
            travelMode,
            fromPlace,
            toPlaces,
            remarks
        });
    };

    // Function to handle travel mode selection
    const handleTravelModeSelect = (mode) => {
        setTravelMode(mode);
        setShowTravelModal(false); // Close modal after selecting
    };

    return (
        <ScrollView style={ExpenseHqStyles.container}>
            <ConfirmationAlert
                message={alertMessage}
                modalVisible={alertVisible}
                setModalVisible={setAlertVisible}
                onPress={() => {
                    setAlertVisible(false); // Close the alert
                }}
                buttonminview={ExpenseHqStyles.buttonotp} // Adjust styles as necessary
                buttonText={t("Ok")}
            />
            {/* Daily Allowance */}
            <View style={ExpenseHqStyles.row}>
                <Text style={ExpenseHqStyles.label}>{t("Daily Allowance")}</Text>
                <Text style={ExpenseHqStyles.value}>200</Text>
            </View>

            {/* Travel Mode */}
            <Text style={ExpenseHqStyles.label}>{t("Travel Mode")}</Text>
            <TouchableOpacity onPress={() => setShowTravelModal(true)} style={ExpenseHqStyles.input}>
                <Text style={ExpenseHqStyles.inputText}>{travelMode || t("Select Travel Mode")}</Text>
            </TouchableOpacity>

            {/* Travel Mode Selection Modal */}
            <Modal
                transparent={true}
                visible={showTravelModal}
                animationType="slide"
                onRequestClose={() => setShowTravelModal(false)}
            >
                <View style={ExpenseHqStyles.modalBackground}>
                    <View style={ExpenseHqStyles.modalContainer}>
                        <Text style={ExpenseHqStyles.modalTitle}>{t("Choose Travel Mode")}</Text>
                        {['Public Transport', '4W', '2W', 'Share Taxi', 'Metro', 'Train', 'Flight'].map((mode) => (
                            <TouchableOpacity
                                key={mode}
                                style={ExpenseHqStyles.modalOption}
                                onPress={() => handleTravelModeSelect(mode)}
                            >
                                <Text style={ExpenseHqStyles.modalOptionText}>{mode}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={ExpenseHqStyles.closeButton}
                            onPress={() => setShowTravelModal(false)}
                        >
                            <Text style={ExpenseHqStyles.closeButtonText}>{t("Close")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* From Place */}
            <Text style={ExpenseHqStyles.label}>{t("From Place")}</Text>
            <Spacing space={SH(7)} />
                  <Input
                        placeholder={t("Enter starting place")}
                        onChangeText={setFromPlace}
                        value={fromPlace}
                        placeholderTextColor={currentColors.gray_text_color}
                    />

            {/* To Place(s) */}
            <Text style={ExpenseHqStyles.label}>{t("To Place")}</Text>
            <Spacing space={SH(7)} />
            {toPlaces.map((place, index) => (
               
                <Input
                placeholder={`${t("Enter destination place")} ${index + 1}`}
                style={ExpenseHqStyles.input}
                key={index}
                        // onChangeText={setReason}
                        value={place}
                        placeholderTextColor={currentColors.gray_text_color}
                    />
                    
            ))}
            {/* Only the + icon without wrapping button */}
            <TouchableOpacity onPress={addToPlace} style={ExpenseHqStyles.addIcon}>
                <Text style={ExpenseHqStyles.addButtonText}>+</Text>
            </TouchableOpacity>

            {/* Remarks */}
            <Text style={ExpenseHqStyles.label}>{t("Remarks")}</Text>
            <Spacing space={SH(7)} />
            
            <Input
                        placeholder={t("Enter remarks")}
                        onChangeText={setRemarks}
                        value={remarks}
                        placeholderTextColor={currentColors.gray_text_color}
                    />
                     <Spacing space={SH(20)} />
            <Button onPress={handleSave} buttonStyle={ExpenseHqStyles.ButtonView} title={t("Save")} />
        </ScrollView>
    );
};

export default HQExpenseScreen;
