import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./utils/Protected";
import { ThemeProvider } from "./contexts/UseColoeScheme";
import {
  Admin,
  ClosedLeads,
  Dashboard,
  DeclineLeads,
  EmployeeDashboard,
  LandingPage,
  LeadsReport,
  Login,
  MainOrg,
  Meeting,
  NewLead,
  OpenLeads,
  TotalLeads,
  EmployeePerformance,
  Subscription,
  NewCallLeads,
  OpenCallLeads,
  Attendance,
  User,
  Allfib,
  SalaryHistory,
  Payroll,
  Project,
  Projectli,
  MyProfile2,
  
} from "./utils/NaviationPage";
import "./index.css";

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
      {path:'Profile',element:<MyProfile2/>},
      { path: "payroll", element: <Payroll /> },
      { path: "Projects", element: <Project /> },
      {path:'Project',element:<Projectli/>}
   
    ],
  },
]);

window.addEventListener("beforeunload", () => {
  window.history.replaceState({}, document.title, window.location.pathname);
});

const App = () => {
  return (
    <ThemeProvider>
    <Provider theme={defaultTheme}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
    </ThemeProvider>
  );
};

export default App;
