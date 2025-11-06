import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Ensure this import is correct

export default EodStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white_text_color,  // Use the imported Colors
  },
  pendingButton: {
    backgroundColor: Colors.gray_text_color,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'center',
    marginRight: 200,
  },
  pendingText: {
    color: Colors.white_text_color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText1: {
    fontSize: 14,
    color: Colors.black_text_color,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },

  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will space the dates evenly across the container
    alignItems: 'center',
  },
  viewShot: {
    width: 300,
    height: 150,
    backgroundColor: '#e3e3e3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  infoContainer: {
    backgroundColor: Colors.theme_background,
    padding: 7,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Colors.gray_text_color,
    alignItems: 'center',
  },
  hospitalText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.white_text_color,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomColor: Colors.gray_text_color,
    marginBottom: 0,
  },
  orderType: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.black_text_color,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.green_color,
  },
  skuContainer: {
    backgroundColor: Colors.white_text_color,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.white_text_color,
  },
  skuHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_text_color,
    paddingBottom: 5,
    marginBottom: 8,
  },
  skuDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  skuHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    flex: 1,
    textAlign: 'center',
  },
  skuText: {
    fontSize: 12,
    color: Colors.black_text_color,
    fontWeight: 'bold',
    flex: 1,
    // textAlign: 'center',
  },
  skuText1: {
    fontSize: 12,
    color: Colors.black_text_color,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: Colors.white_text_color,
    padding: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray_text_color,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.black_text_color,
    textAlign: 'right', // optional for RTL support
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
