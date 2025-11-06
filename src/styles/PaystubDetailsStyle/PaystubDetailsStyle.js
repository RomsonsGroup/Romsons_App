import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default PaystubDetailsStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color,
      padding:SH(20),
    },
    section: {
      backgroundColor:Colors.white_text_color,
      borderRadius:SH(10),
      padding: SH(15),
      marginBottom:SH(20),
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: SF(20),
      fontFamily:Fonts.Poppins_Bold,
      color:Colors.black_text_color,
      fontWeight: 'bold',
      marginBottom:SH(8)
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: SH(5),
    },
    label: {
      fontSize: SF(16),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.gray_text_color,
      fontWeight: 'bold',
    },
    value: {
      fontSize: SF(16),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.gray_text_color,
    },
    valueBold: {
      fontSize: SF(16),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
    footer: {
      alignItems: 'center',
    },
    footerText: {
      fontSize: SF(17),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
    },
    footerTime: {
      fontSize: SF(16),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.gray_text_color,
    },
});