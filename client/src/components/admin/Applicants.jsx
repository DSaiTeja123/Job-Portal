import React, { useEffect } from "react";
import { Navbar } from "../index";
import { ApplicantsTable } from "./index";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      const token = user?.token;
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Applicants ({applicants?.applications?.length})
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
