import { Fonts, SH, SF, Colors,  } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default ReviewsStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white_text_color,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SH(20),
    backgroundColor:Colors.white_text_color,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: SF(22),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.theme_background,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 10,
  },
  feedback: {
    backgroundColor: Colors.white_text_color,
    marginHorizontal: SH(20),
    borderRadius: SH(10),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
  },
  feedbackTitle: {
    fontSize: SF(24),
    fontFamily: Fonts.Poppins_Bold,
    color: Colors.theme_background,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  question: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 20,
  },
  option: {
    paddingHorizontal: SH(17),
    paddingVertical: SH(7),
    backgroundColor: Colors.white_text_color,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: SH(10),
  },
  selectedOption: {
    borderColor: Colors.theme_background
  },
  optionText: {
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
  },
  selectedoptionText: {
    color: Colors.theme_background,
  },
  optionalText: {
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Italic,
    color: Colors.gray_text_color,
  },
  info: {
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Italic,
    color: Colors.gray_text_color,
    marginTop: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  PaddingHorizontal:{
    paddingHorizontal:SH(20)
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tintColor:Colors.white_text_color
  
});