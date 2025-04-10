import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import "../../styles/Login.css";
import ApiService from "../../Api/ApiService";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);


  // const baseURL = process.env.REACT_APP_BASE_URL;

  // const baseURL = "http://13.127.174.62:8181/"
  const baseURL = "http://13.127.174.62:8282/"
  // const baseURL = "http://localhost:8181/"
  console.log(baseURL,"iuytrewq")
  // const baseURL = "https://bma-staging-api.virtualintelligence.co.in/api/";

  const handleForgotPasswordSubmit = async () => {
    try {
      setLoading(true);
      const response = await ApiService.upadtePassword(userId, password);
      window.alert(response.data.message);
      setError("Password updated successfully. You can now log in.");
      setIsPasswordUpdated(true);
      setIsForgotPassword(false);
      setUserId("");
      setPassword("");
    } catch (error) {
      let errorMessage = "Error resetting password";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage += ": " + error.message;
      }
      setError(errorMessage);
      window.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  console.log(error, "error");

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setError("");
    setUserId("");
    setPassword("");
  };
  useEffect(() => {
    const token = localStorage.getItem("Authtoken");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const credentials = { userName: userId, password };
      const response = await axios.post(
        `${baseURL}auth/generate-token`,
        credentials
      );
   

      console.log(`${baseURL}auth/generate-token`,"yusdu")
      const token = response.data.token;
      localStorage.setItem("Authtoken", token);

      const apiResponse = await ApiService.getCurrentUser();
      const roleName = apiResponse.authorities[0].authority;
      const photo = apiResponse.photo;
      const Username = apiResponse.firstName;
      const usersId = apiResponse.id;
      const email = apiResponse.email;

      localStorage.setItem("photo", photo);
      localStorage.setItem("Username", Username);
      localStorage.setItem("userId", usersId);
      localStorage.setItem("email", email);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("rolename", roleName);

   
      // switch (roleName) {
      //   case "USER":
      //     navigate("/User/dashboard", { replace: true });
      //     break;
      //   case "ADMIN":
      //     navigate("/admin/dashboard", { replace: true });
      //     break;
      //   case "Manager":
      //     navigate("/manager", { replace: true });
      //     break;
      //   case "SuperAdmin":
      //     navigate("/superAdmin", { replace: true });
      //     break;
      //   default:
      //     setError("Unknown role");
      //     break;
      // }

      navigate("/admin/dashboard", {
        replace: true,
        state: { Rolename: roleName },
      })
  
    } catch (error) {
      let errorMessage = "Error resetting password";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage += ": " + error.message;
      }
      setError(errorMessage);
      window.alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   console.log("Login Attempt:");
  //   console.log("User ID:", userId);
  //   console.log("Password (masked):", "*".repeat(password.length));
  //   console.log("Base URL:", process.env.REACT_APP_BASE_URL);
  
  //   try {
  //     if (process.env.REACT_APP_BASE_URL) {
  //       const baseURL = process.env.REACT_APP_BASE_URL;
  //       const credentials = { userName: userId, password };
  
  //       console.log("Sending login request to:", `${baseURL}auth/generate-token`);
  //       console.log("Request Payload:", credentials);
  
  //       const response = await axios.post(`${baseURL}auth/generate-token`, credentials);
  //       console.log("Login Response:", response.data);
  
  //       const token = response.data.token;
  //       localStorage.setItem("Authtoken", token);
  
  //       console.log("Token Stored in localStorage:", token);
  
  //       // Fetch user details after login
  //       console.log("Fetching current user details...");
  //       const apiResponse = await ApiService.getCurrentUser();
  //       console.log("User Details Response:", apiResponse);
  
  //       if (!apiResponse || !apiResponse.authorities) {
  //         throw new Error("Invalid user response from API");
  //       }
  
  //       const roleName = apiResponse.authorities[0]?.authority || "Unknown";
  //       const photo = apiResponse.photo || "";
  //       const Username = apiResponse.firstName || "User";
  //       const usersId = apiResponse.id || "";
  //       const email = apiResponse.email || "";
  
  //       console.log("User Role:", roleName);
  //       console.log("User Info:", { photo, Username, usersId, email });
  
  //       // Store user details in localStorage
  //       localStorage.setItem("photo", photo);
  //       localStorage.setItem("Username", Username);
  //       localStorage.setItem("userId", usersId);
  //       localStorage.setItem("email", email);
  //       localStorage.setItem("loggedIn", true);
  //       localStorage.setItem("rolename", roleName);
  
  //       console.log("Navigating to Dashboard...");
  //       navigate("/admin/dashboard", {
  //         replace: true,
  //         state: { Rolename: roleName },
  //       });
  //     } else {
  //       throw new Error("Base URL is not defined");
  //     }
  //   } catch (error) {
  //     let errorMessage = "Login failed";
  //     if (error.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     } else {
  //       errorMessage += `: ${error.message}`;
  //     }
  
  //     console.error("Login Error:", errorMessage);
  //     setError(errorMessage);
  //     window.alert(errorMessage);
  //   } finally {
  //     console.log("Login process completed.");
  //     setLoading(false);
  //   }
  // };
    
  
  return (
    <div className="login">
      {loading && <Loading />}
      {!imageLoaded && <Loading />} {/* Show loader until images load */}
      <img
        src={require("../../images/BMS-Logo-03 (3).png")}
        alt="logo"
        className="logo"
        onLoad={() => setImageLoaded(true)}
      />
      <div className="left-section">
        <img
          src={require("../../images/loginleft.png")}
          alt="Team Work Illustration"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="login-container">
        <div className="form-container">
          <h1>Welcome Back</h1>
          <p>Manage Business Leads. Customer Queries into Business Leads</p>
          <form
            onSubmit={
              isForgotPassword ? handleForgotPasswordSubmit : handleSubmit
            }
          >
            <div className="input-field">
              <label htmlFor="userId">
                {isForgotPassword ? "Phone" : "Username"}
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={handleUserIdChange}
                required
              />
            </div>
            <div className="input-field relative">
      <label htmlFor="password">
        {isForgotPassword ? "New Password" : "Password"}
      </label>
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="pr-10 w-full p-2 border border-gray-300 rounded-md focus:border-blue-500"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>

            <a
              href="#"
              className="forgot-password"
              onClick={toggleForgotPassword}
            >
              {isForgotPassword ? "Back to Login" : "Forgot Password"}
            </a>
            <button type="submit"className="submitbutton">
              {isForgotPassword
                ? "Update Password"
                : isPasswordUpdated
                ? "Back to Login"
                : "Sign in"}
            </button>
          </form>
        </div>
      </div>
      <div className="right-section">
        <img
          src={require("../../images/loginRight.png")}
          alt="Team Work"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

export default Login;
