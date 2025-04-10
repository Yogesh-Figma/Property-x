import React, { useState, useEffect, useCallback } from "react";
import "../../styles/User.css";
import OtpInput from "../small-component/OtpInput";
import apiServiceInstance from "../../Api/ApiService";
import DatetoEpoch from "../../utils/DatetoEpoch";
import { toast } from "react-toastify";

function User() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [roles, setRoles] = useState([]);
  const [Otp, setOtp] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    alternateMobile: "",
    email: "",
    password: "",
    currentAddress: "",
    permanentAddress: "",
    departmentId: "",
    designationId: "",
    role: [{ roleName: "" }],
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiServiceInstance.getAllUserRole();
        setRoles(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await apiServiceInstance.getAllDepartment();
        setDepartments(response);
        console.log("response od department", response);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchRoles();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("enter");
      const response = await apiServiceInstance.SaveNewUser(formData);
      console.log("User saved:", response);
      toast.success("User Saved successfully!");
      setUserId(response.id);
      setEmail(response.email);
      console.log(userId);
      // setOtp(true);
      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        phone: "",
        alternateMobile: "",
        email: "",
        password: "",
        currentAddress: "",
        permanentAddress: "",
        departmentId: "",
        designationId: "",
        role: [{ roleName: "" }],
      });

      setUploadedImage(null); // Reset uploaded image
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred.";
      toast.error(`Failed to upload file. ${errorMessage}`);
      console.error("Error updating lead:", error.message);
      window.alert(errorMessage);
    }
  };

  const handleotpClose = useCallback(() => {
    setOtp(false);
  }, []); // Add dependencies if needed

  const handleDesignationFetch = async (departmentId) => {
    if (!departmentId) return; // Ensure departmentId is valid before calling API
    console.log("departmentID", departmentId);
    try {
      const response = await apiServiceInstance.getDegignationByDepartmentId(
        departmentId
      );
      setDesignations(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0]; // Get the selected file
      const Foldername = "UserPhoto";

      try {
        const formData = new FormData();
        formData.append("file", file); // Append the file
        const response = await apiServiceInstance.uploadFile(
          formData,
          Foldername
        );
        console.log("Upload response:", response);
        const photourl = response.message;

        if (response && response.message) {
          setUploadedImage(response.message);
          setFormData((prev) => ({
            ...prev,
            photo: photourl, // Store as JSON object
          }));
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    } else {
      setFormData((prevData) => {
        let updatedData = { ...prevData, [name]: value };

        if (type === "date") {
          updatedData.dob = DatetoEpoch(value);
        }
        if (name === "role") {
          updatedData.role = [{ roleName: value }];
        }

        if (name === "departmentId") {
          updatedData.designationId = ""; // Reset designation when department changes
          handleDesignationFetch(value);
        }

        return updatedData;
      });
    }
  };

  // const handleFileChange = (e) => {
  //     setProfileImage(e.target.files[0]);
  // };
  // const handleChangeOtp = (newOtp) => {
  //   setOtp(newOtp);
  // };

  return (
    <div className="pageU">
      <div className="UserNavbar">
        <h5>Register New User</h5>
      </div>
      <div className="container-2">
        <div className="left-div-2">
          <div className="photo-div">
            <img
              src={uploadedImage || require("../../images/User.png")}
              alt="ProfileImage"
              className="profile-img-User"
            />
            <img
              src={require("../../images/AddPhoto.png")}
              alt="SmallProfileImage"
              className="small-img-User"
            />
            <input
              type="file"
              className="input-img"
              accept="image/*"
              name="photo"
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-text-User">
            <p className="grey-text">Allowed Format</p>
            <p>JPG, JPEG, and PNG</p>
            <br />
            <p className="grey-text">Max file size</p>
            <p>2MB</p>
          </div>
        </div>
        <div className="right-div-2">
          <h5 className="User-details">User Details</h5>
          <div className="sineup-2">
            <div className="form-User" style={{ display: "flex" }}>
              <div className="form-group-2">
                <label>Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
              <div className="form-group-2">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
            </div>
            <div className="form-User" style={{ display: "flex" }}>
              <div className="form-group-2">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group-2">
                <label>DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={
                    formData.dob
                      ? new Date(formData.dob).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                  placeholderText="DD/MM/YYYY"
                />
              </div>
            </div>
            <div className="form-User" style={{ display: "flex" }}>
              <div className="form-group-2">
                <label>Contact Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  minLength="10"
                  maxLength="10"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
              <div className="form-group-2">
                <label>Alternate Contact Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  minLength="10"
                  maxLength="10"
                  name="alternateMobile"
                  value={formData.alternateMobile}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
            </div>
            <div className="form-User" style={{ display: "flex" }}>
              <div className="form-group-2">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
              <div className="form-group-2">
                <label>Login Pass</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-2"
                />
              </div>
            </div>
            <div className="form-User" style={{ display: "flex" }}>
              <div className="form-group-2">
                <label>Address</label>
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-3"
                />
              </div>
              <div className="form-group-2">
                <label>Permanent Address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  className="form-control-2 custom-input-3"
                />
              </div>
            </div>
            <h5>Assign Role</h5>
            <div className="Assign Role">
              <div className="form-User" style={{ display: "flex" }}>
                <div className="form-group-2">
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    value={formData.role[0]?.roleName || ""}
                    onChange={handleInputChange}
                    className="form-control-2 custom-input-2"
                  >
                    <option value="">Select Role</option>
                    {roles.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-2">
                  <label>Department</label>
                  <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleDesignationFetch(e.target.value);
                    }}
                    className="form-control-2 custom-input-2"
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-User" style={{ display: "flex" }}>
                <div className="form-group-2">
                  <label>Designation</label>
                  <select
                    name="designationId"
                    value={formData.designationId}
                    onChange={handleInputChange}
                    className="form-control-2 custom-input-2"
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation.id} value={designation.id}>
                        {designation.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* <h5>OTP Verification</h5>
                <h8>We've sent a code to ClientEmail@gmail.com</h8>
                <OtpInput length={6} onChangeOtp={handleChangeOtp} /> */}
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-btn-User"
          >
            Register New User
          </button>
        </div>
      </div>
      <OtpInput
        isVisible={Otp}
        userId={userId}
        email={email}
        onclose={handleotpClose}
      />
    </div>
  );
}

export default User;
