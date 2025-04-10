import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiServiceInstance from "../../Api/ApiService";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Project = () => {
  const [project, setProject] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const Name = params.get("Name");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyClErD-k0OmrJtZ6x9ImA2otfx-UpGP_hI",
  });


  useEffect(() => {
    const fetchProject = async () => {
      if (!Name) return;

      try {
        console.log("Fetching project:", Name);
        const response = await apiServiceInstance.getProjectByName(Name);
        if (response && response.length > 0) {
          setProject(response[0]);
          console.log("API Response:", response);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [Name]);

  if (!project) {
    return <p className="text-center text-gray-600">Loading project details...</p>;
  }


  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
  };

  const center = {
    lat: project.latitude || 10.99835602,
    lng: project.longitude || 77.01502627,
  };
  return (
    <div className="p-4">
      <h6 className="mt-2 text-gray-500">Project Details</h6>
      <h3 className="mt-2 text-3xl font-semibold text-gray-800">{project.name}</h3>

      {/* Image Gallery */}
      <div className="w-full flex gap-2 h-[350px] mt-4">
        {project.images?.length > 0 && (
          <>
            <div className="w-1/2">
              <img src={project.images[0]} alt="Project Main" className="rounded-2xl h-full w-full object-cover" />
            </div>
            <div class="grid grid-cols-2 grid-rows-2 w-1/2 gap-2">
          <img src={project.images[1]} alt="" className="rounded-2xl h-full" />
          <img src={project.images[0]} alt="" className="rounded-2xl h-full" />
          <img src={project.images[0]} alt="" className="rounded-2xl h-full" />
          <img src={project.images[1]} alt="" className="rounded-2xl h-full" />
        </div>
          </>
        )}
      </div>

      {/* Property Overview */}
      <div className="flex mt-6">
        <div className="w-3/5 p-4">
          <h4 className="text-xl font-semibold text-gray-700">Property Overview</h4>
          <p className="text-gray-600 mt-2">{project.description}</p>

          {/* Property Location */}
          <h4 className="text-xl font-semibold text-gray-700 mt-4">Property Location</h4>
         
          {isLoaded ? (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <p>Loading Map...</p>
          )}
        </div>

        {/* Project Details */}
        <div className="w-2/5 p-6 ">
          <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "Address", value: project.completeAddress },
              { label: "Configurations", value: project.Configurations },
              { label: "Min Price", value: project.minPrice },
              { label: "Max Price", value: project.maxPrice },
              { label: "Developer", value: project.developerName },
              { label: "Amenities", value: project.amenities?.join(", ") }
            ].map((item, index) => (
              item.value && (
                <div key={index} className="border h-14 flex items-center px-4 rounded-2xl bg-white ">
                  <span className="text-gray-500 font-semibold text-lg">{item.label}:</span>
                  <span className="ml-2 text-gray-700">{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
