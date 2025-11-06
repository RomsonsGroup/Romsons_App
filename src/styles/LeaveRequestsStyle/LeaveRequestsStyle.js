import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default LeaveRequestsStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color,
    },
    PaddingHorizontal: {
      paddingHorizontal: SH(20)
    },
    card: {
      backgroundColor: Colors.white_text_color,
      borderRadius: SH(10),
      padding: SH(20),
      marginBottom: SH(20),
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flexDirection: 'column',
    },
    leaveId: {
      color:Colors.theme_background,
      fontFamily:Fonts.Poppins_Bold,
      fontSize: SF(18),
      fontWeight: 'bold',
    
    },
    appliedOn: {
      color:Colors.black_text_color,
      fontFamily:Fonts.Poppins_Medium,
      fontSize: SF(15),
      marginTop: 5,
    },
    viewDetails: {
      color: Colors.theme_background,
      fontWeight: 'bold',
    },
    details: {
      marginTop: SH(15),
      borderTopWidth: 1,
      borderTopColor: Colors.light_gray_text_color,
      paddingTop: SH(10)
    },
    detailText: {
      marginBottom: 5,
      color:Colors.gray_text_color,
      fontFamily:Fonts.Poppins_Medium,
      fontSize: SF(14),
    },
    attachmentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
});