import { Fonts, SH, SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default CheckInOutStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_text_color,
  },
  header: {
    padding: 0,
    backgroundColor: Colors.white_text_color,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0,
  },
  headerText: {
    fontSize: SF(20),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black_text_color,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%'
  },
  tab: {
    paddingVertical: SH(10),
    paddingHorizontal: SH(20),
    color: Colors.black_text_color,
    fontSize: SF(20),
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_gray_text_color,
     width:'50%'
  },

  activeTab: {
    color: Colors.theme_background,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: Colors.theme_background,
  },
  activeTabText: {
    fontSize: SF(16),
    fontFamily:Fonts.Poppins_Medium,
    color: Colors.theme_background,
  },
  tabText: {
    fontSize: SF(16),
    fontFamily:Fonts.Poppins_Medium,
    color: Colors.black_text_color,
  },
  listContent: {
    padding: 0,
  },
  punchItem: {
    backgroundColor: Colors.white_text_color,
    borderRadius: 10,
    padding: SH(15),
    marginVertical: SH(10),
    shadowColor: Colors.black_text_color,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusContainer: {
    // backgroundColor: Colors.gray_text_color,  // Light blue background
    borderRadius: 20,             // Rounded corners
    paddingVertical: 10,           // Vertical padding
    paddingHorizontal: 15,        // Horizontal padding
    alignItems: 'center',         // Center align the text
    justifyContent: 'center',     // Center content vertically
    marginTop: 5,                 // Some space above
  },

  statusText: {
    color: Colors.white_text_color,            // White text color for contrast
    fontWeight: 'bold',          // Bold text
    fontSize: 12,                // Slightly smaller font size for a cute effect
  },

  statusContainerColor: (status) => {
    switch (status) {
      case 'P': // Present
        return Colors.green_color; // Green
      case 'A': // Absent with Holiday
        return Colors.red; // Red
      case 'L': // Leave
        return Colors.blue_color; // Blue
      case 'PHY': // Physical Leave
        return Colors.spanish_pink_color; // Pink
      case 'WEO': // Work from Office
        return Colors.gray_text_color; // Gray
      case 'ABSHD': // Absence Half Day
        return Colors.pale_lavender; // Light Purple
      default:
        return Colors.default_color; // Default color
    }
  },

  date: {
    fontSize: SF(14),
    fontFamily:Fonts.Poppins_Bold,
    color:Colors.black_text_color,
    fontWeight: 'bold',
  },
  time: {
    fontSize: SF(12),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.gray_text_color,
  },
  type: {
    fontSize: SF(12),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.gray_text_color,
  },
  createdBy: {
    fontSize: SF(15),
    fontFamily:Fonts.Poppins_Italic,
    color:Colors.black_text_color,
  },
  ipAddress: {
    fontSize: SF(15),
    fontFamily:Fonts.Poppins_Italic,
    color:Colors.black_text_color,
  },
  PaddingHorizontal: {
    paddingHorizontal: SH(20)
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePickerWrapper: {
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    flex: 1, // Take full available space
  },
  
  selectedDateText: {
    fontSize: 12,
    color: Colors.text, // Adjust color based on theme
    marginTop: 5,
  },

  displayButtonWrapper: {
    marginTop: 5,
    alignItems: 'center',  // Center the button horizontally
  },
  displayButton: {
    backgroundColor: Colors.theme_background,  // Adjust the color based on theme
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayButtonText: {
    fontSize: 14,  // Text size for the button
    color: Colors.white_text_color, // Button text color
    fontWeight: 'bold',
  },

  inText: {
    color: Colors.green_color, // Green for 'In'
  },
  outText: {
    color: Colors.black_text_color, // Red for 'Out'
  },


  attendanceSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',  // Align items to start, instead of space-between
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: Colors.white_text_color,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,  // Compact padding
    borderRadius: 12,
    marginLeft: 5,
    marginRight: 5,  // Spacing between badges
    marginBottom: 8,  // Space at the bottom to avoid overflow
  },

  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white_text_color,
  },

  present: {
    backgroundColor: Colors.green_color, // Light green for Present
  },

  absent: {
    backgroundColor: Colors.red, // Light red for Absent
  },

  halfDay: {
    backgroundColor: Colors.pale_lavender, // Light orange for Half Day
  },

  leave: {
    backgroundColor: Colors.blue_color, // Light blue for Leave
  },

  weekoff: {
    backgroundColor: Colors.gray_text_color, // Light blue for Leave
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.white_text_color,
  },

  modalBox: {
    width: "80%",
    backgroundColor: Colors.light_gray_text_color,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    
  },
  buttonRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  button: {
    backgroundColor: Colors.white_text_color,
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: Colors.white,
    textAlign:'center',
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.black_text_color,
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  // submitButton: {
  //   backgroundColor: Colors.theme_background,
  //   padding: 10,
  //   borderRadius: 6,
  //   marginTop: 10,
  //   alignItems: "center",
  //   width: "100%",
  // },
  buttonRow: {
    flexDirection: 'row',  // Arrange buttons in a row
    justifyContent: 'center', // Center buttons horizontally
    alignItems: 'center', // Center buttons vertically
    marginTop: 15, // Add spacing above buttons if needed
  },

  submitButton: {
    backgroundColor: Colors.theme_background,
    padding: 10,
    borderRadius: 5,
    flex: 1, // Makes the button take up equal space in the row
    marginRight: 10, // Adds space between buttons
  },
  
  cancelButton: {
    backgroundColor: Colors.theme_background,
    padding: 10,
    borderRadius: 5,
    flex: 1, // Makes the button take up equal space in the row
  },
  
  
});