import React, { useState, useEffect } from "react";
import "../../styles/feedback.css";
import DateFormatter from "../small-component/DateFormatter";
import PaginationComponent from "../small-component/PaginationComponent";
import apiServiceInstance from "../../Api/ApiService";


const Feedback = ({ isVisible, leadId, onClose, userId, duplicate }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(5);
  const [totalData, setTotalData] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = Math.max(currentPage - 1, 0); // Ensure the page is non-negative
        const size = recordPerPage;
        
        let response;
  
        if (duplicate) {
          // If duplicate is true, call the duplicate feedback API
          response = await apiServiceInstance.getFeedbackDuplicateByleadIdandUserId(
            leadId,
            userId,
            page,
            size
          );
        } else {
          // Otherwise, call the normal feedback API
          response = await apiServiceInstance.getFeedbackByleadIdandUserId(
            leadId,
            userId,
            page,
            size
          );
        }
        
        const dataList = response.content || response;
        setData(dataList);
        setTotalData(response.totalElements);
        console.log("feedback", dataList);
        
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };
  
    fetchData();
  }, [currentPage, recordPerPage, leadId, userId, duplicate]);
  
  

  if (!isVisible) return null;

  return (
    <div className="Blur-feedback-form">
      <div className="feedback-form">
        <div className='topFeedback'>
        <button onClick={onClose} className="FeedbackcloseButton" >
            <img alt="close" src={require("../../images/close.png")}/>
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Lead id</th>
                <th>Status</th>
                <th>callStatus</th>
                <th>message</th>
                <th>createdDate</th>
                <th>nextCallDate</th>
                <th>meetingDone</th>
                <th>visitDone</th>
                <th>virtualMeetingDone</th>
                <th>assignToUserName</th>
              </tr>
            </thead>
            <tbody> 
              {data.map((leads_report, index) => (
                <tr key={index}>
                  <td>{index + 1 + (currentPage - 1) * recordPerPage}</td>
                  <td>{leads_report.id}</td>
                  <td>{leads_report.status}</td>
                  <td>{leads_report.callStatus}</td>
                  <td>{leads_report.message}</td>
                  <td><DateFormatter timestamp={leads_report.createdDate}/></td>
                  <td><DateFormatter timestamp={leads_report.nextCallDate}/></td>
                  <td>{leads_report.meetingDone}</td>
                  <td>{leads_report.visitDone}</td>
                  <td>{leads_report.virtualMeetingDone}</td>
                  <td>{leads_report.assignToUserName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-wrapper" style={{ width: "1200px" }}>
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          recordPerPage={recordPerPage}
          totalItems={totalData}
          onRowsPerPageChange={(event) =>
            setRecordPerPage(parseInt(event.target.value, 10))
          }
        />
        </div>
      </div>
    </div>  
  );
};

export default Feedback;
