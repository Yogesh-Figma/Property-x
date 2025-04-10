import React, { useState, useEffect } from "react";
import ApiService from "../../../Api/ApiService";
import { User, MapPin } from "lucide-react";
import DatetoEpoch from "../../../utils/DatetoEpoch";

const AddMeeting = ({ onClose ,Refresh }) => {
  const [leadId, setLeadId] = useState("");
  const [leadtype, setLeadtype] = useState("leads");
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    location: "",
    inLatitude: "",
    inLongitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "leadId") {
      setLeadId(value);
    } 
    else if(name==="leadtype"){
       setLeadtype(value);
    } else{
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            inLatitude: position.coords.latitude,
            inLongitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e, isStartNow = false) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    if (!leadId || !leadtype) {
     alert('Please fill in all required fields before saving the meeting');
    }
    if (isStartNow) {
      dataToSend.startTime = DatetoEpoch(new Date().toISOString()); // Current time in ISO format
    } 
    // let leadField = {};
    // if (leadtype === "leads") {
    //   leadField = { leadId };
    // } else if (leadtype === "duplicate") {
    //   leadField = { dLeadId: leadId };
    // } else if (leadtype === "calling") {
    //   leadField = { cLeadId: leadId };
    // }
    try {
      const response = await ApiService.saveNewMeeting(dataToSend, leadtype, leadId);
      console.log("Meeting added successfully:", response);
      onClose();
      Refresh();
      // window.location.reload();
    } catch (error) {
      console.error("API Error:", error.message);
      alert(`Error saving Meeting: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-[35%] bg-white rounded-2xl shadow-lg flex flex-col p-6 relative">
        <h5 className="text-lg font-semibold mb-6">Add New Meeting</h5>
        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="text-gray-400" size={20} />
            <select
              className="w-full ml-2 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
              name="leadtype"
              value={leadtype}
              onChange={handleChange}
              required
            >
              <option value="leads">leads </option>
              <option value="duplicate">Duplicate </option>
              <option value="calling">Calling </option>
            </select>
          </div>

          {/* Lead ID */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <User className="text-gray-400" size={20} />
            <input
              className="w-full ml-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              name="leadId"
              value={leadId}
              onChange={handleChange}
              placeholder="Client Name (Lead ID)"
              required
            />
          </div>
          {/* Start and End Times */}
          {/* <div className="flex space-x-4">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-600">Start Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <Clock className="text-gray-400" size={20} />
                <input
                  type="datetime-local"
                  className="w-full ml-2 text-gray-700 focus:outline-none"
                  name="startTime"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium text-gray-600">End Time</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <Clock className="text-gray-400" size={20} />
                <input
                  type="datetime-local"
                  className="w-full ml-2 text-gray-700 focus:outline-none"
                  name="endTime"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div> */}
          {/* Location */}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <MapPin className="text-gray-400" size={20} />
            <input
              className="w-full ml-2 text-gray-700 placeholder-gray-400 focus:outline-none"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Choose location (Optional)"
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition"
            onClick={(e) => handleSubmit(e, true)} // Pass true for "Start Now"
          >
            Start Now
          </button>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:underline" onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              onClick={(e) => handleSubmit(e, false)} // Pass false for "Save"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeeting;
