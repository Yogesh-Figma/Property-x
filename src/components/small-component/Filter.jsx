import React, { useState } from "react";
import DownArrow from '../../images/downArrow.svg';
import UpArrow from '../../images/UpArrow.svg';

const Filter = () => {
  const [openSections, setOpenSections] = useState({
    byAgent: false,
    createdDate: false,
    assignDate: false,
    assignBy: false,
    assignFrequency: false,
    updatedDate: false,
  });

  const [createdDateRange, setCreatedDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const handleDateChange = (e, key) => {
    setCreatedDateRange((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "183px",
        right: "4px",
        zIndex: "1000",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#333",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Filters</span>
        <div>
          <button
            style={{
              border: "none",
              background: "none",
              color: "#ff4d4f",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            Remove all
          </button>
          <button
            style={{
              border: "none",
              background: "none",
              color: "#1890ff",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      </div>
      {[
        { label: "By Agent", key: "byAgent" },
        { label: "Created Date", key: "createdDate" },
        { label: "Assign Date", key: "assignDate" },
        { label: "Assign by", key: "assignBy" },
        { label: "Assign Frequency", key: "assignFrequency" },
        { label: "Updated Date", key: "updatedDate" },
      ].map((section, index, array) => (
        <div
          key={section.key}
          style={{
            marginBottom: "12px",
            borderBottom: index !== array.length - 1 ? "1px solid #ccc" : "none",
            paddingBottom: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
              marginBottom: "8px",
            }}
            onClick={() => toggleSection(section.key)}
          >
            <span>{section.label}</span>
            <span>
              {openSections[section.key] ? (
                <img src={UpArrow} alt="UpArrow" />
              ) : (
                <img src={DownArrow} alt="DownArrow" />
              )}
            </span>
          </div>
          {openSections[section.key] && (
            <div>
              {section.key === "createdDate" ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="date"
                    value={createdDateRange.startDate}
                    onChange={(e) => handleDateChange(e, "startDate")}
                    style={{
                      width: "45%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <input
                    type="date"
                    value={createdDateRange.endDate}
                    onChange={(e) => handleDateChange(e, "endDate")}
                    style={{
                      width: "45%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              ) : (
                <select
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="">Select an option</option>
                </select>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
