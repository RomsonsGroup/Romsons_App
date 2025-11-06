import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Ensure this import is correct

export default TeamStyle = (Colors) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.white_text_color,
      },
      header: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.black_text_color,
        textAlign: 'center'
      },
      teamMemberCard: {
        backgroundColor: Colors.white_text_color,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: Colors.gray_text_color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
      },
      name: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.black_text_color,
        alignItems:'center'
      },
      detail: {
        fontSize: 14,
        color: Colors.black_text_color,
        marginBottom: 4,
      },

      label: {
        // fontWeight: 'bold', // You can style this however you want
        color: Colors.black_text_color, // Color for the label part (Designation:)
      },
      value: {
        color: Colors.black_text_color,
        fontSize: 12,
        fontWeight: 'bold', // Color for the value part (item.designation)
      },
      status: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      submitted: {
        color: Colors.green_color,
        fontWeight: 'bold' 
      },
      notSubmitted: {
        color: Colors.red,
        fontWeight: 'bold'
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black_text_color,
      },
  
});
