import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default PolicyStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white_text_color,
    paddingTop: SH(20)
  },
  backButton: {
    marginRight: SH(10)
  },
  headerTitle: {
    fontSize: SF(20),
    fontFamily:Fonts.Poppins_Bold,
    color:Colors.black,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: SH(20),
  },
  sectionTitle: {
    fontSize: SF(20),
    fontFamily:Fonts.Poppins_Bold,
    color:Colors.black_text_color,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: SF(15),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.gray_text_color,
    lineHeight: 22,
    marginBottom: 20,
  },
});