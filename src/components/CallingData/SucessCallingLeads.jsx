import React from "react";
import { useState, useEffect, useRef } from "react";
import apiServiceInstance from "../../Api/ApiService";
import DateFormatter from "../small-component/DateFormatter";
import DetailCard2 from "../small-component/DetailCard2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LeadUpdate2 from "../crm/LeadUpdate2";
import Pagination2 from "../small-component/Pagination2";
import TableNavbar from "../small-component/TableNavbar";
import Nodata from "../../images/No data.svg";
import { useDispatch } from "react-redux";
import More from "../../images/More.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "react-router-dom";
import Loading from "../../utils/Loading";
import CallDetails from "./CallDetails";
import TextTruncate from "../small-component/TruncatedText ";
import Fibform from "../crm/fib/Fibform";
import Showmore from "../crm/fib/showmore";
import columnHeaderImg from "../../images/column header (1).png";
import Dropdown from "../small-component/OderDropdown";
import { shareProject } from "../../Slice/ShareProjectSlice";

function DeepNestedSubTable({ LeadId }) {
  console.log("LeadId:", LeadId);
  const [CallDetail, setcallDetail] = useState(null);

  const fetchFeedback = async () => {
    try {
      const response = await apiServiceInstance.getCallingStatusById(LeadId);
      setcallDetail(response);
    } catch (error) {
      console.error("Error fetching Calldetail data:", error);
    }
  };

  useEffect(() => {
    if (LeadId) {
      fetchFeedback();
    }
  }, [LeadId]);

  if (!CallDetail) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No feedback available</p>
          <p className="text-gray-400 text-sm mt-2">
            No feedback has been recorded for this lead yet
          </p>
        </div>
      </div>
    );
  }

  // Get the maximum length of all arrays to determine number of rows
  const arrayLengths = [
    CallDetail.nextCallDate?.length || 0,
    CallDetail.message?.length || 0,
    CallDetail.callStatus?.length || 0,
  ];
  const maxRows = Math.max(...arrayLengths);

  // If there's no data to display, show the empty state
  if (maxRows === 0) {
    return (
      <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg">
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
    <div className="overflow-x-auto transition-all duration-300 ease-in-out">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              S.No
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Updated Date
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Next Call Date
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Message
            </th>
            <th className="px-4 py-2 text-sm font-medium text-gray-500">
              Call Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(maxRows)].map((_, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {index + 1}
              </td>{" "}
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {CallDetail.updatedDate?.[index] ? (
                  <DateFormatter
                    timestamp={CallDetail.updatedDate[index]}
                    date={true}
                  />
                ) : (
                  "----"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {CallDetail.nextCallDate?.[index] ? (
                  <DateFormatter
                    timestamp={CallDetail.nextCallDate[index]}
                    date={true}
                  />
                ) : (
                  "----"
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {CallDetail.message?.[index] || "----"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 bg-gray-100">
                {CallDetail.callStatus?.[index] || "----"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SucessCallingLeads() {
  const [rows, setRows] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [LeadReportUpdate, setLeadreportUpdate] = useState(false);
  const [clickedLeadId, setClickedLeadId] = useState(null);
  const [selectedCallStatusId, setSelectedCallStatusId] = useState(null);
  const [callDeatil, setcallDetail] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [DetailCard, setDetailCard] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const [activeFilters, setActiveFilters] = useState({});
  const [modalState, setModalState] = useState({
    type: null,
    id: null,
    isOpen: false,
  });
  const dispatch = useDispatch();

  const location = useLocation();
  const { duplicate } = location.state || {};
  const detailCardRef = useRef(null);
  const leadUpdateRef = useRef(null);
  const CallDetailRef = useRef(null);
  const rolename = localStorage.getItem("rolename");

  const fetchData = async (search = "") => {
    try {
      if (!search.trim()) {
        setLoading(true);
      }
      const page = currentPage - 1;
      const size = recordPerPage;
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      const searchParam = search && search.trim() !== "" ? search : "";
      const apiParams = {
        status: "SUCCESS",
        page: page,
        size: size,
        search: searchParam,
        ...activeFilters, // Spread the active filters into the API params
        filterByAssignedDate: selectedFilter.filterByAssignedDate ? "true" : "",
        sortByAscDesc: selectedFilter.sortByAscDesc ? "true" : "",
      };

      const response = await apiServiceInstance.getCallingStatus(
        apiParams.status,
        apiParams.page,
        apiParams.size,
        apiParams.search,
        selectedChildUser ? selectedChildUser : apiParams.UserId || "",
        apiParams.assignBy || "",
        apiParams.cStartDate || "",
        apiParams.cEndDate || "",
        apiParams.uStartDate || "",
        apiParams.uEndDate || "",
        apiParams.projectName || "",
        apiParams.source || "",
        apiParams.aStartDate || "",
        apiParams.aEndDate || "",
        apiParams.filterByAssignedDate || "",
        apiParams.sortByAscDesc || ""
      );
      await delay;
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
    selectedFilter,
  ]);

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
      if (
        CallDetailRef.current &&
        !CallDetailRef.current.contains(event.target)
      ) {
        setcallDetail(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleUnselectAll = () => {
    setSelectedLeads([]);
  };
  const handleCloseModal = () => {
    setModalState({
      type: null,
      id: null,
      isOpen: false,
    });
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
  const handleChildUserSelect = (childUserId) => {
    setSelectedChildUser(childUserId);
    console.log("Selected Child User ID:", childUserId);
  };
  const handleShowDetails = (fibId) => {
    // Close any open modal first
    handleCloseModal();

    // Only open if clicking on a different FIB or if modal was closed
    if (modalState.id !== fibId || !modalState.isOpen) {
      setModalState({
        type: "showmore",
        id: fibId,
        isOpen: true,
      });
    }
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

  const handleShowAddFib = (leadId) => {
    // Close any open modal first
    handleCloseModal();

    // Only open if clicking on a different lead or if modal was closed
    if (modalState.id !== leadId || !modalState.isOpen) {
      setModalState({
        type: "fibform",
        id: leadId,
        isOpen: true,
      });
    }
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
  const handleCheckboxClick = (event, leadId) => {
    handleLeadSelection(leadId);
  };
  // const handleTooltipToggle = (index) => {
  //   const selectedLead = rows[index]; // Get the lead data for the clicked row
  //   if (selectedLead) {
  //     setSelectedCallStatusId(selectedLead.id); // Send the lead's id instead of callStatusId
  //     console.log(selectedLead.id); // Log the lead's id for verification
  //     setcallDetail(index); // Set the current hovered index to show the tooltip
  //   }
  // };
  // const handleTooltipClose = () => {
  //   setcallDetail(null); // Function to close the tooltip
  // };

  // const toggleForm = (leadId, event) => {
  //   const position = calculatePosition(event.currentTarget);
  //   setUpdateCardPosition(position);
  //   setLeadreportUpdate((prev) => !prev);
  //   setClickedLeadId(leadId);
  // };
  const handleDetailCard = (index, leadId) => {
    console.log("Clicked Lead ID:", leadId);
    setDetailCard(true);
    setClickedLeadId(leadId);
  };
  const refreshData = () => {
    fetchData();
    setLoading(true);
    handleFilterApply({});
    handleUnselectAll();
  };
  const handleShareProject = (leadsId) => {
    dispatch(shareProject({ leadsId, type: "Calling" }));
  };

  return (
    <>
      {loading && <Loading />}
      <div className="p-1.8 border-b bg-gray-100 dark:bg-gray-800 rounded-md">
        <TableNavbar
          Leadheading={"Success Calling Leads"}
          onSearchChange={handleSearch}
          Excel={false}
          onFilterApply={handleFilterApply}
          Callingdata={true}
          refreshData={refreshData}
          totalData={totalData}
          exceldownload={true}
          sucessleads={true}
          excelStatus={"SUCCESS"}
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
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  Created On → Updated On
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  NextCallDate
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  AssignTo
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                  fib status
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
                              leadReport.leadsStatus === "active"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-green-700"
                            }`}
                          >
                            {leadReport.leadsStatus}
                          </span>
                          {/* <KeyboardArrowDownIcon
                            className="ml-1 w-1 h-1 text-gray-400 group-hover:block hidden"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event bubbling
                              toggleForm(leadReport.id, e);
                              console.log("Clicked Lead ID:", leadReport.id);
                            }}
                          /> */}
                        </div>
                      </td>
                      {LeadReportUpdate && clickedLeadId === leadReport.id && (
                        <div ref={leadUpdateRef}>
                          <LeadUpdate2
                            callDetail={true}
                            isVisible={LeadReportUpdate}
                            onClose={() => setLeadreportUpdate(false)}
                            leadReportId={leadReport.id}
                            onLeadUpdate={refreshData}
                            position={updateCardPosition}
                          />
                        </div>
                      )}
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                        <div className="text-sm">
                          {" "}
                          {leadReport.phone
                            ? rolename === "USER"
                              ? leadReport.phone
                              : leadReport.phone.slice(0, 2) +
                                "****" +
                                leadReport.phone.slice(-2)
                            : "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {leadReport.email}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                        <div
                          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300"
                          onClick={() => handleShareProject(leadReport.id)}
                          title="Cick to Share Project"
                        >
                          {leadReport.projectName}
                        </div>
                        <div className="text-xs text-gray-600">
                          {leadReport.queryInfo}
                        </div>
                      </td>
                      {rolename != "USER" && (
                        <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap">
                          {leadReport.source}
                        </td>
                      )}
                      <td className="px-4 py-2 text-sm whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-sm">
                              <DateFormatter
                                timestamp={leadReport.createdDate}
                              />
                            </span>
                          </div>
                          <span className="text-gray-500 font-bold">→</span>
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-xs">
                              <DateFormatter
                                timestamp={leadReport.updatedDate?.[0] || null}
                              />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm whitespace-nowrap relative">
                        <div
                          className="flex items-center space-x-4"
                        >
                          {/* <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-sm">
                              <DateFormatter
                                timestamp={leadReport.callStatusDate[0]}
                              />
                            </span>
                          </div> */}
                          {/* <span className="text-gray-500 font-bold">→</span> */}
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-xs">
                              <DateFormatter
                                timestamp={leadReport.nextCallDate[0]}
                                date={true}
                              />
                            </span>
                          </div>
                        </div>
                        {/* {callDeatil === index && (
                          <div
                            className="absolute bottom-6 z-10"
                            ref={CallDetailRef}
                          >
                            <CallDetails
                              closeTooltip={handleTooltipClose}
                              callStatusId={selectedCallStatusId}
                            />
                          </div>
                        )} */}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap flex relative">
                        {leadReport.assignToName}
                        <img
                          src={More}
                          alt="more"
                          onClick={() => handleDetailCard(index, leadReport.id)}
                          className="cursor-pointer"
                        />
                        {DetailCard && clickedLeadId === leadReport.id && (
                          <div ref={detailCardRef}>
                            <DetailCard2
                              LeadId={leadReport.id}
                              calling={true}
                              onUpdate={refreshData}
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center relative">
                        {leadReport.fibId ? (
                          <span
                            className="text-green-600 cursor-pointer"
                            onClick={() => handleShowDetails(leadReport.fibId)}
                          >
                            View details
                          </span>
                        ) : (
                          <span
                            className="text-blue-600 cursor-pointer"
                            onClick={() => handleShowAddFib(leadReport.id)}
                          >
                            Add now
                          </span>
                        )}
                      </td>
                      {modalState.isOpen &&
                        modalState.type === "showmore" &&
                        modalState.id === leadReport.fibId && (
                          <Showmore
                            id={leadReport.fibId}
                            onClose={handleCloseModal}
                          />
                        )}
                      {modalState.isOpen &&
                        modalState.type === "fibform" &&
                        modalState.id === leadReport.id && (
                          <Fibform
                            leadId={leadReport.id}
                            onClose={handleCloseModal}
                            refreshData={refreshData}
                            callDetail={true}
                          />
                        )}
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
                                LeadId={leadReport.id}
                                // UserID={leadReport.assignToUserId}
                              />
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
  );
}
