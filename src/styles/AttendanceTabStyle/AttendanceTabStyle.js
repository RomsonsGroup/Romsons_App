import { fonts } from '@rneui/base';
import { Fonts, SH,  SF, Colors, SW } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default AttendanceTabStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      padding:SH(0),
      backgroundColor: Colors.white_text_color,
    },
    PaddingHorizontal:{
      paddingHorizontal:SH(20)
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal:SH(20),
    },
    headerDate: {
      fontSize: SH(20),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
    totalEmployees: {
      fontSize: SH(16),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.gray_text_color,

    },
    employeeCount: {
      fontSize: SH(25),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
    listContainer: {
      backgroundColor: Colors.white_text_color,
      paddingBottom: SH(50),
    },
    employeeItem: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      backgroundColor:  Colors.white_text_color,
      padding:SH(10),
      borderRadius:SH(10),
      marginBottom: SH(20),
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
    },
    profileImage: {
      width: SH(50),
      height:  SH(50),
      borderRadius:SH(50),
      marginRight: SH(10),
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
    },
    employeeInfo: {
      marginRight: SH(10),
    },
    employeeName: {
      fontSize: SH(15),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
    },
    employeeDetails: {
      fontSize: SH(13),
      fontFamily:Fonts.Poppins_Italic,
      color:Colors.gray_text_color,
    },
    timeInfo: {
      alignItems: 'flex-end',
      marginRight: SH(15),
    },
    timeText: {
      fontSize: SH(14),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.black_text_color,
    },
    buttonContainer: {
      flexDirection: 'column',
    },
    outTimeButton: {
      backgroundColor: Colors.theme_background,
      paddingVertical: SH(5),
      paddingHorizontal:SH(10),
      borderRadius:SH(5),
    },
    buttonText: {
      fontSize: SF(12),
      fontFamily:Fonts.Poppins_Medium,
      color:Colors.white_color,
    },
    container2: {
      flex: 1,
      backgroundColor: Colors.white_text_color,
    },
    header2: {
      alignItems: 'center',
      backgroundColor:Colors.theme_background,
      borderBottomLeftRadius:SH(40),
      borderBottomRightRadius:SH(40),

    },
    profileImage2: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    empId2: {
      fontSize: SF(18),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.light_gray_text_color
    },
    empName2: {
      fontSize: SF(20),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.white_color,
      fontWeight: 'bold',
    },
    timeSection2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.white_text_color,
      padding:SH(10),
      borderRadius: 10,
      marginBottom: 16,
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
      alignItems:'center'
    },
    timeSection3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.white_text_color,
      padding:SH(10),
      borderRadius: 10,
      alignItems:'center',
      borderBottomColor:Colors.light_gray_text_color,
      borderBottomWidth:SH(0.5)
    },
    timeSectionFlexRow:{
      flexDirection:'row',
      alignItems:'center'
    },
    timeText2: {
      fontSize: SF(18),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
    dateText2: {
      fontSize: SF(20),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.theme_background,
    },
    dateText3: {
      fontSize: SF(18),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.black_text_color,
      paddingLeft:SH(10)
    },
    statisticsSection2: {
      backgroundColor: Colors.white_text_color,
      padding:SH(20),
      borderRadius: 10,
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
    },
    statisticsSectionFlex2:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    statisticsTitle2: {
      fontSize: SF(18),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
    statsContainer2: {
      alignItems: 'center',
      backgroundColor:Colors.Light_theme_background,
      padding:SH(25),
      borderRadius:SW(10)

    },
    statsText2: {
      fontSize: SF(25),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.theme_background,
      fontWeight: 'bold',
    },
    statsLabel2: {
      fontSize: SF(14),
      fontFamily:fonts.Poppins_Italic,
      color:Colors.gray_text_color,
    },
    leaveRequest2: {
      backgroundColor: Colors.Light_theme_background,
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 16,
      
    },
    leaveRequestText2: {
      fontSize: SF(16),
      fontFamily:fonts.Poppins_Medium,
      color:Colors.black_text_color,
    },
    leaveInfoSection2: {
      backgroundColor: Colors.white_text_color,
      paddingHorizontal: SH(10),
      borderRadius:SH(10),
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
    },
    leaveInfoSectionPro: {
      backgroundColor: Colors.white_text_color,
      borderRadius:SH(10),
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.2, 
      shadowRadius: 8, 
    },
    leaveInfoText2: {
      fontSize: SF(18),
      fontFamily:fonts.Poppins_Italic,
      color:Colors.black_text_color,
      borderBottomColor:Colors.light_gray_text_color,
      borderBottomWidth:SH(0.5),
      paddingBottom:SH(10),
      marginBottom:SH(10)
    },
    ProfileIcon: {
      backgroundColor: Colors.Light_theme_background,
      padding: SH(10),
      borderRadius: SH(10)
    },
});