import React, { useState, useEffect } from "react";
import { Navbar } from "../index";
import { Button, Input } from "../ui/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CompaniesTable } from "./index";
import { useFetchCompanies } from "@/hooks/index";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  useFetchCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-full sm:w-1/3 lg:w-1/4 bg-white border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            New Company
          </Button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;
