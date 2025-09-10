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
        borderColor: "#ccc",
        padding: 4,
        marginHorizontal: 2,
        borderRadius: 4,
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
        
    });


