import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default RetailActivityStyle = (Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: SF(16),
      paddingVertical: SH(16),
      backgroundColor: Colors.white_text_color, // Use a dynamic background color
    },
    heading: {
      fontSize: SF(14),
      fontWeight: 'bold',
      color: Colors.black_color,
      textAlign: 'center',
      marginBottom: SH(12),
    },
    pickerContainer: {
      position: 'relative',
      width: '100%',
      borderColor: Colors.gray_text_color,
      borderWidth: 1,
      borderRadius: SF(8),
      backgroundColor: Colors.white,
      marginBottom: SH(16),
    },
    picker: {
      height: SH(50),
      width: '100%',
      color: Colors.text,
    },
    placeholder: {
      position: 'absolute',
      top: SH(12),
      left: SF(10),
      fontSize: SF(14),
      color: Colors.placeholder,
      zIndex: 1,
    },
    submitButton: {
      backgroundColor: Colors.gray_text_color,
      paddingVertical: SH(12),
      borderRadius: SF(8),
      alignItems: 'center',
      alignSelf: 'center',
      width: '30%',
    },
    submitButtonText: {
      fontSize: SF(16),
      color: Colors.white_text_color,
      fontWeight: 'bold',
    },
  });
