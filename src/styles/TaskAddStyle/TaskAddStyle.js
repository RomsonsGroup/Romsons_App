import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet,Dimensions  } from 'react-native';
const { width } = Dimensions.get('window');
// export default StyleSheet.create({
  export default TaskAddStyle = (Colors) => StyleSheet.create({
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 16,
      },
      
      datePickerWrapper: {
        width: '50%',
        marginRight: 10,
        marginHorizontal:50
      },
      
      addTaskButton: {
        backgroundColor: Colors.black,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        marginHorizontal:50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
      },
      
      
      header: {
        padding: 0,
        backgroundColor: Colors.white_text_color,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 0,
      },

      ////////////////////////////new style added///////////////////////////////////
      pendingTaskButton: {
        backgroundColor: Colors.theme_background,
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        margin: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      
      pendingTaskText: {
        color: Colors.white_text_color,
        fontWeight: 'bold',
        fontSize: 13,
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
      },
      modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black_text_color,
        marginBottom: 10,
        textAlign: 'center',
      },
      divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
      },
      scrollView: {
        maxHeight: '90%',
      },
      
      scrollViewContent: {
        paddingBottom: 10,
      },
      dateContainer: {
        backgroundColor: Colors.white_text_color,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
      },
      dateText: {
        fontSize: 16,
        color: Colors.black_text_color,
      },
      closeButton: {
        backgroundColor: Colors.theme_background,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
      },
      closeButtonText: {
        color: Colors.white_text_color,
        fontSize: 16,
        fontWeight: 'bold',
      },
});