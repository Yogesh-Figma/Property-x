import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddMeetingComponent from "./AddMeeting";
import apiServiceInstance from "../../../Api/ApiService";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import Nodata from "../../../images/No data.svg";
import DateFormatter from "../../small-component/DateFormatter";
import Pagination2 from "../../small-component/Pagination2";
import MeetingP from "../../../images/meeting.svg";
import MeetingView from "./MeetingView";
import Loading from "../../../utils/Loading";
import { TbFilter } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import DatetoEpoch from "../../../utils/DatetoEpoch";

const localizer = momentLocalizer(moment);

const Meeting = () => {
  const [addMeeting, setAddMeeting] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [MeetingHistory, setMeetingHistory] = useState([]);
  const [view, setView] = useState("month");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const rolename = localStorage.getItem("rolename");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [source, setSource] = useState("");
  const [childUser , setChildUser] = useState("");
  const [allchildUser, setAllChildUser] = useState([]);
  
  // Compact event component with Tailwind classes
  const EventComponent = ({ event }) => (
    <div
      className="text-xs leading-3 bg-indigo-50 border border-indigo-200 rounded px-1 py-0.5"
      onClick={(e) => {
        e.stopPropagation();
        handleEventClick(event);
      }}
    >
      <div className="font-medium text-indigo-700 truncate">
        {event.leadsId
          ? `LeadID: ${event.leadsId}`
          : event.dleadsId
          ? `Duplicate Lead ID: ${event.dleadsId}`
          : event.cLeadId
          ? `Calling Lead ID: ${event.cLeadId}`
          : "LeadID"}
        • {event.status}
      </div>
      {/* {!event.allDay && (
        <div className="text-indigo-500 text-[10px]">
          {moment(event.start).format("HH:mm")}
        </div>
      )} */}
    </div>
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };


  const fetchmeetingHistory = async () => {
    try {
      const page = currentPage - 1;
      const size = recordPerPage;
      const response = await apiServiceInstance.getallmeeting(
        "",
        page,
        size,
        "END",
      );
      if (response && response.content) {
        setMeetingHistory(response.content);
        console.log(MeetingHistory);
        setTotalData(response.totalElements);
        console.log(response.totalElements);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };
  const fetchMeetingData = async () => {
    const page = currentPage - 1;
    const size = recordPerPage;
    const response = await apiServiceInstance.getallmeeting(
      childUser? childUser : "",
      page,
      size,
      "END",
      startDate ? DatetoEpoch(startDate) : "",
      endDate ? DatetoEpoch(endDate) : "",
      source ? source : "",
      childUser ? childUser : ""
    );
    setTotalData(response.totalElements);
    setMeetingHistory(response.content);
  };
  const fetchChildUser = async () => {
    const response = await apiServiceInstance.getchildUser();
    setAllChildUser(response);
  };
  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const UserId = rolename == "ADMIN" ? "" : userId;
      const response = await apiServiceInstance.getallmeeting(UserId, 0, 50);
      if (response && response.content) {
        const events = response.content.map((meeting) => {
          const startDate =  meeting.scheduledDate ? new Date(meeting.scheduledDate):new Date(meeting.createdDate);
          const endDate = new Date(startDate);

          if (meeting.startTime && meeting.endTime) {
            return {
              id: meeting.id,
              title: `${
                meeting.duplicateLeadsId
                  ? meeting.duplicateLeadsId
                  : meeting.callingLeadsId
                  ? meeting.callingLeadsId
                  : meeting.leadsId
              } • ${meeting.status}`,
              leadsId: meeting.leadsId,
              dleadsId: meeting.duplicateLeadsId,
              cLeadId: meeting.callingLeadsId,
              status: meeting.status,
              start: new Date(meeting.startTime),
              end: new Date(meeting.endTime),
              allDay: false,
            };
          } else {
            endDate.setHours(23, 59, 59);
            return {
              id: meeting.id,
              title: `${
                meeting.duplicateLeadsId
                  ? meeting.duplicateLeadsId
                  : meeting.callingLeadsId
                  ? meeting.callingLeadsId
                  : meeting.leadsId
              } • ${meeting.status}`,
              leadsId: meeting.leadsId,
              dLeadId: meeting.duplicateLeadsId,
              cLeadId: meeting.callingLeadsId,
              status: meeting.status,
              start: startDate,
              end: endDate,
              allDay: true,
            };
          }
        });
        setMeetings(events);
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMeetings();
    fetchmeetingHistory();
    fetchChildUser();
  }, []);
  const Refresh = () => {
    setLoading(true);
    fetchMeetings();
    fetchmeetingHistory();
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const Refreshtable = () => {
    setStartDate("");
    setEndDate("");
    setSource("");
    setChildUser("");
    fetchMeetingData();
    setRefresh((prev) => !prev); 
  };

useEffect(() => {
  fetchMeetingData();
}, [refresh ]);

  const CustomToolbar = (toolbar) => {
    const goToBack = () => toolbar.onNavigate("PREV");
    const goToNext = () => toolbar.onNavigate("NEXT");
    const goToCurrent = () => toolbar.onNavigate("TODAY");

    const viewNames = {
      month: "Month",
      week: "Week",
      day: "Day",
    };

    return (
      <div className="flex justify-between items-center mb-4 p-2 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <MdArrowBackIos
              onClick={goToBack}
              className="mt-1 cursor-pointer"
            />

            <span className="font-semibold text-gray-700 ">
              {toolbar.label}
            </span>
            <MdArrowForwardIos
              onClick={goToNext}
              className="mt-1 cursor-pointer "
            />
          </div>
          <div className="flex space-x-2">
            {Object.keys(viewNames).map((viewKey) => (
              <button
                key={viewKey}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  toolbar.view === viewKey
                    ? "bg-indigo-600 text-white hover:bg-indigo-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => toolbar.onView(viewKey)}
              >
                {viewNames[viewKey]}
              </button>
            ))}
          </div>
        </div>
        <button
          className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-semibold"
          onClick={goToCurrent}
        >
          Today
        </button>
      </div>
    );
  };

  // Add custom styles for calendar structure
  const calendarClassName = `
    rbc-calendar
    [&_.rbc-event]:!bg-transparent [&_.rbc-event]:!text-inherit
    [&_.rbc-today]:!bg-indigo-50
    [&_.rbc-current-time-indicator]:!bg-indigo-500
    [&_.rbc-header]:py-2 [&_.rbc-header]:font-medium [&_.rbc-header]:text-gray-600
    [&_.rbc-off-range-bg]:bg-gray-50
    [&_.rbc-time-content]:!overflow-y-auto
    [&_.rbc-time-header]:!overflow-hidden
    [&_.rbc-month-view]:!overflow-hidden
    [&_.rbc-time-view]:!overflow-hidden
  `.trim();

  return (
    <>
      {loading && <Loading />}
      <div className="font-sans">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-1 mt-2">
          <div className="flex items-center space-x-2"></div>
          <button
            className="bg-indigo-500 text-white px-2 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setAddMeeting(true)}
          >
            + Add New Meeting
          </button>
          {addMeeting && (
            <AddMeetingComponent
              onClose={() => setAddMeeting(false)}
              Refresh={Refresh}
            />
          )}
        </div>

        {/* Calendar Component */}
        <div className="overflow-hidden border rounded-lg shadow-sm bg-white">
          <BigCalendar
            localizer={localizer}
            events={meetings}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 460 }}
            defaultView="month"
            view={view}
            onView={setView}
            views={["month", "week", "day"]}
            components={{
              event: EventComponent,
              toolbar: CustomToolbar,
            }}
            className={calendarClassName}
            formats={{
              timeGutterFormat: "HH:mm",
              eventTimeRangeFormat: ({ start, end }) =>
                `${moment(start).format("HH:mm")} - ${moment(end).format(
                  "HH:mm"
                )}`,
              dayRangeHeaderFormat: ({ start, end }) =>
                `${moment(start).format("MMM D")} - ${moment(end).format(
                  "MMM D, YYYY"
                )}`,
            }}
            popup={true}
            popupOffset={5}
            min={moment().hours(8).minutes(0).toDate()}
            max={moment().hours(20).minutes(0).toDate()}
            onSelectEvent={handleEventClick}
          />
        </div>
        <MeetingView
          event={selectedEvent}
          isopen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedEvent(null);
          }}
          Refresh={Refresh}
        />

        {/* Meeting History Table */}
        <div className="w-full rounded-lg border border-gray-200 mt-4">
          <div className="border-b border-gray-200 ">
            <div className="flex items-center justify-between">
              {/* Left side - User Image and Title */}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <img src={MeetingP} className="ml-3" alt="User" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-2">
                  Meeting History
                </h2>
              </div>
              {/* filter */}
              <div className="flex items-center gap-2 ml-auto">
             {rolename=='USER' &&  <select className="border rounded-md px-2 py-1" onChange={e => setChildUser(e.target.value)} value={childUser}>
              <option value=""> childUser</option>
                  {allchildUser?.map((option) => (
                    <option key={option?.id} value={option?.id}>
                      {option?.firstName}
                    </option>
                  ))}
                </select>}
                <select className="border rounded-md px-2 py-1" onChange={e => setSource(e.target.value)} value={source}>
                  <option>All</option>
                  <option>Leads</option>
                  <option>Duplicate Leads</option>
                  <option>Calling Leads</option>
                </select>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border rounded-md px-2 py-1"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border rounded-md px-2 py-1"
                placeholder="End Date"
              />
              <div className="border rounded-md px-2 py-2">
                <TbFilter
                  onClick={fetchMeetingData}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                />
              </div>
              <div className="border rounded-md px-2 py-2">
                <FiRefreshCcw
                  onClick={Refreshtable}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                />
              </div>
            </div>
            </div>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700 text-center">
                    Created Date
                  </th>
                  <th className="py-2 px-2 text-left text-sm font-semibold text-gray-700 text-center">
                    Source
                  </th>
                  <th className="py-2 px-2 text-left text-sm font-semibold text-gray-700 text-center">
                    Lead Name
                  </th>
                  {/* <th className="py-2 px-2 text-left text-sm font-semibold text-gray-700 text-center">
                    Project Name
                  </th> */}
                  <th className="py-2 px-2 text-left text-sm font-semibold text-gray-700 text-center">
                    meeting Duration
                  </th>
                  <th className="py-2 px-2 text-left text-sm font-semibold text-gray-700 text-center">
                    travelDistance
                    </th>
                 {rolename=='ADMIN'&&<th className="py-2 px-4 text-left text-sm font-semibold text-gray-700 text-center">
                    In Location
                  </th>}
                { rolename=='ADMIN'&& <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700 text-center">
                    Out Location
                  </th>}
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700 text-center">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody>
                {MeetingHistory.length === 0 ? (
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
                  MeetingHistory.map((record, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center justify-center">
                            <img
                              src={require("../../../images/date_svgrepo.com.png")}
                              className="size-5"
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            <DateFormatter
                              timestamp={record.createdDate}
                              date={true}
                            />
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">{record.source}</td>
                      <td className="py-2 px-4 text-center">
                        <span className="text-sm text-gray-600 text-center">
                          {record.leadsName ||
                            record.callingLeadsName ||
                            record.duplicateLeadsName}
                        </span>
                      </td>
                      {/* <td className="py-2 px-4 text-center">
                        <div className="inline-block bg-gray-100 rounded px-2 py-0.5">
                          <span className="text-sm text-gray-600">
                            {record.projectName ||
                              record.callingLeadsProjectName ||
                              record.duplicateLeadsProjectName}
                          </span>
                        </div>
                      </td> */}
                      <td className="py-2 px-4 text-center">
                        <div className="inline-block bg-gray-100 rounded px-2 py-0.5">
                          <span className="text-sm text-gray-600">
                            {(() => {
                              const startTime = record.startTime; // Unix timestamp
                              const endTime = record.endTime; // Unix timestamp

                              // Calculate the duration in seconds
                              const durationSeconds = endTime - startTime;
                              return (
                                new Date(durationSeconds * 1000)
                                  .toISOString()
                                  .substr(11, 8)
                              );
                            })()}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">
                        {record.travelDistance}
                      </td>
                      {rolename=='ADMIN' && <td className="py-2 px-4 items-center text-center justify-center">
                        <div className="flex items-center justify-center gap-2">
                          <img
                            src={require("../../../images/Dropdown.png")}
                            alt="Open Map"
                            className="cursor-pointer"
                            onClick={() => {
                              const locationQuery =
                                record.location
                                ? record.location
                                  : `${record.inLatitude},${record.inLongitude}`
                                  // : record.location;
                              window.open(
                                `https://www.google.com/maps?q=${encodeURIComponent(
                                  locationQuery
                                )}`,
                                "_blank"
                              );
                            }}
                          />
                          <span>{record.location}</span>
                        </div>
                      </td>}
                      {rolename=='ADMIN'&& <td className="py-2 px-4 items-center text-center justify-center">
                        <div className="flex items-center justify-center gap-2">
                          <img
                            src={require("../../../images/Dropdown.png")}
                            alt="Open Map"
                            className="cursor-pointer"
                            onClick={() => {
                              const locationQuery =
                                record.location
                                ? record.location
                                  : `${record.outLatitude},${record.outLongitude}`
                                  // : record.location;
                              window.open(
                                `https://www.google.com/maps?q=${encodeURIComponent(
                                  locationQuery
                                )}`,
                                "_blank"
                              );
                            }}
                          />
                          <span>{record.location}</span>
                        </div>
                      </td>}
                      <td className="py-2 px-4 items-center text-center justify-center">
                      ₹{parseFloat(record.travelDistance.split(" ")[0]) * 6} 
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
        </div>
      </div>
    </>
  );
};

export default Meeting;
