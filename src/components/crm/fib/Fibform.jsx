import React, { useState ,useEffect} from "react";
import { ChevronLeft } from "lucide-react";
import apiServiceInstance from "../../../Api/ApiService";
import Swal from "sweetalert2";

const ClientDetails = ({ onNext, formData, handleInputChange }) => {
  return (
    <div className="space-y-6 flex-1 mr-2">
      <div className="flex-1 overflow-y-auto h-[50vh]">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Name
            </label>
            <input
              type="text"
              name="clientName"
              required
              value={formData.clientName||""}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                required
                name="clientDob"
                value={
                  formData.clientDob
                    ? new Date(formData.clientDob).toISOString().split("T")[0]
                    : ""
                }                
                onChange={handleInputChange}
                placeholder="Select Date"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
            Email
          </label>
          <input
            type="email"
            name="clientEmail"
            required
            value={formData.clientEmail}
            onChange={handleInputChange}
            placeholder="Client Email"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Phone
            </label>
            <div className="relative">
              <select
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border-0 text-gray-500 appearance-none outline-none pr-4"
                aria-label="Country Code"
              >
                <option>🇮🇳 +91</option>
              </select>
              <input
                 type="tel"
                 pattern="[0-9]{10}"
                 minLength="10"
                 maxLength="10"
                name="clientPhone"
                required
                value={formData.clientPhone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full py-2 pl-24 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Alternate Phone no.
            </label>
            <div className="relative">
              <select
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent border-0 text-gray-500 appearance-none outline-none pr-4"
                aria-label="Country Code"
              >
                <option>🇮🇳 +91</option>
              </select>
              <input
                 type="tel"
                 pattern="[0-9]{10}"
                 minLength="10"
                 maxLength="10"
                name="alternate"
                value={formData.alternate}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full py-2 pl-24 pr-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              required
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Date of Booking
            </label>
            <div className="relative">
              <input
                type="date"
                name="bookingDate"
                required
                value={
                  formData.bookingDate
                    ? new Date(formData.bookingDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                placeholder="Select Date"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <h4 className="mt-4 text-md">Docs</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Adhar Card Number
            </label>
            <input
              type="text"
              name="clientAadharNo"
              value={formData.clientAadharNo}
              onChange={handleInputChange}
              placeholder="Enter"
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Aadhaar Card Photo
            </label>
            <div className="relative">
              <input
                type="file"
                name="adharPhoto"
                accept="image/*"
                onChange={(e) => handleInputChange(e, "Aadhar")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-grey-50 file:text-grey-700 hover:file:bg-white-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Pan Card Number
            </label>
            <input
              type="text"
              name="clientPanNo"
              value={formData.clientPanNo}
              onChange={handleInputChange}
              placeholder="Enter"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Pan Card photo
            </label>
            <input
              type="file"
              name="panPhoto"
              onChange={(e) => handleInputChange(e, "pan")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-grey-50 file:text-grey-700 hover:file:bg-white-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 mt-4 rounded-2xl bg-blue-400 text-white hover:bg-blue-600 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

const EmployeeDetails = ({ onNext, formData, handleInputChange }) => {
  return (
    <div className="space-y-6 flex-1 mr-2">
      <div className="flex-1 overflow-y-auto h-[50vh]">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              required
              value={formData.employeeName}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Team Head
            </label>
            <input
              type="text"
              name="teamHead"
              value={formData.teamHead}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Source of Lead
            </label>
            <input
              type="text"
              name="sourceOfLead"
              value={formData.sourceOfLead}
              onChange={handleInputChange}
              placeholder="Enter Source"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-6 py-2 mt-4 rounded-2xl bg-blue-400 text-white hover:bg-blue-600 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

const ProjectDetails = ({ onNext, formData, handleInputChange }) => {
  return (
    <div className="space-y-6 flex-1 mr-2">
      <div className="flex-1 overflow-y-auto h-[50vh]">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Types of Project
            </label>
            <input
              type="text"
              name="flatType"
              value={formData.flatType}
              required
              onChange={handleInputChange}
              placeholder=" Select from below"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-grey-500 outline-none"
            />
            <button className="absolute right-3 top-3">
              <div className="flex flex-col space-y-1">
                <div className="w-4 h-0.5 bg-gray-400"></div>
                <div className="w-4 h-0.5 bg-gray-400"></div>
                <div className="w-4 h-0.5 bg-gray-400"></div>
              </div>
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Size of Flat
            </label>
            <input
              type="number"
              name="flatSize"
              value={formData.flatSize}
              onChange={handleInputChange}
              placeholder="Size in Sq/ft"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Unit no.
            </label>
            <input
              type="number"
              name="unitNo"
              required
              placeholder="Enter"
              value={formData.unitNo}
              onChange={handleInputChange}
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Booking Amount
            </label>
            <input
              type="number"
              name="bookingAmount"
              required
              value={formData.bookingAmount}
              onChange={handleInputChange}
              placeholder="(in INR)"
            inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"     
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Flat Cost
            </label>
            <input
              type="number"
              name="flatCost"
              required
              value={formData.flatCost}
              onChange={handleInputChange}
              placeholder="(in INR)"
              inputMode="numeric"
              pattern="[0-9]*"
              min="0"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"          
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
             payment plan
            </label>
            <input
              type="text"
              name="paymentPlan"
              value={formData.paymentPlan}
              onChange={handleInputChange}
              placeholder="Enter"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-grey-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              10% status
            </label>
            <input
              type="text"
              name="tenPercentStatus"
              value={formData.tenPercentStatus}
              onChange={handleInputChange}
              placeholder="Enter"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2 mt-4 rounded-2xl bg-blue-400 text-white hover:bg-blue-600 transition-colors"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

const CommissionDetails = ({ formData, handleInputChange, handleSubmit ,setFormData}) => {
  useEffect(() => {
    const calculatedRevenue = (Number(formData.passback) || 0) - (Number(formData.refferalAmount) || 0);
    setFormData((prevData) => ({ ...prevData, revenue: calculatedRevenue }));
  }, [formData.passback, formData.refferalAmount, setFormData]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className="space-y-6 flex-1 mr-2">
      <div className="flex-1 overflow-y-auto h-[50vh]">
      
      
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Cheque/ RTGS Details
            </label>
            <input
              type="text"
              name="chequeDetails"
              value={formData.chequeDetails}
              onChange={handleInputChange}
              placeholder="Enter details"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Cheque Image
            </label>
            <input
              type="file"
              name="chequeImage"
              onChange={(e) => handleInputChange(e, "cheque")}
              placeholder="choose"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-grey-50 file:text-grey-700 hover:file:bg-white-100 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Referral Amount
            </label>
            <input
              type="number"
              name="refferalAmount"
              value={formData.refferalAmount}
              onChange={handleInputChange}
              placeholder="in INR "
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Passback/cashback
            </label>
            <input
              type="text"
              name="passback"
              value={formData.passback}
              onChange={handleInputChange}
              placeholder="in INR"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
               Net Revenue Amount
            </label>
            <input
              type="number"
              name="revenue"
              value={formData.revenue}
              readOnly
              placeholder="in INR"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Broker Commission
            </label>
            <input
              type="number"
              name="brokerCommission"
              required
              value={formData.brokerCommission}
              onChange={handleInputChange}
              placeholder="in INR"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
        </div>
        <div className="grid grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Source of Funding
            </label>
            <select
              name="sourceOfFunding"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.sourceOfFunding}
              onChange={handleSelectChange}
            >
              <option value="">Select </option>
              <option value="true">Bank loan</option>
              <option value="SelfFunding">Self funding</option>
            </select>
          </div>
          {formData.sourceOfFunding === 'true' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">Disbursement Status</label>
              <select
                name="disbursementStatus"
                value={formData.disbursementStatus}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select Status</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          )}
          
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 mt-4 rounded-2xl bg-blue-400 text-white hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Fibform = ({ leadId, onClose ,duplicate , callDetail ,refreshData }) => {
  const [currentStep, setCurrentStep] = useState("client");
  const [prefill, setPrefill] = useState(false);

  const initialFormState = { 
    leadsId: !duplicate && !callDetail ? leadId : '',
    duplicateLeadsId: duplicate ? leadId : '',
    callLeadsId: callDetail ? leadId : '',

    userId: localStorage.getItem("userId"),

    // Client Details
    clientName: "",
    clientDob: "",
    clientEmail: "",
    clientPhone: "",
    alternate: "",
    projectName: "",
    bookingDate: "",
    clientAadharNo: "",
    fibDocs: [],
    clientPanNo: "",

    // Employee Details
    employeeName: "",
    teamHead: "",
    sourceOfLead: "",

    // Project Details
    flatType: "",
    flatSize: "",
    unitNo: "",
    bookingAmount: "",
    flatCost: "",
    paymentPlan: "",
    tenPercentStatus: "",

    // Commission Details
    disbursementStatus: "",
    passback: "",
    brokerCommission: "",
    refferalAmount: "",
    chequeDetails: "",
    revenue: "",
    sourceOfFunding:""};
  const [formData, setFormData] = useState({initialFormState });

  const steps = [
    { id: "client", label: "Client Details" },
    { id: "employee", label: "Employee Details" },
    { id: "project", label: "Project Details" },
    { id: "commission", label: "Commission & Pay" },
  ];

  const handleNext = () => {
    switch (currentStep) {
      case "client":
        if (!formData.clientName || !formData.clientDob || !formData.clientEmail || !formData.clientAadharNo) {
          alert("Please fill in all required fields!");
          return; // Stop proceeding if validation fails
        }
        setCurrentStep("employee");
        break;
      case "employee":
        if (!formData.employeeName || !formData.teamHead || !formData.sourceOfLead) {
          alert("Please fill in all required fields!");
          return; // Stop proceeding if validation fails
        } 
        setCurrentStep("project");
        break;
      case "project":
        if (!formData.flatType || !formData.flatSize || !formData.unitNo || !formData.bookingAmount) {
          alert("Please fill in all required fields!");
          return; // Stop proceeding if validation fails
        } 
        setCurrentStep("commission");
        break;
      case "commission":
        // Handle form submission
        if (  !formData.refferalAmount ) {
          alert("Please fill in all required fields!");
          return; // Stop proceeding if validation fails
        } 
        break;
      default:
        break;
    }
  };
  const handleInputChange = async (e, docType) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      try {
        const file = files[0];
        if (!file) return;
        const Foldername = "fib";

        // Create FormData object for multipart/form-data
        const formDataObj = new FormData();
        formDataObj.append("file", file);

        // Upload file to S3 through API
        const response = await apiServiceInstance.uploadFile(
          formDataObj,
          Foldername
        );
        console.log("Upload response:", response);

        if (response && response.message) {
          setFormData((prev) => ({
            ...prev,
            fibDocs: [
              ...prev.fibDocs.filter((doc) => doc.name !== docType),
              { name: docType, imageUrl: response.message },
            ],
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure this is at the very top
  
    try {
      const formDataWithTimestamps = {
        ...formData,
        clientDob: new Date(formData.clientDob).getTime(),
        bookingDate: new Date(formData.bookingDate).getTime(),
      };
  
      // Make API call
      const response = await apiServiceInstance.saveFibData(formDataWithTimestamps);
      console.log("Form submitted successfully:", response);
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response?.message || "Fib form submitted successfully!",
        confirmButtonText: "OK",
      });
  
      // Reset form state if applicable
      setFormData({}); // Assuming `setFormData` exists
  
      // Handle success (e.g., closing modal, redirection)
      onClose();
      refreshData();
    } catch (error) {
      console.error("Error submitting form:", error);
  
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || error.message || "Something went wrong. Please try again!",
      });
    }
  };
  

  const canAccessStep = (stepId) => {
    const stepOrder = ["client", "employee", "project", "commission"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const targetIndex = stepOrder.indexOf(stepId);
    return targetIndex <= currentIndex;
  };

  const handleStepClick = (stepId) => {
    if (canAccessStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "client":
        return (
          <ClientDetails
            onNext={handleNext}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "employee":
        return (
          <EmployeeDetails
            onNext={handleNext}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "project":
        return (
          <ProjectDetails
            onNext={handleNext}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case "commission":
        return (
          <CommissionDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (prefill && leadId) {
      fetchDataForLead();
    } else {
      setFormData(initialFormState); // Reset form if unchecked
    }
  }, [prefill, leadId]);
  const fetchDataForLead = async () => {
    try {
      // setLoading(true);
      let response;
      if (callDetail) {
        response = await apiServiceInstance.getCallingById(leadId);
      } else if (duplicate) {
        console.log('shuih')
        response = await apiServiceInstance.getDuplicateLeadByid(leadId);
      } else {
        response = await apiServiceInstance.getLeadById(leadId);
      }
      
     console.log(response,"responseleadssss")
     const data = response;
      if (data) {
        setFormData((prev) => ({
          ...prev,
          clientName: data.name || "",
          clientEmail: data.email || "",
          clientPhone: data.phone || "",
          projectName: data.projectName || "",
          sourceOfLead: data.source || "",
        //  employeeName : data.assignToUser[0]?.assignToUserNames[0] || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching lead details:", error);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-[70%] h-[90%] bg-white rounded-lg shadow-lg flex flex-col relative">
        <div className="flex-shrink-0">
          <div className="flex  w-full gap-4 p-2">
            <button
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              onClick={onClose}
            >
              <ChevronLeft
                className="w-5 h-5 text-gray-600"
                onClick={onClose}
              />
            </button>
            <h1 className="text-lg font-semibold mt-1">
              First Information Booking
            </h1>
          </div>
          
        </div>
        <div className="p-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
              checked={prefill}
              onChange={() => setPrefill(!prefill)}
            />
            <span className="text-gray-700">Prefill form with lead data</span>
          </label>
        </div>
        <div className="flex w-full h-[70vh] max-w-6xl mx-auto gap-8 ">
          <div className="space-y-4 gap-4 ml-5">
            {steps.map((step) => {
              const isAccessible = canAccessStep(step.id);
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 ${
                    step.id === currentStep
                      ? "text-blue-600"
                      : isAccessible
                      ? "text-gray-600 cursor-pointer hover:text-blue-400"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => handleStepClick(step.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${
                      step.id === currentStep
                        ? "border-blue-600"
                        : isAccessible
                        ? "border-gray-400"
                        : "border-gray-200"
                    }`}
                  >
                    {step.id === currentStep && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                    )}
                  </div>
                  <span
                    className={`${
                      step.id === currentStep ? "font-medium" : ""
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Fibform;
