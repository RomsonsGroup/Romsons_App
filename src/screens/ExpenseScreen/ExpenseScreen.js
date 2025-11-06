import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ExpenseStyle } from '../../styles';
import { darkTheme, lightTheme } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';


const ExpenseScreen = () => {
    const [date, setDate] = useState(null); // Start with no date selected
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [expenseType, setExpenseType] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const currentColors = isDarkMode ? darkTheme : lightTheme;
    const ExpenseScreenStyles = useMemo(() => ExpenseStyle(currentColors), [currentColors]);
    const { t } = useTranslation();

    // Handle date change
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date; // Get selected date
        setShowDatePicker(false);
        setDate(currentDate); // Update date state
    };

    // Handle selecting expense type
    const handleExpenseTypeSelect = (type) => {
        setExpenseType(type);
        setShowModal(false); // Close modal after selecting
        if (type === 'HQ') {
            navigation.navigate(RouteName.EXPENSEHQ); // Navigate to EXPENSEHQ route
        }
    };
    const navigation = useNavigation();
    return (
        <View style={ExpenseScreenStyles.container}>
            <Text style={ExpenseScreenStyles.title}>{t("Select Date")}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={ExpenseScreenStyles.dateButton}>
                <Text style={ExpenseScreenStyles.dateButtonText}>
                    {date ? date.toLocaleDateString() : t("Select a date")}
                </Text>
            </TouchableOpacity>

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()} // Use current date if none selected
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            {/* Expense Type Section */}
            <View style={ExpenseScreenStyles.expenseTypeContainer}>
                <Text style={ExpenseScreenStyles.expenseTypeHeading}>{t("Choose Expense Type Here")}</Text>
                <TouchableOpacity
                    style={[ExpenseScreenStyles.selectButton, date ? null : ExpenseScreenStyles.disabledButton]} // Enable/disable based on date
                    onPress={() => setShowModal(true)} 
                    disabled={!date} // Disable button if no date is selected
                >
                    <Text style={ExpenseScreenStyles.selectButtonText}>
                        {expenseType || t("Select an Expense Type")}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Expense Type Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={ExpenseScreenStyles.modalBackground}>
                    <View style={ExpenseScreenStyles.modalContainer}>
                        <Text style={ExpenseScreenStyles.modalTitle}>{t("Select Expense Type")}</Text>
                        {['HQ', 'EX-HQ', 'OUTSTATION'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={ExpenseScreenStyles.optionButton}
                                onPress={() => handleExpenseTypeSelect(type)}
                            >
                                <Text style={ExpenseScreenStyles.optionText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={ExpenseScreenStyles.closeButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={ExpenseScreenStyles.closeButtonText}>{t("Close")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ExpenseScreen;
