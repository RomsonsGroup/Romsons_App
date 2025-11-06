import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default PayrollStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color,
      padding: SH(20),
    },

    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tabButton: {
      backgroundColor: Colors.Light_theme_background,
      padding: SH(10),
      borderRadius: SH(10),
      flex: 1,
      alignItems: 'center',
      marginHorizontal: SH(5),
    },
    tabText: {
      fontSize: SF(16),
      fontFamily: Fonts.Poppins_Bold,
      fontWeight: 'bold',
      color: Colors.black_text_color
    },
    netSalaryBox: {
      backgroundColor: Colors.theme_background,
      borderRadius: SH(10),
      padding: SH(15),
    },
    netSalaryTitle: {
      color: Colors.white_color,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    salaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    salaryColumn: {
      alignItems: 'center',
    },
    salaryValue: {
      color: Colors.white_color,
      fontSize: SF(25),
      fontFamily: Fonts.Poppins_Bold,
      fontWeight: 'bold',

    },
    salaryLabel: {
      fontSize: SF(12),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.white_color
    },
    detailSection: {
      backgroundColor: Colors.white_text_color,
      borderRadius: 8,
      padding: 15,
      marginBottom: SH(20),
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    detailTitle: {
      fontWeight: 'bold',
      fontSize: SF(16),
      fontFamily: Fonts.Poppins_Bold,
      color: Colors.black_text_color
    },
    detailText: {
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color
    },
});