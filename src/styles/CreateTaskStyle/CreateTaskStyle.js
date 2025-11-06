import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils';

export default CreateTaskStyle = (Colors) => StyleSheet.create({
    
    container1: {
        flexGrow: 1,
        backgroundColor: Colors.white_text_color,
      },
      PaddingHorizontal:{
        paddingHorizontal:SH(20)
      },

      input_style:{
        marginHorizontal: 20,
      },
      callButton: {
        backgroundColor: Colors.theme_background, // Or any color you like
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'flex-start', // Keeps it small & left-aligned
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      
      callButtonText: {
        color: Colors.white_text_color,
        fontSize: 14,
        fontWeight: '600',
      },
      callLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.black_text_color,
        marginBottom: 6,
        marginLeft: 2,
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
      },
      dropdownContainer: {
        backgroundColor: Colors.black_color,
        padding: 20,
        borderRadius: 10,
        width: 200,
        elevation: 5, // For shadow on Android
      },
      option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.peach_orange,
      }, 
      
      optionText: {
        fontSize: 16,
        color: 'white'
      },
      closeIcon: {
        position: 'flex-end',
        top: 10,
        left: 10,  // 👈 changed from right to left
        zIndex: 10,
        padding: 5,
      },
      modalOverlay4: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      dropdownContainer4: {
        width: '90%',
        maxHeight: '70%', // Limits the height to make room for scrolling
        backgroundColor: Colors.black_color,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
      },
      option4: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.peach_orange,
      },
      optionText4: {
        fontSize: 16,
        color: Colors.white_text_color,
      },
      
      BotttomAbs: {
        position: 'absolute',       
        bottom: SH(20),              
        alignSelf: 'center',         
        width: '50%',
        paddingHorizontal: SH(20)
      }
      

});
    
