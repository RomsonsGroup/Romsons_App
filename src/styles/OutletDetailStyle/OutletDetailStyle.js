import { StyleSheet } from 'react-native';
import { Fonts, SH, SF, Colors } from '../../utils';

export default OutletDetailStyle = () => StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white_color, 
        padding: 10,
      },
      container: {
        backgroundColor: Colors.white_color, 
        padding: 15,
        borderRadius: 10,
        shadowColor: Colors.gray_text_color, 
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, 
      },
      

      infoContainer: {
        marginVertical: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },

      labelContainer: {
        flexDirection: 'row',
        marginBottom: 5, 
      },
      
      outletLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
      },
      

      valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
      },



      labelContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom: 5, 
      },

outletLabel1: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
        flex: 1, 
      },


      

      outletValue: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000',
        flex: 1, 
      },

      
      buttonText: {
        color: 'white', 
        fontSize: 12,    
        fontWeight: 'bold',
        textAlign: 'center',
      },

      buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'nowrap', 
        marginBottom: 25,
        // marginTop: 10,
        paddingHorizontal: 10, 
      },
      
      button: {
        backgroundColor: Colors.peach_orange,
        paddingVertical: 8, 
        paddingHorizontal: 12, 
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1, 
        marginHorizontal: 5, 
        minWidth: 80, 
      },
      
      
      
      


      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
      },
      dropdownContainer: {
        backgroundColor: Colors.black_color,
        padding: 20,
        borderRadius: 10,
        width: 200,
        elevation: 5, // For shadow on Android
      },
      option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.peach_orange,
      },
      optionText: {
        fontSize: 16,
        color: 'white'
      },
      selectedText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
      },


      pickerContainer: {
        marginTop: 20,
        marginHorizontal: 20,
      },
      pickerLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.peach_orange,
        marginBottom: 10,
      },
      pickerWrapper: {
        borderWidth: 1,
        borderColor: Colors.peach_orange,
        borderRadius: 5,
        overflow: "hidden",
      },

      addressContainer: {
        flexDirection: 'column', // Stack address and button vertically
        alignItems: 'flex-start', // Align items to the start (left)
        width: '100%', // Full width for the container
        paddingVertical: 10, // Optional: Adjust padding around the container
        position: 'relative', // Make sure the button is positioned relative to this container
      },

      callerNameContainer: {
        backgroundColor: Colors.white_text_color, // Light background
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        alignItems: "center",
        shadowColor: Colors.gray_text_color,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      },
      
      callerNameText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.black_text_color, // Dark text color
      },

      callerNameText3: {
        fontSize: 12,
        marginBottom: 10,
        fontWeight: "bold",
        color: Colors.black_text_color, // Dark text color
      },

      saveButton: {
        backgroundColor: '#007BFF', // Button color
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10, // Adds space between the address text and button
        alignSelf: 'flex-end', // Positions button at the right end of the container
      },
      saveButtonText: {
        color: 'white', // Text color for the button
        fontSize: 14, // Adjust the size of the text
      },




      

















    //   container2: {
    //     padding: 16,
    //     backgroundColor: Colors.white_text_color,
    //     borderRadius: 8,
    //     marginBottom: 16,
    //   },
    //   headerContainer2: {
    //     backgroundColor: Colors.wageningen_green, // Yellow color for header
    //     padding: 8,
    //     borderRadius: 4,
    //     marginBottom: 8,
    //   },
    //   headerText2: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: Colors.white_text_color,
    //     alignItems: 'center'
    //   },
    //   detailContainer2: {
    //     padding: 8,
    //     borderWidth: 1,
    //     borderColor: Colors.green_color,
    //     borderRadius: 8,
    //   },
    //   row2: {
    //     flexDirection: 'row',
    //     marginBottom: 8,
    //     justifyContent: 'space-between',
    //   },
    //   label2: {
    //     fontWeight: 'bold',
    //     color: Colors.blue_jeans_color,
    //   },
    //   value2: {
    //     color: Colors.green_color,
    //   },






    container3: {
        // margin: 10,
        // borderRadius: 8,
        // backgroundColor: Colors.white_text_color,
        // padding: 15,
        // borderWidth: 1,
        // borderColor: Colors.gray_text_color,  // Border for the whole container

        backgroundColor: Colors.white_color, // white background for the details container
        padding: 5,
        borderRadius: 10,
        shadowColor: Colors.gray_text_color, // shadow for better depth
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Android shadow
      },
      headerText3: {
        fontSize: 13,
        fontWeight: 'bold',
        color: Colors.white_text_color,
        backgroundColor: Colors.peach_orange,  // Yellow background for header
        padding: 10,
        borderRadius: 6,
        textAlign: 'center',
        justifyContent: 'center',  // Vertically centers the content if needed
  alignItems: 'center',  // Aligns the text in the center horizontally and vertically if needed
      },
      orderInfo3: {
        fontSize: 12,
        color: Colors.black_text_color,
        marginBottom: 7,
        marginLeft: 15
      },
      orderInfo4: {
        fontSize: 12,
        color: Colors.black_text_color,
        marginLeft: 15
       
      },
      details3: {
        marginTop: 10,
      },
      row3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      rowLabel3: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 2,
        color: Colors.black_text_color,
        marginLeft:15
      },
      rowValue3: {
        fontSize: 11,
        marginTop: 2,
        color: Colors.black_text_color,
        // marginRight: 15,
        marginLeft: 25
      },
      
      


      modalOverlay4: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      dropdownContainer4: {
        width: '90%',
        maxHeight: '70%', // Limits the height to make room for scrolling
        backgroundColor: Colors.black_color,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
      },
      
      option4: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.peach_orange,
      },
      
      optionText4: {
        fontSize: 16,
        color: Colors.white_text_color,
      },
      
      skuContainer: {
        backgroundColor: Colors.white_text_color,
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.white_text_color,
      },
      skuHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray_text_color,
        paddingBottom: 5,
        marginBottom: 8,
      },
      skuDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 7,
      },
      skuHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.black_text_color,
        flex: 1,
        textAlign: 'center',
      },
      skuText: {
        fontSize: 12,
        color: Colors.black_text_color,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left'
        // textAlign: 'center',
      },

      skuText1: {
        fontSize: 12,
        color: Colors.black_text_color,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
});
