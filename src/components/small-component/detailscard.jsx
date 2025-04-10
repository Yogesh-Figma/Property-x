import React, { useState } from "react";
import "../../styles/detailCard.css";
import LeadDetails from "../crm/LeadDetails";
import LeadUpdate from "../crm/LeadUpdate"; 
import AddNewLead from "../crm/NewLeads/AddNewLead";
import apiServiceInstance from "../../Api/ApiService";

const DetailsCard = ({ leadId, leadreportId, duplicate ,leadreport}) => {
  const [isLeadDetailsVisible, setLeadDetailsVisible] = useState(false);
  const [isLeadReportUpdateVisible, setLeadReportUpdateVisible] = useState(false); 
  const [isLeadupdateVisible , setLeadupdateVisible] = useState(false);

  const handleCloseLeadDetails = () => setLeadDetailsVisible(false);

  const handleOpenLeadDetails = () => {
    setLeadDetailsVisible(true);
  };

  const handleLeadReportUpdate = () => {
    setLeadReportUpdateVisible(true); 
  };

  const handleCloseLeadReportUpdate = () => {
    setLeadReportUpdateVisible(false);
  };
  const handleLeadUpdate =() =>{
    setLeadupdateVisible(true);
  }
  const handleCloseLeadUpdate =()=>{
    setLeadupdateVisible(false);
  }
  const handleDelete = async () => {
    const isDelete = true;
    const confirmation = window.confirm("Are you sure you want to delete this lead?");
    if (confirmation) {
      try {
        const response = await apiServiceInstance.deleteLeads(leadId, isDelete);
        console.log("Delete response:", response.data);
        alert("Lead deleted successfully!");
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("Failed to delete the lead. Please try again.");
      }
    }
  };

  return (
    <div className="details-card">
      <div className="content">
        <div className="item">
          <div className="leadDetail">Actions</div>
        </div>
        <div className="item" onClick={handleLeadUpdate}>Update Lead </div>
        <div className="item" onClick={handleOpenLeadDetails}> Lead Details </div>
       { leadreport && <div className="item" onClick={handleLeadReportUpdate}>Lead Report Update</div>}
        <div className="item">
          <div className="deletediv" onClick={handleDelete}>
            <img
              src={require("../../images/deleteIcon.png")}
              alt="Delete"
              className="deleteCard"
              style={{ width: "15px" }}
            />
            Delete
          </div>
        </div>
      </div>

      {isLeadDetailsVisible && (
        <LeadDetails
          leadId={leadId}
          duplicate={duplicate} 
          isVisible={isLeadDetailsVisible}
          onClose={handleCloseLeadDetails}
        />
      )}

   
      {isLeadReportUpdateVisible && (
        <LeadUpdate
          leadId={leadreportId} 
          isVisible={isLeadReportUpdateVisible}
          onClose={handleCloseLeadReportUpdate}
          duplicate={duplicate} 
        />
      )}
      {isLeadupdateVisible && (
        <AddNewLead 
        leadId={leadId}
        isVisible={isLeadupdateVisible}
        onClose={handleCloseLeadUpdate}
        duplicate={duplicate}
        update={true}
        />
      )}
    </div>
  );
};

export default DetailsCard;
