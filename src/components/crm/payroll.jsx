import React, { useEffect ,useState} from "react";
import logo from "../../images/image 39.svg";
import apiServiceInstance from "../../Api/ApiService";
import { useLocation } from "react-router-dom";


const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const month = params.get("month");
  console.log("Month:", month);


     // Fetch payroll data
     const getPayrollData = async () => {
      try {
        const response = await apiServiceInstance.getMonthliySalaryRecordByUserId(userId);
        const februaryData = response.content.filter(item => item.month.toLowerCase() === month.toString().toLowerCase());

        setPayrollData(februaryData.length > 0 ? februaryData[0] : {}); // Set first matched record
        console.log("Payroll Data:", februaryData);
      } catch (error) {
        console.error("Failed to fetch payroll data:", error);
      }
    };

  useEffect(() => { 
    getPayrollData();
  }, []);


  return (
    <div className="">
      {/* Header Section */}
      <div className="font-semibold w-full h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center px-4 shadow-sm mt-2">
        <h3 className="text-left text-xl">Benefits & Pay</h3>
      </div>

      {/* Payslip Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full border border-gray-200 mt-4">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Payslip For The Month of {month} 2024</h2>
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer">
            <span className="text-gray-600 text-sm mr-2">This Month</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Logo and Payslip Number */}
        <div className="flex items-center justify-between border-gray-200 mb-4">
          <img src={logo} alt="Invest Mango" className="h-12" />
          <p className="text-gray-500 text-sm">Payslip #40725</p>
        </div>

        {/* Company and Employee Info */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-medium text-gray-800 ">Invest Mango</p>
            <p className="text-gray-500 text-sm">Sec-73 Noida, 201301</p>
            <p className="text-gray-500 text-sm">Uttar Pradesh</p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="font-medium text-gray-800">Employee Name</p>
              <p className="font-medium text-gray-800">Department</p>
              <p className="font-medium text-gray-800">Designation</p>
            </div>
            <div>
                <p className="text-gray-500">{payrollData.userName}</p>
              <p className="text-gray-500">{payrollData.userDepartment}</p>
              <p className="text-gray-500">{payrollData.userDesignation}</p>
            </div>
          </div>
        </div>

        {/* Earnings and Deductions */}
        <div className="flex gap-6">
          {/* Earnings Section */}
          <div className="w-1/2">
            <h3 className="text-lg font-semibold text-gray-800 ml-2">Earnings</h3>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2 border-b border-gray-100">
                <p className="text-gray-600 text-sm">Basic Salary</p>
                <p className="font-medium">{payrollData.basicSalary}</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">House Rent Allowance (H.R.A)</p>
                <p className="font-medium">{payrollData.hra}</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">Conveyance</p>
                <p className="font-medium">{payrollData.convience}</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">bonuse</p>
                <p className="font-medium">{payrollData.bonus}</p>
              </div>
              <div className="flex justify-between items-center border-gray-100   ">
                <p className="font-medium">Total Earnings</p>
                <p className="font-semibold text-lg">{payrollData.totalSalary}</p>
              </div>
            </div>
          </div>

          {/* Deductions Section */}
          <div className="w-1/2">
            <h3 className=" text-lg font-semibold text-gray-800 ml-2">Deductions</h3>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">Tax Deducted at Source (T.D.S)</p>
                <p className="font-medium">₹0</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">Provident Fund</p>
                <p className="font-medium">₹0</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">ESI</p>
                <p className="font-medium">₹0</p>
              </div>
              <div className="flex justify-between items-center mb-2 border-b border-gray-100   ">
                <p className="text-gray-600 text-sm">Loan</p>
                <p className="font-medium">₹0</p>
              </div>
              <div className="flex justify-between items-center border-gray-100   ">
                <p className="font-medium">Total Deductions</p>
                <p className="font-semibold text-lg">{payrollData.deduction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
