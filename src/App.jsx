import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import your components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Protected from './components/Protected';
import Admin from './pages/Admin';
import NewLead from './pages/NewLead';
import OpenLeads from './pages/OpenLeads';
import LeadsReport from './pages/LeadsReport';
import ClosedLeads from './pages/ClosedLeads';
import TotalLeads from './pages/TotalLeads';
import DeclineLeads from './pages/DeclineLeads';
import Meeting from './pages/Meeting';
import MainOrg from './pages/MainOrg';
import Attendance from './pages/Attendance';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeePerformance from './pages/EmployeePerformance';
import Dashboard from './pages/Dashboard';
import Subscription from './pages/Subscription';
import NewCallLeads from './pages/NewCallLeads';
import OpenCallLeads from './pages/OpenCallLeads';
import User from './pages/User';
import Allfib from './pages/Allfib';
import SalaryHistory from './pages/SalaryHistory';
import MyProfile2 from './pages/MyProfile2';
import Payroll from './pages/Payroll';
import Project from './pages/Project';
import Projectli from './pages/Projectli';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Protected><Admin /></Protected>,
    children: [
      { path: "newleads", element: <NewLead /> },
      { path: "openleads", element: <OpenLeads /> },
      { path: "leadsreport", element: <LeadsReport /> },
      { path: "SuccessLeads", element: <ClosedLeads /> },
      { path: "totalLeads", element: <TotalLeads /> },
      { path: "declinedleads", element: <DeclineLeads /> },
      { path: "Meeting", element: <Meeting /> },
      { path: "registerorganization", element: <MainOrg /> },
      { path: "duplicatenewlead", element: <NewLead /> },
      { path: "duplicateopenleads", element: <OpenLeads /> },
      { path: "duplicateleadsreport", element: <LeadsReport /> },
      { path: "duplicateclosedleads", element: <ClosedLeads /> },
      { path: "duplicatetotalleads", element: <TotalLeads /> },
      { path: "duplicatedeclinedleads", element: <DeclineLeads /> },
      { path: "attendance", element: <Attendance /> },
      { path: "employeedetails", element: <EmployeeDashboard /> },
      { path: "employeeperformance", element: <EmployeePerformance /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "subscription", element: <Subscription /> },
      { path: "newcalldata", element: <NewCallLeads /> },
      { path: "opencalldata", element: <OpenCallLeads /> },
      { path: "AddUser", element: <User /> },
      { path: "fibrequest", element: <Allfib /> },
      { path: "SalaryHistory", element: <SalaryHistory /> },
      { path: "Profile", element: <MyProfile2 /> },
      { path: "payroll", element: <Payroll /> },
      { path: "Projects", element: <Project /> },
      { path: "Project", element: <Projectli /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
