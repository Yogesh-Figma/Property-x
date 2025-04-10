import React, { useState, useEffect } from "react";
import Select from "react-select";
import ApiService from "../../../Api/ApiService";
import Swal from "sweetalert2";

const UserDropdown = ({ data, onAssignLeads, duplicateLead, refreshpage, onClose, Callingdata }) => {
  const [userList, setUserList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const rolename = localStorage.getItem("rolename");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = rolename === "ADMIN" ? await ApiService.getAllUser() : await ApiService.getchildUser();
        const usersList = response.content || response;

        const formattedUsers = usersList.map((user) => ({
          label: user.firstName,
          value: user.id,
        }));

        setUserList([{ label: "Select All", value: "select_all" }, ...formattedUsers]);
        console.log("User data:", usersList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (selected) => {
    if (!selected) {
      setSelectedOptions([]);
      return;
    }

    if (duplicateLead || Callingdata) {
      setSelectedOptions([selected]); // Single selection for duplicateLead or Callingdata
    } else {
      const selectAllOption = selected.find((option) => option.value === "select_all");
      setSelectedOptions(selectAllOption ? userList.slice(1) : selected);
    }
  };

  const handleAssignLeads = async () => {
    if (selectedOptions.length === 0) {
      Swal.fire({ icon: "warning", title: "No users selected", text: "Please select at least one user.", confirmButtonText: "OK" });
      return;
    }

    if (data.length === 0) {
      Swal.fire({ icon: "warning", title: "No leads selected", text: "Please select at least one lead.", confirmButtonText: "OK" });
      return;
    }

    const userIds = selectedOptions.map((option) => option.value);

    try {
      let response;

      if (duplicateLead) {
        const payload = { userId: userIds[0], duplicateLeadIds: data };
        response = await ApiService.DuplicateAssignToUser(payload);
        console.log("Duplicate leads assigned:", response);
      } else if (Callingdata) {
        const payload = { leadIds: data}; // Send only one userId
        response = await ApiService.CallingassignTo(payload ,userIds[0]);
        console.log("Calling leads assigned:", response);
      } else {
        const payload = { leadIds: data, userIds };
        response = await ApiService.assignToUser(payload);
        console.log("Leads assigned:", response);
      }

      Swal.fire({ icon: "success", title: "Success", text: response.message || "Leads successfully assigned!", confirmButtonText: "OK" });

      onClose();
      refreshpage();
      if (onAssignLeads) onAssignLeads();
    } catch (error) {
      console.error("Error assigning leads:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "There was an error assigning the lead. Please try again.",
        confirmButtonText: "OK",
      });

      onClose();
      refreshpage();
    }
  };

  return (
    <div className="dropdown">
      <div className="flex">
        <Select
          isMulti={!duplicateLead && !Callingdata} 
          name="lAssignedTo"
          options={userList}
          className="im_multi"
          classNamePrefix="select"
          placeholder="Leads Assigned To"
          value={selectedOptions}
          onChange={handleChange}
        />
        <button className="AssignTouser" onClick={handleAssignLeads}>
          <img src={require("../../../images/assign.png")} alt="assign" className="w-8 h-8" />
          <span className="tooltip">Assign to user</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
