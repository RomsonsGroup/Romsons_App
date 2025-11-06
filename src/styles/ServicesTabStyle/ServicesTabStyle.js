import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default ServicesTabStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color,
      padding:SH(20)
    },
    searchInput: {
      paddingHorizontal:SH(20),
      paddingVertical: SH(10),
      borderWidth: 1,
      borderColor: Colors.light_gray_text_color,
      borderRadius:SH(10),
    },
    grid: {
      flex: 1,
    
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    serviceCard: {
      width: '48%',
      marginBottom: SH(20),
      padding: SH(20),
      backgroundColor: Colors.Light_theme_background,
      borderRadius:SH(10),
      alignItems: 'center',
    },
    cardIcon: {
      marginBottom: SH(10),
    },
    cardTitle: {
      fontSize:SF(18),
      fontFamily:Fonts.Poppins_Bold,
      color:Colors.black_text_color,
      fontWeight: 'bold',
    },
});