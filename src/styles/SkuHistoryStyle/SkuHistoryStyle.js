import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default SkuHistoryStyle = (Colors) => StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SH(30),
      marginHorizontal: 20
  },
  datePickerContainer: {
    marginTop: 20,
      flex: 1,
      marginRight: SH(10),
       // Adjust spacing between the two pickers
  },

  datePicker: {
    fontSize: SF(13),
    marginVertical: SH(10),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.black_text_color,
    marginBottom: SH(20),
    textAlign: 'center',
},
});