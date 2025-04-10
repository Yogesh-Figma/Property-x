import React, { useState } from 'react';
import '../../styles/Org.css';

const Otp = ({length ,onChangeOTP}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  function handleChange(e, index) {
    if (isNaN(e.target.value)) return;
    
    const value = e.target.value;
    setOtp((prevOtp) => 
      prevOtp.map((data, indx) => (indx === index ? value : data))
    );

    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  }

  function handlePaste(e) {
    const pasteData = e.clipboardData.getData('text').slice(0, otp.length).split('');
    setOtp((prevOtp) => prevOtp.map((_, i) => pasteData[i] || prevOtp[i]));
  }

  return (
    <div>
      <div className="otp" onPaste={handlePaste} role="group" aria-label="OTP Input">
        {otp.map((data, i) => (
          <input
            key={i}
            type="text"
            className="input-box"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onFocus={(e) => e.target.select()}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
