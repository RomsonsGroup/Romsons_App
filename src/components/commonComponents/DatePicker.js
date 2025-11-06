// import React, { useState, useMemo } from 'react';
// import { View, Text,TouchableOpacity } from 'react-native';
// import DateTimePicker from "react-native-modal-datetime-picker";
// import {  SF, darkTheme, lightTheme } from '../../utils';
// import moment from 'moment';
// import VectorIcon from './VectoreIcons';
// import { useTranslation } from 'react-i18next';
// import { Style } from '../../styles';
// import { useSelector } from 'react-redux';
// function DatePicker(props) {
//     const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
//     const Colors = isDarkMode ? darkTheme : lightTheme;
//     const Styles = useMemo(() => Style(Colors), [Colors]);
//     const { t } = useTranslation();
//     const [dateselcet, setdateselcet] = useState(moment().format('DD-MM-YYYY'));
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const showDateTimePicker = () => {
//         setDatePickerVisibility(true);
//     };
//     const hideDateTimePicker = () => {
//         setDatePickerVisibility(false);
//     };
//     const handleDatePicked = (date) => {
//         hideDateTimePicker(),
//             setdateselcet(moment(date, "YYYY-MM-DDTHH:mm:ss Z").local().format('DD-MM-YYYY'));
//     };
//     return (
//          <View style={[Styles.Datapicker,Style.PaddingHorizontal]}  >
//          <Text style={Styles.DatapickerInputHeadingText}>{props.handleName}</Text>
//          <View style={Styles.DatapickerInputBox}>
//              <TouchableOpacity onPress={() => showDateTimePicker()}>
//                  <Text style={Styles.DatapickerInputText}>{dateselcet}</Text>
//              </TouchableOpacity>
//              <TouchableOpacity style={Style.dobView} onPress={() => showDateTimePicker()}>
//                  <VectorIcon icon="AntDesign" style={{ fontSize: SF(30), color: Colors.theme_background }} name='calendar' />
//              </TouchableOpacity>
//          </View>
//          <DateTimePicker
//              isVisible={isDatePickerVisible}
//              onConfirm={handleDatePicked}
//              onCancel={hideDateTimePicker}
//          />
//      </View>

//     )
// }
// export default DatePicker;



// modifed code


import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import { SF, darkTheme, lightTheme } from '../../utils';
import moment from 'moment';
import VectorIcon from './VectoreIcons';
import { useTranslation } from 'react-i18next';
import { Style } from '../../styles';
import { useSelector } from 'react-redux';

// function DatePicker(props) {
//     const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
//     const Colors = isDarkMode ? darkTheme : lightTheme;
//     const Styles = useMemo(() => Style(Colors), [Colors]);
//     const [dateselcet, setdateselcet] = useState(moment().format('DD-MM-YYYY'));
//     const [monthYearSelect, setMonthYearSelect] = useState(moment().format('MM-YYYY')); // For month-year selection
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [isMonthYearPicker, setMonthYearPicker] = useState(false); // Track month-year picker mode

//     // Show DatePicker
//     const showDateTimePicker = (isMonthYear) => {
//         setMonthYearPicker(isMonthYear); // Set mode to month-year or date
//         setDatePickerVisibility(true);
//     };

//     // Hide DatePicker
//     const hideDateTimePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     // Handle full date selection
//     const handleDatePicked = (date) => {
//         hideDateTimePicker();
//         const formattedDate = moment(date).format('DD-MM-YYYY');
//         setdateselcet(formattedDate);

//         if (props.selectedDate) {
//             props.selectedDate(null, date);
//         }
//     };

//     // Handle month-year selection (customized)
//     const handleMonthYearPicked = (date) => {
//         hideDateTimePicker();
//         const formattedDate = moment(date).format('MM-YYYY'); // Format to month-year
//         setMonthYearSelect(formattedDate);

//         if (props.selectedDate) {
//             props.selectedDate(null, date);
//         }
//     };

//     return (
//         <View style={[Styles.Datapicker, Style.PaddingHorizontal]}>
//             <Text style={Styles.DatapickerInputHeadingText}>{props.handleName}</Text>
//             <View style={Styles.DatapickerInputBox}>
//                 <TouchableOpacity onPress={() => showDateTimePicker(false)}>
//                     <Text style={Styles.DatapickerInputText}>{dateselcet}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => showDateTimePicker(true)}>
//                     <Text style={Styles.DatapickerInputText}>{monthYearSelect}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={Style.dobView} onPress={() => showDateTimePicker(false)}>
//                     <VectorIcon
//                         icon="AntDesign"
//                         style={{ fontSize: SF(30), color: Colors.theme_background }}
//                         name="calendar"
//                     />
//                 </TouchableOpacity>
//             </View>

//             {/* Full Date Picker */}
//             <DateTimePicker
//                 isVisible={isDatePickerVisible && !isMonthYearPicker}
//                 mode="date"
//                 onConfirm={handleDatePicked}
//                 onCancel={hideDateTimePicker}
//             />

//             {/* Month-Year Picker */}
//             <DateTimePicker
//                 isVisible={isDatePickerVisible && isMonthYearPicker}
//                 mode="date"
//                 onConfirm={handleMonthYearPicked}
//                 onCancel={hideDateTimePicker}
//                 date={moment().startOf('month').toDate()} // Always set to the first day of the month
//                 minimumDate={moment().startOf('year').toDate()} // Start of the year
//                 maximumDate={moment().toDate()} // Current date
//                 display="spinner" // Spinner style for selection
//             />

//         </View>
//     );
// }


function DatePicker(props) {
    const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
    const Colors = isDarkMode ? darkTheme : lightTheme;
    const Styles = useMemo(() => Style(Colors), [Colors]);
    const { t } = useTranslation();
    const [dateselcet, setdateselcet] = useState(moment().format('DD-MM-YYYY'));
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



export default DatePicker;


