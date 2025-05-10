import React, { useState, useEffect } from "react";
import { Navbar } from "../index";
import { Button, Input } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AdminJobsTable } from "./index";
import { useFetchAdmin } from "@/hooks/index";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useFetchAdmin();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-80 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Filter by name, role..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-primary-600 hover:bg-primary-700 text-black font-semibold rounded-lg px-5 py-2 shadow"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + New Job
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
