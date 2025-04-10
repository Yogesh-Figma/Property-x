import React, { useEffect, useState } from "react";
import "../../styles/myProfile.css";
import apiServiceInstance from "../../Api/ApiService";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    authorities: [{ authority: "" }],
    gender: "",
    dob: "",
    phone: "",
    alternateMobile: "",
    currentAddress: "",
    permanentAddress: "",
    department: "",
    designation: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiServiceInstance.getCurrentUser();
      // Assuming the API returns all the fields we need
      // If not, we need to set default values or handle missing fields
      setUserData({
        ...response,
        gender: response.gender || "",
        dateOfBirth: response.dob || "",
        phoneNumber: response.phone || "",
        alternateNumber: response.alternateMobile || "",
        currentAddress: response.currentAddress || "",
        permanentAddress: response.permanentAddress || "",
        department: response.department || "",
        designation: response.designation || response.authorities?.[0]?.authority || ""
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, cancel and revert to original data
      fetchUserProfile();
    }
    setIsEditing(!isEditing);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");
    
    try {
      // Assuming there's an updateProfile method in your API service
      await apiServiceInstance.updateUserId(userData.id,userData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-Profile">
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <nav className="navbar-profile">
        <img
          src={userData.photo}
          alt="Profile"
          className="profile-img"
        />
        <div className="text">
          <p>
            <span className="name">{`${userData.firstName || ""} ${userData.lastName || ""}`}</span>
            <br />
            <span className="designation">{userData.authorities?.[0]?.authority || ""}</span>
            <br />
            <span className="email">{userData.email || ""}</span>
          </p>
        </div>
        <button 
          className={`${isEditing ? "save-btn" : "edit-btn"}`}
          onClick={isEditing ? handleSubmit : toggleEditMode}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        {isEditing && (
          <button className="cancel-btn" onClick={toggleEditMode}>
            Cancel
          </button>
        )}
      </nav>
      
      <form onSubmit={handleSubmit} className="profilediv">
        <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
          Personal Details
        </h5>
        
        <div className="form" style={{ display: "flex" }}>
          <div className="container-profile">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-box"
              value={userData.firstName || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="container-profile">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-box"
              value={userData.lastName || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form" style={{ display: "flex" }}>
          <div className="container-profile">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="input-box"
              value={userData.gender || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="container-profile">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="input-box"
              value={userData.dob || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="form" style={{ display: "flex" }}>
          <div className="container-profile">
            <label htmlFor="phoneNumber">Phone No.</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="input-box"
              value={userData.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="container-profile">
            <label htmlFor="alternateNumber">Alternate No.</label>
            <input
              type="text"
              id="alternateNumber"
              name="alternateNumber"
              className="input-box"
              value={userData.alternateMobile || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="form" style={{ display: "flex" }}>
          <div className="container-profile">
            <label htmlFor="currentAddress">Current Address</label>
            <input
              type="text"
              id="currentAddress"
              name="currentAddress"
              className="input-box"
              value={userData.currentAddress || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="container-profile">
            <label htmlFor="permanentAddress">Permanent Address</label>
            <input
              type="text"
              id="permanentAddress"
              name="permanentAddress"
              className="input-box"
              value={userData.permanentAddress || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
          Employee Details
        </h5>
        
        <div className="form" style={{ display: "flex" }}>
          <div className="container-profile">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              className="input-box"
              value={userData.department || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="container-profile">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              className="input-box"
              value={userData.designation || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
          My Email Address
        </h5>
        
        <div className="email-div">
          <img
            src={require("../../images/email.png")}
            alt="email"
            className="emailpng"
          />
          <div>
            <h6 style={{ fontWeight: "bold" }}>{userData.email || ""}</h6>
            {/* <span style={{ color: "#a6a7ac" }}>1 Month ago</span> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;