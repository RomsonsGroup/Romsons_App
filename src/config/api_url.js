///////////////////DEV-CRM-BASE-URL/////////////////////////////////
// const CRM_BASE_URL = "https://devcrm.romsons.com:8080";


///////////////////LOCAL-HOST-URL/////////////////////////////////
const CRM_BASE_URL = "http://localhost:8091"

//////////////////PRODUCTION-CRM-BASE-URL///////////////////////
// const CRM_BASE_URL = "https://crm.romsons.com:8080";

const API_URL = {
    AUTH: {
        LOGIN_URL: `${CRM_BASE_URL}/loginApps`
    },

    MSD_ACTIVITY_URLS: {
        ACTIVITY_HOSTIPTAL_URL: `${CRM_BASE_URL}/ActivityHospital`,
        OUTLET_ACTIVITY_URL: `${CRM_BASE_URL}/outlet_activity`,               
        SKU_LIST_HOSTIPTAL_URL: `${CRM_BASE_URL}/skulisthospital`                 
                 
    },

    ATTENDANCE_URL: {
        APP_CHECK_VERSION_URL: `${CRM_BASE_URL}/AppVersionCheck`,
        PUNCH_IN_URL: `${CRM_BASE_URL}/attendance_punch_in`,
        PUNCHINOUT_TIME_URL: `${CRM_BASE_URL}/punchInOutTime`,
        PUNCH_OUT_URL: `${CRM_BASE_URL}/attendance_punchout`,
        SHIFT_DETAILS_URL: `${CRM_BASE_URL}/shiftDetails`,
    },

    OUTLET_URL: {
        DATEWISE_OUTLET_URL: `${CRM_BASE_URL}/dateWiseOutlet`,
        DATEWISE_OUTLET_DATA_URL: `${CRM_BASE_URL}/DatewiseOutlet_data`,
        COUNT_OUTLET_URL: `${CRM_BASE_URL}/countOutlet`,
    },

    OUTLET_DETAILS_URL: {
        SELECTED_OUTLET_URL: `${CRM_BASE_URL}/SelectedOutlet`,
        REPORTING_HIERARCHY_URL: `${CRM_BASE_URL}/Reporting_hierarchy`,
        DEALER_LIST_URL: `${CRM_BASE_URL}/Dealernamelist`,
        LAST_TWO_VISIT_URL: `${CRM_BASE_URL}/LastTwovisit_OrderHistory`,
        JIO_ADDRESS_URL: `${CRM_BASE_URL}/jioAddress`,
    },

    ORDER_URL: {
        ORDER_SUBMIT_URL: `${CRM_BASE_URL}/orderfilleds`,
        ORDER_RETURN_URL: `${CRM_BASE_URL}/orderreturn`,
        ORDER_SKULIST_URL: `${CRM_BASE_URL}/skulist`,
    },

    DAY_SUMMARY_URL: {
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
        TASKSHOW_DAY_SUMMARY_URL: `${CRM_BASE_URL}/TaskShowDaysummary`,
        EOD_ATTENDANCE_URL: `${CRM_BASE_URL}/EODAttendancebutton`,
        EOD_ORDER_URL: `${CRM_BASE_URL}/EODOrderbutton`,
        EOD_ACTIVITY_URL: `${CRM_BASE_URL}/ActivityDatabutton`,
        EOD_RETURN_URL: `${CRM_BASE_URL}/EodReturnbutton`,
    },

    ACTIVITY_HISTORY_URL: {
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
        SELECT_BEAT_URL: `${CRM_BASE_URL}/SelectedBeat`,
        SELECT_OUTLET_URL: `${CRM_BASE_URL}/SelectOutlet_OrderHistory`,
        ACTIVITY_HISTORY_URL: `${CRM_BASE_URL}/ActivityHistory_MIS`,
    },

    ORDER_HISTORY_URL: {
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
        SELECT_BEAT_URL: `${CRM_BASE_URL}/SelectedBeat`,
        SELECT_OUTLET_URL: `${CRM_BASE_URL}/SelectOutlet_OrderHistory`,
        ORDERMIS_HISTORY_URL: `${CRM_BASE_URL}/OrderHistory_MIS`,
    },

    SKU_HISTORY_URL: {
        SKULIST_URL: `${CRM_BASE_URL}/skulist`,
        TOTAL_SKU_ORDER_LIST_URL: `${CRM_BASE_URL}/Totalskuorderwise`,
    },

    EOD_URL: {
        EOD_ATTENDANCE_URL: `${CRM_BASE_URL}/EODAttendance`,
        EOD_RETURN_COMPLETE_DATA_URL: `${CRM_BASE_URL}/EodReturn`,

    },

    LEAVE_URL: {
        LEAVE_TYPE_URL: `${CRM_BASE_URL}/leave_type`,
        LEAVE_SUBMIT_URL: `${CRM_BASE_URL}/LeaveApp`,
        LEAVE_HISTORY_URL: `${CRM_BASE_URL}/leave_history`,
    },

    LEAVE_APPROVAL_URL: {
        LEAVE_LIST_URL: `${CRM_BASE_URL}/Leaveapproval`,
        LEAVE_ID_APPROVAL_URL: `${CRM_BASE_URL}/Leaveidapproval`,
        LEAVE_ID_REJECTION_URL: `${CRM_BASE_URL}/LeaveidRejection`,
        LEAVE_APPROVAL_LIST_URL: `${CRM_BASE_URL}/Leaveapprovallist`,
        LEAVE_REJECTED_LIST_URL: `${CRM_BASE_URL}/Leaverejectedlist`,
    },

    LEAVE_STATUS_URL: {
        LEAVE_STATUS_LIST_URL: `${CRM_BASE_URL}/Leavestatuslist`,
    },

    MY_CALENDER_URL: {
        MONTHLY_ATTENDANCE_URL: `${CRM_BASE_URL}/monthlyAttendance`,
        ATTENDANCE_REGULARIZATION_URL: `${CRM_BASE_URL}/attendance_regulization`,
    },

    TRACKER_URL: {
        ATTENDANCE_HISTORY_URL: `${CRM_BASE_URL}/getAttendanceHistory`,
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
        GETORDERACTIVITYBTDATE_URL: `${CRM_BASE_URL}/getOrdersAndActivitiesByDate`,
    },

    TASK_URL: {
        GET_PENDING_TASK_URL: `${CRM_BASE_URL}/GetPendingTaskDates`,
        GET_FOLLOWUP_ACTIVITIES_URL: `${CRM_BASE_URL}/GetFollowUpActivities`,
        UPDATE_MULTIPLE_FOLLOWUP_URL: `${CRM_BASE_URL}/UpdateMultipleFollowUpTasks`,
        REPORTING_HIERARCHY_URL: `${CRM_BASE_URL}/Reporting_hierarchy`,
        ADD_NEW_TASK_URL: `${CRM_BASE_URL}/AddNewTask`,               
    },

    REGULARIZATION_URL: {
        GET_PENDINGLIST_REGU_URL: `${CRM_BASE_URL}/getPendingRegularizations`,
        REGU_ID_APPROVAL_URL: `${CRM_BASE_URL}/Regulizationidapproval`,
        REGU_ID_REJECTED_URL: `${CRM_BASE_URL}/Regulizationidrejected`,
        APPROVED_REGU_LIST_URL: `${CRM_BASE_URL}/ApprovedRegularizationList`,
        REJECTED_REGU_LIST_URL: `${CRM_BASE_URL}/RejectedRegularizationList`,
    },

    TEAM_URL: {
        TEAM_LINK_URL: `${CRM_BASE_URL}/Teamlink`,
    },

    HOLIDAY_URL: {
        HOLIDAY_LIST_URL: `${CRM_BASE_URL}/HolidayList`,
    },

    MTP_WORKING_PLAN_URL: {
        GET_EMPLOYEE_LEAVE_URL: (empid, selectedMonth, selectedYear) =>
          `${CRM_BASE_URL}/GetEmployeeLeaves?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`,
      
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
      
        GET_HOLIDAYS_URL: (effectiveStateId, month, year) =>
          `${CRM_BASE_URL}/GetHolidays?state_id=${effectiveStateId}&month=${month}&year=${year}`,
      
        GET_MTP_TOUR_PLAN_URL: (empid, selectedMonth, selectedYear) =>
          `${CRM_BASE_URL}/GetMtpTourPlan?empidd=${empid}&month=${selectedMonth + 1}&year=${selectedYear}`,
      
        REPORTING_HIERARCHY_URL: `${CRM_BASE_URL}/Reporting_hierarchy`,
      
        MTP_TOUR_BEAT_PLAN: (empid) =>
          `${CRM_BASE_URL}/MtpTourPlanBeat?empidd=${empid}`,
      
        INSERT_MTP_PLAN_URL: `${CRM_BASE_URL}/InsertMtpTourPlan`,
      },

      MTP_APPROVAL_URL: {

        // ✅ Team List (Manager Team)
        MANAGER_TEAM_URL: `${CRM_BASE_URL}/ManagerTeam`,
      
        // ✅ Pending MTP List
        MTP_PENDING_LIST_URL: (empid, month, year) =>
          `${CRM_BASE_URL}/MtpPendingList?empidd=${empid}&month=${month + 1}&year=${year}`,
      
        // ✅ Approve multiple pending MTPs
        MTP_APPROVE_URL: `${CRM_BASE_URL}/MtpApprovedIdBy`,
      
        // ✅ Rejected multiple pending MTPs
        MTP_REJECT_URL: `${CRM_BASE_URL}/MtpRejectedIdBy`,
      
        // ✅ Approved List for manager
        MTP_APPROVED_LIST_URL: (empid, month, year) =>
          `${CRM_BASE_URL}/MtpApprovedList?empidd=${empid}&month=${month + 1}&year=${year}`,
      
        // ✅ Rejected List for manager
        MTP_REJECTED_LIST_URL: (empid, month, year) =>
          `${CRM_BASE_URL}/MtpRejectedList?empidd=${empid}&month=${month + 1}&year=${year}`,
      
        // ✅ Fetch Outlets by Beat-ID
        MTP_BEAT_OUTLET_URL: (beatId) =>
          `${CRM_BASE_URL}/MtpBeatidOutlet?beat_id=${beatId}`,
      },
      
      MTP_REPORT_URL: {
        MONTH_WISE_DATA: (empId, month, year) =>
          `${CRM_BASE_URL}/GetMtpTourPlan?empidd=${empId}&month=${month + 1}&year=${year}`,
    
        HOLIDAYS: (stateId, month, year) =>
          `${CRM_BASE_URL}/GetHolidays?state_id=${stateId}&month=${month + 1}&year=${year}`,
    
        LEAVE_DATES: (empId, month, year) =>
          `${CRM_BASE_URL}/GetEmployeeLeaves?empidd=${empId}&month=${month + 1}&year=${year}`,
    
        OUTLETS_BY_BEAT_ID: (beatId) =>
          `${CRM_BASE_URL}/MtpBeatidOutlet?beat_id=${beatId}`,

        MANAGER_TEAM_LIST_URL: `${CRM_BASE_URL}/ManagerTeam`,

      },
      
      EOD_URL: {
        // Punch in / Out status
        STATUS_ATTENDANCE_URL: `${CRM_BASE_URL}/EODAttendance`,
        STATUS_ATTENDANCE_BUTTON_URL: `${CRM_BASE_URL}/EODAttendancebutton`,

        // Return Data
        RETURN_COMPLETE_URL: `${CRM_BASE_URL}/EodReturn`,
        RETURN_DATE_URL: `${CRM_BASE_URL}/EodDateReturn`,
        RETURN_BUTTON_URL: `${CRM_BASE_URL}/EodReturnbutton`,
        RETURN_DATE_BUTTON_URL: `${CRM_BASE_URL}/EodDateReturnbutton`,

        // Order Data
        ORDER_TODAY_DATE_URL: `${CRM_BASE_URL}/EodDate`,
        ORDER_TODAY_DATA_URL: `${CRM_BASE_URL}/EodOrder`,
        ORDER_DATE_BUTTON_URL: `${CRM_BASE_URL}/EodDatebutton`,
        ORDER_DATA_BUTTON_URL: `${CRM_BASE_URL}/EodOrderbutton`,

        // Activity Data
        ACTIVITY_TODAY_DATE_URL: `${CRM_BASE_URL}/EODActivityDate`,
        ACTIVITY_DATE_BUTTON_URL: `${CRM_BASE_URL}/EODActivityDatebutton`,
        ACTIVITY_DATA_URL: `${CRM_BASE_URL}/ActivityData`,
        ACTIVITY_DATA_BUTTON_URL: `${CRM_BASE_URL}/ActivityDatabutton`,

        // Not Punched In
        NOT_PUNCH_IN_URL: `${CRM_BASE_URL}/EodNotPunchIn`,
    },

PROFILE_URL: {
    PROFILE_DATA_URL: `${CRM_BASE_URL}/profiledata`,
},

EDIT_PROFILE_URL: {
    CHANGE_PASSWORD_URL: `${CRM_BASE_URL}/changepassword`,
},

HOSPITAL_CONTACT_LIST_URL: {
    HOSPITAL_LIST_URL: `${CRM_BASE_URL}/hospitalContact`,
},

HOMETAB_URL: {

    NOT_PUNCH_IN_URL: `${CRM_BASE_URL}/EodNotPunchIn`,
  
    PUNCH_IN_OUT_TIME_URL: `${CRM_BASE_URL}/punchInOutTime`,
  
    PENDING_TASK_COUNT_URL: `${CRM_BASE_URL}/GetPendingTaskCount`,
  
    PENDING_REGULIZATION_COUNT_URL: `${CRM_BASE_URL}/getPendingRegularizationCount`,
  
    PENDING_LEAVE_COUNT_URL: `${CRM_BASE_URL}/getPendingLeaveCount`,
  },
  
  RETAIL_ACTIVITY_URL: {
    OUTLET_ACTIVITY_URL: `${CRM_BASE_URL}/outlet_activity`,
    RETAIL_ACTIVITY_URL: `${CRM_BASE_URL}/retail_activity`,
  }

}

export default API_URL;


