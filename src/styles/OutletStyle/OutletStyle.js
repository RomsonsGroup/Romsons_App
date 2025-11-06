import { StyleSheet } from 'react-native';
import { Fonts, SH, SF, SW, Colors } from '../../utils';

export default OutletStyle = () => StyleSheet.create({
  container: {
    flex: 1,
    padding: SH(10),
    backgroundColor: Colors.lightGray,
  },
  dateBox: {
    paddingVertical: SH(10),
    paddingHorizontal: SH(15),
    marginBottom: SH(10),
    backgroundColor: Colors.white,
    borderRadius: SH(10),
    elevation: 3,
    alignItems: 'center',
  },
  dateText: {
    fontSize: SF(16),
    fontFamily: Fonts.bold,
    color: Colors.black_color,
  },
  headerRow: {
    flexDirection: 'row', // Arrange in a row
    justifyContent: 'space-between', // Space out items evenly
    marginBottom: SH(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(10),
  },
  label: {
    fontSize: SF(16),
    fontFamily: Fonts.bold,
    color: Colors.green_color,
  },
  count: {
    fontSize: SF(15),
    fontFamily: Fonts.bold,
    color: Colors.black_text_color,
  },
  beatName: {
    fontSize: SF(15),
    fontFamily: Fonts.bold,
    color: Colors.black_text_color,
  },
  divider: {
    height: SH(2),
    backgroundColor: Colors.gray,
    marginVertical: SH(15),
  },
  outlet: {
    marginTop: SH(20),
    padding: SH(15),
    backgroundColor: Colors.white,
    borderRadius: SH(10),
    elevation: 3,
    shadowColor: Colors.black_color,
    marginBottom: SH(10), // Added margin for separation
  },
  outletId: {
    fontSize: SF(16),
    fontFamily: Fonts.medium,
    color: Colors.black_color,
  },
  outletName: {
    fontSize: SF(14),
    fontFamily: Fonts.regular,
    color: Colors.darkGray,
    marginTop: SH(5),
  },
  iconBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(10),
  },
  geoIcon: {
    color: Colors.icon,
    marginRight: SW(5),
  },
  badgeText: {
    fontSize: SF(14),
    fontFamily: Fonts.bold,
    color: Colors.black_color,
  },
  outletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SH(10),
  },
  outletDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(5),
  },
  bronzeBadge: {
    fontSize: SF(14),
    fontFamily: Fonts.bold,
    color: Colors.black_color,
    marginLeft: SW(5),
  },

  PaddingHorizontal: {
    paddingHorizontal: 15, // Adjust as needed
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
  TaskIcon: {
    marginRight: 10, // Adjust spacing around icon
  },
  taskDetails: {
    flexDirection: 'column', 
    justifyContent: 'center', 
  },
  taskName: {
    fontSize: 12, 
    fontWeight: 'bold', 
    color: 'black', 
  },
  taskDate: {
    fontSize: 14, 
    color: 'gray',
  },
  taskTime: {
    fontSize: 14, 
    color: 'green', 
    marginLeft: 120
  },
});