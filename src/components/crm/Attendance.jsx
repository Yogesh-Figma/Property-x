import React, { useState, useEffect } from "react";
import { Calendar, Bell } from "lucide-react";
import apiServiceInstance from "../../Api/ApiService";
import DatetoEpoch from "../../utils/DatetoEpoch";
import DateFormatter from "../small-component/DateFormatter";
import { FiRefreshCcw } from "react-icons/fi";
import tick from "../../images/tick.svg";
import NoMeeting from "../../images/noMeeting.svg";
import { toast } from "react-toastify";
import { TbFilter } from "react-icons/tb";
import Pagination2 from "../small-component/Pagination2";
import Nodata from "../../images/No data.svg";
import Loading from "../../utils/Loading";
import AttendancePOP from "./AttendancePOP";
import haversine from "haversine-distance"; // Install this: npm install haversine-distance
import MapComponent from "../small-component/MapComponent";

const Attendance = () => {
  const userId = localStorage.getItem("userId");
  const [attendance, setAttendance] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [meetingdata, setMeetingdata] = useState([]);
  const [leavs, setleavs] = useState("");
  const [attendanceId, setattendanceId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [avgData, setAvgData] = useState([]);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [childUser, setChildUser] = useState("");
  const rolename = localStorage.getItem("rolename");
  const [allchildUser, setAllChildUser] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    error: 0,
  });

  const fetchAttendanceData = async () => {
    const page = currentPage - 1;
    const size = recordPerPage;
    const response = await apiServiceInstance.getAttendanceByUserIdMonthly(
      childUser ? childUser : "",
      page,
      size,
      startDate ? DatetoEpoch(startDate) : "",
      endDate ? DatetoEpoch(endDate) : "",
      childUser ? childUser : ""
    );
    setTotalData(response.totalElements);
    setAttendanceData(response.content);
  };
  const fetchChildUser = async () => {
    const response = await apiServiceInstance.getchildUser();
    setAllChildUser(response);
  };
  const fetchAllData = () => {
    setLoading(true); // Start loading

    Promise.all([
      apiServiceInstance.getTodayAttendanceData(userId),
      apiServiceInstance.getmontlyLeavsbyUserId(userId),
      apiServiceInstance.getallmeeting(userId, 0, 1),
      apiServiceInstance.getAttendanceByUserId(userId),
    ])
      .then(([attendanceRes, leavesRes, meetingsRes, avgRes]) => {
        setAttendance(attendanceRes);
        setattendanceId(attendanceRes.id);
        setleavs(leavesRes);
        setAvgData(avgRes);
        setMeetingdata(meetingsRes.content);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });

    fetchAttendanceData();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const referenceLocation = { latitude: 28.5868032, longitude: 77.4340608 };
  const rangeLimit = 100; // 100 meters

  const isInRange = (lat, long) => {
    const userLocation = { latitude: lat, longitude: long };
    const distance = haversine(referenceLocation, userLocation);
    return distance <= rangeLimit;
  };

  useEffect(() => {
    fetchAttendanceData(); // Fetch data when page or records per page change
    fetchChildUser();
  }, [currentPage, recordPerPage]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handlePunchIn = async () => {
    try {
      const currentLocation = await fetchCurrentLocation();

      const payload = {
        inTime: DatetoEpoch(new Date()),
        inLatLong: `${currentLocation.latitude},${currentLocation.longitude}`,
      };

      console.log(payload);

      const response = await apiServiceInstance.saveAttendance(payload, userId);

      toast.success(response);

      fetchAllData();
      console.log(response);
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(`Failed to assign lead. ${errorMessage}`);
      console.error("Error Assign lead:", error.message);
    }
  };

  const handlePunchOut = async () => {
    try {
      const currentLocation = await fetchCurrentLocation();

      const payload = {
        id: attendanceId,
        outTime: DatetoEpoch(new Date()),
        outLatLong: `${currentLocation.latitude},${currentLocation.longitude}`,
      };
      console.log(payload);
      const response = await apiServiceInstance.updateAttendanceUserData(
        payload,
        userId
      );
      toast.success(response);
      fetchAllData();
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(`Failed to assign lead. ${errorMessage}`);
      console.error("Error Assign lead:", error.message);
    }
  };

  const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            };
            setLocation(newLocation);
            resolve(newLocation);
          },
          (error) => {
            const errorLocation = {
              latitude: 0,
              longitude: 0,
              error: error.message,
            };
            setLocation(errorLocation);
            reject(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        const errorMsg = "Geolocation is not supported by this browser.";
        setLocation({ latitude: 0, longitude: 0, error: errorMsg });
        reject(errorMsg);
      }
    });
  };
  const Refreshtable = () => {
    setChildUser("");
    setStartDate("");
    setEndDate("");
    fetchAttendanceData();
  };

  const handlePunchInWithLocation = () => {
    fetchCurrentLocation();
    handlePunchIn();
  };
  const handlePunchOutWithLocation = () => {
    fetchCurrentLocation();
    handlePunchOut();
  };

  return (
    <>
      {loading && <Loading />}

      <div className=" w-full h-full mx-auto space-y-6">
        {/* Top Row divs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-2 border-gray-200 rounded-md p-4 bg-white">
          {/* Punch In div */}
          <div className="flex flex-col items-start border-r border-gray-200 pr-4">
            <div className="text-sm text-gray-500 mb-2">Punch In</div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-semibold">
                <DateFormatter timestamp={attendance.inTime} time={true} />
              </div>
              <img
                src={require("../../images/Addons.png")}
                alt="punchin"
                className="w-12 h-12 cursor-pointer"
                onClick={handlePunchInWithLocation}
              />
            </div>
          </div>

          {/* Punch Out div */}
          <div className="flex flex-col items-start border-r border-gray-200 pr-4">
            <div className="text-sm text-gray-500 mb-2">Punch Out</div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-semibold">
                <DateFormatter timestamp={attendance.outTime} time={true} />
              </div>
              <img
                src={require("../../images/Addons 2.png")}
                alt="punchout"
                className="w-12 h-12 cursor-pointer"
                onClick={handlePunchOutWithLocation}
              />
            </div>
          </div>

          {/* Daily Working Hours div */}
          <div className="flex flex-col items-start border-r border-gray-200 pr-4">
            <div className="text-sm text-gray-500 mb-2">Present Days</div>
            <div className="text-2xl font-semibold">
              {avgData.totalPresentDays} days
            </div>
          </div>

          {/* Total Leave div */}
          <div className="flex flex-col items-start">
            <div className="text-sm text-gray-500 mb-2">Total Leave Taken</div>
            <div className="text-2xl font-semibold">{leavs}</div>
          </div>
        </div>

        {/* Bottom Row */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <div className="flex items-center gap-3">
                <img src={tick} alt="Tick Icon" />
                <h2 className="text-lg font-medium">Today Task</h2>
              </div>
              <img
                src={require("../../images/addd.png")}
                className="cursor-pointer"
                alt="Add Icon"
              />
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold mb-1">
                    New social media post
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Sed mi ac ac sagittis mi. Interdum varius cursus non lorem
                    metus.
                  </p>
                </div>
                <span className="px-3 py-1 bg-cyan-50 text-teal-500 font-medium text-sm rounded-full">
                  Marketing
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <img
                    src={require("../../images/calendar-date.png")}
                    alt="Calendar Icon"
                  />
                  <span className="text-sm">Feb 12</span>
                </div>
                <button className="flex items-center gap-1 text-gray-400 hover:text-gray-600">
                  <span className="text-sm">View more</span>
                </button>
              </div>
            </div>
          </div>

          {meetingdata && meetingdata.length > 0 ? (
            <div className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Schedule Meetings</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-blue-500 font-medium">
                    Lead Id: {meetingdata[0].leadsId}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Startime:{" "}
                    <DateFormatter timestamp={meetingdata[0].startTime} />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Location: {meetingdata[0].location}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ProjectName: {meetingdata[0].projectName}
                  </div>
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                  RSVP Now
                </button>
              </div>
            </div>
          ) : (
            <img src={NoMeeting} alt="No Meetings" className="w-full" />
          )}

          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="mb-4">
              <h4 className="text-lg font-medium">Holidays and Updates</h4>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Calendar className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="font-medium">
                    Employee Recognition Program Launch
                  </div>
                  <div className="text-sm text-gray-500">
                    We're thrilled to announce the launch of o...
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Bell className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="font-medium">Company Town Hall Meeting</div>
                  <div className="text-sm text-gray-500">
                    We'll come together to discuss our achieve...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Attendance History */}
        <div className="w-full rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 p-1">
            <div className="flex items-center justify-between">
              {/* Left side - User Image and Title */}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <img
                    src={require("../../images/user-01.png")}
                    className="ml-3"
                    alt="User"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Attendance History
                </h2>
              </div>

              {/* Right side - Inputs and Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                {rolename == "USER" && (
                  <select
                    className="border rounded-md px-2 py-1"
                    onChange={(e) => setChildUser(e.target.value)}
                    value={childUser}
                  >
                    <option value=""> childUser</option>
                    {allchildUser?.map((option) => (
                      <option key={option?.id} value={option?.id}>
                        {option?.firstName}
                      </option>
                    ))}
                  </select>
                )}
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
                    onClick={fetchAttendanceData}
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    Date
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    Punch In Time
                  </th>
                  {/* <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    Location
                  </th> */}
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    Punch out Time
                  </th>
                  {/* <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    Loacation
                  </th> */}
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700 text-center">
                    In Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.length === 0 ? (
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
                  attendanceData.map((record, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td className="py-2 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex items-center justify-center">
                            <img
                              src={require("../../images/date_svgrepo.com.png")}
                              className="size-5"
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            {record.date}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 items-center text-center ">
                        <div className="flex  items-center justify-center gap-2">
                          <div>
                            <img
                              src={require("../../images/Dropdown.png")}
                              alt="Dropdown"
                              className="cursor-pointer"
                              onClick={() => {
                                const locationQuery = `${record.inLat},${record.inLong}`;
                                window.open(
                                  `https://www.google.com/maps?q=${encodeURIComponent(
                                    locationQuery
                                  )}`,
                                  "_blank"
                                );
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 inline-block bg-gray-100 rounded text-center px-2 py-0.5">
                            <DateFormatter
                              timestamp={record.inTime}
                              time={true}
                            />
                          </span>
                        </div>
                      </td>
                      {/* <td className="py-3 px-4 text-center">
                        <div className="flex justify-center">
                          <MapComponent
                            lat={record.inLat}
                            lng={record.inLong}
                          />
                        </div>
                      </td> */}
                      <td className="py-2 px-4 items-center text-center ">
                        <div className="flex  items-center justify-center gap-2">
                          <div>
                            <img
                              src={require("../../images/Dropdown.png")}
                              alt="Dropdown"
                              className="cursor-pointer"
                              onClick={() => {
                                const locationQuery = `${record.outLat},${record.outLong}`;
                                window.open(
                                  `https://www.google.com/maps?q=${encodeURIComponent(
                                    locationQuery
                                  )}`,
                                  "_blank"
                                );
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 inline-block bg-gray-100 rounded text-center px-2 py-0.5">
                            <DateFormatter
                              timestamp={record.outTime}
                              time={true}
                            />
                          </span>
                        </div>
                      </td>
                      {/* <td className="py-3 px-4 text-center">
                        <div className="flex justify-center">
                          <MapComponent
                            lat={record.outLat}
                            lng={record.outLong}
                          />
                        </div>
                      </td> */}
                      <td className="py-2  px-4 items-center text-center justify-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className=" flex items-center justify-center">
                            {/* <img src={require("../../images/Dropdown.png")} /> */}
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-sm flex items-center gap-1 ${
                              isInRange(record.inLat, record.inLong) &&
                              isInRange(record.outLat, record.outLong)
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {isInRange(record.inLat, record.inLong) &&
                            isInRange(record.outLat, record.outLong)
                              ? " In Range"
                              : " Out of Range"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination2
              currentPage={currentPage}
              totalItems={totalData} // Use total items from the API for pagination
              onPageChange={(page) => setCurrentPage(page)} // Ensure page update triggers re-fetch
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

export default Attendance;
