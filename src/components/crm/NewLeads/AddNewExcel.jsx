import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import "../../../styles/ExcelNewLead.css";
import ApiService from "../../../Api/ApiService";
import Swal from "sweetalert2";

const AddNewExcel = ({ file, onClose, CallStatus, refreshData}) => {
  const [originalHeaders, setOriginalHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [columnSelections, setColumnSelections] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [fileName, setFileName] = useState(file ? file.name : "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (file) {
      loadFile(file);
    }
  }, [file]);

  const loadFile = (selectedFile) => {
    const reader = new FileReader();
    setFileName(selectedFile.name);

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Separate headers and data
      const headers = parsedData[0];
      const dataWithoutHeaders = parsedData.slice(1);

      setOriginalHeaders(headers);
      setData(dataWithoutHeaders);

      // Initialize column selections with empty values
      const initialSelections = predefinedHeaders.map((header) => ({
        header: "",
        index: null,
      }));
      setColumnSelections(initialSelections);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      loadFile(newFile);
    }
  };

  const handleColumnSelectionChange = (rowIndex, value) => {
    const newSelections = [...columnSelections];

    // Check if this header is already selected
    const existingSelectionIndex = newSelections.findIndex(
      (selection) => selection.header === value
    );

    // If the header is already selected, clear its previous selection
    if (existingSelectionIndex !== -1) {
      newSelections[existingSelectionIndex] = { header: "", index: null };
    }

    // Update the current selection
    newSelections[rowIndex] = {
      header: value,
      index: originalHeaders.indexOf(value),
    };

    setColumnSelections(newSelections);
  };

  useEffect(() => {
    filterAndMapData();
  }, [columnSelections, data, originalHeaders]);

  const filterAndMapData = () => {
    if (data.length === 0 || originalHeaders.length === 0) return;

    // Map data for predefined headers
    const mapped = data.map((row) =>
      predefinedHeaders.map((header, index) => {
        const columnIndex = columnSelections[index]?.index;
        
        return columnIndex !== null && columnIndex !== undefined
          ? row[columnIndex] || "" // Get the value or leave blank
          : ""; // Leave blank for unmapped columns
      })
    );

    setMappedData(mapped);
    setTotalLeads(mapped.length);
  };

  const generateExcelFile = (data) => {
    // Get selected headers
    const selectedHeaders = columnSelections
      .filter((selection) => selection.header)
      .map((selection) => selection.header);  

    const worksheet = XLSX.utils.aoa_to_sheet([selectedHeaders, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FilteredData");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });

    const blob = new Blob([s2ab(wbout)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return blob;
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const uploadExcelFile = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "filtered_data.xlsx");

    try {
      const response = CallStatus
        ? await ApiService.CallStatusExcelUpload(formData)
        : await ApiService.leadExcelUpload(formData);

      console.log("Lead added successfully:", response);
      onClose();
      refreshData();
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Lead added successfully",
          text: "The new lead has been added.",
          confirmButtonText: "OK",
        });
      }, 0);
    } catch (error) {
      console.error("Error adding new lead:", error);
      onClose();
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "There was an error adding the lead. Please try again.",
          confirmButtonText: "OK",
        });
      }, 0);
    }
  };

  const handleApiUpload = () => {
    const blob = generateExcelFile(mappedData);
    uploadExcelFile(blob);
  };
  const predefinedHeaders = ["Name", "Contact", "Source", "Project" ,"Email"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-[9999] ">
      <div className="ExcelDiv">
        <div className="header">
          <h6>Add New Leads</h6>
          <button onClick={onClose} className="closeButtonExcel">
            <img alt="close" src={require("../../../images/CloseExcel.png")} />
          </button>
        </div>
        <div className="file-section">
          <div className="file-info">
            <img
              src={require("../../../images/CSV.png")}
              alt="CSV Icon"
              className="csv-icon"
            />
            <span className="file-name">{fileName}</span>
          </div>
          <button
            className="change-file-button"
            onClick={() => fileInputRef.current.click()}
          >
            Change File
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="dropdowns">
          {predefinedHeaders.map((header, index) => (
            <div key={index} className="flex dropdown-div1">
              <label className="dropdown-label">{header}</label>
              <select
                value={columnSelections[index]?.header || ""}
                onChange={(e) =>
                  handleColumnSelectionChange(index, e.target.value)
                }
                className="AddExcelDropdown"
              >
                <option value="">Select Column</option>
                {originalHeaders.map((fileHeader) => (
                  <option
                    key={fileHeader}
                    value={fileHeader}
                    disabled={columnSelections.some(
                      (sel) => sel.header === fileHeader && sel.index !== index
                    )}
                  >
                    {fileHeader}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="total-leads">
            <h6>Total Leads</h6>
            <div className="count">{totalLeads}</div>
            <button className="SaveNewButton" onClick={handleApiUpload}>
              Save Leads
            </button>
          </div>
        </div>

        {predefinedHeaders.length > 0 && (
          <div className="tableSection">
            <table className="table">
              <thead>
                <tr>
                  {predefinedHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mappedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewExcel;
