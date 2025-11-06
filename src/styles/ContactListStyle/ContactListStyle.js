import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default ContactListStyle = (Colors) =>
    StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: SH(20),
    paddingBottom: SH(20),
  },

  taskContainer: {
    backgroundColor: Colors.white_text_color,
    padding: SH(10),
    marginBottom: SH(5),
    marginTop: 20,
    borderRadius: SH(8),
    elevation: 2,
    shadowColor: Colors.black_text_color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: SH(3),
  },

  taskDetails: {
    flexDirection: 'column',
  },

  taskName: {
    fontSize: SF(12),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(5),
  },

  taskTime: {
    fontSize: SF(14),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.black_text_color,
  },

  taskDate: {
    fontSize: 12, 
    color: 'gray',
    fontWeight: 'bold',
    color: Colors.black_text_color,
    
  },

  taskTime1: {
    fontSize: 12, 
    fontWeight: 'bold',
    color: 'green', 
   
  },
});

      
