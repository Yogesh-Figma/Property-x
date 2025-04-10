import React, { useState, useEffect, useRef, useCallback } from "react";
import apiServiceInstance from "../../Api/ApiService";
import DateFormatter from "../small-component/DateFormatter";
import DetailCard2 from "../small-component/DetailCard2";
import Pagination2 from "../small-component/Pagination2";
import TableNavbar from "../small-component/TableNavbar";
import Nodata from "../../images/No data.svg";
import More from "../../images/More.svg";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../../utils/Loading";
import Select from "react-select";
import AddNewLead from "../crm/NewLeads/AddNewLead";
import ExcelChooseFile from "../pages/ExcelChooseFile";
import AddNewExcel from "../crm/NewLeads/AddNewExcel";
import TextTruncate from "../small-component/TruncatedText ";
import LeadUpdate2 from "../crm/LeadUpdate2";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import columnHeaderImg from "../../images/column header (1).png";
import Dropdown from "../small-component/OderDropdown";
import { shareProject } from "../../Slice/ShareProjectSlice";

const NewCallLeads = () => {
  const [rows, setRows] = useState([]);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [Useroptions, setUserOptions] = useState([]);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [clickedLeadId, setClickedLeadId] = useState(null);
  const [DetailCard, setDetailCard] = useState(false);
  const [AddNewLeads, setAddNewLeads] = useState(false);
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [ExcelChoose, setExcelChoose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [LeadReportUpdate, setLeadreportUpdate] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [updateCardPosition, setUpdateCardPosition] = useState({
    top: 0,
    left: 10,
  });
  const dispatch = useDispatch();
  const [orderOfList, setOrderOfList] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    filterByAssignedDate: "",
    sortByAscDesc: "",
  });
  const [selectedChildUser, setSelectedChildUser] = useState("");
  const location = useLocation();
  const Rolename = localStorage.getItem("rolename");
  const detailCardRef = useRef(null);
  const leadUpdateRef = useRef(null);
  const [assigntoUser, setassigntoUser] = useState("");

  const { duplicate } = location.state || {};

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
      response = await apiServiceInstance.getAllNewCallingData(
        apiParams.page,
        apiParams.size,
        apiParams.search,
        apiParams.cStartDate || "",
        apiParams.cEndDate || "",
        apiParams.projectName || "",
        apiParams.source || "",
        apiParams.assignBy || "",
        selectedChildUser ? selectedChildUser : apiParams.UserId || "",
        apiParams.aStartDate || "",
        apiParams.aEndDate || "",
        apiParams.filterByAssignedDate || "",
        apiParams.sortByAscDesc || ""
      );

      setRows(response.content || []);
      setTotalData(response.totalElements || 0);
    } catch (error) {
      console.error("Error fetching lead data:", error.message || error);
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
    activeFilters,
    selectedChildUser,
    assigntoUser,
    selectedFilter,
  ]);

  useEffect(() => {
    if (duplicate !== undefined) {
      setCurrentPage(1);
    }
  }, [duplicate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (Rolename == "ADMIN") {
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

  const handleCheckboxClick = (event, leadId) => {
    handleLeadSelection(leadId);
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
  const handleChildUserSelect = (childUserId) => {
    setSelectedChildUser(childUserId);
    console.log("Selected Child User ID:", childUserId);
  };
  const handleCloseExcelUpload = () => setShowExcelUpload(false);

  const refreshLeads = () => {
    fetchData();
  };
  const handleShareProject = (leadsId) => {
    dispatch(shareProject({ leadsId, type: "Calling" }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailCardRef.current &&
        !detailCardRef.current.contains(event.target)
      ) {
        setDetailCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterApply = (filterPayload) => {
    setActiveFilters(filterPayload);
    console.log("Active Filters:", filterPayload);
    setCurrentPage(1);
  };
  const toggleRow = (index, leadId) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
    setClickedLeadId(leadId);
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
  const handleSearch = (e) => {
    console.log("Search term:", e.target.value);
    const value = e.target.value;
    fetchData(value); // Fetch data with the new search term
  };
  const handleUnselectAll = () => {
    setSelectedLeads([]);
  };
  const toggleForm = (leadId, event) => {
    const position = calculatePosition(event.currentTarget);
    setUpdateCardPosition(position);
    setLeadreportUpdate((prev) => !prev);
    setClickedLeadId(leadId);
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
  const handleUserChange = async (selectedOption, leadId) => {
    // setSelectedUser(selectedOption);

    if (selectedOption) {
      try {
        const Userid = selectedOption.value;
        const payload = {
          leadIds: [leadId],
        };
        const response = await apiServiceInstance.CallingassignTo(
          payload,
          Userid
        );
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
          Leadheading={"New Calling Leads"}
          onSearchChange={handleSearch}
          Excel={true}
          newleads={true}
          lead={true}
          onAddNewLeadClick={() => setAddNewLeads(true)}
          onExcelChooseClick={() => setExcelChoose(true)}
          onFilterApply={handleFilterApply}
          Callingdata={true}
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
        calldata={true}
        refreshLeads={refreshData}
      />
      <ExcelChooseFile
        isVisible={ExcelChoose}
        onClose={() => setExcelChoose(false)}
        Callstatus={true}
        refreshData={refreshData}
      />
      {showExcelUpload ? (
        <AddNewExcel
          isVisible={showExcelUpload}
          onClose={handleCloseExcelUpload}
          CallStatus={true}
          refreshData={refreshData}
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
                    {Rolename == "USER" && (
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
                    {Rolename != "USER" && (
                      <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider">
                        Source
                      </th>
                    )}
                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                      Received On
                    </th>
                    {/* <th className="px-2 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
                    CallStatusDate →  NextCallDate
                </th> */}
                    <th className="px-6 py-2 text-center text-xs font-medium text-gray-600 font-semibold uppercase tracking-wider whitespace-nowrap">
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
                                className="mr-2 rounded border-gray-300"
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
                            {leadReport.id}
                          </td>
                          <td className="px-4 py-2 text-sm text-center font-medium text-gray-600 whitespace-nowrap">
                            {leadReport.name}
                          </td>
                          {Rolename == "USER" && (
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
                            </td>
                          )}

                          {Rolename == "USER" &&
                            LeadReportUpdate &&
                            clickedLeadId === leadReport.id && (
                              <div ref={leadUpdateRef}>
                                <LeadUpdate2
                                  callDetail={true}
                                  isVisible={LeadReportUpdate}
                                  onClose={() => setLeadreportUpdate(false)}
                                  leadReportId={leadReport.id}
                                  onLeadUpdate={refreshLeads}
                                  position={updateCardPosition}
                                />
                              </div>
                            )}
                          <td className="px-4 py-2 text-gray-600 whitespace-nowrap text-center">
                            <div className="text-sm">
                              {" "}
                              {leadReport.phone
                                ? Rolename === "USER"
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
                          {Rolename != "USER" && (
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
                              {/* <span className="text-gray-500 font-bold">→</span>
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-xs">
                              <DateFormatter timestamp={leadReport.updatedDate?.[0]|| null} />
                            </span>
                          </div> */}
                            </div>
                          </td>
                          {/* <td className="px-4 py-2 text-sm whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-sm">
                              <DateFormatter
                                timestamp={leadReport.callStatusDate}
                              />
                            </span>
                          </div>
                          <span className="text-gray-500 font-bold">→</span>
                          <div className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span className="text-gray-600 font-xs">
                              <DateFormatter timestamp={leadReport.nextCallDate} />
                            </span>
                          </div>
                        </div>
                      </td> */}
                          <td className="px-4 py-2 text-sm font-medium text-gray-600 whitespace-nowrap flex relative">
                            {/* {Rolename === "USER" ? (
                              <div className="text-sm">
                                <TextTruncate
                                  text={leadReport.assignToName}
                                />
                              </div>
                            ) : ( */}
                            <Select
                              className="im_multi"
                              classNamePrefix="select"
                              placeholder="Assign To"
                              options={Useroptions}
                              isClearable
                              onChange={(selectedOption) =>
                                handleUserChange(selectedOption, leadReport.id)
                              }
                              value={{
                                label: (
                                  <TextTruncate
                                    text={leadReport.assignToName}
                                  />
                                ),
                                value: leadReport.assignToName,
                              }}
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  borderRadius: "8px",
                                  boxShadow: "none",
                                  border: "1px solid #e2e8f0",
                                  padding: "2px",
                                  width: "200px",
                                }),
                                placeholder: (provided) => ({
                                  ...provided,
                                  color: "#718096",
                                  fontSize: "0.875rem",
                                }),
                              }}
                            />
                            {Rolename == "ADMIN" && (
                              <img
                                src={More}
                                alt="more"
                                onClick={() =>
                                  handleDetailCard(index, leadReport.id)
                                }
                                className="cursor-pointer"
                              />
                            )}
                            {DetailCard && clickedLeadId === leadReport.id && (
                              <div ref={detailCardRef}>
                                <DetailCard2
                                  LeadId={leadReport.id}
                                  calling={true}
                                  onUpdate={refreshLeads}
                                />
                              </div>
                            )}
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
};

export default NewCallLeads;
