import React from "react";
import {
  LineChart,
  Line,
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  BarChart,
  Tooltip,
  Bar,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import apiServiceInstance from "../../Api/ApiService";
import Loading from "../../utils/Loading";
import moment from "moment";


const RatioCard = ({ title, value, change, data }) => {
  const chartData = data || [
    { value: 30 },
    { value: 40 },
    { value: 60 },
    { value: 70 },
    { value: 50 },
    { value: 45 },
    { value: 35 },
  ];

  return (
    <div className="rounded-xl shadow-md border border-gray-200 bg-white p-4 flex flex-col justify-between hover:shadow-2xl transition-shadow">
      <h3 className="text-gray-800 text-lg font-semibold mb-2">{title}</h3>
      <div className="flex">
        <div className="h-24 w-42 mt-2 rounded-lg overflow-hidden">
          <LineChart width={240} height={120} data={chartData}>
            <ReferenceLine y={25} stroke="#f3f4f6" strokeWidth={1} />
            <ReferenceLine y={45} stroke="#f3f4f6" strokeWidth={1} />
            <ReferenceLine y={65} stroke="#f3f4f6" strokeWidth={1} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#line-gradient)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </div>
        <div className="flex flex-col justify-between ">
          <div className="flex items-center mt-10 ">
            <span className="text-3xl font-semibold text-gray-900">
              {value}
            </span>
            <span
              className={`text-sm font-medium ml-2 ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
            </span>
          </div>
          {/* <span className="text-xs text-gray-500">Previous Month</span> */}
        </div>
      </div>
      <svg height="0" width="0">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#34d399", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#4b5563", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const ProgressBar = ({ value, max, color }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [openSuccessRatio, setOpenSuccessRatio] = useState(0);
  const [openDeclineRatio, setOpenDeclineRatio] = useState(0);
  const [successRatio, setSuccessRatio] = useState(0);
  const [todayCallCount, setTodayCallCount] = useState(0);
  const [meetingsCount, setMeetingsCount] = useState(0);
  const [leadsAttendedCount, setLeadsAttendedCount] = useState(0);
  const [projectdata, setProjectData] = useState([]);
  const [activeButton, setActiveButton] = useState("new");
  const [newButtondata, setNewButtondata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [duplicateButtondata, setDuplicateButtondata] = useState([]);
  const [callingButtondata, setCallingButtondata] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [DateLeadsAnalysis, setDateLeadsAnalysis] = useState([]);
  const [MonthLeadsAnalysis, setMonthLeadsAnalysis] = useState([]);
  const [YearLeadsAnalysis, setYearLeadsAnalysis] = useState([]);
  const [leadsAnalysisData, setLeadsAnalysisData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  const rolename = localStorage.getItem("rolename");
  console.log(rolename, "rolename");

  const fetchSummary = async () => {
    try {
      const response = await apiServiceInstance.getallSummary();
      console.log(response, "response");

      if (response && response.data) {
        setSummary(response.data);
      }

      if (response && response.leadsSummary) {
        setOpenSuccessRatio(
          parseFloat(
            response.leadsSummary.currentMonthSuccessPercentage || 0
          ).toFixed(2)
        );
        setOpenDeclineRatio(
          parseFloat(
            response.leadsSummary.currentMonthDeclinePercentage || 0
          ).toFixed(2)
        );
        setSuccessRatio(
          parseFloat(
            response.leadsSummary.currentMonthSuccessPercentage || 0
          ).toFixed(2)
        );
        setTodayCallCount(response.leadsSummary.todayTotalMeetings || 0);
        setLeadsAttendedCount(response.leadsSummary.attendedLeads || 0);
        setMeetingsCount(response.leadsSummary.callStatusDoneCount || 0);

        if (rolename === "USER") {
          setSourceData(response.leadsSummary.callStatusData || []);
        } else {
          setSourceData(response.leadsSummary.sourceDataList || []);
        }

        if (rolename === "USER") {
          setDateLeadsAnalysis(response.leadsSummary.leadsAssignedByDay || {});
          setMonthLeadsAnalysis(
            response.leadsSummary.leadsAssignedByMonth || {}
          );
        } else {
          setDateLeadsAnalysis(response.leadsSummary.leadsCreatedByDay || {});
          setMonthLeadsAnalysis(
            response.leadsSummary.leadsCreatedByMonth || {}
          );
        }

        setYearLeadsAnalysis(response.leadsSummary.leadsCreatedByYear || {});

        if (rolename === "USER") {
          setProjectData(response.leadsSummary.leadsCallStatusCount || {});
        } else {
          setProjectData(response.leadsSummary.developerOpenSourceCounts || {});
        }

        setNewButtondata(response.leadsSummary || {});
        setDuplicateButtondata(response.duplicateLeadsSummary || {});
        setCallingButtondata(response.callingSummary || {});

        const defaultData = processDateData(
          response.leadsSummary.leadsCreatedByDay || {}
        );
        setLeadsAnalysisData(defaultData);
        setSelectedPeriod("thisMonth");
      }
    } catch (error) {
      console.error("Error fetching call status options:", error);
    }
  };
  const metrics = [
    {
      title: "Success Leads Ratio",
      value: successRatio,
      change: parseFloat(newButtondata.previousMonthSuccessPercentage).toFixed(
        2
      ),
     
    },
    {
      title: "Decline Leads Ratio",
      value: openDeclineRatio,
      change: parseFloat(newButtondata.previousMonthDeclinePercentage).toFixed(
        2
      ),
      
    },
    {
      title: "Hot Leads ratio",
      value: duplicateButtondata.hotLeadsCount,
      change: parseFloat(duplicateButtondata.openHotLeadsCount).toFixed(
        2
      ),
      
    },
  ];

  const handlePeriodChange = async (period) => {
    setSelectedPeriod(period);
    try {
      let data;
      switch (period) {
        case "thisMonth":
          data = processDateData(DateLeadsAnalysis);
          break;
        case "thisYear":
          data = processMonthData(MonthLeadsAnalysis);
          break;
        default:
          data = processDateData(DateLeadsAnalysis);
      }
      setLeadsAnalysisData(data);
    } catch (error) {
      console.error("Error fetching leads analysis data:", error);
    }
  };
  const periods = [
    { id: "thisMonth", label: "This Month" },
    { id: "thisYear", label: "This Year" },
  ];
  const convertDeveloperData = (input) => {
    const projectData = [];
    for (const [developerName, sources] of Object.entries(input)) {
      const projectEntry = { name: developerName };
      for (const [sourceName, count] of Object.entries(sources)) {
        projectEntry[sourceName] = count;
      }
      projectData.push(projectEntry);
    }
    return projectData;
  };
  const projecttData = convertDeveloperData(projectdata);
  console.log(projecttData, "projecttData");

  useEffect(() => {
    setLoading(true); // Start loading

    fetchSummary().finally(() => {
      setLoading(false); // Stop loading after data fetch
    });
  }, []);

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const processDateData = (data) => {
    if (!data) {
      return [];
    }
  
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  
    const thisMonth = getSortedLeadsByMonth(currentMonth, currentYear, data);
    const prevMonth = getSortedLeadsByMonth(previousMonth, previousYear, data);
  
    return mergeLeadsData(thisMonth, prevMonth, 'date', 'thisMonth', 'previousMonth');
  };
  
  

  const processMonthData = (data) => {
    if (!data) {
      return [];
    }
  
    const today = new Date();
    const currentYear = today.getFullYear();
    const previousYear = currentYear - 1;
  
    const thisYear = getSortedLeadsByYear(currentYear, data);
    const prevYear = getSortedLeadsByYear(previousYear, data);
  
    return mergeLeadsData(thisYear, prevYear, 'period', 'thisYear', 'previousYear');
  };
  const getSortedLeadsByMonth = (month, year, leadsByDay) => {
    if (!leadsByDay) return [];
    return Object.keys(leadsByDay)
      .filter((date) => {
        const parsedDate = moment(date);
        return parsedDate.month() + 1 === month && parsedDate.year() === year;
      })
      .sort((a, b) => moment(a).diff(moment(b)))
      .map((date) => ({
        date: moment(date).date(),
        leads: leadsByDay[date],
      }));
  };
  
  const getSortedLeadsByYear = (year, leadsByMonth) => {
    if (!leadsByMonth) return [];
    return Object.keys(leadsByMonth)
      .filter((date) => moment(date).year() === year)
      .sort((a, b) => moment(a).month() - moment(b).month())
      .map((date) => ({
        period: moment(date).format("MMM"),
        leads: leadsByMonth[date],
      }));
  };
  
  const mergeLeadsData = (thisPeriod, prevPeriod, key, thisLabel, prevLabel) => {
    const labels = [...new Set([...thisPeriod.map((d) => d[key]), ...prevPeriod.map((d) => d[key])])].sort((a, b) =>
      key === 'period' ? moment().month(a).format("M") - moment().month(b).format("M") : a - b
    );
  
    return labels.map((label) => ({
      [key]: label,
      [thisLabel]: thisPeriod.find((d) => d[key] === label)?.leads || 0,
      [prevLabel]: prevPeriod.find((d) => d[key] === label)?.leads || 0,
    }));
  };
  
  

  const parsePercentage = (value) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };
  const pieData = {
    new: {
      totalLeads: newButtondata.totalLeads,
      metrics: [
        {
          name: "Success",
          percentage: parsePercentage(newButtondata.successPercentage),
          color: "#38BDF8",
        },
        {
          name: "Open Leads",
          percentage: parsePercentage(newButtondata.openLeadsCount),
          color: "#FB923C",
        },
        {
          name: "Meetings Done",
          percentage: parsePercentage(newButtondata.callStatusDoneCount),
          color: "#14B8A6",
        },
        {
          name: "Decline",
          percentage: parsePercentage(newButtondata.declinePercentage),
          color: "#FB7185",
        },
      ],
    },
    duplicate: {
      totalLeads: duplicateButtondata.totalDuplicateLeads,
      metrics: [
        {
          name: "Success",
          percentage: parsePercentage(duplicateButtondata.successPercentage),
          color: "#38BDF8",
        },
        {
          name: "Open Leads",
          percentage: parsePercentage(duplicateButtondata.openDuplicateLeadsCount),
          color: "#FB923C",
        },
        {
          name: "Meetings Done",
          percentage: parsePercentage(duplicateButtondata.callStatusDoneCount),
          color: "#14B8A6",
        },
        {
          name: "Decline",
          percentage: parsePercentage(duplicateButtondata.declinePercentage),
          color: "#FB7185",
        },
      ],
    },
    calling: {
      totalLeads: callingButtondata.totalCallingData,
      metrics: [
        {
          name: "Success",
          percentage: parsePercentage(callingButtondata.successPercentage),
          color: "#38BDF8",
        },
        {
          name: "open Leads",
          percentage: parsePercentage(callingButtondata.openCallingLeadsCount),
          color: "#FB923C",
        },
        {
          name: "Meetings Done",
          percentage: parsePercentage(callingButtondata.callStatusDoneCount),
          color: "#14B8A6",
        },
        {
          name: "Decline",
          percentage: parsePercentage(callingButtondata.declinePercentage),
          color: "#FB7185",
        },
      ],
    },
  };
  const currentData = pieData[activeButton];
  const formatPercentage = (value) => {
    return parsePercentage(value).toFixed(2);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = parsePercentage(payload[0].value);
      const count = Math.round((percentage * currentData.totalLeads) / 100);
      return (
        <div className="bg-white p-1 shadow-lg rounded-lg border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600 text-center font-bold">
            {" "}
            {count}
          </p>
        </div>
      );
    }
    return null;
  };

  const maxValue =
    sourceData.length > 0
      ? Math.max(
          ...sourceData.map((item) =>
            rolename === "USER" ? item.callCount : item.sourceCount
          )
        )
      : 0;

  const processedData = convertDeveloperData(projectdata);

  const sourceNames = [
    ...new Set(
      processedData.flatMap((entry) =>
        Object.keys(entry).filter((key) => key !== "name")
      )
    ),
  ];

  const convertCallStatusData = (data) => {
    if (!data) return [];

    return Object.entries(data).map(([status, count]) => ({
      name: status,
      value: count,
      "Call Status": count,
    }));
  };

  return (
    <>
      {loading && <Loading />}
      <div className="p-6 bg-gray-50 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <RatioCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              data={metric.data}
            />
          ))}
        </div>

        {/* Daily Analysis */}
        <div className="flex space-x-6 mt-4 rounded-lg ">
          <div className="flex-1">
            <div
              className="bg-white h-full border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-2xl transition-shadow"
              style={{ width: "450px" }}
            >
              <div>
                <h3 className="text-xl font-semibold">Daily Analysis</h3>
                <p className="text-sm text-gray-500">
                  Track your daily Performance 
                </p>
              </div>
              <div>
                <div className="space-y-6">
                  <div className="flex items-center mb-8">
                    <div className="bg-blue-50 p-4 rounded-full">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    {/* <div className="ml-4">
                    <span className="text-gray-700">Your profile score</span>
                    <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      73
                    </span>
                  </div> */}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Daily Meetings
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {todayCallCount}
                        </span>
                      </div>
                      <ProgressBar
                        value={todayCallCount}
                        max={50}
                        color="bg-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Meetings & Visits
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {meetingsCount}
                        </span>
                      </div>
                      <ProgressBar
                        value={meetingsCount}
                        max={50}
                        color="bg-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Leads Attended
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {leadsAttendedCount}
                        </span>
                      </div>
                      <ProgressBar
                        value={leadsAttendedCount}
                        max={50}
                        color="bg-pink-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Source Performance */}
          <div className="w-full rounded-2xl bg-white p-6 shadow-md hover:shadow-2xl transition-shadow">
            {/* Header Section */}
            <div className="flex items-center justify-between ">
              <h3 className="text-2xl font-semibold text-gray-900">
                {rolename === "USER"
                  ? "Calling Status Analytics"
                  : "Source Performance"}
              </h3>
            </div>

            {/* Content Section */}
            <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 bg-white grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-300 ">
                <div className="text-sm font-semibold text-gray-600">
                  {rolename === "USER" ? "Status" : "Source"}
                </div>
                <div className="text-sm font-semibold text-gray-600 text-right">
                  {rolename === "USER" ? "Call Count" : "Open Leads"}
                </div>
                <div className="text-sm font-semibold text-gray-600 text-right">
                  {rolename === "USER" ? "All Call Count" : "New Leads"}
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-2 ">
                {sourceData.map((item) => {
                 const progress =
                 rolename === "USER"
                   ? item.callCount / (item.allCallCount || 0) // Prevent division by zero
                   : item.openSourceCount / (item.sourceCount || 0);

                  return (
                    <div key={item.name} className="relative">
                      {/* Background Bar */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
                        <div
                          className="h-9 bg-blue-300 rounded-lg "
                          style={{
                            width: `${progress * 100}%`,
                            transition: "width 0.4s ease-in-out",
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="relative grid grid-cols-3 gap-1 px-4 py-2 items-center">
                        <div className="font-medium text-gray-900 z-10">
                          {item.name}
                        </div>
                        <div className="text-right font-semibold text-gray-800 z-10">
                          {rolename === "USER"
                            ? item.callCount
                            : item.openSourceCount}
                        </div>
                        <div className="text-right font-semibold text-gray-800 z-10">
                          {rolename === "USER"
                            ? item.allCallCount
                            : item.sourceCount}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Leads Analysis */}
        <div className="mt-4">
          <div className="w-full bg-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl border border-gray-200">
            <div className="p-3 border-gray-200">
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-semibold text-gray-900 p-3">
                    Leads Analysis
                  </h2>
                </div>

                <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm">
                  {periods.map((period, index, arr) => (
                    <button
                      key={period.id}
                      onClick={() => handlePeriodChange(period.id)}
                      className={`
                  px-4 py-2 text-sm font-medium transition-all duration-200
                  ${
                    selectedPeriod === period.id
                      ? "bg-blue-40 text-blue-500 hover:bg-blue-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  ${index === 0 ? "rounded-l-lg" : ""}
                  ${index === arr.length - 1 ? "rounded-r-lg" : ""}
                  ${index !== arr.length - 1 ? "border-r border-gray-200" : ""}
                `}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={leadsAnalysisData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey={
                        selectedPeriod === "thisMonth" ? "date" : "period"
                      }
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      stroke="#888"
                      fontSize={12}
                      tickMargin={10}
                      ticks={
                        selectedPeriod === "thisMonth"
                          ? ["5", "10", "15", "20", "25", "30" ,"35","40","45","50"]
                          : undefined
                      }
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      ticks={[5,10,15, 20,25, 30, ]}
                      domain={[0, "auto"]}
                      stroke="#888"
                      fontSize={12}
                      tickMargin={10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      cursor={false}

                    />
                    {selectedPeriod === "thisMonth" ? (
                      <>
                        <Line
                          type="monotone"
                          dataKey="thisMonth"
                          name="This Month"
                          stroke="#2563eb"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, fill: "#2563eb" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="previousMonth"
                          name="Previous Month"
                          stroke="#fb923c"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, fill: "#fb923c" }}
                        />
                      </>
                    ) : (
                      <>
                        <Line
                          type="monotone"
                          dataKey="thisYear"
                          name="This Year"
                          stroke="#2563eb"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, fill: "#2563eb" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="previousYear"
                          name="Previous Year"
                          stroke="#fb923c"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 6, fill: "#fb923c" }}
                        />
                      </>
                    )}
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        paddingTop: "20px",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        {/* Project Analysis */}
        <div>
          <div className="w-full border border-gray-200 rounded-lg bg-white p-4 mt-3 shadow-md hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-6 gap-6">
              {rolename == "USER" && (
                <div className="text-lg text-gray-700 font-bold ml-2 mb-8">
                  Status Analytics
                </div>
              )}
              {rolename != "USER" && (
                <div className="flex gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Performance</div>
                    <div className="text-xl font-semibold">
                      {newButtondata.topSource}
                    </div>
                  </div>
                  <div class="border-2 border-gray-200 h-12"></div>

                  <div>
                    <div className="text-sm text-gray-500">Builder</div>
                    <div className="text-xl font-semibold">
                      {newButtondata.topDeveloper}
                    </div>
                  </div>
                </div>
              )}

              {/* <div className="flex gap-4">
              <select className="bg-gray-100 rounded-md px-4 py-2">
                <option>Monthly</option>
              </select>
              <button className="bg-gray-100 rounded-md px-4 py-2 flex items-center gap-2">
                <span className="text-gray-600">Filter</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </button>
            </div> */}
            </div>

            <div className="h-[400px]">
              {rolename === "USER" ? (
                <BarChart
                  width={1100}
                  height={400}
                  data={convertCallStatusData(projectdata)}
                  barSize={40}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="0"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    angle={0}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis axisLine={false} tickLine={false} dx={-10} />
                  <Bar
                    dataKey="Call Status"
                    fill="#90CAF9"
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="value" position="top" />
                  </Bar>
                </BarChart>
              ) : (
                <BarChart
                  width={1100}
                  height={400}
                  data={projecttData}
                  barSize={40}
                  barGap={10}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="0"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis dataKey="name" />
                  <YAxis axisLine={false} tickLine={false} dx={-10} />
                  {sourceNames.map((source, index) => (
                    <Bar
                      key={source}
                      dataKey={source}
                      stackId="a"
                      fill={
                        index === 0
                          ? "#90CAF9"
                          : index === 1
                          ? "#E3F2FD"
                          : "#F5F5F5"
                      }
                      radius={[0, 0, 0, 0]}
                    />
                  ))}
                </BarChart>
              )}
            </div>

            <div className="flex gap-6 mt-4 justify-center">
              {rolename === "USER" ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-blue-300"></div>
                  <span className="text-sm text-gray-600">
                    Call Status Count
                  </span>
                </div>
              ) :(
                sourceNames.map((source, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor:
                          index === 0
                            ? "#F5F5F5" // Organic
                            : index === 1
                            ? "#E3F2FD" // Housing
                            : "#90CAF9", // 99Acres.com
                      }}
                    ></div>
                    <span className="text-sm text-gray-600">{source}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Lead Origin */}
        <div className="flex ">
          <div className="w-full max-w-md border border-gray-200 rounded-lg bg-white p-4 mt-3 shadow-md hover:shadow-2xl transition-shadow">
            <div className="px-0 pt-0">
            <h2 className="text-xl font-bold">Lead Origin</h2>
              <div className="flex justify-between items-center">
                <div className="inline-flex rounded-lg border border-gray-200 ml-10">
                  {["new", "duplicate", "calling"].map((button) => (
                    <button
                      key={button}
                      className={`px-4 py-1.5 text-sm font-medium transition-colors
                  ${
                    activeButton === button
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-gray-50"
                  } ${button === "new" ? "rounded-l-lg" : ""} 
                  ${button === "calling" ? "rounded-r-lg" : "border-r"}`}
                      onClick={() => setActiveButton(button)}
                    >
                      {button.charAt(0).toUpperCase() + button.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-[600px] h-[400px] flex items-center justify-center">
                <PieChart width={600} height={400}>
                  <Pie
                    data={currentData.metrics}
                    cx={300}
                    cy={200}
                    innerRadius={90}
                    outerRadius={140}
                    paddingAngle={4}
                    dataKey="percentage"
                  >
                    {currentData.metrics.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    ))}
                    <Label
                      content={({ viewBox: { cx, cy } }) => (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          <tspan
                            x={cx}
                            y={cy - 10}
                            className="text-base font-medium"
                          >
                            Total Leads
                          </tspan>
                          <tspan
                            x={cx}
                            y={cy + 10}
                            className="text-xl font-bold"
                          >
                            {currentData.totalLeads}
                          </tspan>
                        </text>
                      )}
                    />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              {currentData.metrics.map((metric) => (
                <div key={metric.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: metric.color }}
                  />
                  <span className="text-sm text-gray-600">{metric.name}</span>
                  <span className="text-sm font-medium ml-auto">
                    {formatPercentage(metric.percentage)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
