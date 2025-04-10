import React, { useState, useEffect } from "react";
// import fib from "../../../images/fib.svg";
import apiServiceInstance from "../../../Api/ApiService";
import DateFormatter from "../../small-component/DateFormatter";
import Swal from "sweetalert2";
import deleteIcon from "../../../images/deletefib.svg";
import Loader from "../../../utils/Loading";
import Showmore from "./showmore";
import Pagination2 from "../../small-component/Pagination2";
import { TbFilter } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import MeetingP from "../../../images/meeting.svg";
import DatetoEpoch from "../../../utils/DatetoEpoch";
import { DateRangePicker } from "@adobe/react-spectrum";
import { Checkbox } from "@adobe/react-spectrum";

const Allfib = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [source, setSource] = useState("");
  const [approvedDate, setApprovedDate] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [expandedId, setExpandedId] = useState({ id: null, edit: false });
  const Rolename = localStorage.getItem("rolename");
  const [childUser, setChildUser] = useState("");
  const [allchildUser, setAllChildUser] = useState([]);
  const [isCANCALANATION, setIsCANCALANATION] = useState(false);
  const [fibApprove , setFibApprove] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true);
      const page = currentPage - 1;
      const size = recordPerPage;
      const startDateEpoch = dateRange[0] ? DatetoEpoch(dateRange[0]) : "";
      const endDateEpoch = dateRange[1] ? DatetoEpoch(dateRange[1]) : "";
      const approvedStartDateEpoch = approvedDate[0]
        ? DatetoEpoch(approvedDate[0])
        : "";
      const approvedEndDateEpoch = approvedDate[1]
        ? DatetoEpoch(approvedDate[1])
        : "";

      let response;

      // if (Rolename === "USER") {q
      //   response = await apiServiceInstance.getFibDataByUserId(
      //     page,
      //     size,
      //     startDateEpoch,
      //     endDateEpoch,
      //     isCANCALANATION,
      //     source
      //   );
      // } else {
      response = await apiServiceInstance.getallFibData(
        page,
        size,
        startDateEpoch,
        endDateEpoch,
        approvedStartDateEpoch,
        approvedEndDateEpoch,
        isCANCALANATION,
        source,
        childUser ? childUser : ""
      );

      if (response && response.content) {
        setData(response.content); 
        setTotalData(response.totalElements || 0); 
      } else {
        setData([]); // Fallback to empty array to prevent `map()` error
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); 
    } finally {
      setLoading(false);
    }
  };
  const handleDateChange = (range) => {
    setDateRange([range.start, range.end]);
  };

  const handleApprovedDateChange = (range) => {
    setApprovedDate([range.start, range.end]);
  };
  const fetchChildUser = async () => {
    const response = await apiServiceInstance.getchildUser();
    setAllChildUser(response);
  };
  useEffect(() => {
    fetchData();
    fetchChildUser();
  }, [
    currentPage,
    recordPerPage,
    dateRange,
    isCANCALANATION,
    approvedDate,
    source,
    childUser,
    fibApprove
  ]);

  const handleApprove = (id) => {
    try {
      const response = apiServiceInstance.approveFibData(id, true);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Approved successfully.",
      });
      setFibApprove(response)
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to Approve. Please try again.",
      });
    }
  };

  const toggleShowMore = (id, edit = false) => {
    setExpandedId((prev) => ({
      id: prev.id === id && !edit ? null : id,
      edit,
    }));
  };
  const Refreshtable = () => {
    fetchData();
    setChildUser("");
    setDateRange({ start: null, end: null });
    setApprovedDate({ start: null, end: null });
    setSource("");
  };

  const handleDelete = (id) => {
    setLoading(true);
    try {
      const response = apiServiceInstance.deleteFibData(id);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Deleted successfully.",
      }).then(() => {
        fetchData();
        setLoading(false);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to Delete. Please try again.",
      });
    }
    fetchData();
    setLoading(false);
  };
  return (
    <div className="w-full">
      {/* <h1 className="text-3xl font-semibold mb-4 ml-3">FIB Request</h1> */}
      {loading && <Loader />}
      <div className="border-b border-gray-200 w-full rounded-lg border border-gray-200 mt-2 mb-2 bg-gray-100">
        <div className="flex items-center justify-between">
          {/* Left side - User Image and Title */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <img src={MeetingP} className="ml-3" alt="User" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mt-2">
              Fib Request
            </h2>
          </div>
          {/* filter */}
          <label></label>

          <div className="flex items-center gap-2 ml-auto">
          {Rolename=='ADMIN'&&  <div className="mt-4">
              <Checkbox
                onChange={(isChecked) => setIsCANCALANATION(isChecked)}
                className="text-gray-500 mt-5"
              >
                Canceled Fib
              </Checkbox>
            </div>}
           {Rolename=='USER'&& <select
              className="border rounded-md px-3 py-2 mt-4"
              onChange={(e) => setChildUser(e.target.value)}
              value={childUser}
            >
              <option value=""> childUser</option>
              {allchildUser?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.firstName}
                </option>
              ))}
            </select>}
            <select
              className="border rounded-md px-3 py-2 mt-4"
              onChange={(e) => setSource(e.target.value)}
              value={source}
            >
              <option>All</option>
              <option>Leads</option>
              <option>Duplicate Leads</option>
              <option>Calling Leads</option>
            </select>

            <DateRangePicker
              label="Select Date Range"
              value={dateRange}
              onChange={handleDateChange}
              UNSAFE_style={{ width: "150px" }}
            />

            {Rolename == "ADMIN" && (
              <DateRangePicker
                label="Approved Date Range"
                value={approvedDate}
                onChange={handleApprovedDateChange}
                UNSAFE_style={{ width: "150px" }}
              />
            )}
            <div className="border rounded-md px-2 py-2 mr-2 mt-3">
              <FiRefreshCcw
                onClick={Refreshtable}
                className="cursor-pointer text-gray-600 hover:text-gray-800 w-5 h-5"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg  w-full border border-gray-300 rounded-lg ">
        <div className="grid grid-cols-6 px-4 py-2 text-sm text-gray-500 w-full bg-gray-50 border-b border-gray-200  rounded-t-lg text-right">
          <div className="text-left">PROJECT NAME</div>
          <div className="text-left">Lead ID</div>
          {Rolename == "USER" ? (
            <div className="text-left">CLIENT NAME</div>
          ) : (
            <div className="text-left">AGENT NAME</div>
          )}
          <div className="text-left">ADDED ON</div>
          <div className="text-left">APPROVED DATE</div>
        </div>
        <div className="p-2">
          {data.map((request, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-2 mb-4 border mt-2 border-gray-200 last:mb-0"
            >
              <div className="grid grid-cols-6 gap-1 items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={require("../../../images/fib.png")}
                    alt="Property"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="whitespace-pre-line">
                    <div className="font-semibold">{request.project}</div>
                    <div className="text-gray-500 text-sm">
                      {request.sourceOfLead}
                    </div>
                  </div>
                </div>

                <div>
                  {request.leadsId ||
                    request.callingId ||
                    request.dulicateLeadsId}
                  {request.callingId
                    ? " (Calling Id)"
                    : request.dulicateLeadsId
                    ? " (Duplicate Id)"
                    : " (Leads Id)"}
                </div>

                {Rolename == "USER" ? (
                  <div>{request.clientName}</div>
                ) : (
                  <div>{request.userName}</div>
                )}
                {/* <div>{request.userName}</div> */}
                <div className="text-left">
                  <DateFormatter timestamp={request.createdDate} date={true} />
                </div>
                <div className="flex items-center justify-between">
                  <span>
                    <DateFormatter
                      timestamp={request.approvedDate}
                      date={true}
                    />
                  </span>
                </div>
                <div>
                  {Rolename == "ADMIN" ? (
                    <div className="flex items-center gap-4">
                      <button
                        className={`text-blue-500 ${
                          !request.isApproved
                            ? "hover:text-blue-600"
                            : "hover:text-gray-500"
                        }`}
                        onClick={
                          !request.isApproved
                            ? () => handleApprove(request.id, true)
                            : undefined
                        }
                      >
                        {request.isApproved ? "Approved" : "Approve"}
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => handleDelete(request.id)}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => toggleShowMore(request.id, true)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <div className="text-right border-t border-gray-200 mt-4 w-full">
                <button
                  className="text-blue-500 hover:text-blue-600 text-sm"
                  onClick={() => toggleShowMore(request.id)}
                >
                  {expandedId.id != null && expandedId.id === request.id
                    ? "Show less"
                    : "Show more Details"}
                </button>
                {expandedId.id != null && expandedId.id === request.id && (
                  <Showmore
                    id={request.id}
                    edit={expandedId.edit}
                    onClose={() => setExpandedId({ id: null, edit: false })}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination2
        currentPage={currentPage}
        totalItems={totalData}
        onPageChange={setCurrentPage}
        recordPerPage={recordPerPage}
        onRowsPerPageChange={(event) =>
          setRecordPerPage(parseInt(event.target.value, 10))
        }
      />
    </div>
  );
};

export default Allfib;
