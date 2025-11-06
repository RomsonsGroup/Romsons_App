import { StyleSheet } from 'react-native';
import { SF, Fonts, SH, widthPercent, heightPercent, hexToRgba, Colors } from '../../utils';

export default SwiperStyle = (Colors) => StyleSheet.create({
// export default StyleSheet.create({
  Container: {
    backgroundColor: Colors.white_text_color,
    height: '100%',
    width: '100%',
  },
  TopContainer: {
    width: "100%",
    height: '50%',
    flexDirection:'row',
    justifyContent:'center'
  },
  BottomContainer: {
    borderTopLeftRadius:SH(50),
    borderTopRightRadius:SH(50),
    width: "100%",
    height: '30%',
    // backgroundColor: "#3d3ff2",
    paddingHorizontal:SH(20)
  },
  BottomContainertitleView:{
    width:'100%',
    paddingHorizontal:SH(20),
  },
  BottomContainertitle:{
    fontSize:SF(30),
    fontFamily:Fonts.Poppins_Bold,
    color:Colors.black_text_color,
    textAlign:'center'
  },
  BottomContainerText:{
    fontSize:SF(20),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.black_text_color,
     textAlign:'center'
  },
  Image: {
    width: "100%",
    height: '80%'
  },
  DotStyle: {
    width: SH(20),
    height: SH(10),
    borderRadius: SH(200),
    backgroundColor: Colors.theme_background,
  },
  activeDot: {
    width: SH(40),
    height: SH(10),
    marginRight: SH(10),
    borderRadius: SH(200),
    backgroundColor:Colors.white_text_color,
    borderWidth: SH(2),
    borderColor: Colors.theme_background
  },
  Inactive: {
    width: SH(10),
    height: SH(10),
    marginRight: SH(10),
    borderRadius: SH(200),
    backgroundColor:Colors.white_text_color,
    borderWidth: SH(2),
    borderColor: Colors.theme_background
  },
  buttonStyle: {
    backgroundColor: 'yellow',
    borderRadius:SH(200)
  },
  ArrowButtonTwo: {
    position: 'absolute',
    bottom: SH(20),
    right: SH(20)
  },
  buttonTextStyle:{
    color:Colors.black_text_color
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: 20,
  },
  signInButton: {
    width:'100%',
    backgroundColor: Colors.theme_background,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  signInButtonText: {
    color:Colors.white_color,
    fontSize: SF(16),
    textAlign:'center'
  },
  linkText: {
    width:'100%',
    fontSize:SF(18),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.black_text_color,
    textAlign:'center'
  },
  link: {
    fontSize:SF(18),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.theme_background,
  },
  Langauge_Icon:{
    padding:SH(20),
    backgroundColor:Colors.white_text_color,
    alignItems:'flex-end'
  }
});