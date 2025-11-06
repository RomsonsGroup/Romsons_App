import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default ExpenseHqStyle = (Colors) => StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: Colors.backgroundColor || '#f0f0f0', // Use Colors from your utils
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: SF(18), // Use a scaling function for font size if available
        color: Colors.textColor || '#333', // Use Colors from your utils
    },
    value: {
        fontSize: SF(18),
        fontWeight: 'bold',
        color: Colors.textColor || '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.borderColor || '#ccc', // Use Colors from your utils
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: Colors.inputBackground || '#fff', // Use Colors from your utils
    },
    inputText: {
        color: Colors.textColor || '#333',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: Colors.modalBackground || '#fff', // Use Colors from your utils
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: SF(18),
        marginBottom: 15,
        fontWeight: 'bold',
    },
    modalOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: Colors.borderColor || '#ccc', // Use Colors from your utils
    },
    modalOptionText: {
        fontSize: SF(16),
        color: Colors.textColor || '#333',
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
        alignSelf: 'center'
    },
    addIcon: {
        alignItems: 'center',
        marginBottom: 15,
    },
    addButtonText: {
        fontSize: SF(24),
        color: 'black',
    },

    ButtonView: {
        borderRadius: SH(70),
        marginBottom: SH(20),
        color: Colors.white_color, // Use dynamic colors
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
    },
});
    

