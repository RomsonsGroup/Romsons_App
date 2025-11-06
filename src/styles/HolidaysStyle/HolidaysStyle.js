import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default HolidaysStyle = (Colors) => StyleSheet.create({
   container: {
      flex: 1,
      padding: SH(20),
      backgroundColor: Colors.white_text_color
    },
    title: {
      fontSize: SH(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    },
    pickerBorder: {
      borderWidth: SH(1),
      borderColor: Colors.light_gray_text_color,
      borderRadius: SH(10),
      alignItems:'center'
    },
    picker: {
      height: SH(50),
      width: '100%',
      marginTop:SH(-10),
      color:Colors.black_text_color

    },
    row: {
      flexDirection: 'row',
      paddingVertical: SH(13),
      fontSize: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors.light_gray_text_color,
    },
    headerRow: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: Colors.light_gray_text_color,
      paddingBottom: 10,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      fontSize: SH(15),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
    },
    header: {
      fontSize: SH(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      fontWeight: 'bold',
    },
});