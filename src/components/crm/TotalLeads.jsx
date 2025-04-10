import React, { useEffect, useState, useRef } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import apiServiceInstance from "../../Api/ApiService";
import TableNavbar from "../small-component/TableNavbar";
import DateFormatter from "../small-component/DateFormatter";
import Select from "react-select";
import { useDispatch } from "react-redux";
import Pagination2 from "../small-component/Pagination2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LeadUpdate2 from "./LeadUpdate2";
import More from "../../images/More.svg";
import DeatilCard2 from "../small-component/DetailCard2";
import Nodata from "../../images/No data.svg";
import { useLocation } from "react-router-dom";
import TextTruncate from "../small-component/TruncatedText ";
import ListBox from "../small-component/ListBox";
import Loading from "../../utils/Loading";
import ExcelChooseFile from "../pages/ExcelChooseFile";
import AddNewExcel from "./NewLeads/AddNewExcel";
import AddNewLead from "./NewLeads/AddNewLead";
import { toast } from "react-toastify";
import columnHeaderImg from "../../images/column header (1).png";
import Dropdown from "../small-component/OderDropdown";
import { shareProject } from "../../Slice/ShareProjectSlice";

function DeepNestedSubTable({ LeadId, UserID }) {
  const [Feedback, setFeedback] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const duplicate = params.get("duplicate") === "true";

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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">ID</th>
            <th className="px-5 py-2 text-sm font-medium text-gray-500">
              Created Date
            </th>
            <th className="px-5 py-2 text-sm font-medium text-gray-500">
              Updated Date
            </th>
            <th className="px-3 py-2 text-sm font-medium text-gray-500 text-center">
              Call Status
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Message
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Status
            </th>
            <th className="px-5 py-2 text-sm font-medium text-gray-500">
              Next Call Date
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Meeting Done
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Virtual Meeting
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Visit Done
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Feedback.map((feedback, index) => (
            <tr key={index} className="hover:bg-gray-50 no-outline">
              <td className="px-4 py-2 text-sm text-gray-600">{feedback.id}</td>
              <td className="px-4 py-2 text-sm text-gray-600 text-center">
                {<DateFormatter timestamp={feedback.createdDate} date={true} />}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 text-center">
                {
                  <DateFormatter
                    timestamp={feedback.leadsReport.updatedOn}
                    date={true}
                  />
                }
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 ">
                {feedback.callStatus}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {feedback.message}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    feedback.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {feedback.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                <DateFormatter timestamp={feedback.nextCallDate} date={true} />
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {feedback.meetingDone
                  ? feedback.meetingDone.toString()
                  : "----"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {feedback.virtualMeetingDone
                  ? feedback.virtualMeetingDone.toString()
                  : "----"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {feedback.visitDone ? feedback.visitDone.toString() : "----"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Nested Details Row Component
function NestedDetailsRow({ LeadId, assignToUser }) {
  const [subTableOpen, setSubTableOpen] = useState(
    assignToUser.map(() => false)
  );

  const toggleSubTableOpen = (index) => {
    const updatedState = subTableOpen.map((state, idx) =>
      idx === index ? !state : state
    );
    setSubTableOpen(updatedState);
  };

  return (
    <>
      {assignToUser.map((user, index) => (
        <div key={index} className=" ">
          <div className="flex items-center p-2 hover:bg-gray-100">
            <button
              onClick={() => toggleSubTableOpen(index)}
              className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-200"
            >
              {subTableOpen[index] ? (
                <ArrowDropDownIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <ArrowRightIcon className="w-4 h-4 text-gray-500" />
              )}
            </button>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user.assignToUserNames[0]}
            </span>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden  mt-2 ${
              subTableOpen[index]
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
            style={{ maxHeight: subTableOpen[index] ? "500px" : "0" }} // Adjust '500px' based on your content size
          >
            {subTableOpen[index] && (
              <DeepNestedSubTable
                LeadId={LeadId}
                UserID={user.assignToUserIds[0]}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default function TableComponent() {
  const [rows, setRows] = useState([]);
  const [Useroptions, setUserOptions] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [LeadReportUpdate, setLeadreportUpdate] = useState(false);
  const [clickedLeadId, setClickedLeadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [AddNewLeads, setAddNewLeads] = useState(false);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [ExcelChoose, setExcelChoose] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [hoveredSourceIndex, setHoveredSourceIndex] = useState(null);
  const [DetailCard, setDetailCard] = useState(false);
  const projectRef = useRef(null);
  const rolename = localStorage.getItem("rolename");
  const sourceRef = useRef(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [updateCardPosition, setUpdateCardPosition] = useState({
    top: 0,
    left: 10,
  });
  const [orderOfList, setOrderOfList] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    filterByAssignedDate: "",
    sortByAscDesc: "",
  });
  const [assigntoUser, setassigntoUser] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const duplicate = params.get("duplicate") === "true";
  console.log(duplicate, "duplicate");
  const dispatch = useDispatch();

  const detailCardRef = useRef(null);
  const leadUpdateRef = useRef(null);

  const handleCheckboxChange = (isChecked) => {
    setIsChecked(isChecked);
    // Reset page when switching between normal and trash data
    setCurrentPage(1);
  };

  const fetchData = async (search = "") => {
    try {
      setLoading(true);
      const page = currentPage - 1;
      const size = recordPerPage;
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
      if (isChecked) {
        console.log("isChecked", isChecked);
        if (duplicate) {
          response = await apiServiceInstance.getAllTrashDuplicateLeads(
            page,
            size
          );
        } else {
          response = await apiServiceInstance.getAllTrashLeads(page, size);
        }
      } else if (duplicate) {
        response = await apiServiceInstance.getallDlead(
          apiParams.status,
          apiParams.page,
          apiParams.size,
          apiParams.search,
          apiParams.userId,
          apiParams.duplicateFrequency,
          apiParams.assignById,
          apiParams.createdBy,
          apiParams.cStartDate,
          apiParams.cEndDate,
          apiParams.aStartDate,
          apiParams.aEndDate,
          apiParams.projectName,
          apiParams.source,
          apiParams.filterByAssignedDate || "",
          apiParams.sortByAscDesc || ""
        );
      } else {
        response = await apiServiceInstance.getallTotalLead(
          apiParams.status,
          apiParams.page,
          apiParams.size,
          apiParams.search,
          apiParams.assignById,
          apiParams.cStartDate,
          apiParams.cEndDate,
          apiParams.aStartDate,
          apiParams.aEndDate,
          apiParams.projectName,
          apiParams.source,
          apiParams.userId,
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
    currentPage,
    recordPerPage,
    duplicate,
    isChecked,
    activeFilters,
    assigntoUser,
    selectedFilter,
  ]);

  const handleCloseExcelUpload = () => setShowExcelUpload(false);

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
  const handleCheckboxClick = (event, leadId) => {
    handleLeadSelection(leadId);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiServiceInstance.getAllUser();
        const data = response.content;
        const options = data.map((user) => ({
          value: user.id, // Use a unique identifier for the value
          label: user.firstName, // Display firstName in the dropdown
        }));
        setUserOptions(options);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchUsers();
  }, []);
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
  const handleFilterApply = (filterPayload) => {
    setActiveFilters(filterPayload);
    setCurrentPage(1); // Reset to first page when filters change
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
  const handleSelectAllLeads = (event) => {
    if (event.target.checked) {
      const currentPageLeadIds = rows.map((lead) => lead.id);
      setSelectedLeads(currentPageLeadIds);
    } else {
      setSelectedLeads([]);
    }
  };
  const toggleRow = (index, leadId) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
    setClickedLeadId(leadId);
  };
  const toggleForm = (leadId, event) => {
    event.stopPropagation();
    const position = calculatePosition(event.currentTarget);
    setUpdateCardPosition(position);
    setLeadreportUpdate((prev) => !prev);
    setClickedLeadId(leadId);
  };
  const refreshData = () => {
    setLoading(true);
    fetchData();
    console.log("Data Refreshed");
    handleFilterApply({});
    handleUnselectAll();
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    fetchData(value); // Fetch data with the new search term
  };

  const handleDetailCard = (leadId, event) => {
    event.stopPropagation();

    if (clickedLeadId === leadId && DetailCard) {
      // If clicking the same lead, close the card
      setDetailCard(false);
      setClickedLeadId(null);
    } else {
      // If clicking a different lead, show the card for that lead
      setDetailCard(true);
      setClickedLeadId(leadId);
    }
  };
  const handleShareProject = (leadsId, duplicate) => {
    const type = duplicate ? "dLeadsId" : "leadsId";
    dispatch(shareProject({ leadsId, type }));
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
  const handleUnselectAll = () => {
    setSelectedLeads([]);
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
  return (
    <>
      {loading && <Loading />}
      <div className="p-1.8 border-b bg-gray-100 dark:bg-gray-800 rounded-md">
        <TableNavbar
          Leadheading={"Total Leads"}
          lead={true}
          Cstatus={true}
          onSearchChange={handleSearch}
          onAddNewLeadClick={() => setAddNewLeads(true)}
          onExcelChooseClick={() => setExcelChoose(true)}
          Excel={true}
          duplicate={duplicate}
          onFilterApply={handleFilterApply}
          trash={true}
          handleCheckboxChange={handleCheckboxChange}
          isChecked={isChecked}
          leadreport={true}
          selectedLeads={selectedLeads}
          refreshData={refreshData}
          totalData={totalData}
          totalLeads={true}
          newleads={true}
          currentPage={currentPage}
        />
      </div>
      <AddNewLead
        className="newLeadForm"
        isVisible={AddNewLeads}
        onClose={() => setAddNewLeads(false)}
        update={false}
        refreshLeads={refreshData}
      />
      <ExcelChooseFile
        isVisible={ExcelChoose}
        onClose={() => setExcelChoose(false)}
        Callstatus={false}
      />
      {showExcelUpload ? (
        <AddNewExcel
          isVisible={showExcelUpload}
          onClose={handleCloseExcelUpload}
          CallStatus={false}
        />
      ) : (
        <>
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
                          rows.length > 0 &&
                          selectedLeads.length === rows.length
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
                    {/* <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                leadsAssignFrequency
                </th> */}
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                      Received On → Updated On
                    </th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                      Assign Date
                    </th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Assigned To
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
                                checked={selectedLeads.includes(leadReport.id)}
                                onChange={(event) =>
                                  handleCheckboxClick(event, leadReport.id)
                                }
                              />
                              <button
                                onClick={() => toggleRow(index, leadReport.id)} // Pass leadId to toggle row
                                className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-200"
                              >
                                {openRowIndex === index ? (
                                  <ArrowDropDownIcon className="w-4 h-4 text-gray-500" />
                                ) : (
                                  <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {index + 1 + (currentPage - 1) * recordPerPage}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 ">
                            {leadReport.id}
                          </td>
                          <td className="px-4 py-2 text-sm text-center font-medium text-gray-600 whitespace-nowrap">
                            {leadReport.name}
                          </td>
                          <td className="px-4 py-2 flex justify-center items-center text-center">
                            <div className="relative inline-flex items-center group">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${
                                  leadReport.status === "active"
                                    ? "bg-gray-100 text-green-600"
                                    : leadReport.status === "OPEN"
                                    ? "bg-gray-100 text-blue-600"
                                    : leadReport.status === "SUCCESS"
                                    ? "bg-gray-100 text-green-700"
                                    : leadReport.status === "DECLINE"
                                    ? "bg-gray-100 text-red-600"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {leadReport.status}
                              </span>
                              {/* <KeyboardArrowDownIcon
                            className="ml-1 w-1 h-1 text-gray-400 group-hover:block hidden"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleForm(leadReport.id, e);
                            }}
                          /> */}
                            </div>
                          </td>
                          {LeadReportUpdate &&
                            clickedLeadId === leadReport.id && (
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
                              {" "}
                              {rolename === "USER"
                                ? leadReport.phone
                                : leadReport.phone?.slice(0, 2) +
                                  "****" +
                                  leadReport.phone?.slice(-2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {leadReport.email}
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
                              leadReport.projectName.length > 1 ? (
                                <div className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300">
                                  <span
                                    onClick={() =>
                                      handleShareProject(
                                        leadReport.id,
                                        duplicate
                                      )
                                    }
                                    title="Click to share project"
                                  >
                                    {leadReport.projectName[0]}
                                    <span className="ml-1 text-xs text-gray-400">
                                      +{leadReport.projectName.length - 1} more
                                    </span>
                                  </span>
                                  {hoveredProjectIndex === index && (
                                    <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
                                      <ListBox data={leadReport.projectName} />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span
                                  onClick={
                                    () =>
                                      handleShareProject(
                                        leadReport.id,
                                        duplicate
                                      ) // Include type
                                  }
                                  className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300"
                                  title="Click to share project"
                                >
                                  {leadReport.projectName}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-600">
                              {leadReport.queryInfo}
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
                              leadReport.source.length > 1 ? (
                                <div className="cursor-pointer">
                                  <span>
                                    {leadReport.source[0]}
                                    <span className="ml-1 text-xs text-gray-400">
                                      +{leadReport.source.length - 1} more
                                    </span>
                                  </span>
                                  {hoveredSourceIndex === index && (
                                    <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
                                      <ListBox data={leadReport.source} />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                leadReport.source
                              )}
                            </td>
                          )}
                          {/* <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap relative text-center">
                            {leadReport.leadsAssignFrequency}
                          </td> */}
                          <td className="px-4 py-2 text-sm whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                                <span className="text-gray-600 font-sm">
                                  <DateFormatter
                                    timestamp={leadReport.receivedOn}
                                  />
                                </span>
                              </div>
                              <span className="text-gray-500 font-bold">→</span>
                              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                                <span className="text-gray-600 font-xs">
                                  <DateFormatter
                                    timestamp={leadReport.updatedOn}
                                  />
                                </span>
                              </div>
                            </div>
                          </td>
                          {rolename == "ADMIN" && (
                            <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                              <DateFormatter
                                timestamp={leadReport.assignDate}
                              />
                            </td>
                          )}
                          <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap flex relative">
                            <Select
                              className="im_multi"
                              classNamePrefix="select"
                              placeholder="Assign To"
                              options={Useroptions}
                              isClearable
                              value={
                                duplicate
                                  ? {
                                      value: leadReport.assignToName,
                                      label: (
                                        <TextTruncate
                                          text={leadReport.assignToName}
                                        />
                                      ),
                                    }
                                  : leadReport.assignToUser?.length > 1
                                  ? {
                                      value: leadReport.assignToUser
                                        .map(
                                          (user) => user.assignToUserNames[0]
                                        )
                                        .join(", "),
                                      label: (
                                        <TextTruncate
                                          text={leadReport.assignToUser
                                            .map(
                                              (user) =>
                                                user.assignToUserNames[0]
                                            )
                                            .join(", ")}
                                        />
                                      ),
                                    }
                                  : leadReport.assignToUser?.[0]
                                      ?.assignToUserNames?.[0]
                                  ? {
                                      value:
                                        leadReport.assignToUser?.[0]
                                          ?.assignToUserNames?.[0],
                                      label:
                                        leadReport.assignToUser?.[0]
                                          ?.assignToUserNames?.[0],
                                    }
                                  : null
                              }
                              onChange={(selectedOption) =>
                                handleUserChange(selectedOption, leadReport.id)
                              }
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  borderRadius: "8px",
                                  boxShadow: "none",
                                  border: "1px solid #e2e8f0",
                                  padding: "2px",
                                  width: "160px",
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
                              onClick={(e) =>
                                handleDetailCard(leadReport.id, e)
                              }
                              className="cursor-pointer"
                            />
                            {DetailCard && clickedLeadId === leadReport.id && (
                              <div ref={detailCardRef}>
                                <DeatilCard2
                                  LeadId={leadReport.id}
                                  onUpdate={refreshData}
                                  duplicate={duplicate}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={11}>
                            <div
                              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                openRowIndex === index
                                  ? "max-h-screen opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                              style={{
                                maxHeight:
                                  openRowIndex === index ? "500px" : "0",
                              }}
                            >
                              {openRowIndex === index && (
                                <div className="ml-8 mt-2">
                                  {duplicate ? (
                                    <DeepNestedSubTable
                                      LeadId={leadReport.id}
                                      UserID={leadReport.assignToId}
                                    />
                                  ) : (
                                    leadReport.assignToUser && (
                                      <NestedDetailsRow
                                        assignToUser={leadReport.assignToUser}
                                        LeadId={leadReport.id}
                                      />
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
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
      )}
    </>
  );
}
