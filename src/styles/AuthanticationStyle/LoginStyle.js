import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH, SW } from '../../utils';

export default LoginStyle = (Colors) => StyleSheet.create({
// export default StyleSheet.create({
    BgColorWhiteAllHome: {
        backgroundColor: Colors.white_text_color,
        flex: 1
    },
    MinViewScreen:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:SH(20),
        backgroundColor: Colors.white_text_color
    },
    Container1: {
        width: '100%',
        height: '100%',
    },
    Container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.white_text_color
    },
    TopView: {
        paddingHorizontal: SH(20),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    
    LoginImage: {
        width: SH(250),
        height: SH(250),
        
    },
    OtpImage:{
        width: SH(150),
        height: SH(150)
    },
    ForgotImage:{
        width: SH(200),
        height: SH(200)
    },
    CheckImg:{
        width: SH(200),
        height: SH(200)
    },
    Welcome_back_Text: {
        fontSize: SF(25),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color
    },
    Log_in_Text: {
        fontSize: SF(55),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color,
        lineHeight: 60
    },
    Password: {
        fontSize: SF(45),
        fontFamily: Fonts.Poppins_Bold,
        color:Colors.black_text_color,
        lineHeight: 50
    },
    SetPadding: {
        paddingHorizontal: SH(20)
    },
    PaddingHorizontal: {
        paddingHorizontal: SH(20)
    },
    ButtonView: {
        borderRadius: SH(70)
    },
    FlexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Forgot_password: {
        fontSize:SF(16),
        fontFamily:Fonts.Poppins_Medium,
        color:Colors.theme_background,
    },
    pin_Text: {
        width: '100%',
        textAlign: 'center',
        fontSize: SF(17),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.black_text_color
    },
    pin_Text_2: {
        fontSize: SF(17),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.theme_background
    },
    Forgot_pera_Text: {
        fontSize: SF(14),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.gray_text_color
    },





    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white_text_color,
        paddingHorizontal: SH(20)
    },
    logo: {
        width: SH(180),
        height: SH(180),
        marginBottom: SH(0),
    },
    title: {
        fontSize: SF(35),
        fontWeight: 'bold',
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.theme_background
    },

    signUpText: {
        fontSize: SF(25),
        fontFamily: Fonts.Poppins_Bold,
        color: Colors.black_text_color
    },
    description: {
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.gray_text_color
    },
    facebookButton: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.theme_background,
        paddingVertical: SH(10),
        paddingHorizontal: SH(50),
        borderRadius: 25,
    },
    facebookButtonText: {
        color: Colors.white_text_color,
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(18),
        marginLeft: 10,
    },
    emailButton: {
        borderWidth: 1,
        borderColor: Colors.gray_text_color,
        paddingVertical: SH(10),
        paddingHorizontal: SH(30),
        borderRadius: SH(30),
    },
    emailButtonText: {
        color: Colors.gray_text_color,
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(18),
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    icon: {
        marginHorizontal: SH(10),
    },
    loginText: {
        color: Colors.gray_text_color,
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(18),
    },
    loginLink: {
        color: Colors.theme_background,
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(18),
    },


    LineTextcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      },
      text: {
        marginHorizontal: 10,
        fontSize: SF(16),
        fontFamily:Fonts.Poppins_Medium,
        color: Colors.gray_text_color,
        letterSpacing: 2,
      },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
      },
      LogoText:{
        color:Colors.black_text_color,
        fontFamily:Fonts.Poppins_Medium,
        fontSize:SF(20),
        marginLeft:SH(10),
        marginTop:SH(5)
      }, BackGroundColorSet: {
        width:"47%",
        height: SH(50),
        borderRadius: SH(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
        backgroundColor:Colors.white_text_color
      },
      GoogleImage: {
        width:SH(30),
        height:SH(30),
        borderRadius:300
      },
      FlexRowSignUp: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:SH(20)
      },
      PaddingMinor: {
        paddingHorizontal:SH(4)
      },
      AbsoluteLogIn:{
        position:'absolute',
        width:'100%',
        paddingHorizontal:SH(20),
        bottom:0,
        paddingVertical:SH(20)
      },
      CenterCenter:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      linkText: {
        fontSize:SF(16),
        fontFamily:Fonts.Poppins_Medium,
        color:Colors.black_text_color,
      },
      link: {
        fontSize:SF(16),
        fontFamily:Fonts.Poppins_Medium,
        color:Colors.theme_background,
      },
      resignationsuccessfullyText:{
        fontSize:SF(20),
        fontFamily:Fonts.Poppins_Medium,
        color:Colors.black_text_color,
        textAlign:'center'
      },
      AccountButton:{
        width:'100%'
      }
});