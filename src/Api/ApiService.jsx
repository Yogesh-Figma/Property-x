import AxiosInstance from "./ApiInstance";
import { API_ENDPOINTS } from "./ApiEndpoint";
import { API_ENDPOINTS_2 } from "./ApiEndpointUser";
const rolename = localStorage.getItem("rolename");
class ApiService {
  // async GenerateToken(credentials) {
  //   try {
  //     const response = await useAxiosInstance.post(API_ENDPOINTS.generateToken, credentials);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error generating token:', error);
  //     throw new Error('Failed to generate token. Please check your credentials.');
  //   }
  // }

  async getCurrentUser() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.authCurrent);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch user data.");
    }
  }

  async getRoleById(roleId) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.getRole}/${roleId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching role data:", error);
      throw new Error("Failed to fetch role data.");
    }
  }

  async getallCallStatus() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getCallStatus);
      return response;
    } catch (error) {
      console.error("Error fetching callStatus data:", error);
      throw new Error("Failed to fetch callStatus data:.");
    }
  }

  async getAllLeadReport(
    status,
    page,
    size,
    search,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    leadAssignFrequency,
    callStatus,
    projectName,
    source,
    userId,
    assignBy,
    doneDateName,
    doneStartDate,
    doneEndDate,
    nextCallStartDate,
    nextCallEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getAllLeadReport}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) {
        url += `&assignBy=${assignBy}`;
      }
      if (cStatusEndDate) {
        url += `&cStatusEndDate=${cStatusEndDate}`;
      }
      if (cStatusStartDate) {
        url += `&cStatusStartDate=${cStatusStartDate}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (cStartDate) {
        url += `&cStartDate=${cStartDate}`;
      }
      if (cEndDate) {
        url += `&cEndDate=${cEndDate}`;
      }
      if (aStartDate) {
        url += `&aStartDate=${aStartDate}`;
      }
      if (aEndDate) {
        url += `&aEndDate=${aEndDate}`;
      }
      if (uStartDate) {
        url += `&uStartDate=${uStartDate}`;
      }
      if (uEndDate) {
        url += `&uEndDate=${uEndDate}`;
      }
      if (leadAssignFrequency) {
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      }
      if (callStatus) {
        url += `&callStatus=${callStatus}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      if (doneDateName) url += `&doneDateName=${doneDateName}`;
      if (doneStartDate) url += `&doneStartDate=${doneStartDate}`;
      if (doneEndDate) url += `&doneEndDate=${doneEndDate}`;
      if (nextCallStartDate) url += `&nextCallStartDate=${nextCallStartDate}`;
      if (nextCallEndDate) url += `&nextCallEndDate=${nextCallEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching all lead reports:", error.message);
      throw error;
    }
  }

  async DuplicateLeadReport(
    status,
    page,
    size,
    search,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    leadAssignFrequency,
    callStatus,
    projectName,
    source,
    userId,
    assignBy,
    doneDateName,
    doneStartDate,
    doneEndDate,
    nextCallStartDate,
    nextCallEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getAllDuplicateLeadReport}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (search) url += `&search=${search}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (callStatus) url += `&callStatus=${callStatus}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (userId) url += `&userId=${userId}`;
      if (leadAssignFrequency)
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      if (cStatusStartDate) url += `&cStatusStartDate=${cStatusStartDate}`;
      if (cStatusEndDate) url += `&cStatusEndDate=${cStatusEndDate}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (uStartDate) url += `&uStartDate=${uStartDate}`;
      if (uEndDate) url += `&uEndDate=${uEndDate}`;
      if (doneDateName) url += `&doneDateName=${doneDateName}`;
      if (doneStartDate) url += `&doneStartDate=${doneStartDate}`;
      if (doneEndDate) url += `&doneEndDate=${doneEndDate}`;
      if (nextCallStartDate) url += `&nextCallStartDate=${nextCallStartDate}`;
      if (nextCallEndDate) url += `&nextCallEndDate=${nextCallEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error(
        "Error fetching all Duplicate lead reports:",
        error.message
      );
      throw error;
    }
  }

  async getallTotalLead(
    status,
    page,
    size,
    search,
    assignBy,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    projectName,
    source,
    userId,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getallTotalLead}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search) url += `&search=${search}`;
      if (status) url += `&status=${status}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (userId) url += `&userId=${userId}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch Leads", error.message);
      throw error;
    }
  }
  async ExcelDownloadLeadsReport(
    status,
    page,
    size,
    search,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    leadAssignFrequency,
    callStatus,
    projectName,
    source,
    userId,
    assignBy
  ) {
    try {
      let url = `${API_ENDPOINTS.ExcelDownloadLeadsReport}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) {
        url += `&assignBy=${assignBy}`;
      }
      if (cStatusEndDate) {
        url += `&cStatusEndDate=${cStatusEndDate}`;
      }
      if (cStatusStartDate) {
        url += `&cStatusStartDate=${cStatusStartDate}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (cStartDate) {
        url += `&cStartDate=${cStartDate}`;
      }
      if (cEndDate) {
        url += `&cEndDate=${cEndDate}`;
      }
      if (aStartDate) {
        url += `&aStartDate=${aStartDate}`;
      }
      if (aEndDate) {
        url += `&aEndDate=${aEndDate}`;
      }
      if (uStartDate) {
        url += `&uStartDate=${uStartDate}`;
      }
      if (uEndDate) {
        url += `&uEndDate=${uEndDate}`;
      }
      if (leadAssignFrequency) {
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      }
      if (callStatus) {
        url += `&callStatus=${callStatus}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await AxiosInstance.get(url, { responseType: "blob" });
      return response;
    } catch (error) {
      console.error("Error fetching all lead reports:", error.message);
      throw error;
    }
  }
  async ExcelDownloadDuplicateLeadsReport(
    status,
    page,
    size,
    search,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    leadAssignFrequency,
    callStatus,
    projectName,
    source,
    userId,
    assignBy
  ) {
    try {
      let url = `${API_ENDPOINTS.ExcelDownloadDuplicateLeadReport}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) {
        url += `&assignBy=${assignBy}`;
      }
      if (cStatusEndDate) {
        url += `&cStatusEndDate=${cStatusEndDate}`;
      }
      if (cStatusStartDate) {
        url += `&cStatusStartDate=${cStatusStartDate}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (cStartDate) {
        url += `&cStartDate=${cStartDate}`;
      }
      if (cEndDate) {
        url += `&cEndDate=${cEndDate}`;
      }
      if (aStartDate) {
        url += `&aStartDate=${aStartDate}`;
      }
      if (aEndDate) {
        url += `&aEndDate=${aEndDate}`;
      }
      if (uStartDate) {
        url += `&uStartDate=${uStartDate}`;
      }
      if (uEndDate) {
        url += `&uEndDate=${uEndDate}`;
      }
      if (leadAssignFrequency) {
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      }
      if (callStatus) {
        url += `&callStatus=${callStatus}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await AxiosInstance.get(url, { responseType: "blob" });
      return response;
    } catch (error) {
      console.error("Error fetching all lead reports:", error.message);
      throw error;
    }
  }
  async ExcelDownloadCallingleads(
    status,
    page,
    size,
    search,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    leadAssignFrequency,
    callStatus,
    projectName,
    source,
    userId,
    assignBy
  ) {
    try {
      let url = `${API_ENDPOINTS.ExcelDownloadCallingleads}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&leadsStatus=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) {
        url += `&assignBy=${assignBy}`;
      }
      if (cStatusEndDate) {
        url += `&cStatusEndDate=${cStatusEndDate}`;
      }
      if (cStatusStartDate) {
        url += `&cStatusStartDate=${cStatusStartDate}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (cStartDate) {
        url += `&cStartDate=${cStartDate}`;
      }
      if (cEndDate) {
        url += `&cEndDate=${cEndDate}`;
      }
      if (aStartDate) {
        url += `&aStartDate=${aStartDate}`;
      }
      if (aEndDate) {
        url += `&aEndDate=${aEndDate}`;
      }
      if (uStartDate) {
        url += `&uStartDate=${uStartDate}`;
      }
      if (uEndDate) {
        url += `&uEndDate=${uEndDate}`;
      }
      if (leadAssignFrequency) {
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      }
      if (callStatus) {
        url += `&callStatus=${callStatus}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await AxiosInstance.get(url, { responseType: "blob" });
      return response;
    } catch (error) {
      console.error("Error fetching all lead reports:", error.message);
      throw error;
    }
  }
  async ExcelDowloadLeads(
    status,
    page,
    size,
    search,
    assignBy,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    projectName,
    source,
    userId
  ) {
    try {
      let url = `${API_ENDPOINTS.ExcelDownloadLeads}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search) url += `&search=${search}`;
      if (status) url += `&status=${status}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (userId) url += `&userId=${userId}`;
      const response = await AxiosInstance.get(url, { responseType: "blob" });
      return response;
    } catch (error) {
      console.error("Failed to fetch Leads", error.message);
      throw error;
    }
  }

  async getallDlead(
    status,
    page,
    size,
    search,
    userId,
    duplicateFrequency,
    assignBy,
    createdBy,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    projectName,
    source,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getAllDuplicateLead}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (search) url += `&search=${search}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) url += `&assignById=${assignBy}`;
      if (createdBy) url += `&createdBy=${createdBy}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      
      if (duplicateFrequency)
        url += `&duplicateFrequency=${duplicateFrequency}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Leads");
    }
  }

  async getAllUser(page = 0, size = 50) {
    try {
      let url = API_ENDPOINTS.getAllUser;
      const params = new URLSearchParams({ page, size });
  
      url += `?${params.toString()}`;
  
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data.");
    }
  }
  
  

  async assignToUser(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.assignToUser,
        payload
      );
      return response;
    } catch (error) {
      console.error("Failed to assign Lead" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async CallingassignTo(payload, userId) {
    try {
      let url = `${API_ENDPOINTS.CallingAssign}?assignTo=${userId}`;
      const response = await AxiosInstance.post(url ,payload);
      return response;
    } catch (error) {
      console.error("Error fetching meeting:", error.message);
      throw new Error("Failed to fetch meeting");
    }
  }

  async getAllMeeting(userId, page, size) {
    try {
      let url = `${API_ENDPOINTS.getAllMeeting}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (userId) {
        url += `&userId=${userId}`;
      }
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Meeting");
    }
  }

  async getallSources() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getAllSources);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Sources");
    }
  }

  async getallProjects() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getAllProjects);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Projects");
    }
  }

  async saveNewLead(leadData) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveNewLead,
        leadData
      );
      return response;
    } catch (error) {
      console.error("Failed to Save New Lead" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
  async saveNewCallData(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveNewCalldata,
        payload
      );
      return response;
    } catch (error) {
      console.error("Failed to Save New Lead" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async saveNewOrg(formdata) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveNewOrg,
        formdata
      );
      return response;
    } catch (error) {
      console.error("Failed to Save New Org" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async getCallingStatus(
    status,
    page,
    size,
    search,
    userId,
    assignBy,
    cStartDate,
    cEndDate,
    uStartDate,
    uEndDate,
    projectName,
    source,
    assignTo,
    aStartDate,
    aEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getCallingStatus}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&leadsStatus=${status}`;
      }
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (search) url += `&search=${search}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (uStartDate) url += `&uStartDate=${uStartDate}`;
      if (uEndDate) url += `&uEndDate=${uEndDate}`;
      if (assignTo) url += `&assignTo=${assignTo}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Leads");
    }
  }

  async DuplicateAssignToUser(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.DuplicateAssignToUser,
        payload
      );
      return response;
    } catch (error) {
      throw new Error("failed to assign User");
    }
  }

  async leadExcelUpload(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.leadExcelUpload,
        payload
      );
      return response;
    } catch (error) {
      throw new Error("Failed to save new Lead through Excel");
    }
  }

  async AddProject(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.SaveNewProject,
        payload
      );
      return response;
    } catch (error) {
      throw new Error("Failed to save new Project ");
    }
  }
  async getLeadById(leadId) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.getByLeadId}/${leadId}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get Lead Report");
    }
  }
  async getProjectByName(name) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.ProjectgetbyName}/${name}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get Lead Report");
    }
  }
  
  async ShareProject(leadsId , value) {
    try {
      console.log('entwrrr')
      let url = API_ENDPOINTS.EmailShare;
      console.log('entwrrr6789',url ,value)

        if (value == "leadsId") {
          console.log('77',value)
          url += `?leadsId=${leadsId}`;
        } else if (value == 'dLeadsId') {
          url += `?dLeadsId=${leadsId}`;
        } else {
          url += `?cLeadsId=${leadsId}`;
        }
        console.log('entwrrr6789000',url)

        const response = await AxiosInstance.post(url);
        return response;
    } catch (error) {
        throw new Error("Failed to Share Project");
    }
}



  async getCallingStatusById(id) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.getCallingStatusbyId}/${id}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get CallStatus");
    }
  }

  async CallStatusExcelUpload(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.CallStatusExcelUpload,
        payload
      );
      return response;
    } catch (error) {
      throw new Error("Failed to save new CallStatus through Excel");
    }
  }

  async getFeedbackByleadIdandUserId(leadId, UserId, page, size) {
    try {
      let url = `${
        API_ENDPOINTS.getFeedbackByLeadIdandUserId
      }?leadId=${leadId}&userId=${UserId}&page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to feedback");
    }
  }

  async getFeedbackDuplicateByleadIdandUserId(leadId, UserId, page, size) {
    try {
      let url = `${
        API_ENDPOINTS.getFeedbackDupliacteByLeadIdandUserId
      }?duplicateLeadId=${leadId}&userId=${UserId}&page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to feedback");
    }
  }

  async getCallStatus(status) {
    try {
      let url = API_ENDPOINTS.getallCallStatus;
      if (status) {
        url += `?leadsStatus=${status}`;
      }
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Leads");
    }
  }

  async UpdateLeadReportById(payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.UpdateLeadReportbyId,
        payload
      );
      return response;
    } catch (error) {
      console.log( error.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    }
  }
  async UpdateLeadReportByIdAdmin(payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.updateLeadreportByAdmin,
        payload
      );
      return response;
    } catch (error) {
      console.log("Failed to Update LeadReport" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async UpdateDuplicateLeadReportByIdAdmin(payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.duplicateLeadreportUpdateByAdmin,
        payload
      );
      return response;
    } catch (error) {
      console.log("Failed to Update LeadReport" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async updateCallStatusByAdmin(id, payload) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.UpdateCallingStatusByAdmin}/${id}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error update Call data:", error.response.data.message);
      throw new Error(error.response.data.messagee);
    }
  }

  async UpdateDuplicateLeadReportById(payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.UpdateDuplicateLeadReportById,
        payload
      );
      return response;
    } catch (error) {
      console.log(
        "Failed to Update Duplicate LeadReport" + error.response.data.message
      );
      throw new Error(error.response.data.message);
    }
  }

  async getDuplicateLeadByLeadId(leadId) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.getDuplicateLeadByLeadId}/${leadId}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get Dupliacte Lead");
    }
  }

  async getAllDepartment() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getallDepartment);
      return response;
    } catch (error) {
      console.error("Error fetching all Department:", error.message);
      throw error;
    }
  }

  async getAllUserRole() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getallUserRole);
      return response;
    } catch (error) {
      console.error("Error fetching all UserRole:", error.message);
      throw error;
    }
  }

  async SaveNewUser(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.SaveNewUser,
        payload
      );
      return response;
    } catch (error) {
      console.log("Failed to Update LeadReport" + error?.response?.data?.message);
      throw new Error(error?.response?.data?.message);
    }
  }

  async getDegignationByDepartmentId(departmentId) {
    try {
      const response = await AxiosInstance.get(
        `${API_ENDPOINTS.DegignationByDepartmentId}/${departmentId}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to get Designations");
    }
  }

  // ---------Delete Api -----------//
  async deleteLeads(leadId, isDelete) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.DeleteUpdateLeads}/${leadId}?isDeleted=${isDelete}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to delete Lead");
    }
  }
  async deleteDuplicateLeads(leadId, isDelete) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.deleteDuplicateLead}/${leadId}?isDeleted=${isDelete}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to delete Lead");
    }
  }

  async deleteCallingLeads(leadId) {
    try {
      const response = await AxiosInstance.delete(
        `${API_ENDPOINTS.DeleteCallingLeads}/${leadId}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to delete Lead");
    }
  }

  // ---------Patch Api -----------//

  async updatetCallingLeads(LeadId, payload) {
    try {
      let url = `${API_ENDPOINTS.updateCallingLeads}/${LeadId}`;
      const response = await AxiosInstance.patch(url, payload);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Leads");
    }
  }

  async updateCallStatus(id, payload) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.UpdateCallStatus}/${id}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error update Call data:", error.response.data.message);
      throw new Error(error.response.data.messagee);
    }
  }

  async upadtePassword(Phone, password) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.UpdatePssword}/${Phone}?password=${password}`
      );
      return response;
    } catch (error) {
      throw new Error("Failed to update Password");
    }
  }

  async updateLead(leadId, payload) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.UpdateLead}/${leadId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Failed to Update Lead" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }

  async updateDuplicateLead(leadId, payload) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.UpdateDuplicateLead}/${leadId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Failed to Update Lead" + error.response.data.message);
      throw new Error(error.response.data.message);
    }
  }
  //------------User_API---------------------------//
  async getallLeadbyUserId(
    status,
    userId,
    projectName,
    source,
    assignById,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    page,
    size
  ) {
    try {
      let url = `${API_ENDPOINTS_2.getallleadsbyUserId}/${userId}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignById) url += `&assignById=${assignById}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch Leads", error.message);
      throw error;
    }
  }

  async getallDuplicateLeadbyUserId(
    status,
    userId,
    duplicateFrequency,
    projectName,
    source,
    assignById,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    page,
    size
  ) {
    try {
      let url = `${
        API_ENDPOINTS_2.getallDuplicateLeadsByUserId
      }/${userId}?page=${page !== undefined ? page : 0}&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (duplicateFrequency)
        url += `&duplicateFrequency=${duplicateFrequency}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (assignById) url += `&assignById=${assignById}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch Leads", error.message);
      throw error;
    }
  }

  async getallLeadReportbyUserId(
    status,
    userId,
    page,
    size,
    callStatus,
    assignBy,
    leadAssignFrequency,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    projectName,
    source
  ) {
    try {
      let url = `${API_ENDPOINTS_2.getLeadReportByUserId}/${userId}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (callStatus) url += `&callStatus=${callStatus}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (leadAssignFrequency)
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      if (cStatusStartDate) url += `&cStatusStartDate=${cStatusStartDate}`;
      if (cStatusEndDate) url += `&cStatusEndDate=${cStatusEndDate}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (uStartDate) url += `&uStartDate=${uStartDate}`;
      if (uEndDate) url += `&uEndDate=${uEndDate}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch LeadReport", error.message);
      throw error;
    }
  }

  async getallDuplicateLeadReportbyUserId(
    status,
    userId,
    page,
    size,
    callStatus,
    assignBy,
    leadAssignFrequency,
    cStatusStartDate,
    cStatusEndDate,
    cStartDate,
    cEndDate,
    aStartDate,
    aEndDate,
    uStartDate,
    uEndDate,
    projectName,
    source
  ) {
    try {
      let url = `${
        API_ENDPOINTS_2.getallDuplicateLeadReportByUserId
      }/${userId}?page=${page !== undefined ? page : 0}&size=${size || 10}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (callStatus) url += `&callStatus=${callStatus}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (leadAssignFrequency)
        url += `&leadAssignFrequency=${leadAssignFrequency}`;
      if (cStatusStartDate) url += `&cStatusStartDate=${cStatusStartDate}`;
      if (cStatusEndDate) url += `&cStatusEndDate=${cStatusEndDate}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (uStartDate) url += `&uStartDate=${uStartDate}`;
      if (uEndDate) url += `&uEndDate=${uEndDate}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Failed to fetch LeadReport", error.message);
      throw error;
    }
  }

  async getCallingStatusByUserId(status, UserId, page, size) {
    try {
      let url = `${API_ENDPOINTS.GetAllCallStatusByUserId}/${UserId}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (status) {
        url += `&leadsStatus=${status}`;
      }
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch Leads");
    }
  }
  //------------------------------------//
  async getAllTrashLeads(page, size) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GetAllTrashLeads + `?page=${page}&size=${size}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching Trash data:", error);
      throw new Error("Failed to fetch Trash data.");
    }
  }
  async getAllTrashDuplicateLeads(page, size) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.GetAllTrashDuplicateLeads + `?page=${page}&size=${size}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching Trash data:", error);
      throw new Error("Failed to fetch Trash data.");
    }
  }
  //---------------------NewLead--------------------//
  async getAllNewLeads(
    page,
    size,
    search,
    cStartDate,
    cEndDate,
    projectName,
    source,
    assignBy,
    userId,
    aStartDate,
    aEndDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.GetAllNewLeads}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search) url += `&search=${search}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (userId) url += `&assignTo=${userId}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching New Leads data:", error);
      throw new Error("Failed to fetch New Leads data.");
    }
  }

  async getAllNewLeadReport(
    page,
    size,
    search,
    cStartDate,
    cEndDate,
    projectName,
    source,
    assignBy,
    assignTo,
    aStartDate,
    aEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getLeadreportNew}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search) url += `&search=${search}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (assignTo) url += `&assignTo=${assignTo}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching New Leads data:", error);
      throw new Error("Failed to fetch New Leads data.");
    }
  }

  async getAllNewDuplicateLeads(
    page,
    size,
    search,
    cStartDate,
    cEndDate,
    projectName,
    source,
    assignBy,
    userId,
    aStartDate,
    aEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.GetAllNewDuplicateLeads}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search) url += `&search=${search}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (userId) url += `&userId=${userId}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching New leads data:", error);
      throw new Error("Failed to fetch New Leads data.");
    }
  }
  async getAllNewDuplicateLeadReport(
    page,
    size,
    search,
    cStartDate,
    cEndDate,
    projectName,
    source,
    assignBy,
    assignTo,
    aStartDate,
    aEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.getDuplicateLeadreportNew}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectName=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search.trim()) url += `&search=${search.trim()}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (assignTo) url += `&assignTo=${assignTo}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching New leads data:", error);
      throw new Error("Failed to fetch New Leads data.");
    }
  }

  async getAllNewCallingData(
    page,
    size,
    search,
    cStartDate,
    cEndDate,
    projectName,
    source,
    assignBy,
    userId,
    aStartDate,
    aEndDate,
    filterByAssignedDate,
    sortByAscDesc,
  ) {
    try {
      let url = `${API_ENDPOINTS.GetAllNewCallingData}?page=${
        page !== undefined ? page : 0
      }&size=${size || 10}`;
      if (projectName) url += `&projectname=${encodeURIComponent(projectName)}`;
      if (source) url += `&source=${encodeURIComponent(source)}`;
      if (search.trim()) url += `&search=${search.trim()}`;
      if (cStartDate) url += `&cStartDate=${cStartDate}`;
      if (cEndDate) url += `&cEndDate=${cEndDate}`;
      if (assignBy) url += `&assignBy=${assignBy}`;
      if (userId) url += `&assignTo=${userId}`;
      if (aStartDate) url += `&aStartDate=${aStartDate}`;
      if (aEndDate) url += `&aEndDate=${aEndDate}`;
      if (filterByAssignedDate) url +=`&filterByAssignedDate=${filterByAssignedDate}`;
      if (sortByAscDesc) url +=`&sortByAscDesc=${sortByAscDesc}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching New Calling data:", error);
      throw new Error("Failed to fetch New Calling data.");
    }
  }
  //----------------------------------------------------------//
  async SendOtp(UserId, email) {
    try {
      const response = await AxiosInstance.post(
        `${API_ENDPOINTS.sendOtp}/${UserId}?email=${email}`
      );
      return response;
    } catch (error) {
      console.error("Error sending otp:", error);
    }
  }

  async VerifyEmail(otp, email) {
    try {
      const response = await AxiosInstance.post(
        `${API_ENDPOINTS.otpVerify}?otp=${otp}&email=${email}`
      );
      console.log(`${API_ENDPOINTS.otpVerify}/?otp=${otp}&email=${email}`);
      return response;
    } catch (error) {
      throw new Error("Error sending otp");
    }
  }

  // Analytics
  async getallSummary() {
    try {
      let url = `${API_ENDPOINTS.getallSummary}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching summary data:", error);
      throw new Error("Failed to fetch summary data.");
    }
  }

  // fib
  async saveFibData(payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveFibData,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error saving fib data", error);
      throw new Error("Error saving fib data");
    }
  }

  async getallFibData(
    Page,
    size,
    startDateEpoch,
    endDateEpoch,
    approvedStartDateEpoch,
    approvedEndDateEpoch,
    isCANCALANATION,
    source,
    userId
  ) {
    try {
      let url = `${API_ENDPOINTS.getallFibData}?page=${Page}&size=${size}`;
      if (startDateEpoch) url += `&startedDate=${startDateEpoch}`;
      if (endDateEpoch) url += `&endDate=${endDateEpoch}`;
      if (approvedStartDateEpoch) url += `&approvedStartDate=${approvedStartDateEpoch}`;
      if (approvedEndDateEpoch) url += `&approvedEndDate=${approvedEndDateEpoch}`;
      if (isCANCALANATION) url += `&isCanceled=${isCANCALANATION}`;
      if (source) url += `&fibSource=${source}`;
      if (userId) url += `&userId=${userId}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching fib data", error);
      throw new Error("Error fetching fib data");
    }
  }
  async approveFibData(id, approve) {
    try {
      let url = `${API_ENDPOINTS.approveFibData}/${id}?isApproved=${approve}`;
      const response = await AxiosInstance.patch(url);
      return response;
    } catch (error) {
      console.error("Error approving fib data", error);
      throw new Error("Error approving fib data");
    }
  }
  async deleteFibData(id) {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.deleteFibData + `/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error deleting fib data", error);
      throw new Error("Error deleting fib data");
    }
  }
  async getFibDataById(id) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getFibDataById + `/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching fib data", error);
      throw new Error("Error fetching fib data");
    }
  }
  async getFibDataByleads(Payload) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.fibgetByLeadId,
        Payload
      );
      return response;
    } catch (error) {
      console.error("Error fetching fib data", error);
      throw new Error("Error fetching fib data");
    }
  }

  async updatefibById(id, payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.fibUpdateByUserId + `/${id}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error updating fib data", error);
      throw new Error("Error updating fib data");
    }
  }
  
  async updateUserId(id, payload) {
    try {
      const response = await AxiosInstance.patch(
        API_ENDPOINTS.updateUser + `/${id}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error updating fib data", error);
      throw new Error("Error updating fib data");
    }
  }

  async getFibDataByUserId(
    Page,
    size,
    startDateEpoch,
    endDateEpoch,
    isCANCALANATION,
    source
  ) {
    try {
      let url = `${API_ENDPOINTS.fibgetByUserId}?page=${Page}&size=${size}`;
      if (startDateEpoch) url += `&startDate=${startDateEpoch}`;
      if (endDateEpoch) url += `&endDate=${endDateEpoch}`;
      if (isCANCALANATION) url += `&isCanceled=${isCANCALANATION}`;
      if (source) url += `&source=${source}`;
      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching fib data by user", error);
      throw new Error("Error fetching fib data by user");
    }
  }

  async uploadFile(file, folderName) {
    try {
      const url = `${API_ENDPOINTS.uploadFile}?folderName=${folderName}`;
      const response = await AxiosInstance.post(url, file);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error uploading file", error);
      throw new Error("Error uploading file");
    }
  }

  // attendance
  async saveAttendance(payload, userId) {
    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveAttendance + `/${userId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error saving attendance", error.message);
      throw new Error(error.response.data.message);
    }
  }
  async getAttendanceByUserId(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getAttendanceByUserId + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching attendance", error);
      throw new Error("Error fetching attendance");
    }
  }

  async getAttendanceByUserIdMonthly(userId, page, size, startDate, endDate) {
    try {
      let url = `${API_ENDPOINTS.getAttendanceByUserIdMonthly}?userId=${userId}&page=${page}&size=${size}`;

      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;

      const response = await AxiosInstance.get(url);
      return response;
    } catch (error) {
      console.error(
        "Error fetching attendance:",
        error.response?.data || error.message
      );
      throw new Error("Error fetching attendance data");
    }
  }

  async getAttendanceRecordByUserID(userId, Page, Size) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getAttendanceRecordByUserID +
          `/${userId}?page=${Page}&size=${Size}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching attendance", error);
      throw new Error("Error fetching attendance");
    }
  }

  async updateAttendanceUserData(payload, userId) {
    try {
      const response = await AxiosInstance.put(
        API_ENDPOINTS.updateAttendanceByUserId + `/${userId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error updating attendance", error);
      throw new Error(error.response.data.message);
    }
  }

  async getTodayAttendanceData(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getTodayDate + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching attendance", error);
      throw new Error("Error fetching attendance");
    }
  }

  //leavs
  async getmontlyLeavsbyUserId(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getmontlyLeadsbyUserId + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("error fetching leaves", error);
      throw new error("Error fetching leavs");
    }
  }
  //meeting
  async getallmeeting(userId, page, size, status, startDate, endDate, source) {
    try {
      let url = `${API_ENDPOINTS.getallmeeting}?page=${page}&size=${size}`;
      if (userId) {
        url += `&userId=${userId}`;
      }
      if (status) {
        url += `&status=${status}`;
      }
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }
      if (source) {
        url += `&source=${source}`;
      }
      const response = await AxiosInstance.get(url);
      return response; // Return the response object
    } catch (error) {
      // Throw a detailed error for debugging
      throw new Error(`Failed to fetch meetings: ${error.message}`);
    }
  }

  async saveNewMeeting(payload, leadType, leadId) {
    try {
      let url = `${API_ENDPOINTS.SaveNewMeeting}`;

      if (leadType === "leads" && leadId) {
        url = `${API_ENDPOINTS.SaveNewMeeting}?leadId=${leadId}`;
      }
      if (leadType === "duplicate" && leadId) {
        url = `${API_ENDPOINTS.SaveNewMeeting}?dLeadId=${leadId}`;
      }
      if (leadType === "calling" && leadId) {
        url = `${API_ENDPOINTS.SaveNewMeeting}?cLeadId=${leadId}`;
      }
      const response = await AxiosInstance.post(url, payload);
      return response;
    } catch (error) {
      console.error("API Error:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error saving Meeting: ${errorMessage}`);
    }
  }

  async updateMeetingbyid(payload, id) {
    try {
      const response = await AxiosInstance.patch(
        `${API_ENDPOINTS.meetingUpdateByid}/${id}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("API Error:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error saving Meeting: ${errorMessage}`);
    }
  }

  async getMeetingbyId(id) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getMeetingById + `/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching Meeting", error);
      throw new Error("Error fetching Meeting");
    }
  }
  async getCallingById(id) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getByCallingId + `/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching Meeting", error);
      throw new Error("Error fetching Meeting");
    }
  }

  async getDuplicateLeadByid(id) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getDuplicateLeadbyId + `/${id}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching Meeting", error);
      throw new Error("Error fetching Meeting");
    }
  }

  //salary
  async getsalaryByUserId(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getSalaryByUserId + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching salary", error);
      throw new Error("Error fetching salary");
    }
  }

  async getMonthliySalaryRecordByUserId(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getMonthlySalaryByUserId + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching salary", error);
      throw new Error("Error fetching salary");
    }
  }

  //bookmark
  async saveBookmark(userId, name, url) {
    console.log(url, "apiservicse");
    const encodedUrl = encodeURIComponent(url);

    try {
      const response = await AxiosInstance.post(
        API_ENDPOINTS.saveBookmark + `/${userId}?name=${name}&url=${encodedUrl}`
      );
      return response;
    } catch (error) {
      console.error("Error saving bookmark", error);
      throw new Error("Error saving bookmark");
    }
  }

  async getBookmarkByUserId(userId) {
    try {
      const response = await AxiosInstance.get(
        API_ENDPOINTS.getallBookmark + `/${userId}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching bookmark", error);
      throw new Error("Error fetching bookmark");
    }
  }
  async deleteBookmarkByName(userId, name) {
    try {
      const response = await AxiosInstance.delete(
        API_ENDPOINTS.deleteBookmark + `/${userId}/${name}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching bookmark", error);
      throw new Error("Error fetching bookmark");
    }
  }

  //Child User

  async getchildUser() {
    try {
      const response = await AxiosInstance.get(API_ENDPOINTS.getChildUser);
      return response;
    } catch (error) {
      console.error("Error fetching Child User", error);
      throw new Error("Error fetching Child User");
    }
  }
}
const apiServiceInstance = new ApiService();
export default apiServiceInstance;
