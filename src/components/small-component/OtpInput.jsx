import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import "../../styles/Org.css";
import Swal from "sweetalert2";
import apiServiceInstance from "../../Api/ApiService";

const OtpInput = ({ isVisible, userId, email, onclose }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isVisible && userId && email) {
      sendOtp();
    }
  }, [isVisible, userId, email]);

  const sendOtp = async () => {
      const response = await apiServiceInstance.SendOtp(userId, email);
      if (response) { 
        console.log(response,'send sucessfully')
      }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d$/.test(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus(); 
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move to previous input
      }
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("").trim();
  
    if (otpString.length !== 6) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter a valid 6-digit OTP.",
      });
    }
    try {
      const response = await apiServiceInstance.VerifyEmail(otpString, email);
      
      if (response) { 
        Swal.fire({
          icon: "success",
          title: "Verification Successful",
          text: "Your email has been verified!",
        });
        onclose(); // Close only if successful
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.message || "An unexpected error occurred. Please try again.",
      });
      onclose();
    }
    

  };
  

  if (!isVisible) return null; // Do not render component when not visible

  return (
    <div className="otp-blur">
      <div className="otp-container">
        <h5>Enter OTP</h5>
        <span>We have sent a verification code to your email</span>
        <div className="otp">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-box"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        <button className="Verify-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

OtpInput.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OtpInput;
