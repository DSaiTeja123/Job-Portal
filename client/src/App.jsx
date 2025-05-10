import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Jobs,
  SearchJob,
  JobDescription,
  ProtectRoutes,
} from "./components/index";
import { Home, Login, Signup, Profile } from "./pages/index";
import {
  Companies,
  CreateCompany,
  CompanySetup,
  AdminJobs,
  PostJob,
  Applicants,
} from "./components/admin";
import "./index.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: (
      <ProtectRoutes>
        <JobDescription />
      </ProtectRoutes>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectRoutes>
        <SearchJob />
      </ProtectRoutes>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectRoutes>
        <Profile />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectRoutes>
        <Companies />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectRoutes>
        <CreateCompany />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectRoutes>
        <CompanySetup />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectRoutes>
        <AdminJobs />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectRoutes>
        <PostJob />
      </ProtectRoutes>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectRoutes>
        <Applicants />
      </ProtectRoutes>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
