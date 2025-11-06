import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default ExpenseStyle = (Colors) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Colors.white_text_color,
    },
    title: {
        fontSize: SF(20),
        fontWeight: 'bold',
        marginBottom: SH(20),
    },
    dateButton: {
        padding: SF(15),
        backgroundColor: Colors.white_text_color, // Use dynamic colors
        borderRadius: 5,
        marginBottom: SH(20),
        borderColor: 'black',
        borderWidth: 1, // Ensures the border is visible
    },
    
    dateButtonText: {
        color: Colors.textColor, // Use dynamic colors
        fontSize: SF(15),
    },
    expenseTypeContainer: {
        alignItems: 'center',
        marginTop: SH(20),
    },
    expenseTypeHeading: {
        fontSize: SF(20),
        marginBottom: SH(10),
        color: Colors.black_color,
    },
    selectButton: {
        padding: SF(15),
        backgroundColor: Colors.theme_background, // Use dynamic colors
        borderRadius: 5,
        marginTop: SH(10),
        borderColor: 'black',
        borderWidth: 1, // Ensures the border is visible
    },
    disabledButton: {
        backgroundColor: Colors.theme_background,
        // borderColor: 'black',
        borderWidth: 1, // Ensures the border is visible // Use dynamic colors
    },
    selectButtonText: {
        color: Colors.white_color, // Use dynamic colors
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
        
        //   fontSize: SF(17),
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'Colors.theme_background',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.white_color, // Use dynamic colors
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: SF(20),
        fontWeight: 'bold',
        marginBottom: SH(20),
    },
    optionButton: {
        padding: SF(15),
        backgroundColor: Colors.theme_background, // Use dynamic colors
        borderRadius: 5,
        marginVertical: SH(5),
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: SF(16),
        color: Colors.white_color, // Use dynamic colors
        fontFamily: Fonts.Poppins_Medium,
    },
    closeButton: {
        marginTop: SH(20),
        padding: SF(10),
        backgroundColor: Colors.argent_color, // Use dynamic colors
        borderRadius: 5,
    },
    closeButtonText: {
        color: Colors.white_color, // Use dynamic colors
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
    },
});
