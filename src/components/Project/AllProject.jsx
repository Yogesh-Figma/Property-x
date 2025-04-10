import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaHome } from 'react-icons/fa';
import apiServiceInstance from '../../Api/ApiService';
import { useNavigate } from 'react-router-dom';

const AllProject = () => {
  const [projects, setProjects] = useState([]);
   const navigate = useNavigate();
 
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiServiceInstance.getallProjects();
        setProjects(response.content || []); // Ensure it's an array
        console.log(response.content);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // Fallback to empty array to prevent .map() error
      }
    };
  
    fetchProjects();
  }, []);

  // handleProjectAdd=async()=>{
  //   try {
  //     const response = await apiServiceInstance.AddProject();
  //     return response;
  //   } catch (error) {
  //     console.error("Navigation failed:", error);
  //     setLoading(false); 
  //   }

  // }
  const handleNavigate = (name) => {
navigate(`/admin/project?Name=${name}`);
  };
  

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Listings</h1>
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded-3xl">Filter by</button>
          <button className="border px-4 py-2 rounded-3xl">Sort by</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden border">
            <img src={project.images[0]||project.images[1]}
             alt={project.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-gray-600 text-sm">{project?.description}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <FaMapMarkerAlt /> <span>{project?.location}</span>
                <FaBed /> <span>{project?.Configurations} bedroom</span>
                {/* <FaHome /> <span>{project?.type}</span> */}
              </div>
              <button className="w-full mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"onClick={() => handleNavigate(project.name)}
              >View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProject;
