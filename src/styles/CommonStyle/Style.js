import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, } from '../../utils';

export default Style = (Colors) => StyleSheet.create({
  // export default StyleSheet.create({
  // Datapicker
  SplashMinView: {
    flex: 1,
    backgroundColor:Colors.white_text_color,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SplashImage:{
    width:SH(200),
    height:SH(200),

  },


  Datapicker: {
  },
  DatapickerInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.3,
    borderColor: Colors.light_gray_text_color,
    backgroundColor: Colors.white_text_color,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 1,
    shadowColor: '#f0483e',
    padding: SH(10),

  },
  DropDounInputBox: {
    borderWidth: 0.3,
    borderColor: Colors.theme_background,
    backgroundColor: Colors.white_text_color,
    borderRadius: 4,
    elevation: 1,
    shadowColor: '#f0483e',
    padding: SH(8),
    paddingVertical: SH(10),
    marginVertical: SH(5)

  },
  DatapickerInputText: {
    fontSize: SF(16),
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium
  }
  ,
  DatapickerInputHeadingText: {
    fontSize: SF(18),
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium
  },







  // Alert

  SearchInputBorder: {
    borderWidth: SH(0),
  },
  CenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ModalView: {
    backgroundColor: Colors.white_text_color,
    borderRadius: SH(7),
    shadowColor: Colors.black_text_color,
    shadowOffset: {
      width: SW(0),
      height: SH(2)
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: SH(50),
    width: '80%',
  },
  setbgcolorgrsay: {
    backgroundColor: Colors.gray_text_color,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: Platform.OS === 'ios' ? 2 : 0.9,
  },
  CenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkiconright: {
    borderWidth: 3,
    height: SW(80),
    width: SW(80),
    borderRadius: SH(100),
    flexDirection: 'row',
    borderColor: Colors.theme_background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  setroundcenter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  setbackgroundicon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registertextset: {
    paddingTop: SH(25),
    paddingBottom: SH(0),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settext: {
    color: Colors.black_text_color,
    fontSize: SF(20),
    paddingHorizontal: SH(20),
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Bold,
  },
  setmessagetext: {
    color: Colors.black_text_color,
    fontSize: SF(17),
    paddingHorizontal: SH(20),
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Regular,
  },
  setokbutton: {
    width: '100%'
  },
  buttonminview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SH(40),
    paddingTop: SH(20),
  },
  MinViewStyleSplash: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: '100%'
  },




  // Dropdown


  container_Dropdown: {
    backgroundColor: Colors.white_text_color,
    padding: 16,
  },
  dropdown_Dropdown: {
    height: 45,
    borderColor: Colors.light_gray_text_color,
    backgroundColor: Colors.white_text_color,
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginHorizontal: SH(0)
  },
  icon_Dropdown: {
    marginRight: 5,
  },
  label_Dropdown: {
    position: 'absolute',
    backgroundColor: Colors.white_text_color,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle_Dropdown: {
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.gray_text_color
  },
  selectedTextStyle_Dropdown: {
    fontSize: 16,
  },
  iconStyle_Dropdown: {
    width: 20,
    height: 20,
  },
  inputSearchStyle_Dropdown: {
    height: 40,
    fontSize: 16,
  },
  DatapickerInputHeadingText_Dropdown: {
    fontSize: SF(18),
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium
  },







  container_L: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white_text_color
  },
  map_L: {
    width: '100%',
    height: '100%',
  },
  PaddingHorizontal_L: {
    paddingHorizontal: SH(20),
    width: '100%',
    position: 'absolute',
    top: SH(1),

  },
  TopView_L: {
    paddingHorizontal: SH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: SH(50),
    borderRadius: SH(5),
    backgroundColor: Colors.white_text_color,
    elevation: 3
  },
  flexRowStart_L: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white_text_color,
    alignItems: 'center',

  },
  flexRowStart2_L: {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white_text_color,
    alignItems: 'center'

  },
  loginButtonView_L: {
    width: '100%',
    position: 'absolute',
    bottom: SH(20),
    paddingHorizontal: SH(20),

  },
  locationText_L: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18),
    color: Colors.black_text_color,
    textAlign: 'left',
    textAlign: 'center'
  },
  icon_L: {
    marginRight: SH(5)
  },











  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SH(55),
    backgroundColor: Colors.bottomTab,
    borderRadius: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SH(20),
    alignItems: 'center',
    borderColor: Colors.bottomTab,
  },

  buttonWholeContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    height: 20,
    width: 20,
  },
  highlightedButtonOutside: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 10,
  },
  highlightedButton: {
    borderRadius: 300,
    backgroundColor: '#fff',
    elevation: 10,
  },
  TopTabIcon: {
    paddingEnd: SH(20)
  }
});