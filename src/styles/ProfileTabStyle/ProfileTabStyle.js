import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default ProfileTabStyle = (Colors) => StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: Colors.white_text_color,
      paddingHorizontal: SH(20),
    },
    container1: {
      flexGrow: 1,
      backgroundColor: Colors.white_text_color,
    },
    PaddingHorizontal:{
      paddingHorizontal:SH(20)
    },
    profileSection: {
      alignItems: 'center',
    },
    profileImage: {
      width: SH(120),
      height: SH(120),
      borderRadius: SH(100),
    },
    profileName: {
      fontSize: SF(25),
      fontFamily: Fonts.Poppins_Bold,
      fontWeight: 'bold',
      color: Colors.black_text_color,
    },
    profilePhone: {
      fontSize: SF(16),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.gray_text_color,
    },
    menuSection: {
      width: '100%',
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SH(15),
      borderBottomWidth: 1,
      borderBottomColor: Colors.light_gray_text_color,
    },
    iconPlaceholder: {
      width: SH(40),
      height: SH(40),
      borderRadius: 15,
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SH(20),
    },
    menuLabel: {
      flex: 1,
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
    },
    arrow: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
    },
    editIcon:{
      position:'absolute',
      bottom:SH(5),
      right:SH(5),
      padding:SH(5),
      backgroundColor:Colors.theme_background,
      borderRadius:SH(200)
    },
    BotttomAbs:{
      position:'absolute',
      width:'100%',
      bottom:SH(20),
      paddingHorizontal:SH(20)

    }
});