import { StyleSheet } from 'react-native';
import { Fonts, SH, SW, SF, Colors } from '../../utils';

export default Sidemenu = (Colors) => StyleSheet.create({
  // export default StyleSheet.create({
  customslidebarmenu: {
    paddingHorizontal: SH(20),
    paddingTop: SH(20),
    backgroundColor:Colors.white_text_color
  },
  customslidebarTopView:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:Colors.light_gray_text_color,
    borderBottomWidth:SH(0.5),
    paddingBottom:SH(20)
  },
  homeHeadetextstyle: {
    color: Colors.black_text_color,
    fontSize: SF(15),
    fontFamily: Fonts.Poppins_Bold,
    paddingLeft: SH(10),
  },
  hometextstyle: {
    color: Colors.black_text_color,
    fontSize: SF(15),
    fontFamily: Fonts.Poppins_Medium,
    paddingLeft: SH(10),
  },
  customslidebarmenuIcon:{
    backgroundColor:Colors.Light_theme_background,
    padding:SH(10),
    borderRadius:SH(10)
  },
  ImageStyle:{
    backgroundColor:Colors.theme_background,
    width:SH(55),
    height:SH(55),
    borderRadius:SH(100)
  },
  flexrowset: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.light_gray_text_color,
    borderBottomWidth: SH(0),
    paddingVertical: SH(10),
  },
  settingandlogout: {
    paddingTop: SH(40),
  },
  logoimage: {
    width: SW(20),
    height: SH(20),
  },
  SetWidth: {
    width: SW(20)
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.notification_color,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 8,
    color: Colors.black_text_color
  },
  bodyText: {
    fontSize: SF(14),
    marginBottom: 8,
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.gray_text_color
  },
});