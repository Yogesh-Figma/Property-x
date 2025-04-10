import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Search from "../../images/search.svg";
import { saveAs } from "file-saver";
import ExcelButton from "../../images/ExcelButton.svg";
import ApiService from "../../../src/Api/ApiService";
import DatetoEpoch from "../../utils/DatetoEpoch";
import SaveTab from "./SaveTab";
import { FiRefreshCcw } from "react-icons/fi";
import Bookamarkbutton from "../../images/bookmark_button.svg";
import Assignbutton from "../../images/assign_button.svg";
import filterbutton from "../../images/filter_button.svg";
import ContextMenu from "./ContextMenu";
import AddLead from "../../images/AddLead.svg";
import ExportExcel from "../../images/Export Excel.png";
import {ThemeContext  } from '../../contexts/UseColoeScheme'
import { fetchchildUser } from "../../Slice/TableNavbarSlice";

const TableNavbar = ({
  onSearchChange,
  onAddNewLeadClick,
  onExcelChooseClick,
  onFilterApply,
  newleads,
  duplicate,
  Excel,
  leadreport,
  Leadheading,
  selectedLeads,
  lead,
  Callingdata,
  trash,
  status,
  Cstatus,
  CallStatus,
  openleads,
  handleCheckboxChange,
  isChecked,
  refreshData,
  totalData,
  sucessleads,
  exceldownload,
  excelStatus,
  customfilter,
  totalLeads,
  onChildUserSelect,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [multiassign, setMultiassign] = useState(false);
  // const [childUser, setChildUser] = useState([]);
  const [userSelected, setUserSelected] = useState("");
    const { isDarkMode } = useContext(ThemeContext);
  // Initialize filters from URL parameters
  const [filters, setFilters] = useState(() => {
    const urlParams = Object.fromEntries(searchParams.entries());
    return {
      assignBy: urlParams.assignBy || "",
      userId: urlParams.userId || "",
      project: urlParams.projectName || "",
      source: urlParams.source || "",
      callStatus: urlParams.callStatus || "",
      aStartDate: urlParams.aStartDate || {},
      aEndDate: urlParams.aEndDate || {},
      cStartDate: urlParams.cStartDate || {},
      cEndDate: urlParams.cEndDate || {},
      uStartDate: urlParams.uStartDate || {},
      uEndDate: urlParams.uEndDate || {},
      cStatusStartDate: urlParams.cStatusStartDate || {},
      cStatusEndDate: urlParams.cStatusEndDate || {},
      leadAssignFrequency: urlParams.leadAssignFrequency || "",
      doneStartDate: urlParams.doneStartDate || "",
      doneEndDate: urlParams.doneEndDate || "",
      doneDateName: urlParams.doneDateName || "",
      nextCallStartDate: urlParams.nextCallStartDate || "",
      nextCallEndDate: urlParams.nextCallEndDate || "",
    };
  });
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setselectedStatus] = useState(
    searchParams.get("status") || ""
  );
  const dispatch = useDispatch();
  const { data: childUser } = useSelector(
    (state) => state.childUser
  );
  const [assignedByOptions, setAssignedByOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [callStatusOptions, setCallStatusOptions] = useState([]);
  const [isSaveTabOpen, setIsSaveTabOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const location = useLocation();
  const roleName = localStorage.getItem("rolename");

  const clearFilters = () => {
    // Clear all filters
    setFilters({
      assignBy: "",
      assignedTo: "",
      userId: "",
      projectName: "",
      source: "",
      callStatus: "",
      aStartDate: {},
      aEndDate: {},
      cStartDate: {},
      cEndDate: {},
      uStartDate: {},
      uEndDate: {},
      cStatusStartDate: {},
      cStatusEndDate: {},
      leadAssignFrequency: "",
      doneDateName: "",
      doneStartDate: "",
      doneEndDate: "",
      nextCallEndDate: "",
      nextCallStartDate: "",
    });
    setUserSelected("");
    setselectedStatus("");
    const currentParams = new URLSearchParams(searchParams);
    const filterParams = [
      "userId",
      "assignedTo",
      "assignBy",
      "userId",
      "projectName",
      "source",
      "callStatus",
      "aStartDate",
      "aEndDate",
      "cStartDate",
      "cEndDate",
      "uStartDate",
      "uEndDate",
      "cStatusStartDate",
      "cStatusEndDate",
      "leadAssignFrequency",
      "status",
      "doneDateName",
      "doneStartDate",
      "doneEndDate",
      "nextCallStartDate",
      "nextCallEndDate",
    ];
    filterParams.forEach((param) => {
      currentParams.delete(param);
    });
    setSearchParams(currentParams);
    refreshData();
    setIsFilterOpen(false);
    setIsAdvancedFilterOpen(false);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [filterName]: value,
      };

      // Update URL parameters
      const params = new URLSearchParams(searchParams);
      if (value && value !== "") {
        params.set(filterName, value);
      } else {
        params.delete(filterName);
      }
      setSearchParams(params);

      return newFilters;
    });
  };
  const handleTrashCheckbox = (e) => {
    const checked = e.target.checked;
    handleCheckboxChange(checked);
  };

  const handleStatusChange = (value) => {
    setselectedStatus(value);
    handleFilterChange("status", value);
  };
  const handlechildUserChange = (value) => {
    setUserSelected(value);
    handleFilterChange("userId", value);
    onChildUserSelect(value);
  };

  const handleSaveUrl = () => {
    const currentURL = window.location.pathname + window.location.search;
    console.log(currentURL, "currentURL");
    setCustomUrl(currentURL);
    setIsSaveTabOpen(true);
  };

  const handleSaveTabClose = () => {
    setIsSaveTabOpen(false);
  };

  const handleDateChange = (field, value) => {
    const epochTime = DatetoEpoch(value);
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [field]: epochTime,
  };

      const params = new URLSearchParams(searchParams);
      if (epochTime) {
        params.set(field, epochTime.toString());
    } else {
        params.delete(field);
      }
      setSearchParams(params);

      return newFilters;
    });
    console.log(`Updated ${field}:`, epochTime);
  };

  const applyFilters = async () => {
    try {
      const payload = {};

      // Handle string filters
      const stringFilters = [
        "assignBy",
        "userId",
        "projectName",
        "source",
        "callStatus",
        "leadAssignFrequency",
        "doneDateName",
        "nextCallEndDate",
        "nextCallStartDate",
      ];

      stringFilters.forEach((filter) => {
        if (filters[filter] && filters[filter].trim() !== "") {
          payload[filter] = filters[filter];
        }
      });

      // Handle date filters
      const dateFilters = [
        "cStartDate",
        "cEndDate",
        "aStartDate",
        "aEndDate",
        "uStartDate",
        "uEndDate",
        "cStatusStartDate",
        "cStatusEndDate",
        "doneStartDate",
        "doneEndDate",
      ];

      dateFilters.forEach((dateFilter) => {
        if (filters[dateFilter] && typeof filters[dateFilter] === "number") {
          payload[dateFilter] = filters[dateFilter];
        }
      });

      const params = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        params.set(key, value.toString());
      });

      navigate(
        {
          search: params.toString(),
        },
        { replace: true }
      );

      console.log("Prepared Payload:", payload);

      if (onFilterApply) {
        onFilterApply(payload);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const [statusRes, assignedByRes, projectRes, sourceRes] =
        await Promise.all([
          ApiService.getallCallStatus(),
          ApiService.getAllUser(),
          ApiService.getallProjects(),
          ApiService.getallSources(),
        ]);

      setStatusOptions(statusRes.content || statusRes);
      setAssignedByOptions(assignedByRes.content || assignedByRes);
      setProjectOptions(projectRes.content || projectRes);
      setSourceOptions(sourceRes.content || sourceRes);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchCallStatusOptions = async (status) => {
    try {
      const callStatusRes = await ApiService.getCallStatus(status);
      setCallStatusOptions(callStatusRes.content || callStatusRes);
    } catch (error) {
      console.error("Error fetching call status options:", error);
    }
  };

  const Exceldownload = async () => {
    try {
      const payload = {
        status: excelStatus ? excelStatus : selectedStatus,
        page: 0,
        size: totalData,
        search: "",
      };

      const stringFilters = [
        "assignedTo",
        "assignBy",
        "userId",
        "projectName",
        "source",
        "callStatus",
        "leadAssignFrequency",
        "doneDateName",
        "status",
      ];

      stringFilters.forEach((filter) => {
        if (filters[filter] && filters[filter].trim() !== "") {
          payload[filter] = filters[filter];
        }
      });

      const dateFilters = [
        "cStartDate",
        "cEndDate",
        "aStartDate",
        "aEndDate",
        "uStartDate",
        "uEndDate",
        "cStatusStartDate",
        "cStatusEndDate",
        "doneEndDate",
        "doneStartDate",
        "nextCallStartDate",
        "nextCallEndDate",
      ];

      dateFilters.forEach((dateFilter) => {
        if (filters[dateFilter] && typeof filters[dateFilter] === "number") {
          payload[dateFilter] = filters[dateFilter];
        }
      });

      console.log("Sending payload to API:", payload);
      console.log("Duplicate:", duplicate, "Callingdata:", Callingdata);

      let apiFunction;
      if (Callingdata) {
        console.log("Hitting ExcelDownloadCallingleads API");
        apiFunction = ApiService.ExcelDownloadCallingleads;
      } else if (duplicate) {
        console.log("Hitting ExcelDownloadDuplicateLeadsReport API");
        apiFunction = ApiService.ExcelDownloadDuplicateLeadsReport;
      } else {
        console.log("Hitting default ExcelDownloadLeadsReport API");
        apiFunction = ApiService.ExcelDownloadLeadsReport;
      }

      const blobData = await apiFunction(
        payload.status,
        payload.page,
        payload.size,
        payload.search,
        payload.cStatusStartDate,
        payload.cStatusEndDate,
        payload.cStartDate,
        payload.cEndDate,
        payload.aStartDate,
        payload.aEndDate,
        payload.uStartDate,
        payload.uEndDate,
        payload.leadAssignFrequency,
        payload.callStatus,
        payload.projectName,
        payload.source,
        payload.userId,
        payload.assignBy,
        payload.doneEndDate,
        payload.doneStartDate,
        payload.doneDateName,
        payload.nextCallStartDate,
        payload.nextCallEndDate
      );
      
      const blob = new Blob([blobData], { type: "application/vnd.ms-excel" });
      saveAs(
        blob,
        duplicate ? "Duplicate_Leads_Report.xlsx" : "Leads_Report.xlsx"
      );
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  // useEffect(() => {
  //   if (isPageReload()) {
  //     // setSearchParams(new URLSearchParams());
  //   } else {
  //     // If it's a new tab/direct URL access, initialize filters from URL
  //     const params = Object.fromEntries(searchParams.entries());
  //     if (Object.keys(params).length > 0) {
  //       setFilters((prevFilters) => ({
  //         ...prevFilters,
  //         ...params,
  //       }));
  //       onFilterApply?.(params);
  //     }
  //   }
  // }, [searchParams]);

  // Load initial data and apply URL filters

  // const getchildUser = async () => {
  //   try {
  //     const response = await ApiService.getchildUser();
  //     setChildUser(response);
  //     console.log("childUser", childUser);
  //   } catch (error) {
  //     console.error("Error fetching assigned by options:", error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchchildUser());
    fetchFilterOptions();
    const params = Object.fromEntries(searchParams.entries());
    if (Object.keys(params).length > 0) {
      onFilterApply?.(params);
    }
  }, [searchParams ,dispatch]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (leadreport) {
      fetchCallStatusOptions(selectedStatus);
    } else {
      fetchCallStatusOptions(status);
    }
  }, [selectedStatus, status]);

  return (
    <div className="navbar flex flex-wrap items-center justify-between  ">
      {/* Heading */}
      <h6 className="font-semibold text-lg  mt-2 ml-3">
        {duplicate ? `Duplicate ${Leadheading}` : Leadheading}
      </h6>

      {/* Right-side icons and buttons */}
      <div className="flex flex-wrap items-center space-x-2 gap-y-2 mr-2">
        {roleName == "USER" && (
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:none"
              // onChange={(e) => onChildUserSelect(e.target.value)}
              onChange={(e) => handlechildUserChange(e.target.value)}
            >
              <option value=""> Select</option>
              {childUser.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.firstName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <img
            src={Search}
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <input
            type="text"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:none"
            placeholder="Search"
            onChange={onSearchChange}
          />
        </div>

        {/* Excel Button */}
        { Excel && !duplicate && (
          <img
            src={ExcelButton}
            alt="excel"
            onClick={onExcelChooseClick}
            className="cursor-pointer "
          />
        )}

        {/* Trash Checkbox */}
        {trash && (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleTrashCheckbox}
              name="Trash"
              className="w-5 h-5"
            />
            <span className="text-gray-700 ">Trash</span>
          </label>
        )}

        {/* Refresh Icon */}

        {/* Bookmark Button */}
        <img
          src={Bookamarkbutton}
          onClick={handleSaveUrl}
          className="cursor-pointer border  rounded-md bg-white"
          alt="bookmark"
        />
        {isSaveTabOpen && (
          <SaveTab
            url={customUrl}
            onClose={handleSaveTabClose}
            refreshData={refreshData}
          />
        )}
        {/* Add New Lead Button */}
        {newleads && !duplicate && (
          // <button
          //   className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 "
          //   onClick={onAddNewLeadClick}
          // >
          //   +
          // </button>
          <div className="cursor-pointer border  rounded-md ">
            <img src={AddLead} onClick={onAddNewLeadClick} />
          </div>
        )}

        
        { (
          <img
            src={Assignbutton}
            onClick={() => setMultiassign(true)}
            className="cursor-pointer border border-gray-200 rounded-md bg-white "
            alt="assign"
          />
        )}

        {/* Context Menu */}
        {multiassign && (
          <ContextMenu
            selectedLeads={selectedLeads}
            duplicate={duplicate}
            Callingdata={Callingdata}
            onClose={() => setMultiassign(false)}
            refreshpage={refreshData}
          />
        )}

        {/* Filter Button */}
        <img
          src={filterbutton}
          alt="filter"
          className="cursor-pointer border border-gray-200 rounded-md bg-white"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        />
        <div
          className="cursor-pointer border border-gray-200 rounded-md px-3 py-2.5 bg-white h-[40px]"
          onClick={clearFilters}
        >
          <FiRefreshCcw className=" text-gray-600 hover:text-gray-800 text-2xl" />
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-2 p-2 w-full">
          {
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1 ml-3">
                Project
              </label>
              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 pr-8 text-gray-600"
                value={filters.projectName}
                onChange={(e) =>
                  handleFilterChange("projectName", e.target.value)
                }
              >
                <option value="">Select</option>
                {projectOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          }
          {roleName !== "USER" && (
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1">
                Assigned to
              </label>
              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1  text-gray-600"
                value={filters.userId}
                onChange={(e) => handleFilterChange("userId", e.target.value)}
              >
                <option value="">Select</option>
                {assignedByOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {roleName !== "USER" && (
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1">Source</label>
              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-600"
                value={filters.source}
                onChange={(e) => handleFilterChange("source", e.target.value)}
              >
                <option value="">Select</option>
                {sourceOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {Cstatus && (
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1">
                {" "}
                Status
              </label>

              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 pr-8 text-gray-600"
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="">Select</option>
                {statusOptions.map((option) => (
                  <option key={option.status} value={option.status}>
                    {option.status}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!Callingdata && !sucessleads && !newleads && !totalLeads && (
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1">
                {" "}
                CallStatus
              </label>

              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1  text-gray-600"
                value={filters.callStatus}
                onChange={(e) =>
                  handleFilterChange("callStatus", e.target.value)
                }
              >
                <option value="">Select</option>
                {callStatusOptions.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {roleName !== "USER" && (
            <div className="relative min-w-[160px]">
              <label className="block text-sm text-gray-600 mb-1">
                {" "}
                AssignBy
              </label>

              <select
                className="w-full bg-white border border-gray-200 rounded-md px-2 py-1 text-gray-600"
                value={filters.assignBy}
                onChange={(e) => handleFilterChange("assignBy", e.target.value)}
              >
                <option value="">Select</option>
                {assignedByOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!lead &&
            !Callingdata &&
            leadreport &&
            roleName !== "USER" &&
            !sucessleads &&
            !openleads && (
              <div className="relative min-w-[160px]">
                <label className="block text-sm text-gray-600 mb-1">
                  {" "}
                  Assign Frequency
                </label>
                <input
                  placeholder="++"
                  type="number"
                  className="border rounded-md px-2 py-1 w-[50px]"
                  value={filters.leadAssignFrequency}
                  onChange={(e) =>
                    handleFilterChange("leadAssignFrequency", e.target.value)
                  }
                  style={{
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.375rem",
                    padding: "0.25rem 0.5rem",
                    width: "50px",
                  }}
                />
              </div>
            )}
          {/* <div className="relative min-w-[160px]">
            <button
              className="w-full h-8 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div> */}

          <button
            className="text-red-500 underline mt-8"
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
          >
            {isAdvancedFilterOpen ? "Show Less" : "Advanced Filter"}
          </button>
        </div>
      )}
      {isAdvancedFilterOpen && (
        <div className="mt-4 flex flex-wrap gap-4 bg-gray-100 p-3 rounded-md w-full">
          {roleName != "USER" && (
            <div className="flex flex-col w-[21rem] md:w-[21rem]">
              <label className="block text-sm font-medium text-gray-700">
                Creation Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("cStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) => handleDateChange("cEndDate", e.target.value)}
                />
              </div>
            </div>
          )}
          {leadreport && (
            <div className="flex flex-col w-[21rem] md:w-[21rem]">
              <label className="block text-sm font-medium text-gray-700">
                Updated Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("uStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) => handleDateChange("uEndDate", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* 
          {roleName === "ADMIN" ? (
            !Callingdata && !newleads &&  ( */}

          <div className="flex flex-col w-[21rem] md:w-[21rem]">
            <label className="block text-sm font-medium text-gray-700">
              Assigned Date
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                className="border rounded-md px-2 py-1 w-full"
                onChange={(e) => handleDateChange("aStartDate", e.target.value)}
              />
              <span className="text-gray-500">⇄</span>
              <input
                type="date"
                className="border rounded-md px-2 py-1 w-full"
                onChange={(e) => handleDateChange("aEndDate", e.target.value)}
              />
            </div>
          </div>

          {!newleads && !totalLeads && !Callingdata && (
            <div className="flex flex-col w-[21rem] md:w-[21rem]">
              <label className="block text-sm font-medium text-gray-700">
                Next Call Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("nextCallStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("nextCallEndDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* )
          ) : !Callingdata && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("aStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) => handleDateChange("aEndDate", e.target.value)}
                />
              </div>
            </div>
          )} */}

          {!Callingdata && leadreport && !lead && !newleads && !sucessleads && (
            <div className="flex flex-col w-[21rem] md:w-[21rem]">
              <label className="block text-sm font-medium text-gray-700">
                Call Status Date
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("cStatusStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("cStatusEndDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}
          {customfilter && (
            <div className="flex flex-col w-[21rem] md:w-[21rem]">
              <select
                className="border rounded-md px-2 py-1 w-full"
                onChange={(e) =>
                  handleFilterChange("doneDateName", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="METTING DONE">Meeting Done</option>
                <option value="VIRTUAL MEETING DONE">
                  VIRTUAL MEETING DONE
                </option>
                <option value="VISIT DONE">VISIT DONE</option>
              </select>
              <div className="flex items-center space-x-2 ">
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("doneStartDate", e.target.value)
                  }
                />
                <span className="text-gray-500">⇄</span>
                <input
                  type="date"
                  className="border rounded-md px-2 py-1 w-full"
                  onChange={(e) =>
                    handleDateChange("doneEndDate", e.target.value)
                  }
                />
              </div>
            </div>
          )}
          {/* <div className="flex flex-colitems-center space-x-2 mt-8 w-full"> */}
          <div className="flex  w-[21rem] md:w-[21rem] mt-8 gap-4">
            <div>
              <span className="text-sm text-gray-600">Total Leads:</span>
              <span className="font-medium text-blue-600 ml-1">{totalData}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">CurrentPage:</span>
              <span className="font-medium text-blue-600 ml-1">{currentPage}</span>
            </div>
          </div>

          {exceldownload && (
            <div className="items-center w-full">
              <img
                src={ExportExcel}
                alt="excel"
                onClick={Exceldownload}
                className="cursor-pointer "
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableNavbar;
