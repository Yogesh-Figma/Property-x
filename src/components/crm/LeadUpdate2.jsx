import React, { useState, useEffect } from "react";
import apiServiceInstance from "../../Api/ApiService";
import Swal from "sweetalert2";
import DatetoEpoch from "../../utils/DatetoEpoch";
import Fibform from "../crm/fib/Fibform";
import { toast } from "react-toastify";

const LeadUpdate2 = ({
  isVisible,
  onClose,
  leadReportId,
  duplicate,
  onLeadUpdate,
  callDetail,
  position,
}) => {
  const [formData, setFormData] = useState({
    id: leadReportId,
    leadsStatus: "",
    callStatus: callDetail ? [""] : "",
    message: callDetail ? [""] : "",
    nextCallDate: callDetail ? [""] : "",
    MeetingDate: "",
    location: "",
    message: "",
  });

  const [callStatusOptions, setCallStatusOptions] = useState([]);
  const [showfibForm, setShowfibForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [leadId, setLeadId] = useState("");
  const rolename = localStorage.getItem("rolename");

  useEffect(() => {
    if (isVisible) {
      setFormData({
        id: leadReportId,
        leadsStatus: "",
        callStatus: "",
        message: "",
        nextCallDate: "",
        location:""
      });
      setErrors({});
    }
  }, [leadReportId, isVisible]);

  console.log("Lead Report Id:", leadReportId);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.leadsStatus)
      newErrors.leadsStatus = "Lead status is required.";
    if (!formData.callStatus) newErrors.callStatus = "Call status is required.";
    if (!formData.message) newErrors.message = "Notes are required.";
    if (!formData.nextCallDate) {
      newErrors.nextCallDate =
        formData.callStatus === "Meeting Planned"
          ? "Meeting date is required."
          : "Next call date is required.";
    }
    if (formData.callStatus === "Meeting Planned") {
      if (!formData.location) newErrors.location = "Location is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setFormData((prevData) => ({ ...prevData, leadsStatus: selectedStatus }));

    try {
      const response = await apiServiceInstance.getCallStatus(selectedStatus);
      setCallStatusOptions(response.content || response || []);
    } catch (error) {
      console.error("Error fetching call status options:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch call status options. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "nextCallDate") {
      const epochValue = DatetoEpoch(value);
      setFormData((prev) => ({
        ...prev,
        nextCallDate: callDetail ? [epochValue] : epochValue,
        nextCallDateDisplay: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: callDetail ? [value] : value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = callDetail
        ? rolename === "ADMIN"
          ? await apiServiceInstance.updateCallStatusByAdmin(
              leadReportId,
              formData
            )
          : await apiServiceInstance.updateCallStatus(leadReportId, formData)
        : duplicate
        ? rolename === "ADMIN"
          ? await apiServiceInstance.UpdateDuplicateLeadReportByIdAdmin(
              formData
            )
          : await apiServiceInstance.UpdateDuplicateLeadReportById(formData)
        : rolename === "ADMIN"
        ? await apiServiceInstance.UpdateLeadReportByIdAdmin(formData)
        : await apiServiceInstance.UpdateLeadReportById(formData);

      if (response) {
        if (rolename === "USER" && formData.leadsStatus === "SUCCESS") {
          {
            !callDetail && setLeadId(response.leads.id);
          }
          console.log("Lead Id:", leadId);
          setShowfibForm(true);
        } else {
          toast.success("lead updated successfully!");
          onClose();
          onLeadUpdate();
        }
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(`Failed to Update Lead. ${errorMessage}`);
      console.error("Error updating lead:", error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {showfibForm ? (
        <Fibform
          leadId={callDetail ? leadReportId : leadId}
          onClose={() => {
            setShowfibForm(false);
            onClose();
            onLeadUpdate();
          }}
          duplicate={duplicate}
          callDetail={callDetail}
          refreshData={onLeadUpdate}
        />
      ) : (
        <div
          className="fixed bg-gray-100 rounded-lg shadow-lg p-4 w-72 z-50 border border-gray-200"
          style={{
            top: position?.top || "50%",
            left: position?.left || "20%",
            transform: !position ? "translate(-50%, -50%)" : "none",
          }}
        >
          <h2 className="text-sm font-medium text-gray-700">Change Status</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <select
                value={formData.leadsStatus}
                onChange={handleStatusChange}
                aria-label="Select Lead Status"
                className={`w-full px-2 py-1.5 text-sm rounded border ${
                  errors.leadsStatus ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select Status</option>
                <option value="OPEN">OPEN</option>
                <option value="DECLINE">DECLINE</option>
                <option value="SUCCESS">SUCCESS</option>
              </select>
              {errors.leadsStatus && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.leadsStatus}
                </p>
              )}
            </div>

            <div>
              <select
                value={formData.callStatus}
                onChange={handleInputChange}
                aria-label="Select Call Status"
                name="callStatus"
                className={`w-full px-2 py-1.5 text-sm rounded border ${
                  errors.callStatus ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select Call Status</option>
                {callStatusOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.callStatus && (
                <p className="text-red-500 text-xs mt-1">{errors.callStatus}</p>
              )}
            </div>
            <div>
              <input
                type="date"
                name="nextCallDate"
                value={formData.nextCallDateDisplay || ""}
                onChange={handleInputChange}
                aria-label="Next Call Date"
                className={`w-full px-2 py-1.5 text-sm rounded border ${
                  errors.nextCallDate ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.nextCallDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nextCallDate}
                </p>
              )}
            </div>
            {formData.callStatus === "MEETING PLANNED" && (
              <>
                <div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    aria-label="Location"
                    placeholder="Enter Meeting Location"
                    className={`w-full px-2 py-1.5 text-sm rounded border ${
                      errors.location ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="text-sm">Review Message</label>
                  <textarea
                    name="reviewMessage"
                    value={formData.reviewMessage}
                    onChange={handleInputChange}
                    aria-label="Review Message"
                    placeholder="Enter Review Message"
                    className={`w-full px-2 py-1.5 text-sm rounded border ${
                      errors.reviewMessage
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.reviewMessage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.reviewMessage}
                    </p>
                  )}
                </div> */}
              </>
            )}

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                aria-label="Message"
                placeholder="Message"
                className={`w-full px-2 py-1.5 text-sm rounded border ${
                  errors.message ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LeadUpdate2;
