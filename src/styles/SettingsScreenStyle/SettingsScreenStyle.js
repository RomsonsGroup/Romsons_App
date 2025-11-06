import { StyleSheet } from 'react-native';
import { SF, Fonts, SH, widthPercent, heightPercent, hexToRgba, Colors } from '../../utils';
export default HomeTabStyle = (Colors) => StyleSheet.create({
  // export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color
    },
    tasksTitle: {
      color: Colors.black_text_color,
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(20),
    },
    task: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(10),
      borderBottomWidth:SH(0.5),
      paddingBottom:SH(10),
      borderBottomColor:Colors.light_gray_text_color
    },
    taskIcon: {
      padding: SH(10),
      backgroundColor: "#bfc0f2",
      borderRadius: SH(200)
    },
    taskRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    taskTitleView: {
      paddingLeft: SH(15)
    },
    OverdueView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    taskTitle: {
      color: Colors.black_text_color,
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(18),
    },
    taskDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    taskTime: {
      color: Colors.gray_text_color,
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Italic
    },
    PaddingHorizontal:{
      paddingHorizontal:SH(20)
    },
    SettingIcon: {
      backgroundColor: Colors.Light_theme_background,
      padding: SH(10),
      borderRadius: SH(10)
    },
});