import { StyleSheet } from 'react-native';
import { Fonts, SH, SF, SW, Colors } from '../../utils';

const AttendancePunchStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SH(20),
    backgroundColor: Colors.white_text_color,
  },

  headerContainer: {
    backgroundColor: '#4CAF50', // Green background for the header
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
},
locationHeading: {
    fontSize: 18,
    fontWeight: 'bold', // Make heading bold
     // White text for the heading
    textAlign: 'center',
},
addressText: {
    fontSize: 16,
    color: '#FF5733', // Set color for the fetched address (Example: Orange)
    fontWeight: 'normal', // Keep address text weight normal
    textAlign: 'center',
    marginTop: 5,
},
  headingText: {
    fontSize: SF(24),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    fontWeight: 'bold',
    marginBottom: SH(20),
  },
  checkInOutContainer: {
    alignItems: 'center',
    marginBottom: SH(55),
  },
  checkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SW(120),
    height: SW(120),
    borderRadius: SW(60),
    marginBottom: SH(10),
  },
  checkInButton: {
    backgroundColor: Colors.green_color,
  },
  checkOutButton: {
    backgroundColor: Colors.red,
  },
  checkButtonText: {
    color: Colors.white_color,
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
  },
  timeText: {
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Medium,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    textAlign: 'center',
  },
  dateText: {
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.gray_text_color,
    textAlign: 'center',
    marginBottom: SH(5),
  },
  divider: {
    width: '100%',
    height: SH(1),
    backgroundColor: Colors.gray_text_color,
    marginVertical: SH(30),
  },

  divider1: {
    marginVertical: 10,  // Adds spacing above and below the divider
    width: '100%',       // Full width of the modal
    backgroundColor: Colors.gray_text_color,  // Light gray color
},
  totalHoursContainer: {
    marginTop: SH(30),
    alignItems: 'center',
  },
  totalHoursLabel: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.gray_text_color,
  },
  totalHoursValue: {
    fontSize: SF(24),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    fontWeight: 'bold',
  },

  // Styles for the popup/modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.gray_text_color, // Transparent black background for modal
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Adds shadow on Android
    // shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.1, // Subtle shadow opacity
    shadowRadius: 10, // Rounded shadow edges
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
  },

  modalHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    marginBottom: 5,
    textAlign: 'center',
  },

  modalHeader1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green_color,
    marginBottom: 5,
    textAlign: 'center',
  },

  modalText: {
    fontSize: 14,
    color: Colors.black_text_color,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  modalButton: {
    marginTop: 20,
    backgroundColor: Colors.theme_background_Second, // Green background for the button
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButtonText: {
    fontSize: 16,
    color: Colors.black_text_color,
    fontWeight: 'bold',
  },

  popupContent: {
    padding: 20,
    backgroundColor: Colors.white_text_color,
    borderRadius: 10,
    width: '80%',
  },
  popupHeading: {
    fontSize: SF(18),
    fontWeight: 'bold',
    marginBottom: SH(10),
  },
  optionText: {
    fontSize: SF(16),
    paddingVertical: 10,
  },
  remarksInput: {
    borderWidth: 1,
    borderColor: Colors.gray_text_color,
    padding: 8,
    marginVertical: SH(10),
  },
  saveButton: {
    padding: 10,
    backgroundColor: Colors.green_color,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: Colors.white_color,
    textAlign: 'center',
  },


  attendanceRow: {
    backgroundColor: '#f9f9f9', // Light background
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e76f51', // Reddish-orange for "In", "Out", "Total Hours"
  },
  timeText1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black', // Teal for times
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default AttendancePunchStyle;
