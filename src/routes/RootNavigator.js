import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { darkTheme, Fonts, lightTheme } from '../utils';
import { Appearance } from 'react-native';
import { RouteName, SideNavigator } from '../routes';
import { ApprovalScreen, AttendanceProfile,AttendanceHistoryScreen, CheckInOutScreen, EditProfile, ForgotPassword, HolidaysScreen, LanguageScreen, LeaveRequestsScreen,Leaveapply, LoginFirstScreen, LoginScreen,AttendancePunchInOut, NotificationScreen, OtpVeryfiveScreen, PayrollScreen, PaystubDetailsScreen, PrivacyPolicyScreen, RegisterScreen, RegistrationSuccessful, ResetPassword, ReviewsScreen, SettingsScreen,OutletScreen,RetailActivityScreen,ContactListScreen,OutletDetailScreen,OrderScreen, SplashScreen, Swiperscreen, TaskScreen, ExpenseScreen, ExpenseHqScreen,MsdActivityScreen,TeamScreen,TeamLeaveScreen, HomeTab,HomeScreen, EodScreen,ProfileTab,AttendanceTab,RegulizationScreen,OrderHistoryScreen,ActivityHistoryScreen,SkuOrderHistoryScreen,SkuOrderScreen,SalesAnalysisScreen,DaysummaryScreen,TaskAddScreen,CreateTaskScreen } from '../screens';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Translation from '../Language/i18n';
const RootNavigator = props => {
  const Stack = createStackNavigator();
  const isDarkMode = useSelector(state => state.DarkReducer.isDarkMode);
  const Colors = isDarkMode ? darkTheme : lightTheme;
  const headerthemeArrow = {
    headerShown: true,
    title: "",
    headerTintColor: Colors.white_color,
    headerTitleStyle: {
      fontFamily: Fonts.Fonts_Medium,
      color: Colors.white_color
    },
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: Colors.theme_background
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RouteName.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={RouteName.SWIPER_SCREEN} component={Swiperscreen} />
        <Stack.Screen name={RouteName.LOGINFIRSTSCREEN} component={LoginFirstScreen} />
        <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={RouteName.Home_tab} component={SideNavigator} />
        {/* <Stack.Screen name={RouteName.PUNCHINOUT} component={AttendancePunchInOut} /> */}
        <Stack.Screen name={RouteName.REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={RouteName.REGISTRATIONSUCCESSFUL} component={RegistrationSuccessful} />
        <Stack.Screen name={RouteName.FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={RouteName.RESETPASSWORD} component={ResetPassword} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVeryfiveScreen} />
        <Stack.Screen name={RouteName.HOME_SCREEN} component={SideNavigator} />
        <Stack.Screen name={RouteName.LANGUAGESCREEN} component={LanguageScreen} />
        <Stack.Screen name={RouteName.SETTING_SCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Settings'),
            headerTitleAlign: 'center'
          }} component={SettingsScreen} />
        <Stack.Screen name={RouteName.NOTIFICTION_SCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Nottification'),
            headerTitleAlign: 'center'
          }} component={NotificationScreen} />
        <Stack.Screen name={RouteName.REVIEWS_SCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Reviews'),
            headerTitleAlign: 'center'
          }} component={ReviewsScreen} />
        <Stack.Screen name={RouteName.PRIVACY_POLICY_SCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Privacy_policy'),
            headerTitleAlign: 'center'
          }} component={PrivacyPolicyScreen} />
        <Stack.Screen name={RouteName.ATTENDANCEPROFILE} options=
          {{
            ...headerthemeArrow,
            title: Translation('Attendance_Profile'),
            headerTitleAlign: 'center'
          }} component={AttendanceProfile} />
        <Stack.Screen name={RouteName.EDITPROFILE} options=
          {{
            ...headerthemeArrow,
            title: Translation('Change Password'),
            headerTitleAlign: 'center'
          }} component={EditProfile} />
        <Stack.Screen name={RouteName.TASKSSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Tasks'),
            headerTitleAlign: 'center'
          }} component={TaskScreen} />
        <Stack.Screen name={RouteName.APPROVALSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Approval'),
            headerTitleAlign: 'center'
          }} component={ApprovalScreen} />

<Stack.Screen name={RouteName.CREATETASK} options=
          {{
            ...headerthemeArrow,
            title: Translation('Add New Task'),
            headerTitleAlign: 'center'
          }} component={CreateTaskScreen} />

<Stack.Screen name={RouteName.PUNCHINOUT} options=
          {{
            ...headerthemeArrow,
            title: Translation('Attendance'),
            headerTitleAlign: 'center'
          }} component={AttendancePunchInOut} />

<Stack.Screen name={RouteName.ACTIVITYHISTORY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Activity History'),
            headerTitleAlign: 'center'
          }} component={ActivityHistoryScreen} />


<Stack.Screen name={RouteName.ORDERHISTORY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Order History'),
            headerTitleAlign: 'center'
          }} component={OrderHistoryScreen} />

<Stack.Screen name={RouteName.SALESANALYSIS} options=
          {{
            ...headerthemeArrow,
            title: Translation('Sales Analysis'),
            headerTitleAlign: 'center'
          }} component={SalesAnalysisScreen} />

