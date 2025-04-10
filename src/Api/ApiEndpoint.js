
export const API_ENDPOINTS = {
    generateToken: '/auth/generate-token',
    authCurrent: '/auth/current',
    updateUser:'/user/update/by/id',
    getRole: '/user/get/role/by/id', 
    getAllLeadReport:'/leads-report/get/all',
    getAllUser:'/user/get/all',
    getallTotalLead:'/leads/get/all',
    assignToUser:  'leads/assign/leads/to/users',
    getAllMeeting: '/meeting/find-all',
    getAllSources:'/source/get/all',
    getAllProjects:'/project/get/all',
    saveNewLead:'/leads/save/new',
    saveNewOrg:'/organization/save/new',
    getAllDuplicateLeadReport: '/duplicate-leads-report/get/all',
    DuplicateAssignToUser:'/duplicate-leads/assign/leads/to/users',
    leadExcelUpload:'/leads/upload/Excel',
    getAllDuplicateLead:'/duplicate-leads/get/all',
    getByLeadId:'/leads/get/by/id',
    getDuplicateLeadByLeadId:'/duplicate-leads/get/by/id',
    getCallingStatus:'/calling-data/get/all',
    getCallingStatusbyId:'/calling-data/get/by/id',
    getFeedbackByLeadIdandUserId: '/feedback/get/by/leadId/userId',
    getFeedbackDupliacteByLeadIdandUserId:'/duplicate-leads-feedback/get/by/leadId/userId',
    getallCallStatus:'/call-status/get/all',
    UpdateLeadReportbyId:'/leads-report/update/by/id',
    UpdateDuplicateLeadReportById:'/duplicate-leads-report/update/by/id',
    getallDepartment:'/department/get/all',
    getallUserRole:'/user/get/all/role',
    SaveNewUser:'/user/create/new',
    DegignationByDepartmentId:'/designation/get/by/department/id',
    CallStatusExcelUpload:'/calling-data/upload/Excel',
    DeleteUpdateLeads:'/leads/update/delete/by/id',
    DeleteCallingLeads:'/calling-data/delete/by/id',
    UpdatePssword:'/user/update/password/by/phone',
    UpdateLead:'/leads/update/by/id',
    UpdateDuplicateLead:'/duplicate-leads/update/by/id',
    GetleadByphoneAndLeadId:'/leads/get/by/phone/or/id',
    GetleadReportByphoneAndLeadId:'/leads-report/get/by/phone/or/leadId',
    getCallingDataByPhoneAndId:'/calling-data/get/by/phone/or/id',
    GetDuplicateleadByphoneAndLeadId:'/duplicate-leads/get/by/phone/or/leadId',
    GetDuplicateleadReportByphoneAndLeadId:'/duplicate-leads-report/get/by/phone/or/leadId',
    GetAllTrashLeads:'/leads/get/all/trash',
    GetAllTrashDuplicateLeads:'/duplicate-leads/get/all/trash',
    GetAllNewLeads:'/leads/get/all/new',
    GetAllNewDuplicateLeads:'/duplicate-leads/get/all/new',
    GetAllNewCallingData:'/calling-data/get/all/new',
    sendOtp:'/email/send-otp',  
    otpVerify:'/email/verify-otp',
    GetAllCallStatusByUserId:'/calling-data/get/all/by/userId',
    getCallStatus:'/call-status/get/all/status',
    UpdateCallStatus:'/calling-data/update/by/id',
    getnewleadsByphoneorId:'/leads/get/all/new/by/phone/or/Id',
    saveNewCalldata:'/calling-data/save/new',
    getNewDuplicateLeadbyPhoneAndid:'/duplicate-leads/get/all/new/by/phone/or/dLeadsId',
    updateCallingLeads:'/calling-data/update/by/id',
    deleteDuplicateLead:'/duplicate-leads/update/delete/by/id',
    // analytics
    getallSummary:'/analytics/get/all/Summary',
    // fib
    saveFibData:'/fib/save/new',
    getallFibData:'/fib/get/all',
    approveFibData:'/fib/approve/fib',
    deleteFibData:'/fib/delete/by/id',
    getFibDataById:'/fib/get/by/id',
    fibgetByUserId:'/fib/get/by/user',
    fibUpdateByUserId:'/fib/update/by/id',
    fibgetByLeadId:'/fib/get/by/leads',

    //upload file
    uploadFile:'/img/upload',

    //attendance
    saveAttendance:'/attendance/save/by',
    getAttendanceByUserId:'/attendance/get/average/by',
    getAttendanceByUserIdMonthly:'/attendance/find-all',
    getAttendanceRecordByUserID:'/attendance/get/record/of/user/by', 
    updateAttendanceByUserId:'/attendance/update/user-data',
    getTodayDate:'/attendance/get/today',

    //leavs
    getmontlyLeadsbyUserId:'/leaves/get/monthly/count/by',

    //meeting
    getallmeeting:'/meeting/get-all',
    SaveNewMeeting:'/meeting/save/new',
    getMeetingById:'/meeting/get/by',
    meetingUpdateByid:'/meeting/update/by/id',


    //salary
    getSalaryByUserId:'/get/salary/by/user/id',
    getMonthlySalaryByUserId:'get/monthly/salary/cycle/by/user',

    //bookmark
    saveBookmark:'/user/save/bookmark',
    getallBookmark:'/user/get/all/bookmark',
    deleteBookmark:'/user/delete/bookmark',

    //leadreport
    getLeadreportNew:'/leads-report/get/all/new',
    getDuplicateLeadreportNew:'/duplicate-leads-report/get/all/new',
    updateLeadreportByAdmin:'/leads-report/admin/update/by/id',

    //calling
    getByCallingId:'/calling-data/get/by/id',
    CallingAssign:'/calling-data/assign/calling/data/to/user',
    //duplicate
    getDuplicateLeadbyId:'/duplicate-leads/get/by/id',
    duplicateLeadreportUpdateByAdmin:'/duplicate-leads-report/admin/update/by/id',
    //
    //callingStatus
    UpdateCallingStatusByAdmin:'/calling-data/admin/update/by/id',
    ExcelDownloadLeads:'/leads/download/excel',
    ExcelDownloadLeadsReport:'/leads-report/download/excel',
    ExcelDownloadDuplicateLeadReport:'/duplicate-leads-report/download/excel',
    ExcelDownloadCallingleads:'/calling-data/download/excel',

    //project
    SaveNewProject:'/project/save/new',
    ProjectgetbyName:'/project/get/by/name',
    EmailShare:'/email/project/send/to/client/by/id',
    //child User
    getChildUser:'/user/get/all/child/users',
    

  };
  