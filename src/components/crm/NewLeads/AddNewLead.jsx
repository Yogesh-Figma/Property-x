import React, { useEffect, useState } from "react";
import "../../../styles/AddNewLead.css";
import ApiService from "../../../Api/ApiService";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";

const AddNewLead = ({
  isVisible,
  onClose,
  leadId,
  calldata,
  refreshLeads,
  duplicate,
}) => {
  const [projects, setProjects] = useState([]);
  const [sources, setSources] = useState([]);
  const rolename = localStorage.getItem("rolename");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectName: "",
    source: "",
    queryInfo: "",
    leadsType: "FRESH_LEADS",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await ApiService.getallProjects();
        const ProjectList = projectResponse.content || projectResponse;
        setProjects(ProjectList);

        const sourceResponse = await ApiService.getallSources();
        const SourceList = sourceResponse.content || sourceResponse;
        setSources(SourceList);

        if (leadId) {
          // Fetch the existing lead data if leadId is provided
          const leadResponse = await ApiService.getLeadById(leadId);
          const lead = leadResponse.content || leadResponse;

          setFormData({
            name: lead.name || "",
            phone: lead.phone || "",
            email: lead.email || "",
            projectName: lead.projectName || "",
            source: lead.source || "",
            queryInfo: lead.queryInfo || "",
            leadsType: lead.leadsType || "",
          });
        }
      } catch (error) {
        console.error("Error fetching projects, sources, or lead data:", error);
      }
    };

    fetchData();
  }, [leadId]); // This will run whenever the leadId changes

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const projectOptions = projects.map((project) => ({
    value: project.name,
    label: project.name,
  }));

  const handleProjectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, projectName: selectedOption?.value || "" }));
  };
  
  const sourceOptions = sources.map((source) => ({
    value: source.name,
    label: source.name,
  }));

  const handleSourceChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, source: selectedOption?.value || "" }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (calldata) {
        response = await ApiService.saveNewCallData(formData);
      } else {
        if (leadId) {
          if (duplicate) {
            response = await ApiService.updateDuplicateLead(leadId, formData);
          } else {
            response = await ApiService.updateLead(leadId, formData);
          }
        } else {
          response = await ApiService.saveNewLead(formData);
        }
      }

      console.log("Lead saved successfully:", response);
      onClose();

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: response.message,
          text: leadId
            ? "The lead has been updated."
            : "The new lead has been added.",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
          refreshLeads();
        });
      }, 0);
    } catch (error) {
      console.error("Error saving lead:", error);
      onClose();

      const errorMessage =
        error.response?.data?.message ||
        "There was an error saving the lead. Please try again.";

      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: errorMessage,
          confirmButtonText: "OK",
        });
      }, 0);
    }
  };
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : provided.backgroundColor,
      color: 'black',
      '&:hover': {
        backgroundColor: '#f0f0f0'
      }
    }),
    control: (provided) => ({
      ...provided,
      boxShadow: 'none'
    })
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="formtooltip">
        <button onClick={onClose} className="closeButton">
          <img alt="close" src={require("../../../images/close.png")} />
        </button>
        <div className="infoNewLead">
          <h5>{leadId ? "UPDATE LEAD" : "ADD NEW LEAD"}</h5>
          <p>
            {leadId
              ? "Update the details of the lead"
              : "Fill all the fields for a new Lead"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <div className=" Newform">
              <div className="formbox">
                <label>Client Name</label>
                <input
                  className="LeadBox"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="formbox">
                <label>Client Contact</label>
                <input
                  className="LeadBox"
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  minLength="10"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter client contact"
                  required
                />
              </div>
              <div className="formbox">
                <label>Client Email</label>
                <input
                  className="LeadBox"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter client email"
                  required
                />
              </div>
            </div>
            <div className="Newform">
              <div className="formbox">
                <label htmlFor="project-dropdown">
                  Project (Interested in)
                </label>
                <CreatableSelect
                  id="project-dropdown"
                  name="projectName"
                  value={
                    projectOptions.find(
                      (option) => option.value === formData.projectName
                    ) || {
                      value: formData.projectName,
                      label: formData.projectName,
                    }
                  }
                  onChange={handleProjectChange}
                  options={projectOptions}
                  className="LeadBox2"
                  placeholder="Select project"
                  isSearchable
                  isCreatable={rolename !== "USER"}
                  isClearable
                  styles={selectStyles}
                  required
                />
              </div>
              <div className="formbox">
                <label htmlFor="source-dropdown">Source</label>
                <CreatableSelect
                  id="project-dropdown"
                  name="source"
                  value={
                    sourceOptions.find(
                      (option) => option.value === formData.source
                    ) || {
                      value: formData.source,
                      label: formData.source,
                    }
                  }
                  onChange={handleSourceChange}
                  options={sourceOptions}
                  className="LeadBox2"
                  placeholder="Select Source"
                  isCreatable={rolename !== "USER"}
                  isSearchable
                  styles={selectStyles}
                  isClearable
                  required
                />
              </div>
              <div className="formbox">
                <label>Query</label>
                <input
                  className="LeadBox"
                  name="queryInfo"
                  value={formData.queryInfo}
                  onChange={handleChange}
                  placeholder="Enter query"
                  required
                />
              </div>
            </div>
            <div className="flex Newform">
              <div className="formbox">
                <label>Lead Type</label>
                <select
                  className="LeadBox"
                  name="leadsType"
                  value={formData.leadsType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select lead type
                  </option>
                  {!calldata && (
                    <option value="FRESH_LEADS">FRESH_LEADS</option>
                  )}
                  {calldata && (
                    <option value="CALLING_DATA">CALLING_DATA</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <button className="AddNewLeadSubmitButton" type="submit">
            {leadId ? "Update Lead" : "Add New Lead"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewLead;
