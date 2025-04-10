import React, { useState, useEffect } from "react";
import viewmore from "../../images/view salary details.svg";
import SalarySlip from "../../images/salary slip download.png";
import { useNavigate } from "react-router-dom";
import apiServiceInstance from "../../Api/ApiService";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const SalaryHistory = () => {
  const [monthlydata, setMonthlyData] = useState([]);
  const [salary, setSalary] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch monthly attendance data
  const getMonthlyData = async () => {
    try {
      const response = await apiServiceInstance.getAttendanceRecordByUserID(
        userId,
        0,
        10
      );
      setMonthlyData(response.content || []);
    } catch (error) {
      console.error("Failed to fetch monthly data:", error);
    }
  };

  // Fetch salary data
  const getsalaryByUserId = async () => {
    try {
      const response = await apiServiceInstance.getsalaryByUserId(userId);
      setSalary(response || []);
    } catch (error) {
      console.error("Failed to fetch salary data:", error);
    }
  };

  // Download salary slip PDF
  const downloadSalarySlip = (monthData) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text("Employee Salary Details", 105, 15, { align: 'center' });

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toISOString().slice(0, 10)}`, 160, 25);

    // Employee Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Employee Details:", 20, 35);
    doc.setFont('helvetica', 'normal');
    doc.text(`Employee ID: ${monthData.userId || 'N/A'}`, 20, 45);
    doc.text(`Name: ${monthData.userName || 'N/A'}`, 20, 55);
    doc.text(`Email: ${monthData.userEmail || 'N/A'}`, 20, 65);
    doc.text(`Phone: ${monthData.userPhone || 'N/A'}`, 20, 75);
    // doc.text(`Joining Date: ${monthData.joiningDate || 'N/A'}`, 20, 75);
    // doc.text(`Department: ${monthData.department || 'N/A'}`, 20, 85);
    // doc.text(`Designation: ${monthData.designation || 'N/A'}`, 20, 95);

    // Salary Breakdown Table
 
    const salaryTable = [
        ["Description", "Amount"],
        ["Basic Salary", monthData.basicSalary || 'N/A'],
        ["HRA", monthData.hra || 'N/A'],
        ["Medical Fund", monthData.medicalFund || 'N/A'],
        ["Bonus", monthData.bonus || 'N/A'],
        ["Convenience", monthData.convience || 'N/A'],
        ["Incentive", monthData.incentive || 'N/A'],
        ["Total Salary", monthData.totalsalary || 'N/A'],
        ["Monthly Salary", monthData.monthlysalary || 'N/A']
    ];

    doc.autoTable({
        startY: 110,
        head: [salaryTable[0]],
        body: salaryTable.slice(1),
        theme: 'grid',
        styles: { fontSize: 10 },
    });

    // const attendanceTable = [
    //     ["Description", "Count"],
    //     ["Total Working Days", monthData.totalWorkingDays || 'N/A'],
    //     ["Total Present", monthData.totalPresent || 'N/A'],
    //     ["Total Absent", monthData.totalAbsent || 'N/A'],
    //     ["Half Days", monthData.halfDay || 'N/A']
    // ];

    // doc.autoTable({
    //     startY: doc.lastAutoTable.finalY + 10,
    //     head: [attendanceTable[0]],
    //     body: attendanceTable.slice(1),
    //     theme: 'grid',
    //     styles: { fontSize: 10 },
    // });

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text("Powered By: Abhishek Srivastav", 105, 280, { align: 'center' });

    // Save the document
    doc.save(`Salary_Slip_${monthData.month}.pdf`);
};

const handleNavigate = (data) => {
  navigate(`/admin/payroll?month=${data.month}`);
};

  // Fetch data on component mount
  useEffect(() => {
    getMonthlyData();
    getsalaryByUserId();
  }, []);


  return (
    <div>
      {/* Header */}
      <div className="font-semibold w-full h-11 bg-gray-100 border border-gray-100 rounded-lg flex items-center">
        <h3 className="text-left ml-2 text-2xl">Benefits & Pay</h3>
      </div>

      <div className="flex">
        {/* Left Panel: Salary Details */}
        <div className="w-1/4 p-3 mt-3 h-full">
          <div>
            <h1 className="text-xl font-bold">CTC</h1>
            <p className="text-gray-700">
              {salary.length > 0 ? salary[0].totalsalary : "N/A"}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">CTC Breakdown</h2>
            {salary.length > 0 ? (
              <div className="mt-2 space-y-2 flex flex-col">
                <div className="flex justify-between">
                <span className="font-semibold">Basic Salary</span>
                <span className="text-gray-700">{salary[0].basicSalary || "N/A"}</span>
                 </div>
                 <div className="flex justify-between">
                <span className="font-semibold">Medical Fund</span>
                <span className="text-gray-700">{salary[0].medicalFund || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold">Bonus</span>
                <span className="text-gray-700">{salary[0].bonus || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold">HRA</span>
                <span className="text-gray-700">{salary[0].hra || "N/A"}</span>
                </div>

                <div className="flex justify-between">
                <span className="font-semibold">Incentive</span>
                <span className="text-gray-700">{salary[0].incentive || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                <span className="font-semibold">Convenience</span>
                <span className="text-gray-700">{salary[0].convience || "N/A"}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">No salary data available.</p>
            )}
          </div>
        </div>

        {/* Right Panel: Salary History */}
        <div className="w-3/4 h-full mt-5 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold p-3">Salary History</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-3 text-gray-600 text-sm">Month</th>
                <th className="text-left px-4 py-3 text-gray-600 text-sm">Working Days</th>
                <th className="text-left px-4 py-3 text-gray-600 text-sm">Present</th>
                <th className="text-left px-4 py-3 text-gray-600 text-sm">Absent</th>
                <th className="text-left px-4 py-3 text-gray-600 text-sm">Half Day</th>
                <th className="text-center px-4 py-3 text-gray-600 text-sm">View Details</th>
                <th className="text-center px-4 py-3 text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {monthlydata.length > 0 ? (
                monthlydata.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="text-left px-4 py-3 text-sm text-gray-800">{data.month}</td>
                    <td className="text-left px-4 py-3 text-sm text-gray-800">{data.totalWorkingDays}</td>
                    <td className="text-left px-4 py-3 text-sm text-gray-800">{data.totalPresent}</td>
                    <td className="text-left px-4 py-3 text-sm text-gray-800">{data.totalAbsent}</td>
                    <td className="text-left px-4 py-3 text-sm text-gray-800">{data.halfDay || 0}</td>
                    <td className="text-center px-4 py-3">
                      <img
                        src={viewmore}
                        onClick={() => handleNavigate(data)}
                        alt="View Details"
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="text-center px-4 py-3">
                      <img 
                        src={SalarySlip} 
                        alt="Salary Slip" 
                        className="cursor-pointer"
                        onClick={() => downloadSalarySlip(salary[0])}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-600">
                    No salary history data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalaryHistory;