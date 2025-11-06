import { StyleSheet } from 'react-native';
import { SF, Fonts, SH,Colors } from '../../utils';

export default DropDownStyle = (Colors) => StyleSheet.create({
// export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme_background,

  },
  white_container: {
    flex: 1,
    backgroundColor: Colors.white_text_color,
    borderTopLeftRadius: SH(30),
    borderTopRightRadius: SH(30),
    padding: SH(20)

  },
  InOutcontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: SH(20)

  },
  InOutPart: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SH(10),
    borderRadius: SH(10),
    backgroundColor: Colors.white_text_color,
    elevation: 2,
    shadowColor: Colors.black_text_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center'
  },
  InOutTextStyle: {
    fontSize: SH(16),
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium
  },
  InOutIcon2: {
    backgroundColor: Colors.Light_theme_background,
    padding: SH(7),
    borderRadius: SH(10),
  },
  InOutIcon3: {
    backgroundColor:Colors.white_text_color,
    padding: SH(7),
    borderRadius: SH(10),
  },
  moduleBoxIcon: {
    backgroundColor: Colors.Light_theme_background,
    padding: SH(15),
    borderRadius: SH(100)
  },
  header: {
    flexDirection: 'colomn',
    paddingHorizontal: SH(20)
  },
  greeting: {
    fontSize: SH(20),
    color: Colors.white_color,
    fontFamily: Fonts.Poppins_Bold,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: SH(16),
    color: Colors.white_color,
    fontFamily: Fonts.Poppins_Italic,

  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SH(20)
  },
  summaryBoxTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SH(8),
    alignItems: 'center'
  },
  summaryBox: {
    width: '31%',
    backgroundColor:Colors.Light_theme_background,
    borderRadius: 10,
    alignItems: 'center',
    padding: SH(10)
  },
  LableText: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.black_text_color
  },
  summaryText: {
    fontSize: SF(25),
    fontFamily: Fonts.Poppins_Bold,
    fontWeight: 'bold',
    color: Colors.theme_background
  },
  summaryLabel: {
    fontSize: SF(1),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.gray_text_color
  },
  modulesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleBox: {
    width: '32%',
    padding: SH(5),
    backgroundColor: Colors.white_text_color,
    borderRadius: SH(10),
    alignItems: 'center',
    marginBottom: SH(20),
    elevation: 2,
    shadowColor: Colors.black_text_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  moduleLabel: {
    fontSize: SF(12),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color
  },


  moduleContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%', // Ensure the container takes full width
},


row: {
  flexDirection: 'row', // This will arrange items in a row
  justifyContent: 'space-between', // Ensure space is distributed evenly between the boxes
  alignItems: 'flex-start', // Align the content to the top of the container (heading on top)
  width: '100%', // Ensure it takes full width
},


moduleBoxContainer: {
  flex: 1, // Allow each box to take equal space
  marginRight: 8, // Space between the boxes
  alignItems: 'center', // Center-align the content inside the box container
},


headingText: {
  fontSize: SF(16), // Set the font size for the heading
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


moduleLabel1: {
  fontSize: SF(14), // Font size for labels
  fontFamily: Fonts.Poppins_Regular, // Regular style for labels
  color: Colors.text_color, // Text color
  marginBottom: SH(5), // Margin between EL and CL
},






// width: '32%',
//     padding: SH(5),
//     backgroundColor: Colors.white_text_color,
//     borderRadius: SH(10),
//     alignItems: 'center',
//     marginBottom: SH(20),
//     elevation: 2,
//     shadowColor: Colors.black_text_color,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,




















  // Dropdown_container

  Dropdown_container: {
    backgroundColor: Colors.theme_background,
    borderRadius: SH(200),
    overflow: 'hidden',
    width: SH(150),
    height: SH(50),
    borderWidth: SH(1),
    borderColor: Colors.white_color,
  },
  Dropdown_label: {
    color: Colors.light_gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(20),
  },
  Dropdown_dropdown: {
    height: SH(50),
    width: SH(150),
    borderColor: Colors.white_color,
    borderWidth: SH(1),
    borderRadius: SH(200),
    paddingHorizontal: SH(10),
    backgroundColor: Colors.theme_background,
  },
  Dropdown_placeholderStyle: {
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white_color,
  },
  Dropdown_selectedTextStyle: {
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.white_color,
  },
});