<Stack.Screen name={RouteName.DAYSUMMARY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Day Summary'),
            headerTitleAlign: 'center'
          }} component={DaysummaryScreen} />

<Stack.Screen name={RouteName.SKUORDERHISTORY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Sku History'),
            headerTitleAlign: 'center'
          }} component={SkuOrderHistoryScreen} />

<Stack.Screen name={RouteName.TASKADD} options=
          {{
            ...headerthemeArrow,
            title: Translation('Create Task'),
            headerTitleAlign: 'center'
          }} component={TaskAddScreen} />

<Stack.Screen name={RouteName.SKUORDER} options=
          {{
            ...headerthemeArrow,
            title: Translation('Sku Order'),
            headerTitleAlign: 'center'
          }} component={SkuOrderScreen} />

<Stack.Screen name={RouteName.REGULIZATION} options=
          {{
            ...headerthemeArrow,
            title: Translation('Regularization'),
            headerTitleAlign: 'center'
          }} component={RegulizationScreen} />


<Stack.Screen name={RouteName.PROFILETAB} options=
          {{
            ...headerthemeArrow,
            title: Translation('Profile'),
            headerTitleAlign: 'center'
          }} component={ProfileTab} />


<Stack.Screen name={RouteName.LEAVEAPPLY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Leave Apply'),
            headerTitleAlign: 'center'
          }} component={Leaveapply} />

<Stack.Screen name={RouteName.TEAMSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Team'),
            headerTitleAlign: 'center'
          }} component={TeamScreen} />


<Stack.Screen name={RouteName.ATTENDANCETAB} options=
          {{
            ...headerthemeArrow,
            title: Translation('Team'),
            headerTitleAlign: 'center'
          }} component={AttendanceTab} />

          

<Stack.Screen name={RouteName.TEAMLEAVESCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Leave Approval'),
            headerTitleAlign: 'center'
          }} component={TeamLeaveScreen} />

<Stack.Screen name={RouteName.EODSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Day Summary'),
            headerTitleAlign: 'center'
          }} component={EodScreen} />

<Stack.Screen name={RouteName.CONTACTLIST} options=
          {{
            ...headerthemeArrow,
            title: Translation('ContactList'),
            headerTitleAlign: 'center'
          }} component={ContactListScreen} />

<Stack.Screen name={RouteName.OUTLET} options=
          {{
            ...headerthemeArrow,
            title: Translation('Outlet'),
            headerTitleAlign: 'center'
          }} component={OutletScreen} />

<Stack.Screen name={RouteName.OUTLETDETAIL} options=
          {{
            ...headerthemeArrow,
            title: Translation('Outlet Details'),
            headerTitleAlign: 'center'
          }} component={OutletDetailScreen} />


<Stack.Screen name={RouteName.ATTENDANCEHISTORY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Location View'),
            headerTitleAlign: 'center'
          }} component={AttendanceHistoryScreen} />

<Stack.Screen name={RouteName.ORDER} options=
          {{
            ...headerthemeArrow,
            title: Translation('Order'),
            headerTitleAlign: 'center'
          }} component={OrderScreen} />

<Stack.Screen name={RouteName.MSDACTIVITY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Activity'),
            headerTitleAlign: 'center'
          }} component={MsdActivityScreen} />


{/* <Stack.Screen name={RouteName.ACTIVITY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Activity'),
            headerTitleAlign: 'center'
          }} component={ActivityScreen} /> */}

<Stack.Screen name={RouteName.RETAILACTIVITY} options=
          {{
            ...headerthemeArrow,
            title: Translation('Activity'),
            headerTitleAlign: 'center'
          }} component={RetailActivityScreen} />


<Stack.Screen name={RouteName.EXPENSE} options=
          {{
            ...headerthemeArrow,
            title: Translation('Expense Submission'),
            headerTitleAlign: 'center'
          }} component={ExpenseScreen} />

<Stack.Screen name={RouteName.EXPENSEHQ} options=
          {{
            ...headerthemeArrow,
            title: Translation('HQ Expense'),
            headerTitleAlign: 'center'
          }} component={ExpenseHqScreen} />

          
        <Stack.Screen name={RouteName.HOLIDAYSSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Holidays'),
            headerTitleAlign: 'center'
          }} component={HolidaysScreen} />
        <Stack.Screen name={RouteName.PAYSTUBDETAILSSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Paystub_details'),
            headerTitleAlign: 'center'
          }} component={PaystubDetailsScreen} />
        <Stack.Screen name={RouteName.LEAVEREQUESTSSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Leave Status'),
            headerTitleAlign: 'center'
          }} component={LeaveRequestsScreen} />
        <Stack.Screen name={RouteName.PAYROLLSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('Payroll'),
            headerTitleAlign: 'center'
          }} component={PayrollScreen} />
        <Stack.Screen name={RouteName.CHECKINOUTSCREEN} options=
          {{
            ...headerthemeArrow,
            title: Translation('CheckInOut'),
            headerTitleAlign: 'center'
          }} component={CheckInOutScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
export default RootNavigator;