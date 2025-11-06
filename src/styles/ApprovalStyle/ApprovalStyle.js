import { Fonts, SH,  SF, Colors } from '../../utils';
import { StyleSheet } from 'react-native';
// export default StyleSheet.create({
  export default ApprovalStyle = (Colors) => StyleSheet.create({
    container: {
      flex: 1,
      padding: SH(0),
      backgroundColor: Colors.white_text_color,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10
    },
    filterButton: {
      paddingVertical: SH(10),
      paddingHorizontal: SH(70),
      backgroundColor: Colors.Light_theme_background,
      borderRadius: SH(30),
    },
    selectedFilterButton: {
      // borderBottomColor: '#007BFF', // Blue border for selected
    },
    filterButtonText: {
      fontSize: SF(16),
      fontFamily: Fonts.Poppins_Medium,
      fontWeight: 'bold',
      color: Colors.black_text_color
    },
    selectedFilterButtonText: {
      color: Colors.theme_background
    },
    filterIcon: {
      padding: SH(10),
    },
    // tabContainer: {
    //   flexDirection: 'row',
    //   // justifyContent: 'space-between',
    // },
    // tabButton: {
    //   flex: 1, // Equal width for all tabs
    //   paddingVertical: SH(10),
    //   borderBottomWidth: 2,
    //   borderBottomColor: 'transparent',
    //   alignItems: 'center', // Center tab text horizontally
    //   justifyContent: 'center',
    // },
    // selectedTabButton: {
    //   borderBottomColor: Colors.theme_background
    // },
    // tabText: {
    //   fontSize: SF(15),
    //   fontFamily: Fonts.Poppins_Medium,
    //   fontWeight: 'bold',
    //   color: Colors.gray_text_color,
    //   textAlign: 'center',
    // },
    // selectedTabText: {
    //   color: Colors.theme_background
    // },

    tabContainer: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: Colors.white,
      height: Platform.select({
        ios: 44,
        android: 48,
      }),
      ...Platform.select({
        ios: {
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.lightGray,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.select({
        ios: 12,
        android: 14,
      }),
      marginHorizontal: Platform.select({
        ios: 4,
        android: 0,
      }),
    },
    selectedTabButton: {
      // This is now handled by activeIndicator
    },
    tabText: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
      textAlign: 'center',
      paddingHorizontal: 8,
      ...Platform.select({
        ios: {
          fontSize: 14,
          fontWeight: '600',
        },
        android: {
          fontSize: 15,
          fontWeight: 'bold',
          includeFontPadding: false,
        },
      }),
    },
    selectedTabText: {
      color: Colors.theme_background,
      ...Platform.select({
        ios: {
          fontWeight: '700',
        },
      }),
    },
    activeIndicator: {
      position: 'absolute',
      bottom: 0,
      height: Platform.select({
        ios: 3,
        android: 2.5,
      }),
      width: '70%',
      backgroundColor: Colors.theme_background,
      borderRadius: Platform.select({
        android: 1,
        ios: 0,
      }),
    },
    approvalsList: {
      flexGrow: 1,
    },
    approvalCard: {
      backgroundColor: Colors.white_text_color,
      padding: SH(10),
      borderRadius: SH(10),
      marginVertical: SH(10),
      shadowColor: Colors.black_text_color,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    approvalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    employeeId: {
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Medium,
      // fontWeight: 'bold',
      color: Colors.black_text_color
    },
    moduleName: {
      fontSize: SF(12),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.gray_text_color,
    },
    companyName: {
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Italic,
      color: Colors.gray_text_color,
    },
    viewMoreButton: {
      paddingVertical: SH(10),
      backgroundColor: Colors.Light_theme_background,
      borderRadius: SH(10),
      alignItems: 'center',
    },
    viewMoreText: {
      fontWeight: 'bold',
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.theme_background,
    },
    icon: {
      alignSelf: 'flex-start',
    },
    PaddingHorizontal: {
      paddingHorizontal: SH(20)
    },

    cell: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "center",
      color:Colors.black_text_color,
      fontWeight: 'bold'
  },

  buttonContainer: {
    flexDirection: 'row',
    // marginTop: 10,
    alignItems: "center",
    justifyContent: 'space-between',
},

actionButton: {
  width: '38%',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
},
rejectButton: {
  backgroundColor: 'red',
},
approveButton: {
  backgroundColor: Colors.theme_background,
},
buttonText: {
  color: Colors.black_text_color,
  fontWeight: 'bold',
},

approvedContainer: {
  backgroundColor:  Colors.light_green, // Light green background
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 8, // Cute rounded corners
  alignSelf: "flex-end", // Align to right
  // marginTop: 5,
},

rejectedContainer: {
  backgroundColor:  Colors.red, // Light green background
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 8, // Cute rounded corners
  alignSelf: "flex-end", // Align to right
},

approvedText: {
  fontSize: 12,
  color:  Colors.green_color, // Dark green text
  fontWeight: "bold",
},

rejectedText: {
  fontSize: 12,
  color:  Colors.black_text_color, // Dark green text
  fontWeight: "bold",
},

});