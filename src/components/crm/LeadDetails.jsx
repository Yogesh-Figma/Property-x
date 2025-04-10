import React, { Component } from "react";
import "../../styles/LeadDetails.css";
import ApiService from "../../Api/ApiService";

class LeadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "",
      receivedOn: "",
      assignToUsers: "",
      project: "",
      phone: "",
      email: "",
      assignByName: "",
    };
  }

  componentDidMount() {
    this.fetchLeadDetails();  
  }

  componentDidUpdate(prevProps) {
    if (prevProps.leadId !== this.props.leadId) {
      this.fetchLeadDetails();
    }
  }

  fetchLeadDetails = async () => {
    const { leadId, duplicate } = this.props;
    console.log(leadId);
  
    if (leadId) {
      try {
        let response;
        if (duplicate) {
          console.log("Fetching duplicate lead details for lead ID:", leadId);
          response = await ApiService.getDuplicateLeadByLeadId(leadId); // duplicate API
          console.log('duplicate Api hit');
        } else {
          console.log("Fetching details for lead ID:", leadId);
          response = await ApiService.getLeadById(leadId); // lead API 
          console.log('lead Api hit');
        }
  
        const dataList = response.content || response;
        console.log("Leads data in LeadDetails:", dataList);
  
        this.setState({
          clientName: dataList.name,
          receivedOn: dataList.receivedOn,
          project: dataList.projectName,
        phone: dataList.phone,
          email: dataList.email,
          assignByName: dataList.assignByName,
          assignToUsers: duplicate 
            ? dataList.assignToName 
            : dataList.assignToUser.map(user => user.assignToUserNames).join(", "),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  
  
  
  
  render() {
    const {leadId} = this.props;
    const { isVisible, onClose } = this.props;
    const { clientName } = this.state;
    const {receivedOn } = this.state;
    const {assignToUsers}= this.state;
    const {project} = this.state;
    const {phone} =this.state;
    const {email} = this.state;
    const {assignByName} = this.state;
    if (!isVisible) return null;
     
    return (
      <div className="Blur-leadDetail">
        <div className="lead-details-container">
          <button onClick={onClose} className="closeButton">
            <img  src={require("../../images/close.png")} alt="close" className="close" />
          </button>

          {/* Header Section */}
          <div className="header">
            <div className="left-header">
              <h2>Lead Details</h2>
            </div>
          </div>

          {/* Client Info Section */}
          <div className="client-info">
           
            <p>
              <img  src={require("../../images/received.png")} alt="received" className="ClientPhoto" />
             {/* {receivedOn} */}
             { leadId}
            </p>
            <h3>
              <img  src={require("../../images/Client_name.png")} alt="name" className="ClientPhoto" />
              {clientName || "Client Name"} 
            </h3>

            <div className="assigned-info">
              <div className="assigned-to">
                <span>Assigned to:</span>
                <span className="highlight"> ~{assignToUsers}</span>
              </div>
              <div className="call-back">
                <span>Call Back - Interested in buying </span>
                <span className="highlight"> @ 2BHK Ace Divino</span>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="contact-info">
            <div className="contact-item">
              <span>Project</span>{" "}
              <span className="highlight">
              {project}
              {/* <img  src={require("../../images/edit.png")} className="edited" /> */}
              </span>
            </div>
            <div className="ColumnFlex">
              <div className="contact-item">
                <span>
                  <img  src={require("../../images/phone.png")}/> Contact Number:
                </span>{" "}
                <span className="highlight">
                  {phone}
                   {/* <img  src={require("../../images/edit.png")} className="edited" /> */}
                </span>
              </div>
              <div className="contact-item Client-email">
                <span>
                  <img  src={require("../../images/phone.png")}/> Client Email:
                </span>{" "}
                <span className="highlight">
                  {email} 
                  {/* <img  src={require("../../images/edit.png")}className="edited" /> */}
                </span>
              </div>
            </div>
            <div className="assigned-by">
              <span>Assigned by:</span>{" "}
              <span className="highlight">{assignByName}</span>
            </div>
          </div>

          {/* Share Lead Section */}
          <div className="share-lead">
            <button className="share-btn">Share this Lead</button>
            <button className="delete-btn">
              <img  src={require("../../images/deleteIcon.png")} alt="delete" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LeadDetails;
