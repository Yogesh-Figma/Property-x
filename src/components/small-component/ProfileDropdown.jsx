import React from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaUserPlus,
  FaQuestionCircle,
  FaSignOutAlt,
  FaMoon,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const ProfileDropdown = ({ visible, admin }) => {
  const navigate = useNavigate();
  const UserName = localStorage.getItem("Username");
  const email = localStorage.getItem("email");
  return (
    <div
      className="profile-dropdown"
      style={{
        display: visible ? "block" : "none",
        position: "absolute",
        top: "60px",
        right: "25px",
        backgroundColor: "white",
        boxShadow: "0px 6px 17px rgba(0, 0, 0, 0.1)",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "12px",
        width: "250px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold" }}>{UserName}</div>
          <div style={{ fontSize: "12px", color: "gray" }}>{email}</div>
        </div>
      </div>

      <div style={{ paddingTop: "10px" }}>
        <DropdownItem icon={<FaHome />} label="Home" />
        <DropdownItem
          icon={<FaUser />}
          label="View profile"
          onClick={() =>  admin ? navigate("/admin/Profile"):navigate("/admin/Profile")}
        />
        <DropdownItem icon={<FaCog />} label="Settings" />
        {admin && (
          <DropdownItem
            icon={<FaUserPlus />}
            label="Add User"
            onClick={() => navigate("/admin/AddUser")}
          />
        )}
        <DropdownItem icon={<FaQuestionCircle />} label="Support" />
        
        <DropdownItem icon={<FaMoon />} label="Salary History"  onClick={()=>navigate("/admin/SalaryHistory")}/>
        <DropdownItem
          icon={<FaSignOutAlt />}
          label="Log out"
          onClick={() => {
            localStorage.clear(); 
            navigate("/"); 
          }}
          noBorder={true} 
        />
      </div>
    </div>
  );
};

const DropdownItem = ({ icon, label, noBorder = false, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
      cursor: "pointer",
      color: "#333",
      borderBottom: noBorder ? "none" : "1px solid #f0f0f0",
      marginBottom: noBorder ? "0" : "8px",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "transparent")
    }
  >
    <div style={{ marginRight: "10px", color: "#888" }}>{icon}</div>
    <div>{label}</div>
  </div>
);

export default ProfileDropdown;
