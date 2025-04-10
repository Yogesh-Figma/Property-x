import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick =  () => {
    setLoading(true);
    try {
       navigate("/login", { replace: true });
    } catch (error) {
      console.error("Navigation failed:", error);
      setLoading(false); 
    }
  };
   

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col"
      style={{
        backgroundImage: `url(${require("../../images/backgroundd.jpg")})`,
      }}
    >
      {loading && <Loading />}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <img
            src={require("../../images/BMS-Logo-03 (3).png")}
            alt="Logo"
            className="h-16"
          />
        </div>
        {/* <nav className="hidden md:flex gap-8">
          <a
            href="#home"
            className="text-gray-800 hover:text-blue-600 font-semibold"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-800 hover:text-blue-600 font-semibold"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-800 hover:text-blue-600 font-semibold"
          >
            Contact
          </a>
          <a
            href="#pricing"
            className="text-gray-800 hover:text-blue-600 font-semibold"
          >
            Pricing
          </a>
        </nav> */}
        {/* <div className="flex gap-4">
          <button className="bg-white border-2 border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-100">
            See Pricing
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Try for Free
          </button>
        </div> */}
      </header>

      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 md:pl-16 pr-0">
<div className="md:text-left max-w-[43rem] mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CRM DEPLOYMENT TEST
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Automated CI/CD pipeline for Docker Hub images. This tool helps you to
            automate the process of building, testing, and deploying Docker images
          </p>
          <button
            className="bg-yellow-400 text-black py-3 px-6 rounded hover:bg-yellow-500"
            onClick={handleSignInClick}
          >
            Sign in &rarr;
          </button>
        </div>
        <div className="mt-8 md:mt-0">
          <img
            src={require("../../images/laptop2.png")}
            alt="App Screenshot"
            className="max-w-full h-auto w-[500px] md:w-[600px] float-right"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
