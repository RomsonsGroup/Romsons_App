import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default MsdActivityStyle = (Colors) =>
    StyleSheet.create({

        taskContainer: {
            marginTop: 15,
            paddingVertical: 8,  // Reduced padding for thinner container
            paddingHorizontal: 10, // Adjust horizontal padding
            marginBottom: 10,  // Spacing between items
            backgroundColor: 'white',  // Background color
            borderRadius: 8,  // Rounded corners
            borderWidth: 1,  // Border around the container
            borderColor: '#ddd',  // Light border color
            shadowColor: "#000",  // Optional shadow for better appearance
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        

        taskDetails: {
            flexDirection: 'column',
            alignItems: 'flex-start', // Align content properly within the card
        },

        taskDate: {
            fontSize: 12, 
            fontWeight: 'bold',
            color: Colors.black_text_color,
            
          },

          taskTime1: {
            fontSize: 12, 
    fontWeight: 'bold',
    color: 'green',  
           
          },

          taskTime: {
            fontSize: SF(14),
            fontFamily: Fonts.Poppins_Regular,
            color: Colors.black_text_color,
          },

          rowContainer: {
            flexDirection: 'column', // Change to column for vertical stacking
            alignItems: 'flex-start', // Align items to the start vertically
            justifyContent: 'center', // Center content horizontally if needed
            marginTop: 10,
            paddingHorizontal: 10,
        },

        // rowContainer: {
        //     flexDirection: 'row',
        //     alignItems: 'center',
        //     justifyContent: 'space-between',
        //     marginTop: 10,
        //     paddingHorizontal: 10,
        // },
        
        pickerContainer: {
            flex: 1,
            marginRight: 10,
            borderWidth: 1,
            borderColor: Colors.black_text_color,
            borderRadius: 8,
            height: 45,
            justifyContent: 'center',
        },
        
        dropdownPicker: { 
            height: 40, 
            width: '100%', 
            color: Colors.brown,
            fontWeight: 'bold',
            fontSize: 12, 
          },

          dateButton: {
            padding: SF(10),
            marginTop: 15,
            marginLeft: 10,
            backgroundColor: Colors.white_text_color, // Use dynamic colors
            borderRadius: 5,
            marginBottom: SH(20),
            borderColor: 'black',
            borderWidth: 1, // Ensures the border is visible
        },

        dateButtonText: {
            color: Colors.black_text_color, // Use dynamic colors
            fontSize: SF(15),
            marginRight: 20
        },
        
        
        datePickerContainer: {
            flex: 1,
            height: 45,
            backgroundColor: '#f9f9f9',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ddd',
            paddingHorizontal: 10,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        
        pickerStyle: {
            height: '100%',
            width: '100%',
            color: '#333',  // Darker text color for readability
            fontSize: 14,
            textAlign: 'left',
        },
        
        pickerItemStyle: {
            fontSize: 14,
            color: '#333',
            textAlign: 'left',
            paddingHorizontal: 10,
        },
        
        

        datePicker: {
            marginBottom: 50
        },
        
        
    });


