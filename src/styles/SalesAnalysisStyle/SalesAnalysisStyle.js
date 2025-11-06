import { Fonts, SH, SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
export default SalesAnalysisStyle = (Colors) => StyleSheet.create({
    
    pendingButton: {
        backgroundColor: Colors.theme_background,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 6,
        marginBottom: 16,
        alignSelf: 'center',
        marginRight: 150,
    },
    pendingText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: SF(5),
        backgroundColor: "#fff",
        marginTop: SH(10),
      },
      
    dropdownPicker: { 
        height: 40, 
        width: '100%', 
        color: Colors.brown,
        fontWeight: 'bold',
        fontSize: 12, 
      },

      row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: SH(20),
      },
      datePickerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, // To make sure both date pickers fit in a row
      },
      datePickerContainer: {
        flex: 1, // Reduce size of each picker
        marginRight: SH(5), // Reduce gap to fit "Go" button
      },
      label: {
        fontSize: SF(13),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color,
      },
      datePicker: {
        fontSize: SF(13),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color,
        textAlign: "center",
      },
      goButton: {
        paddingVertical: SH(8),
        paddingHorizontal: SH(15),
        marginTop: 20,
        backgroundColor: Colors.theme_background,
        borderRadius: SH(5),
      },
      goButtonText: {
        fontSize: SF(14),
        fontFamily: Fonts.Poppins_Bold,
        color: 'white',
        textAlign: "center",
      },

//   submitButton: {
//     backgroundColor: "#007bff",  // Soft Blue Color
//     width: SH(40),  // Small Width
//     height: SH(40),  // Small Height
//     borderRadius: SH(20),  // Fully Rounded for a Cute Look
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: SH(10),  // Space between To Date and Submit Button
//     elevation: 3,  // Light Shadow for 3D Effect
//   },
  
//   submitButtonText: {
//     color: "#fff",
//     fontSize: SF(16),  // Cute, Readable Font
//     fontFamily: Fonts.Poppins_Bold,
//   },

pendingButton: {
    backgroundColor: Colors.theme_background,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '30%',
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black_text_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Right alignment
    alignSelf: 'flex-end',  // This aligns the button to the right
  },
  pendingText: {
    color: 'white',
    fontSize: 14,  
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  moduleBoxContainer: {
    flex: 1, // Allow each box to take equal space
    marginRight: 8, // Space between the boxes
    alignItems: 'center', // Center-align the content inside the box container
  },
  headingText: {
    fontSize: SF(14), // Set the font size for the heading
    fontFamily: Fonts.Poppins_Bold, // Bold style for headings
    color: Colors.black_text_color, // Text color for headings
    marginBottom: 8, // Space between heading and the box content
    textAlign: 'center', // Ensure the heading is centered
  },
  moduleBox1: {
    width: '100%',
    padding: SH(5), // Adjust padding
    // backgroundColor: Colors.white_text_color, // Background color
    backgroundColor: Colors.theme_background,
    borderRadius: SH(10), // Rounded corners
    alignItems: 'center', // Center align the content
    marginBottom: SH(20), // Space below the box
    elevation: 2, // Shadow elevation for Android
    shadowColor: Colors.black_text_color, // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 8, // Shadow blur radius
  },
  moduleContent: {
    flexDirection: 'column', // Stack EL and CL vertically
    justifyContent: 'center', // Center items vertically within the container
    width: '100%', // Ensure content spans the full width of the box
    alignItems: 'flex-start', // Align items to the left
    paddingHorizontal: 10, // Optional: Add some padding for spacing
  },
  moduleContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%', // Ensure the container takes full width
},
row1: {
  flexDirection: 'row', // This will arrange items in a row
  justifyContent: 'space-between', // Ensure space is distributed evenly between the boxes
  alignItems: 'flex-start', // Align the content to the top of the container (heading on top)
  width: '100%', // Ensure it takes full width
},
    
});