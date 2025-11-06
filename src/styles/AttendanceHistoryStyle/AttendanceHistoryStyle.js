import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default AttendanceHistoryStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white_text_color
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      backgroundColor: '#ff914d',
    },
    profileSection: {
      alignItems: 'center',
      backgroundColor: Colors.theme_background,
      borderBottomRightRadius: SH(40),
      borderBottomLeftRadius: SH(40),
  
    },
    profileImage: {
      width: "100%",
      height: SH(300),
      borderRadius: 50,
    },
    profileName: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    newTaskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: SH(20),
      paddingVertical: SH(10),
      backgroundColor: Colors.white_text_color,
      alignItems: 'center',
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: SH(7),
      borderRadius: SH(10)
    },
    newTaskText: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
    },
    newTaskButton: {
      backgroundColor: Colors.theme_background,
      borderRadius: 50,
      padding: SH(10),
    },
    ongoingTaskText: {
      fontSize: SF(20),
      fontFamily: Fonts.Poppins_Bold,
      color: Colors.black_text_color,
      fontWeight: 'bold',
    },

    button: {
        backgroundColor: Colors.peach_orange,
        paddingVertical: 4,  // Chhota karne ke liye height kam ki
        paddingHorizontal: 8, // Chhoda width bhi reduce kiya
        borderRadius: 10, // Thoda aur small rounded corners
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto', // Width ko auto rakha taki text ke hisaab se ho
        marginLeft: 10, // Manager Team ke bagal me proper space ke liye
    },
    
    buttonText: {
        color: 'white',
        fontSize: 10,  // Thoda aur compact dikhane ke liye size chhota kiya
        fontWeight: 'bold',
        textAlign: 'center',
    },
    

    dateButtonText: {
        color: Colors.black_text_color, // Use dynamic colors
        fontSize: SF(15),
        marginRight: 20
    },

    taskTime1: {
        fontSize: 12, 
fontWeight: 'bold',
color: 'green',  
       
      }, 
    taskContainer: {
      flexDirection: 'row',
      paddingHorizontal: SH(20),
      paddingVertical: SH(10),
      backgroundColor: Colors.white_text_color,
      marginBottom: SH(20),
      borderRadius: SH(10),
      alignItems: 'center',
      elevation: 2,
      shadowColor: Colors.black_text_color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: SH(7),
    },
    // taskDetails: {
    //   marginLeft: 20,
    // },
    taskName: {
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      flexShrink: 1,             // Shrinks text to fit if needed
      flexWrap: 'wrap',          // Wraps to next line
      lineHeight: SF(20),
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
      
    taskDate: {
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.theme_background,
      marginLeft: 20
    },
    taskTime: {
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.black_text_color,
    },
    PaddingHorizontal: {
      paddingHorizontal: SH(20)
    },
    TaskIcon:{
      padding:SH(15),
      backgroundColor:Colors.Light_theme_background,
      borderRadius:SH(20)
    }
});