import { StyleSheet, } from 'react-native';
import { SH, Fonts, Colors, SW, SF } from '../../utils';

// export default StyleSheet.create({
export default NotificationStyle = (Colors) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SH(20),
    backgroundColor: Colors.white_text_color
  },
  sectionHeader: {
    fontSize: SF(20),
    fontFamily: Fonts.Poppins_Bold,
    fontWeight: 'bold',
    marginBottom: SH(10),
    color: Colors.black_text_color
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SH(15),
    borderBottomColor: Colors.light_gray_text_color,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: SH(20),
  },
  NotificationIcon: {
    backgroundColor: Colors.Light_theme_background,
    padding: SH(10),
    borderRadius: SH(10)
  },
  textContainer: {
    flex: 1,
    marginLeft: SH(10)
  },
  title: {
    fontSize: SF(16),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
    marginBottom: 4,
  },
  description: {
    fontSize: SF(12),
    fontFamily: Fonts.Poppins_Italic,
    color: Colors.gray_text_color,
  },
  time: {
    marginLeft: SH(5),
    fontSize: 12,
    color: '#999',
  },
});
