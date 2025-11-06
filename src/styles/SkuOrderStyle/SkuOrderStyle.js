import { Fonts, SH, SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
export default SkuOrderStyle = (Colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white_text_color
    },

    taskTime1: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'green',

    },

    pendingButton: {
        backgroundColor: Colors.theme_background,
        paddingVertical: 8, 
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 12,
        marginTop: 16,
        alignSelf: 'flex-end',
        shadowColor: Colors.black_text_color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6, 
      },
      pendingText: {
        color: 'white',
        fontSize: 14,  
        fontWeight: 'bold',
        textAlign: 'center', 
      },
      
    taskContainer: {
        flexDirection: 'row',
        paddingHorizontal: SH(20),
        paddingVertical: SH(10),
        backgroundColor: Colors.white_text_color,
        marginTop: SH(20),
        marginHorizontal: SH(10), 
        borderRadius: SH(10),
        alignItems: 'center',
        elevation: 2,
        shadowColor: Colors.black_text_color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: SH(7),
    },

    
    taskName: {
        fontSize: SF(15),
        fontFamily: Fonts.Poppins_Medium,
        color: Colors.black_text_color,
        textAlign: 'left',
        
    },
    
});