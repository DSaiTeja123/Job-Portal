import React, { useState } from "react";
import { Navbar } from "../index";
import { Button, Input, Label } from "../ui/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CreateCompany() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the company.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
        <div className="my-5">
          <h1 className="font-bold text-2xl text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-500 mt-2">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>

        <div>
          <Label className="text-gray-700">Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft, etc."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 mt-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
