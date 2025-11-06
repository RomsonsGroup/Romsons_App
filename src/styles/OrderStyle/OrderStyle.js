import { StyleSheet } from 'react-native';
import { Fonts, SH, SF, SW, Colors } from '../../utils';

export default OrderStyle = () => StyleSheet.create({
 

    PaddingHorizontal: {
        paddingHorizontal: 15,
      },
      taskContainer: {
        flexDirection: 'column',
        paddingHorizontal: SH(20),
        paddingVertical: SH(10),
        backgroundColor: Colors.white_text_color,
        marginBottom: SH(20),
        marginTop: 15,
        borderRadius: SH(10),
        alignItems: 'flex-start',
        elevation: 2,
        shadowColor: Colors.black_text_color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: SH(7),
        height: SH(120), // Ensure enough space for all content
      },
      taskDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        
      },
      taskName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: SH(5),
        flexWrap: 'wrap',
      },
      taskDate: {
        fontSize: 14,
        color: 'green',
        flexWrap: 'wrap',
        marginRight: 10,
        fontWeight:'bold'
      },
      taskTime: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',
        // marginLeft: 10,
        marginRight: 10,
        flexWrap: 'wrap',
      },
      taskTime1: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        // marginTop: 10,
        // marginBottom: 20
      },
      inputBox: {
        height: 40,
        width: 80, // Adjust width for better alignment
        borderWidth: 1,
        borderColor: Colors.wageningen_green,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 14,
        color: Colors.black_color,
        backgroundColor: Colors.white_text_color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    // Task container with flex adjustment
    // Main container for the product details
// Task container
// Task container
taskContainer1: {
    flexDirection: 'column',
    paddingHorizontal: SH(10),
    paddingVertical: SH(10),
    backgroundColor: Colors.white_text_color,
    marginBottom: SH(10),
    marginTop: 20,
    borderRadius: SH(10),
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: Colors.black_text_color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: SH(7),
    height: SH(120),  // Adjusted height to fit content
  },
  
  // Product name/title
  taskName1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    marginBottom: 5
  },
  
  // Row container for input and dropdown
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  // Text input box
  inputBox1: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.white_text_color,
  },
  // Dropdown container
  dropdownContainer: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    // borderColor: Colors.green,
    borderRadius: 8,
    backgroundColor: Colors.white_text_color,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 5, // Add if your dropdown isn’t centered
  },
  
  // Dropdown picker style
  dropdownPicker: { 
    height: 40, 
    width: '100%', 
    color: Colors.brown,
    fontWeight: 'bold',
    fontSize: 14, 
  },
  
  // Horizontal padding
  PaddingHorizontal1: { 
    paddingHorizontal: 20
  },
  
  
  
  
  ///////////////////order summary/////////////////////////

  
  submitButtonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: Colors.gray_text_color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: Colors.blue_jeans_color,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: Colors.black_text_color,

  },
  
  PaddingHorizontal6: {
    paddingHorizontal: 15,
  },
  taskContainer2: {
    marginBottom: SH(20),
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white_color,
    elevation: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.black_text_color,
  },
  outletInfoContainer: {
    marginBottom: 5,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.gray_text_color,
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  outletRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  outletLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    width: '40%',
  },
  outletValue: {
    fontSize: 12,
    marginRight: 20,
    fontWeight: 'bold',
    color: Colors.peach_orange,
    width: '60%',
  },

  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.black_color,
  },
  divider5: {
    height: 1,
    backgroundColor: Colors.gray_text_color,
    marginVertical: 10,
  },
  summaryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.peach_orange,
    marginTop: 10,
    justifyContent: 'center',
  alignItems: 'center',
       
  },
  summaryTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_text_color,
    paddingBottom: 5,
  },
  tableHeaderTextLeft: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    flex: 2,
    textAlign: 'left',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: "center",
    borderBottomColor: Colors.gray_text_color,
    paddingVertical: 6,
  },

    
  tableCell: {
    flex: 0.6, // Adjust for proportional widths
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: 'auto',
  },

  tableCellLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },


tableDataLeft: {
    fontSize: 12,
    textAlign: 'left',
    color: Colors.black_color,
    fontWeight:'bold'
    
  },

  tableDataLeft6: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft:20,
    color: Colors.brown,
    fontWeight:'bold'

    
  },

  tableDataSecondary: {
    fontSize: 12,
    color: Colors.gray_text_color,
    marginTop: 2,
  },
  


