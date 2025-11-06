import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default TasksStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: '#ff914d',
    },
    profileSection: {
      alignItems: 'center',
      backgroundColor: Colors.theme_background,
      borderBottomRightRadius: SH(40),
      borderBottomLeftRadius: SH(40),
  
    },
    profileImage: {
      width: "100%",
      height: SH(300),
      borderRadius: 50,
    },
    profileName: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    newTaskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: SH(20),
      paddingVertical: SH(10),
      backgroundColor: Colors.white_text_color,
      alignItems: 'center',
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: SH(7),
      borderRadius: SH(10)
    },
    newTaskText: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
    },
    newTaskButton: {
      backgroundColor: Colors.theme_background,
      borderRadius: 50,
      padding: SH(10),
    },
    ongoingTaskText: {
      fontSize: SF(20),
      fontFamily: Fonts.Poppins_Bold,
      color: Colors.black_text_color,
      fontWeight: 'bold',
    },
    taskContainer: {
      flexDirection: 'row',
      paddingHorizontal: SH(20),
      paddingVertical: SH(10),
      backgroundColor: Colors.white_text_color,
      marginBottom: SH(20),
      borderRadius: SH(10),
      alignItems: 'center',
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: SH(7),
    },
    taskDetails: {
      marginLeft: 20,
    },
    taskName: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      fontWeight: 'bold',
    },
    taskDate: {
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.black_text_color,
    },
    taskTime: {
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.black_text_color,
    },
    PaddingHorizontal: {
      paddingHorizontal: SH(20)
    },
    TaskIcon:{
      padding:SH(15),
      backgroundColor:Colors.Light_theme_background,
      borderRadius:SH(20)
    }
});