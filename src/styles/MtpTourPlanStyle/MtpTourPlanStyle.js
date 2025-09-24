import { StyleSheet } from 'react-native';
import { Colors, Fonts, SF, SH } from '../../utils'; // Adjust the import path as needed

export default MtpTourPlanStyle = (Colors) =>
    StyleSheet.create({

        title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },

    dropdown:{
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerRow: {
        flexDirection: "row",
        backgroundColor: "#eee",
        paddingVertical: 6,
    },
    headerCol: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        color: 'black'
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 4,
    },
    col: {
        flex: 1,
        textAlign: "center",
        alignSelf: "center",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.blue_color,
        padding: 4,
        marginHorizontal: 2,
        borderRadius: 7,
        fontSize: 12,
    },
        
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        width: "80%",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
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

      buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 10,
      },
      
      smallButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2, // ✅ Shadow on Android
        shadowColor: "#000", // ✅ Shadow on iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
      
      smallButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
      },
      
      pendingButton: {
        backgroundColor: Colors.theme_background,
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    pendingText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
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
    backgroundColor: Colors.diamond_color,
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
    color: Colors.black_text_color,
  },
        
    });