tableData: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.blue_color,
    fontWeight: 'bold',
    flexDirection: 'row',
    maxWidth: '100%',  // Ensures it does not exceed the parent width
    overflow: 'hidden',  // Ensures that overflow text is hidden
    width: 'auto', // Allows the text to stay in a single line without wrapping
    flexShrink: 1, // Ensures the text can shrink if needed
  },
  tableData56: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.blue_color,
    fontWeight: 'bold',
    maxWidth: '100%', // Ensure text stays within parent width
    overflow: 'hidden', // Clip over
  },
  tableData0: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white_color,
    
  },
  
  tableData11: {
    fontSize: 12,
    textAlign: 'center',
    marginRight: 70
  },

  tableData8 : {
    marginRight: 30,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.black_color,

  },
  tableGy : {
    marginRight: 30,
    textAlign: 'center',
    fontSize: 12,
  },

  tableData3: {
    fontSize: 12,
    color: Colors.blue_jeans_color,
    textAlign: 'center',
    marginRight: 30
  },

  tableData4 : {
    fontSize: 12,
    color: Colors.blue_jeans_color,
    textAlign: 'center',
    marginRight: 40
  },
  


tableData1: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.blue_color,
    fontWeight: 'bold'
    
  },

  tableData10: {
    fontSize: 12,
    textAlign: 'center',
    flex: 2
  },

  tableData9: {
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 100,
    color: Colors.black_color,
    fontWeight: 'bold'
    
  },

  tableData91: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.black_color,
    fontWeight: 'bold',
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: 'auto',
    marginLeft: 50,
    width: '100%',
    overflow: 'hidden',
    
  },
  
    
  
  totalRow: {
    flexDirection: 'row',
    backgroundColor: Colors.light_gray_text_color,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.white_text_color,
  },
  
  /////////////////////////// Item order footer section//////////////////////////
  
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.gray_text_color, // Footer ka background color
    padding: 5,
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    borderTopWidth: 1,
    borderColor: Colors.light_gray_text_color,
  },
  footerItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    minWidth: 90,
  },
  
  footerLabel: {
    fontSize: 13,
    color: Colors.white_text_color,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  
  footerValue: {
    fontSize: 15,
    color: Colors.black_text_color,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  
 
  footerButton: {
    backgroundColor: Colors.blue_jeans_color,
    fontFamily:Fonts.Poppins_Medium,
    paddingVertical: 9,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerButton5: {
    backgroundColor: Colors.white_text_color,
    fontFamily: Fonts.Poppins_Medium,
    marginTop: 10,
    paddingVertical: 5, // Reduced padding for a thinner button
    paddingHorizontal: 12, // Reduced horizontal padding for a smaller button
    borderRadius: 8,
    alignSelf: 'flex-end', // Align button to the right
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.peach_orange,
    borderWidth: 2,
  },
  
  footerButtonText5: {
    color: Colors.black_text_color,
    fontSize: 14, // Reduced font size for a smaller text
    fontWeight: 'bold',
  },
  
  footerButtonText: {
    color: Colors.black_text_color,
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    width: 1, // Divider ki width (vertical line)
    height: '90%', // Height of the divider
    backgroundColor: Colors.black_text_color,
    marginRight: 30 // Divider ka color
  },
  

  divider1: {
    width: 1, // Divider ki width (vertical line)
    height: '90%', // Height of the divider
    backgroundColor: Colors.black_text_color,
    marginRight: 10 // Divider ka color
  },




///////////////////////sale return footer section//////////////////
saleReturnFooterContainer: {
    backgroundColor: Colors.gray_text_color, // Footer ka background color
    padding: 5,
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    borderTopWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center', // Center align the save button
  },
  footerButton1: {
    backgroundColor: Colors.blue_jeans_color,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width:'40%',
    alignItems: 'center', // Button width to give some space on sides
  },
  footerButtonText1: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },


  footerButton8: {
    backgroundColor: Colors.blue_jeans_color,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Full width to cover the bottom of the screen
    position: 'absolute', // Absolute positioning
    bottom: 0, // Placed at the bottom of the screen
    left: 0,
    right: 0 // Starts from the left edge of the screen
  },

  
footerButtonText8: {
    backgroundColor: Colors.blue_jeans_color, // Add background color for visibility
    color: 'white', // Set text color to white for contrast
    fontSize: 16, // Increase font size for better readability
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 12, // Adjust padding for a better button shape
    paddingHorizontal: 20, // Horizontal padding to make the button wider
    borderRadius: SH(70),// Adjust border radius for rounded corners
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
  },
  
  

  footerButtonText2: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },

  footerButton2: {
    backgroundColor: Colors.blue_jeans_color,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    marginLeft: 0,
    width: '40%', // Button width to give some space on sides
  },





    
  
  
})