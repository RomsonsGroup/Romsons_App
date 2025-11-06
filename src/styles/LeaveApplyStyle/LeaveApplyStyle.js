import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default LeaveApplyStyle = (Colors) => StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: SH(20),
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white_text_color,
    },
    formContainer: {
        width: '100%',
        padding: SH(20),
        borderRadius: 10,
        backgroundColor: Colors.white_text_color,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },
    headingText: {
        fontSize: SF(28),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color,
        marginBottom: SH(20),
        textAlign: 'center',
    },
    label: {
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.gray_text_color,
        marginBottom: SH(5),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    statusContainer: {
        backgroundColor: Colors.gray_text_color,  // Light blue background
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: SH(20),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SH(30),
    },
    datePickerContainer: {
        flex: 1,
        marginRight: SH(10),
        // Adjust spacing between the two pickers
    },
    dateButton: {
        padding: SH(10),
        backgroundColor: Colors.theme_background,
        borderRadius: SH(5),
        marginBottom: SH(20),
    },
    dateText: {
        color: Colors.white_text_color,
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.gray_text_color,
        marginBottom: SH(8),
    },
    ButtonView: {
        borderRadius: SH(70),
        marginBottom: SH(20),
    },


    container: {
        margin: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },


    datePicker: {
        fontSize: SF(16),
        marginVertical: SH(10),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color,
        marginBottom: SH(20),
        textAlign: 'center',
    },


    moduleBox: {
        backgroundColor: Colors.box_background, // Example background color
        padding: 16, // Padding inside the box
        borderRadius: 8, // Rounded corners
        marginBottom: 12, // Space between modules
        shadowColor: '#000', // Optional shadow for better visual separation
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        flexDirection: 'column', // Stack the text vertically
        justifyContent: 'center', // Center the content
        alignItems: 'center', // Center the items horizontally
    },

    moduleContent: {
        flexDirection: 'row', // Align EL: and CL: side by side
        justifyContent: 'space-between', // Spread out EL: and CL: 
        width: '100%', // Ensure they use the full width of the TouchableOpacity
    },

    moduleLabel: {
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Regular,
        color: Colors.text_color, // Adjust based on your design
        marginRight: 10, // Space between EL: and CL:
    },



});
