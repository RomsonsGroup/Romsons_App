import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { SF, darkTheme, lightTheme } from '../../utils';
import moment from 'moment';
import VectorIcon from './VectoreIcons';
import { useTranslation } from 'react-i18next';
import { Style } from '../../styles';
import { useSelector } from 'react-redux';



function MonthYearPicker(props) {
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const Styles = useMemo(() => Style(Colors), [Colors]);
    const { t } = useTranslation();
    const [dateselcet, setdateselcet] = useState(moment().format('MM-YYYY'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Function to show the date picker
    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
    };

    // Function to hide the date picker
    const hideDateTimePicker = () => {
        setDatePickerVisibility(false);
    };

    // Handle the date selection
    const handleDatePicked = (date) => {
        hideDateTimePicker();
        const formattedDate = moment(date, "YYYY-MM-DDTHH:mm:ss Z").local().format('DD-MM-YYYY');
        setdateselcet(formattedDate);

        // Call the selectedDate prop function passed from the parent component
        if (props.selectedDate) {
            props.selectedDate(null, date);  // Pass null as event and the selected date
        }
    };

    

    return (
        <View style={[Styles.Datapicker, Style.PaddingHorizontal]}>
            <Text style={Styles.DatapickerInputHeadingText}>{props.handleName}</Text>
            <View style={Styles.DatapickerInputBox}>
                <TouchableOpacity onPress={() => showDateTimePicker()}>
                    <Text style={Styles.DatapickerInputText}>{dateselcet}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.dobView} onPress={() => showDateTimePicker()}>
                    <VectorIcon icon="AntDesign" style={{ fontSize: SF(30), color: Colors.theme_background }} name='calendar' />
                </TouchableOpacity>
            </View>
            <DateTimePicker
                isVisible={isDatePickerVisible}
                onConfirm={handleDatePicked}
                onCancel={hideDateTimePicker}
            />
        </View>
    );
}



export default MonthYearPicker;


