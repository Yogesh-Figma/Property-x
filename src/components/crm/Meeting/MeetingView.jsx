import React, { useState, useEffect } from "react";
import apiServiceInstance from "../../../Api/ApiService";
import Close from '../../../images/close.png'

const MeetingView = ({ event, onClose ,Refresh}) => {
  const [meetingData, setMeetingData] = useState(null);
  const [meetingStatus , setMeetingStatus]= useState('');
  const [locationData, setLocationData] = useState({ latitude: 0, longitude: 0 });

  console.log(event, "event");
  
  useEffect(() => {
    if (!event?.id) return; // Ensure event exists before fetching

    const fetchMeeting = async () => {
      try {
        const response = await apiServiceInstance.getMeetingbyId(event.id);
        setMeetingData(response);
         setMeetingStatus(response.status);
        console.log(response, "meetingRes");
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    };
    fetchMeeting();
  }, [event?.id]); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error: Location access is required.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  if(!event) return null;

  const handleStartNow = async (id) => {
    const formData = {
      startTime: new Date().getTime(), 
      // inLatitude: locationData.latitude,
      // inLongitude: locationData.longitude,
    };

    try {
      const response = await apiServiceInstance.updateMeetingbyid(formData, id);
      console.log("Meeting added successfully:", response);
      if (onClose) onClose();
      Refresh();
    } catch (error) {
      console.error("API Error:", error.message);
      alert(`Error saving meeting: ${error}`);
    }
  };
  const handleEndNow = async (id) => {
    const formData = {
      endTime: new Date().getTime(), 
      outLatitude: locationData.latitude,
      outLongitude: locationData.longitude,
    };

    try {
      const response = await apiServiceInstance.updateMeetingbyid(formData, id);
      console.log("Meeting added successfully:", response);
      if (onClose) onClose();
      Refresh();
    } catch (error) {
      console.error("API Error:", error.message);
      alert(`Error saving meeting: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-[40%] bg-white rounded-2xl shadow-lg flex flex-col p-6 relative">
      <img src={Close} onClick={onClose} className="w-3 h-3 absolute right-4 cursor-pointer top-2" />
      <table className="w-full text-left table-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left text-sm">
              <th className="py-3 px-4">
              {event.dleadsId ? "Duplicate Lead ID" : event.cLeadId ? "Calling Lead ID": event.leadsId ? "leadId":"leadId"}
              </th>
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Project Name</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {meetingData && (
              <tr className="border-t text-gray-700 text-sm">
                <td className="py-3 px-4 font-bold">  {meetingData.duplicateLeadsId || meetingData.callingLeadsId || meetingData.leadsId}</td>
                <td className="py-3 px-4 text-gray-500">{meetingData.leadsName || meetingData.callingLeadsName || meetingData.duplicateLeadsName}</td>
                <td className="py-3 px-4 text-blue-500  cursor-pointer">
                  {meetingData.projectName || meetingData.callingLeadsProjectName || meetingData.duplicateLeadsProjectName}
                </td>
                <td className="py-3 px-2">
                  <button
                    className="bg-red-400 text-white w-full py-2 rounded-lg"
                    onClick={() => {
                      if (meetingStatus === 'SAVED') {
                        handleStartNow(event.id);
                      } else {
                        handleEndNow(event.id);
                      }
                    }}
                  >
                 {meetingStatus=='SAVED'?'Start Now':'END Now'}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingView;
