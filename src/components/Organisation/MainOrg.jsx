import "../../styles/Org.css";
import { useState } from "react";
import ApiService from "../../Api/ApiService";
import Step4 from "./Step4";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Divider, Steps } from "antd";
import Swal from 'sweetalert2';

const { Step } = Steps;

const steps = [
  { title: "Owner Details", subtitle: "Let's Start with Basic Info" },
  { title: "Organization Details", subtitle: "Register Your Business" },
  { title: "Credentials", subtitle: "Identity Verification" },
  { title: "Finishing Up", subtitle: "Final Step to Your Registration" },
];

const MainOrg = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    legalName: "",
    email: "",
    contactNumber: "",
    alternateNumber: "",
    address: "",
    pincode: "",
    aadharPhoto: "",
    panPhoto: "",
    orgLogo: "",
    OwnerName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerAddress: "",
    ownerAadhar: "",
    ownerPan: "",
  });

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };



  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("FormData", formData);
      const response = await ApiService.saveNewOrg(formData);
      setComplete(true);
      console.log(response);
  
      
      Swal.fire({
        title: 'Success!',
        text: 'Organization saved successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
  
      Swal.fire({
        title: 'Error!',
        text: 'Failed to save the organization.',
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    }finally {
      setLoading(false); 
    }
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4 formData={formData} />;
      default:
        return <Step1 formData={formData} setFormData={setFormData} />;
    }
  };

  const onStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="page">
      <div className="navcol">
        <h5>Register Organization</h5>
      </div>
      <div className="container">
        <div className="left-div">
          <Steps
            current={currentStep}
            className="steps"
            onChange={onStepChange}
          >
            {steps.map((item, index) => (
              <Step
                key={index}
                title={item.title}
                description={item.subtitle}
              />
            ))}
          </Steps>
          <Divider />
        </div>

        <div className="right-div">
          {renderStepContent(currentStep)}
          {!complete && (
            <button className="submit-btn" onClick={handleNext}>
              {currentStep === steps.length - 1
                ? "Register Organization"
                : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainOrg;
