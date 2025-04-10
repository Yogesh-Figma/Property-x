const router = createBrowserRouter(
  [
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
  ],
  {
    basename: "/crm", // 👈 Yeh add kiya gaya hai
  }
);
