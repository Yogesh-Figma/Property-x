import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import apiServiceInstance from "../../Api/ApiService";
import Select from "react-select";
import DateFormatter from "../small-component/DateFormatter";
import DetailCard2 from "./../small-component/DetailCard2";
import LeadUpdate2 from "../crm/LeadUpdate2";
import Pagination2 from "../small-component/Pagination2";
import TableNavbar from "../small-component/TableNavbar";
import Nodata from "../../images/No data.svg";
import More from "../../images/More.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "react-router-dom";
import Loading from "../../utils/Loading";
import TextTruncate from "../small-component/TruncatedText ";
import ListBox from "../small-component/ListBox";
import { toast } from "react-toastify";
import columnHeaderImg from "../../images/column header (1).png";
import Dropdown from "../small-component/OderDropdown";
import { shareProject } from "../../Slice/ShareProjectSlice";

function DeepNestedSubTable({ LeadId, UserID }) {
  console.log("LeadId:", LeadId, "UserID:", UserID);
  const [Feedback, setFeedback] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const duplicate = params.get("duplicate") === "true";
  const rolename = localStorage.getItem("rolename");

  const fetchFeedback = async () => {
    try {
      let response;
      if (duplicate) {
        response =
          await apiServiceInstance.getFeedbackDuplicateByleadIdandUserId(
            LeadId,
            UserID
          );
      } else {
        response = await apiServiceInstance.getFeedbackByleadIdandUserId(
          LeadId,
          UserID
        );
      }

      setFeedback(response.content);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    if (LeadId && UserID) {
      fetchFeedback();
    }
  }, [LeadId, UserID]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center p-8">
  //       <div className="text-gray-500">Loading feedback data...</div>
  //     </div>
  //   );
  // }

  if (!Feedback || Feedback.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No feedback available</p>
          <p className="text-gray-400 text-sm mt-2">
            No feedback has been recorded for this lead yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto transition-all duration-300 ease-in-out ">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-blue-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">ID</th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Created Date
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Call Status
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Message
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Next Call Date
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Meeting Done
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Virtual Meeting Done
            </th>
            <th className="px-6 py-2 text-sm font-medium text-gray-500">
              Visit Done
            </th>
            {rolename == "ADMIN" && (
              <th className="px-6 py-2 text-sm font-medium text-gray-500">
                Updated by
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Feedback.map((feedback, index) => (
            <tr key={index} className="hover:bg-gray-50 no-outline">
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {feedback.id}
              </td>
              <td className="px-6 py-2 text-sm text-gray-600 bg-gray-100">
                {<DateFormatter timestamp={feedback.createdDate} />}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {feedback.callStatus}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                <TextTruncate text={feedback.message} />
              </td>
              <td className="px-4 py-2 text-sm text-gray-600  bg-[#E9EDF5]">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    feedback.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {feedback.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                <DateFormatter timestamp={feedback.nextCallDate} date={true} />
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {feedback.meetingDone ? (
                  <DateFormatter timestamp={feedback.leadsReport.meetingDate} />
                ) : (
                  "----"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {feedback.virtualMeetingDone ? (
                  <DateFormatter
                    timestamp={feedback.leadsReport.virtualMeetingDate}
                  />
                ) : (
                  "----"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {feedback.visitDone ? (
                  <DateFormatter timestamp={feedback.leadsReport.visitDate} />
                ) : (
                  "----"
                )}
              </td>
              {rolename == "ADMIN" && (
                <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                  {feedback.leadsReport.assignToUserName}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LeadReport2() {
  const [rows, setRows] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [Useroptions, setUserOptions] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [LeadReportUpdate, setLeadreportUpdate] = useState(false);
  const [clickedLeadId, setClickedLeadId] = useState(null);
  const [DetailCard, setDetailCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [updateCardPosition, setUpdateCardPosition] = useState({
    top: 0,
    left: 10,
  });
  const [orderOfList, setOrderOfList] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    filterByAssignedDate: "",
    sortByAscDesc: "",
  });
  const [selectedChildUser, setSelectedChildUser] = useState("");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const location = useLocation();
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [hoveredSourceIndex, setHoveredSourceIndex] = useState(null);
  const [assigntoUser, setassigntoUser] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  // const { duplicate } = location.state || {};
  const params = new URLSearchParams(location.search);
  const duplicate = params.get("duplicate") === "true";
  const rolename = localStorage.getItem("rolename");
  console.log(rolename, "rolename");
  const detailCardRef = useRef(null);
  const leadUpdateRef = useRef(null);
  const projectRef = useRef(null);
  const sourceRef = useRef(null);
  const dispatch = useDispatch();

  const fetchData = async (search = "") => {
    console.log("Fetching data...");
    try {
      if (!search.trim()) {
        setLoading(true);
      }
      const page = currentPage - 1;
      const size = recordPerPage;
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const searchParam = search && search.trim() !== "" ? search : "";
      const apiParams = {
        status: "",
        page: page,
        size: size,
        search: searchParam,
        ...activeFilters,
        filterByAssignedDate: selectedFilter.filterByAssignedDate ? "true" : "",
        sortByAscDesc: selectedFilter.sortByAscDesc ? "true" : "",
      };
      let response;
      if (duplicate) {
        response = await apiServiceInstance.DuplicateLeadReport(
          apiParams.status,
          apiParams.page,
          apiParams.size,
          apiParams.search,
          apiParams.cStatusStartDate || "",
          apiParams.cStatusEndDate || "",
          apiParams.cStartDate || "",
          apiParams.cEndDate || "",
          apiParams.aStartDate || "",
          apiParams.aEndDate || "",
          apiParams.uStartDate || "",
          apiParams.uEndDate || "",
          apiParams.leadAssignFrequency || "",
          apiParams.callStatus || "",
          apiParams.projectName || "",
          apiParams.source || "",
          selectedChildUser ? selectedChildUser : apiParams.userId || "",
          apiParams.assignBy || "",
          apiParams.doneDateName || "",
          apiParams.doneStartDate || "",
          apiParams.doneEndDate || "",
          apiParams.nextCallStartDate || "",
          apiParams.nextCallEndDate || "",
          apiParams.filterByAssignedDate || "",
          apiParams.sortByAscDesc || ""
        );
      } else {
        response = await apiServiceInstance.getAllLeadReport(
          apiParams.status,
          apiParams.page,
          apiParams.size,
          apiParams.search,
          apiParams.cStatusStartDate || "",
          apiParams.cStatusEndDate || "",
          apiParams.cStartDate || "",
          apiParams.cEndDate || "",
          apiParams.aStartDate || "",
          apiParams.aEndDate || "",
          apiParams.uStartDate || "",
          apiParams.uEndDate || "",
          apiParams.leadAssignFrequency || "",
          apiParams.callStatus || "",
          apiParams.projectName || "",
          apiParams.source || "",
          selectedChildUser ? selectedChildUser : apiParams.userId || "",
          apiParams.assignBy || "",
          apiParams.doneDateName || "",
          apiParams.doneStartDate || "",
          apiParams.doneEndDate || "",
          apiParams.nextCallStartDate || "",
          apiParams.nextCallEndDate || "",
          apiParams.filterByAssignedDate || "",
          apiParams.sortByAscDesc || ""
        );
      }
      setRows(response.content);
      setTotalData(response.totalElements);
    } catch (error) {
      console.error("Error fetching lead data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    duplicate,
    currentPage,
    recordPerPage,
    activeFilters,
    selectedChildUser,
    assigntoUser,
    selectedFilter,
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiServiceInstance.getAllUser();
        const data = response.content;
        const options = data.map((user) => ({
          value: user.id,
          label: user.firstName,
        }));
        setUserOptions(options);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchUsers();
  }, []);
  const handleShareProject = (leadsId, duplicate) => {
    const type = duplicate ? "dLeadsId" : "leadsId";
    dispatch(shareProject({ leadsId, type }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailCardRef.current &&
        !detailCardRef.current.contains(event.target)
      ) {
        setDetailCard(false);
      }
      if (
        leadUpdateRef.current &&
        !leadUpdateRef.current.contains(event.target)
      ) {
        setLeadreportUpdate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProjectMouseEnter = (index) => {
    setHoveredProjectIndex(index);
  };

  const handleProjectMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  const handleSourceMouseEnter = (index) => {
    setHoveredSourceIndex(index);
  };

  const handleSourceMouseLeave = () => {
    setHoveredSourceIndex(null);
  };

  const handleFilterApply = (filterPayload) => {
    setActiveFilters(filterPayload);
    setCurrentPage(1);
  };
  const toggleRow = (index, leadId) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
    setClickedLeadId(leadId);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    fetchData(value);
  };
  const calculatePosition = (buttonElement) => {
    if (!buttonElement) return;

    const rect = buttonElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Calculate initial position
    let top = rect.bottom + window.scrollY;
    let left = rect.left;

    // Check if the card would go below the viewport
    const cardHeight = 360; // Approximate height of the LeadUpdate card
    const cardWidth = 258; // Approximate width of the LeadUpdate card

    // Adjust vertical position if needed
    if (top + cardHeight > windowHeight + window.scrollY) {
      top = rect.top - cardHeight + window.scrollY;
    }

    // Adjust horizontal position if needed
    if (left + cardWidth > windowWidth) {
      left = windowWidth - cardWidth - 40; // 20px padding from right edge
    }

    return { top, left };
  };
  const handleUserChange = async (selectedOption, leadId) => {
    setSelectedUser(selectedOption); // Store the selected user

    if (selectedOption) {
      try {
        const id = selectedOption.value;
        const payload = {
          leadIds: [leadId],
          userIds: [id],
        };
        const response = await apiServiceInstance.assignToUser(payload);
        console.log("Assigned to User", response);
        setassigntoUser(response);
        toast.success(response.message);
      } catch (error) {
        const errorMessage = error.message || "An unexpected error occurred.";
        toast.error(`Failed to assign lead. ${errorMessage}`);
        console.error("Error Assign lead:", error.message);
      }
    }
  };
  const toggleForm = (leadId, event) => {
    const position = calculatePosition(event.currentTarget);
    setUpdateCardPosition(position);
    setLeadreportUpdate((prev) => !prev);
    setClickedLeadId(leadId);
  };

  const handleCheckboxClick = (event, leadId) => {
    handleLeadSelection(leadId);

    // Show ContextMenu only if selected leads exist
    if (!contextMenuVisible && selectedLeads.length > 0) {
      setContextMenuVisible(true);
    }

    // Close ContextMenu if no leads are selected
    if (selectedLeads.length === 0) {
      setContextMenuVisible(false);
    }
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };
  const handleSelectAllLeads = (event) => {
    if (event.target.checked) {
      const currentPageLeadIds = rows.map((lead) => lead.leads.id);
      setSelectedLeads(currentPageLeadIds);
    } else {
      setSelectedLeads([]);
    }
  };
  const handleChildUserSelect = (childUserId) => {
    setSelectedChildUser(childUserId);
    console.log("Selected Child User ID:", childUserId);
  };
  const handleLeadSelection = (leadId) => {
    setSelectedLeads((prev) => {
      if (prev.includes(leadId)) {
        return prev.filter((id) => id !== leadId);
      } else {
        return [...prev, leadId];
      }
    });
  };

  const handleDetailCard = (rowIndex, event) => {
    event.stopPropagation();

    // Close any other open cards first
    if (clickedRowIndex !== null && clickedRowIndex !== rowIndex) {
      setDetailCard(false);
      setClickedRowIndex(null);
    }

    // Toggle the clicked card
    setDetailCard((prevState) => {
      if (clickedRowIndex === rowIndex) {
        setClickedRowIndex(null);
        return false;
      } else {
        setClickedRowIndex(rowIndex);
        return true;
      }
    });
  };

  const handleUnselectAll = () => {
    setSelectedLeads([]);
    setContextMenuVisible(false);
  };
  const refreshData = () => {
    fetchData();
    console.log("Data Refreshed");
    setLoading(true);
    handleFilterApply({});
    handleUnselectAll();
  };

  const handleOrderOfList = () => {
    setOrderOfList((prev) => !prev); // Toggle dropdown visibility
  };
  const handleSelect = (value) => {
    setSelectedFilter({
      filterByAssignedDate: value === "filterByAssignedDate",
      sortByAscDesc: value === "sortByAscDesc",
    });
    setOrderOfList(false); // Close dropdown after selection
    console.log("Selected Item:", value);
  };
  return (
    <>
      {loading && <Loading />}
      <div className="p-1.8 border-b bg-gray-100 dark:bg-gray-800 rounded-md">
        <TableNavbar
          Leadheading={"Lead Report"}
          onSearchChange={handleSearch}
          onFilterApply={handleFilterApply}
          duplicate={duplicate}
          Excel={true}
          leadreport={true}
          Cstatus={true}
          refreshData={refreshData}
          selectedLeads={selectedLeads}
          totalData={totalData}
          exceldownload={true}
          customfilter={true}
          onChildUserSelect={handleChildUserSelect}
          currentPage={currentPage}
        />
      </div>
      <div className="bg-white border-b rounded-lg shadow mt-2">
        <div className="overflow-x-auto max-h-[calc(100vh-180px)] relative">
          <table className="min-w-full divide-y divide-gray-200">
            <thead class=" sticky top-0 bg-[rgba(247,249,252,0.8)] dark:bg-[rgba(30,41,59,0.8)] text-black dark:text-white shadow-sm">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider mx-wd-100px">
                  <input
                    type="checkbox"
                    className=" rounded border-gray-300 ml-4"
                    checked={
                      rows.length > 0 && selectedLeads.length === rows.length
                    }
                    onChange={handleSelectAllLeads}
                  />
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  <img
                    src={columnHeaderImg}
                    onClick={handleOrderOfList}
                    className="cursor-pointer"
                    alt="Sort"
                  />
                  {orderOfList && (
                    <Dropdown
                      onSelect={handleSelect}
                      closeDropdown={() => setOrderOfList(false)}
                    />
                  )}
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Contact Info
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  Project+Query
                </th>
                {rolename != "USER" && (
                  <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                    Source
                  </th>
                )}
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                  Remarks
                </th>
                {/* <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Call Status
                </th> */}
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Meeting Done
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Visit Done
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Virtual Meeting Done
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  lastCallStatus
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  {rolename == "USER" ? "Assign Date" : "Received On"} →
                  UpdatedOn
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Next CallDate
                </th>
                {rolename == "ADMIN" && (
                  <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                    Assign Date
                  </th>
                )}
                {rolename != "USER" && (
                  <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                    LeadAssignFrequency
                  </th>
                )}
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  AssignTo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-8 text-sm text-gray-500 text-center"
                  >
                    <img
                      src={Nodata}
                      alt="No Data"
                      className="max-w-full max-h-full mx-auto"
                    />
                  </td>
                </tr>
              ) : (
                rows.map((leadReport, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedLeads.includes(
                              leadReport.leads.id
                            )}
                            onChange={(event) =>
                              handleCheckboxClick(event, leadReport.leads.id)
                            }
                          />
                          <button
                            onClick={() => toggleRow(index, leadReport.id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-200"
                          >
                            {openRowIndex === index ? (
                              <ArrowDropDownIcon className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          {/* {isChecked && <ContextMenu />} */}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 text-center">
                        {index + 1 + (currentPage - 1) * recordPerPage}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600 ">
                        {leadReport.leads.id}
                      </td>
                      <td className="px-4 py-2 text-sm text-center font-medium text-gray-600 whitespace-nowrap">
                        {leadReport.leads.name}
                      </td>
                      <td className="px-4 py-2 flex justify-center items-center text-center">
                        <div className="relative inline-flex items-center group">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${
                              leadReport.leadsStatus === "active"
                                ? "bg-gray-100 text-green-600"
                                : leadReport.leadsStatus === "OPEN"
                                ? "bg-gray-100 text-blue-600"
                                : leadReport.leadsStatus === "SUCCESS"
                                ? "bg-gray-100 text-green-700"
                                : leadReport.leadsStatus === "DECLINE"
                                ? "bg-gray-100 text-red-600"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {leadReport.leadsStatus}
                          </span>
                          {(rolename === "ADMIN" ||
                            leadReport.leadsStatus !== "SUCCESS") && (
                            <KeyboardArrowDownIcon
                              className="ml-1 w-1 h-1 text-gray-400 group-hover:block hidden"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleForm(leadReport.id, e);
                                console.log("Clicked Lead ID:", leadReport.id);
                              }}
                            />
                          )}
                        </div>
                      </td>
                      {LeadReportUpdate && clickedLeadId === leadReport.id && (
                        <div ref={leadUpdateRef}>
                          <LeadUpdate2
                            isVisible={LeadReportUpdate}
                            onClose={() => setLeadreportUpdate(false)}
                            leadReportId={leadReport.id}
                            duplicate={duplicate}
                            onLeadUpdate={refreshData}
                            position={updateCardPosition}
                          />
                        </div>
                      )}
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                        <div className="text-sm">
                          {rolename === "USER"
                            ? leadReport.leads.phone
                            : leadReport.leads.phone.slice(0, 2) +
                              "****" +
                              leadReport.leads.phone.slice(-2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {leadReport.leads.email}
                        </div>
                      </td>
                      <td
                        className="px-4 py-2 text-gray-600 whitespace-nowrap text-center relative"
                        ref={projectRef}
                        onMouseEnter={() => handleProjectMouseEnter(index)}
                        onMouseLeave={handleProjectMouseLeave}
                      >
                        <div className="text-sm">
                          {rolename === "ADMIN" &&
                          duplicate &&
                          leadReport.leads.projectName?.length > 1 ? (
                            <div className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300">
                              <span
                                onClick={() =>
                                  handleShareProject(
                                    leadReport.leads.id,
                                    duplicate
                                  )
                                }
                              >
                                {leadReport.leads.projectName[0]}
                                <span className="ml-1 text-xs text-gray-400">
                                  +{leadReport.leads.projectName.length - 1}{" "}
                                  more
                                </span>
                              </span>
                              {hoveredProjectIndex === index && (
                                <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
                                  <ListBox
                                    data={leadReport.leads.projectName}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <span
                              onClick={
                                () =>
                                  handleShareProject(
                                    leadReport.leads.id,
                                    duplicate
                                  ) // Include type
                              }
                              className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300"
                              title="Click to share project"
                            >
                              {leadReport.leads.projectName}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-600">
                          {leadReport.leads.queryInfo}
                        </div>
                      </td>
                      {rolename != "USER" && (
                        <td
                          className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap relative"
                          ref={sourceRef}
                          onMouseEnter={() => handleSourceMouseEnter(index)}
                          onMouseLeave={handleSourceMouseLeave}
                        >
                          {rolename === "ADMIN" &&
                          duplicate &&
                          leadReport.leads.source.length > 1 ? (
                            <div className="cursor-pointer">
                              <span>
                                {leadReport.leads.source[0]}
                                <span className="ml-1 text-xs text-gray-400">
                                  +{leadReport.leads.source.length - 1} more
                                </span>
                              </span>
                              {hoveredSourceIndex === index && (
                                <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
                                  <ListBox data={leadReport.leads.source} />
                                </div>
                              )}
                            </div>
                          ) : (
                            leadReport.leads.source
                          )}
                        </td>
                      )}
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                        <TextTruncate text={leadReport.message} />
                      </td>
                      {/* <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                        <div className="text-sm">{leadReport.callStatus}</div>
                        <div className="text-xs text-gray-600">
                          <DateFormatter
                            timestamp={leadReport.callStatusDate}
                          />
                        </div>
                      </td> */}
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                        {leadReport.isMeetingDone ? (
                          <DateFormatter timestamp={leadReport.meetingDate} />
                        ) : (
                          "----"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                        {leadReport.isVisitDone ? (
                          <DateFormatter timestamp={leadReport.visitDate} />
                        ) : (
                          "----"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                        {leadReport.isVirtualMeetingDone ? (
                          <DateFormatter
                            timestamp={leadReport.virtualMeetingDate}
                          />
                        ) : (
                          "----"
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap text-center">
                        {leadReport.lastCallStatus || "----"}
                      </td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-sm">
                              <DateFormatter
                                timestamp={
                                  rolename === "USER"
                                    ? leadReport.assignedDate
                                    : leadReport.createdOn
                                }
                              />
                            </span>
                          </div>
                          <span className="text-gray-500 font-bold">→</span>
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-xs">
                              <DateFormatter timestamp={leadReport.updatedOn} />
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                        {
                          <DateFormatter
                            timestamp={leadReport.nextCallDate}
                            date={true}
                          />
                        }
                      </td>
                      {rolename == "ADMIN" && (
                        <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                          <DateFormatter timestamp={leadReport.assignedDate} />
                        </td>
                      )}
                      {rolename !== "USER" && (
                        <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap text-center">
                          {leadReport.leadsAssignFrequency}
                        </td>
                      )}
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap flex relative">
                        {rolename.toString() == "USER" ? (
                          <div className="text-sm">
                            <TextTruncate text={leadReport.assignToUserName} />
                          </div>
                        ) : (
                          <>
                            <Select
                              className="im_multi"
                              classNamePrefix="select"
                              placeholder="Assign To"
                              options={Useroptions}
                              isClearable
                              value={
                                leadReport.assignToUserName
                                  ? {
                                      value: leadReport.assignToUserName,
                                      label: (
                                        <TextTruncate
                                          text={leadReport.assignToUserName}
                                        />
                                      ),
                                    }
                                  : null
                              }
                              onChange={(selectedOption) =>
                                handleUserChange(
                                  selectedOption,
                                  leadReport.leads.id
                                )
                              }
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  borderRadius: "8px",
                                  boxShadow: "none",
                                  border: "1px solid #e2e8f0",
                                  padding: "2px",
                                  width: "220px",
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: "#718096",
                                  fontSize: "0.875rem",
                                }),
                              }}
                            />
                            <img
                              src={More}
                              alt="more"
                              onClick={(e) => handleDetailCard(index, e)}
                              className="cursor-pointer"
                            />
                            {DetailCard && clickedRowIndex === index && (
                              <div ref={detailCardRef}>
                                <DetailCard2
                                  LeadId={leadReport.leads.id}
                                  onUpdate={refreshData}
                                  duplicate={duplicate}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      {" "}
                      <td colSpan={11}>
                        <div
                          className={`transition-all duration-500 ease-in-out overflow-hidden bg-gray-100 ${
                            openRowIndex === index
                              ? "max-h-screen opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                          style={{
                            maxHeight: openRowIndex === index ? "500px" : "0",
                          }}
                        >
                          {openRowIndex === index && (
                            <div className="ml-8 mt-2 bg-gray-100">
                              <DeepNestedSubTable
                                LeadId={leadReport.leads.id}
                                UserID={leadReport.assignToUserId}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
              {/* {contextMenuVisible && (
                <div
                  className="context-menu-container"
                  x="220px"
                  y="100"
                  style={{
                    position: "absolute",
                    float: "right",
                    top: "2%",
                    left: "130",
                  }}
                >
                  <ContextMenu
                    selectedLeads={selectedLeads}
                    onClose={closeContextMenu}
                    leadreport={true}
                    duplicate={duplicate}
                  />
                </div>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination2
        currentPage={currentPage}
        totalItems={totalData} // Use total items from the API for pagination
        onPageChange={setCurrentPage}
        recordPerPage={recordPerPage}
        onRowsPerPageChange={(event) =>
          setRecordPerPage(parseInt(event.target.value, 10))
        }
      />
    </>
  );
}
