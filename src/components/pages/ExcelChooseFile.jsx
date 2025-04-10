import React, { useState } from "react";
import "../../styles/ExcelChooseFile.css";
import AddNewExcel from "../crm/NewLeads/AddNewExcel";

const ExcelChooseFile = ({ isVisible, onClose,Callstatus ,refreshData}) => {
  const [file, setFile] = useState(null);
  const [addNewExcel, setAddNewExcel] = useState(false);

  if (!isVisible) return null;

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setAddNewExcel(true); 
    }
  };

  const handleAddNewExcelClose = () => {
    setAddNewExcel(false); 
    onClose(); 
  };

  return (
    <>
    <div className="ExcelChoose">
      <div className="upload-leads-container">
        <div className="upload-header">
          <h2>Upload Leads</h2>
          <button onClick={onClose} className="close-button">
            ✖
          </button>
        </div>
        <div className="upload-area">
          <div className="upload-box">
            <div className="upload-icon">
              <img src={require("../../images/cloud2.png")} alt="cloud icon" />
            </div>
            <p className="upload-text">
              Browse and choose the files you want to upload from your computer
            </p>
            <label className="upload-button">
              <img src={require("../../images/CTA.jpg")}alt="plus icon" />
              <input
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
      </div>
      
      {file && addNewExcel && (
                <AddNewExcel file={file} onClose={handleAddNewExcelClose} CallStatus={Callstatus}  refreshData={refreshData}/>
            )}
    </>
    
  );
};

export default ExcelChooseFile;
