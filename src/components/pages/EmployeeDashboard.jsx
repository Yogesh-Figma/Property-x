import React, { useEffect, useState } from "react";
import apiServiceInstance from "../../Api/ApiService";
import Pagination2 from "../small-component/Pagination2";

const EmployeeDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const page = currentPage - 1;
      const size = recordPerPage;
      const response = await apiServiceInstance.getAllUser(page, size);
      setUsers(response.content);
      setTotalData(response.totalElements);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load employee data. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, recordPerPage]); // Re-fetch data when pagination changes

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Employee Dashboard</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">S.no.</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Photo</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <EmployeeRow
                  key={user.id || index}
                  user={user}
                  index={index}
                  currentPage={currentPage}
                  recordPerPage={recordPerPage}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination2
        currentPage={currentPage}
        totalItems={totalData}
        onPageChange={setCurrentPage}
        recordPerPage={recordPerPage}
        onRowsPerPageChange={(event) =>
          setRecordPerPage(parseInt(event.target.value, 10))
        }
      />
    </div>
  );
};

const EmployeeRow = ({ user, index, currentPage, recordPerPage }) => {
  return (
    <tr className="text-center hover:bg-gray-100">
      <td className="border px-4 py-2">{index + 1 + (currentPage - 1) * recordPerPage}</td>
      <td className="border px-4 py-2">{user.firstName}</td>
      <td className="border px-4 py-2">{user.lastName}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.phone}</td>
      <td className="border px-4 py-2">{user.department}</td>
      <td className="border px-4 py-2">{user.designation}</td>
      <td className="border px-4 py-2">
        <img
          src={user.photo || "https://via.placeholder.com/40"}
          alt="Profile"
          className="h-10 w-10 rounded-full mx-auto"
        />
      </td>
    </tr>
  );
};

export default EmployeeDashboard;
