import React, { useEffect, useState } from "react";
import "../../styles/Calldetails.css";
import apiServiceInstance from "../../Api/ApiService";
import DateFormatter from "../small-component/DateFormatter";

const CallDetails = ({ closeTooltip, callStatusId }) => {
  // State to hold the data arrays
  const [callStatusDates, setCallStatusDates] = useState([]);
  const [callStatuses, setCallStatuses] = useState([]);
  const [messages, setMessages] = useState([]);

  // State to track the current index for navigation
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const fetchCallingStatus = async () => {
      try {
        const response = await apiServiceInstance.getCallingStatusById(
          callStatusId
        );
        console.log(response);

        // Update state with the arrays from the response
        setCallStatusDates(response.nextCallDate);
        setCallStatuses(response.callStatus);
        setMessages(response.message);

        // Initialize the index to point to the second-to-last entry
        setCurrentIndex(response.nextCallDate.length - 1);
      } catch (error) {
        console.error("Error fetching calling status:", error);
      }
    };

    if (callStatusId) {
      fetchCallingStatus();
    }
  }, [callStatusId]);


  // Function to handle "Previous" button click
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Prevent index from going below 0
  };

  // Function to handle "Next" button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, callStatusDates.length - 1)
    ); // Prevent index from exceeding array length
  };
  const timestamp = callStatusDates[currentIndex] ;

  return (
    <div className="tooltip-container">
      <div className="tooltip-header">
        <h4>Updates</h4>
        <button className="tooltip-close" onClick={closeTooltip}>
          &times;
        </button>
      </div>
      <div className="tooltip-content">
        {/* Safely render the content based on the current index */}

        <p className="tooltip-date">
          <DateFormatter timestamp={timestamp} />
        </p>
        <p className="tooltip-status">
          {callStatuses[currentIndex] || "No status available"}
        </p>
        <p className="tooltip-description">
          {messages[currentIndex] || "No message available"}
        </p>
      </div>
      <div className="tooltip-footer">
        <button
          className="tooltip-btn"
          onClick={handlePrevious}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>
        <button
          className="tooltip-btn"
          onClick={handleNext}
          disabled={currentIndex >= callStatusDates.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CallDetails;
