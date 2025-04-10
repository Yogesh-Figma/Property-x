import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import apiServiceInstance from "../../../Api/ApiService";
import DateFormatter from "../../small-component/DateFormatter";
import DetailCard2 from "./../../small-component/DetailCard2";
import Pagination2 from "../../small-component/Pagination2";
import TableNavbar from "../../small-component/TableNavbar";
import Nodata from "../../../images/No data.svg";
import More from "../../../images/More.svg";
import { useLocation } from "react-router-dom";
import Loading from "../../../utils/Loading";
import Select from "react-select";
import AddNewLead from "./AddNewLead";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExcelChooseFile from "../../pages/ExcelChooseFile";
import AddNewExcel from "./AddNewExcel";
import TextTruncate from "../../small-component/TruncatedText ";
import ListBox from "../../small-component/ListBox";
import LeadUpdate2 from "../LeadUpdate2";
import { toast } from "react-toastify";
import columnHeaderImg from "../../../images/column header (1).png";
import Dropdown from '../../small-component/OderDropdown';


const NewLeads = () => {
  const [rows, setRows] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [Useroptions, setUserOptions] = useState([]);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [clickedLeadId, setClickedLeadId] = useState(null);
  const [LeadReportUpdate, setLeadreportUpdate] = useState(false);
  const [DetailCard, setDetailCard] = useState(false);
  const [AddNewLeads, setAddNewLeads] = useState(false);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [ExcelChoose, setExcelChoose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null);
  const [hoveredSourceIndex, setHoveredSourceIndex] = useState(null);
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
  const [assigntoUser, setassigntoUser] = useState("");
  const location = useLocation();
  const DeropdownRef = useRef(null)
  const leadUpdateRef = useRef(null);
  const projectRef = useRef(null);
  const sourceRef = useRef(null);
  const detailCardRef = useRef(null);
  const params = new URLSearchParams(location.search);
  const duplicate = params.get("duplicate") === "true";

  // const { duplicate } = location.state || {};
  const rolename = localStorage.getItem("rolename");

  const fetchData = async (search = "") => {
    try {
      if (!search.trim()) {
        setLoading(true);
      }
      const page = currentPage - 1;
      const size = recordPerPage;
      const searchParam = search && search.trim() !== "" ? search : "";

      const apiParams = {
        page,
        size,
        search: searchParam,
        ...activeFilters,
        filterByAssignedDate: selectedFilter.filterByAssignedDate ? "true" : "",
        sortByAscDesc: selectedFilter.sortByAscDesc ? "true" : "",
      };
      console.log(apiParams, "paraamm");
      let response;
      if (rolename === "USER") {
        if (duplicate) {
          response = await apiServiceInstance.getAllNewDuplicateLeadReport(
            apiParams.page,
            apiParams.size,
            apiParams.search,
            apiParams.cStartDate || "",
            apiParams.cEndDate || "",
            apiParams.projectName || "",
            apiParams.source || "",
            apiParams.assignBy || "",
            selectedChildUser ? selectedChildUser : apiParams.assignTo || "",
            apiParams.aStartDate || "",
            apiParams.aEndDate || "",
            apiParams.filterByAssignedDate||"",
            apiParams.sortByAscDesc||"",
          );
        } else {
          response = await apiServiceInstance.getAllNewLeadReport(
            apiParams.page,
            apiParams.size,
            apiParams.search,
            apiParams.cStartDate || "",
            apiParams.cEndDate || "",
            apiParams.projectName || "",
            apiParams.source || "",
            apiParams.assignBy || "",
            selectedChildUser ? selectedChildUser : apiParams.assignTo || "",
            apiParams.aStartDate || "",
            apiParams.aEndDate || "",
            apiParams.filterByAssignedDate||"",
            apiParams.sortByAscDesc||"",
          );
        }
      } else {
        if (duplicate) {
          response = await apiServiceInstance.getAllNewDuplicateLeads(
            apiParams.page,
            apiParams.size,
            apiParams.search,
            apiParams.cStartDate || "",
            apiParams.cEndDate || "",
            apiParams.projectName || "",
            apiParams.source || "",
            apiParams.assignBy || "",
            apiParams.userId || "",
            apiParams.aStartDate || "",
            apiParams.aEndDate || "",
            apiParams.filterByAssignedDate||"",
            apiParams.sortByAscDesc||"",
          );
        } else {
          response = await apiServiceInstance.getAllNewLeads(
            apiParams.page,
            apiParams.size,
            apiParams.search,
            apiParams.cStartDate || "",
            apiParams.cEndDate || "",
            apiParams.projectName || "",
            apiParams.source || "",
            apiParams.assignBy || "",
            apiParams.userId || "",
            apiParams.aStartDate || "",
            apiParams.aEndDate || "",
            apiParams.sortByAscDesc||"",
          );
        }
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
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, [
    currentPage,
    recordPerPage,
    duplicate,
    activeFilters,
    selectedChildUser,
    assigntoUser,
    selectedFilter
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (rolename == "ADMIN") {
          response = await apiServiceInstance.getAllUser();
        } else {
          response = await apiServiceInstance.getchildUser();
        }
        const data = response.content || response;
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

  const handleCloseExcelUpload = () => setShowExcelUpload(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailCardRef.current && !detailCardRef.current.contains(event.target)) {
        setDetailCard(false);
      }
      if (DeropdownRef.current && !DeropdownRef.current.contains(event.target)) {
        setOrderOfList(false);
      }
    };
  
    // Add event listener when dropdown is open
    if (orderOfList) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [orderOfList]);
  
  const handleProjectMouseEnter = (index) => {
    setHoveredProjectIndex(index);
  };

  const handleProjectMouseLeave = () => {
    setHoveredProjectIndex(null);
  };
  const handleChildUserSelect = (childUserId) => {
    setSelectedChildUser(childUserId);
    console.log("Selected Child User ID:", childUserId);
  };
  const handleSourceMouseEnter = (index) => {
    setHoveredSourceIndex(index);
  };

  const handleSourceMouseLeave = () => {
    setHoveredSourceIndex(null);
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
      const currentPageLeadIds = rows.map((lead) => lead.id);
      setSelectedLeads(currentPageLeadIds);
    } else {
      setSelectedLeads([]);
    }
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
  const handleUnselectAll = () => {
    setSelectedLeads([]);
    setContextMenuVisible(false);
  };

  const handleFilterApply = (filterPayload) => {
    setActiveFilters(filterPayload);
    console.log("Active Filters:", filterPayload);
    setCurrentPage(1);
  };
  const toggleRow = (index, leadId) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
    setClickedLeadId(leadId);
  };
 
  const handleSearch = (e) => {
    console.log("Search term:", e.target.value);
    const value = e.target.value;
    fetchData(value); // Fetch data with the new search term
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
    const cardHeight = 290; // Approximate height of the LeadUpdate card
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

  const toggleForm = (leadId, event) => {
    const position = calculatePosition(event.currentTarget);
    setUpdateCardPosition(position);
    setLeadreportUpdate((prev) => !prev);
    setClickedLeadId(leadId);
  };

  const handleDetailCard = ( leadId) => {
    console.log("Clicked Lead ID:", leadId);
    setDetailCard(true);
    setClickedLeadId(leadId);
  };
  const refreshData = () => {
    setLoading(true);
    fetchData();
    console.log("Data Refreshed");
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
  const handleUserChange = async (selectedOption, leadId) => {
    if (selectedOption) {
      try {
        const id = selectedOption.value;
        const payload = duplicate
          ? { duplicateLeadIds: [leadId], userId: id }
          : { leadIds: [leadId], userIds: [id] };

        let response;
        if (duplicate) {
          response = await apiServiceInstance.DuplicateAssignToUser(payload);
        } else {
          response = await apiServiceInstance.assignToUser(payload);
        }

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
          Leadheading={"New Leads"}
          onSearchChange={handleSearch}
          Excel={true}
          newleads={true}
          CallStatus={true}
          onAddNewLeadClick={() => setAddNewLeads(true)}
          onExcelChooseClick={() => setExcelChoose(true)}
          onFilterApply={handleFilterApply}
          duplicate={duplicate}
          selectedLeads={selectedLeads}
          refreshData={refreshData}
          totalData={totalData}
          onChildUserSelect={handleChildUserSelect}
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
        refreshData={refreshData}
      />
      {showExcelUpload ? (
        <AddNewExcel
          isVisible={showExcelUpload}
          onClose={handleCloseExcelUpload}
          CallStatus={false}
          refreshData={refreshData}
        />
      ) : (
        <>
             <div className="p-1.8 border-b bg-gray-100 dark:bg-gray-800 rounded-md shadow-md mt-2">
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
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider" ref={DeropdownRef}>
                    <img src={columnHeaderImg} onClick={handleOrderOfList} className="cursor-pointer" alt="Sort" />
                    {orderOfList && <Dropdown onSelect={handleSelect} closeDropdown={() => setOrderOfList(false)} />}
                    </th>
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                      Client Name
                    </th>
                    {rolename == "USER" && (
                      <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                        Status
                      </th>
                    )}
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
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap ">
                      {rolename == "USER" ? "Assign Date" : "Created Date"}
                    </th>
                    {rolename == "ADMIN" && (
                      <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap ">
                        Assign Date
                      </th>
                    )}
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                      AssignTo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white  dark:bg-gray-900 text-black dark:text-white">
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
                              ></button>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {index + 1 + (currentPage - 1) * recordPerPage}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 ">
                            {rolename === "USER"
                              ? leadReport.leads.id
                              : leadReport.id}
                          </td>
                          <td className="px-4 py-2 text-sm text-center font-medium text-gray-600 whitespace-nowrap">
                            {rolename === "USER"
                              ? leadReport.leads.name
                              : leadReport.name}
                          </td>
                          {rolename == "USER" && (
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
                                <KeyboardArrowDownIcon
                                  className="ml-1 w-1 h-1 text-gray-400 group-hover:block hidden"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent event bubbling
                                    toggleForm(leadReport.id, e);
                                    console.log(
                                      "Clicked Lead ID:",
                                      leadReport.id
                                    );
                                  }}
                                />
                              </div>
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
                            </td>
                          )}
                          <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                            <div className="text-sm">
                              {rolename === "USER"
                                ? leadReport.leads.phone
                                : leadReport.phone?.slice(0, 2) + "****" + leadReport.phone?.slice(-2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {rolename === "USER"
                                ? leadReport.leads.email
                                : leadReport.email}
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
                              leadReport?.projectName?.length > 1 ? (
                                <div className="cursor-pointer">
                                  <span>
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
                              ) : rolename === "USER" ? (
                                leadReport.leads.projectName
                              ) : (
                                leadReport.projectName
                              )}
                            </div>
                            <div className="text-xs text-gray-600">
                              {rolename === "USER"
                                ? leadReport.leads.queryInfo
                                : leadReport.queryInfo}
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
                              ) : rolename === "USER" ? (
                                leadReport.leads.source
                              ) : (
                                leadReport.source
                              )}
                            </td>
                          )}
                          <td className="px-4 py-2 text-sm whitespace-nowrap">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                                <span className="text-gray-600 font-sm">
                                  <DateFormatter
                                    timestamp={
                                      rolename === "USER"
                                        ? leadReport.assignedDate
                                        : leadReport.receivedOn
                                    }
                                  />
                                </span>
                              </div>
                            </div>
                          </td>
                          {rolename === "ADMIN" && (
                            <td className="px-4 py-2 text-sm whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                                  <span className="text-gray-600 font-sm">
                                    <DateFormatter
                                      timestamp={leadReport.assignDate}
                                    />
                                  </span>
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap flex relative">
                            {/* {rolename.toString() === "USER" ? (
                              
                              <div className="text-sm">
                                <TextTruncate
                                  text={leadReport.assignToUserName}
                                />
                              </div>
                            ) : ( */}
                            <>
                              <Select
                                className="im_multi"
                                classNamePrefix="select"
                                placeholder="Assign To"
                                options={Useroptions}
                                isClearable
                                value={
                                  duplicate || rolename == "USER"
                                    ? {
                                        value:
                                          leadReport.assignToName ||
                                          leadReport.assignToUserName,
                                        label: (
                                          <TextTruncate
                                            text={
                                              leadReport.assignToName ||
                                              leadReport.assignToUserName
                                            }
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
                                  handleUserChange(
                                    selectedOption,
                                    rolename == "ADMIN"
                                      ? leadReport.id
                                      : leadReport.leads.id
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
                                onClick={() =>
                                  handleDetailCard(leadReport.id)
                                }
                                className="cursor-pointer"
                              />
                              {DetailCard &&
                                clickedLeadId === leadReport.id && (
                                  <div ref={detailCardRef}>
                                    <DetailCard2
                                      LeadId={leadReport.id}
                                      onUpdate={refreshData}
                                      duplicate={duplicate}
                                    />
                                  </div>
                                )}
                            </>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  )}
                  {contextMenuVisible && (
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
                    ></div>
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
};

export default NewLeads;
