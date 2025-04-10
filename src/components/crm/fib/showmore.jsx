import React, { useEffect, useState, useCallback } from "react";
import fibedit from "../../../images/editfib.svg";
import closExcel from "../../../images/CloseExcel.png";
import apiServiceInstance from "../../../Api/ApiService";
import DateFormatter from "../../small-component/DateFormatter";
import Swal from "sweetalert2";

const Showmore = ({ id, edit, onClose }) => {
  const [fibData, setFibData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(edit);
  const [selectedImage, setSelectedImage] = useState(null);
  const Rolename = localStorage.getItem("rolename");

  const fetchData = useCallback(async () => {
    try {
      const response = await apiServiceInstance.getFibDataById(id);
      setFibData(response);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch data. Please try again.",
      });
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFibData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiServiceInstance.updatefibById(id, fibData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Data updated successfully.",
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await apiServiceInstance.approveFibData(id, true);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Approved successfully.",
      });
      onClose();
    } catch (error) {
      console.error(error, 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderField = (label, field, type = "text") => (
    <div className="flex gap-4">
      <span className="text-gray-500 w-34">{label}:</span>
      {isEditing ? (
        <input
          type={type}
          value={type === "date" ? formatDateForInput(fibData[field]) : (fibData[field] || "")}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <span className="text-gray-800">
          {field === "clientDob" ? (
            <DateFormatter timestamp={fibData[field]} date={true} />
          ) : (
            fibData[field]
          )}
        </span>
      )}
    </div>
  );

  // Image preview modal
  const ImagePreviewModal = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[99999]">
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <span className="text-2xl">×</span>
        </button>
        <img
          src={imageUrl}
          alt="Document preview"
          className="max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="mb-5 mt-3">
      <h2 className="text-base font-semibold mb-4">Documents</h2>
      <div className="grid grid-cols-2 gap-4">
        {fibData?.fibDocs?.map((doc, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedImage(doc.imageUrl)}
          >
            <div className="aspect-w-16 aspect-h-9 mb-2">
              <img
                src={doc.imageUrl}
                alt={doc.name}
                className="object-cover rounded-lg w-full h-48"
              />
            </div>
            <p className="text-sm font-medium text-gray-700 capitalize">{doc.name}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!fibData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-[40%] h-[90%] bg-white rounded-lg shadow-lg flex flex-col relative">
        <div className="flex justify-between p-2">
          <div className="flex gap-2">
            <img src={fibedit} alt="close" className="flex-start ml-1" />
            <h5 className="text-lg font-semibold">FIB Report</h5>
          </div>
          <img
            src={closExcel}
            alt="close"
            className="flex-end cursor-pointer w-7 h-7"
            onClick={onClose}
          />
        </div>
        
        <div className="bg-gray-100 px-6 py-2 flex items-center border-b">
          <img
            src={fibData.userProfile}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <span className="block text-lg font-semibold text-left">
              {fibData.userName}
            </span>
            <span className="text-sm text-gray-500 text-left mr-20">
              {fibData.teamHead}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 text-left">
          <div className="mb-3">
            {/* {renderField("Project", "projectName")} */}
            <div>
            <span className="text-gray-400 text-sm">Project</span>
            <span className="ml-2 text-gray-800 font-medium">
                  {fibData.projectName}
                </span>
            </div>
            <div>
            <span className="text-gray-400 text-sm">LeadId:</span>
            <span className="ml-2 text-gray-800 font-medium">
                  {fibData.leadsId}
                </span>
            </div>
            <div>
            <span className="text-gray-400 text-sm">Approved Date</span>
            <span className="ml-2 text-gray-800 font-medium">
                  <DateFormatter timestamp={fibData.approvedDate}/>
                </span>
            </div>
            <div className="mt-1">
              <span className="text-gray-400 text-sm">Booking Date:</span>
              {isEditing ? (
                <input
                  type="date"
                  value={formatDateForInput(fibData.bookingDate)}
                  onChange={(e) => handleInputChange("bookingDate", e.target.value)}
                  className="ml-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <span className="ml-2 text-gray-800 font-medium">
                  <DateFormatter timestamp={fibData.bookingDate} />
                </span>
              )}
            </div>
          </div>

          {/* Client Details Section */}
          <div className="mb-8">
            <h2 className="text-base mb-2 font-semibold">Client Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Name", "clientName")}
                {renderField("D.O.B", "clientDob", "date")}
              </div>
              <div className="bg-gray-200 h-[1px] w-full"></div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Email", "clientEmail", "email")}
                {renderField("Phone No.", "clientPhone", "tel")}
              </div>
              <div className="bg-gray-200 h-[1px] w-full"></div>

              {renderField("Alt. Number", "clientPhone", "tel")}
            </div>
          </div>

         

          {/* Property Details Section */}
          <div className="mb-8">
            <h2 className="text-base font-semibold mb-4">Property Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Type", "flatType")}
                {renderField("Unit No.", "unitNo")}
              </div>
              <hr className="bg-gray-200 h-[1px] w-full" />

              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Size", "flatSize")}
                {renderField("10% Status", "tenPercentStatus")}
              </div>
              <hr className="bg-gray-200 h-[1px] w-full" />

              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Booking Amount", "bookingAmount")}
                {renderField("Flat Cost", "flatCost")}
              </div>
              <hr className="bg-gray-200 h-[1px] w-full" />

              {renderField(" Payment Plan", "paymentPlan")}
            </div>
          </div>

          {/* Commission & Pay Section */}
          <div>
            <h2 className="text-base font-semibold mb-4">Commission & Pay</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Disbursement Status", "disbursementStatus")}
                {renderField("Cheque Details", "chequeDetails")}
              </div>
              <hr className="bg-gray-200 h-[1px] w-full" />

              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Broker Commission", "brokerCommission")}
                {renderField("Credit Note", "creditNote")}
              </div>
              <hr className="bg-gray-200 h-[1px] w-full" />

              <div className="grid grid-cols-2 gap-6 text-sm">
                {renderField("Referral Amount", "refferalAmount")}
                {renderField("Revenue Amount", "revenue")}
              </div>
            </div>
          </div>
           {/* Documents Section */}
           {renderDocuments()}

          {(Rolename == 'ADMIN' || edit )&& (
            <div className="flex justify-end mt-4">
              <button
                className={`${
                  isEditing ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-700 hover:bg-green-600'
                } text-white px-6 py-2 rounded-lg font-medium`}
                onClick={isEditing ? handleSave : handleApprove}
              >
                {isEditing ? 'Save' : 'Approve'}
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Showmore;